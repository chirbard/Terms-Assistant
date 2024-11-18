import { defineComponent } from "vue";
import ApiService from "../../core/util/api-service";
import AuthService from "../../core/util/auth-service";
import StorageService from "../../core/util/storage-service";

interface Message {
  role: string;
  content: string | { type: string; text: string }[];
}

export default defineComponent({
  name: "HomeView",
  emits: [],
  setup() {
    return {};
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      input: "",
      pageBody: "",
      messages: [
        {
          role: "assistant",
          content: "Hello! How can I help you today?",
        },
        // {
        //   role: "user",
        //   content: [
        //     {
        //       type: "text",
        //       text: "What are the terms and conditions?",
        //     },
        //   ],
        // },
      ] as Message[],
    };
  },
  methods: {
    init() {
      function cleanString(input: string) {
        input = input.replace(/"/g, "");
        input = input.replace(/(\r\n|\n|\r)/gm, " ");
        return input;
      }

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];

        function printBody() {
          return document.body.innerText;
        }

        if (!tab.id) {
          return;
        }

        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            func: printBody,
          },
          (result) => {
            if (result && result[0]) {
              this.pageBody = cleanString(result[0].result ?? " ");
              // console.log(this.pageBody);
            }
          }
        );
      });
    },
    formatMessageContent(content: string | { type: string; text: string }[]) {
      if (typeof content === "string") {
        return content.replace(/\n/g, "<br>");
      } else if (Array.isArray(content)) {
        return content[0].text.replace(/\n/g, "<br>");
      }
    },
    async request() {
      const requestText: string = this.input;
      this.input = "";

      this.messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: requestText,
          },
        ],
      });

      const requestBody: Object = {
        model_id: "meta-llama/llama-3-1-8b-instruct",
        project_id: import.meta.env.VITE_PROJECT_ID,
        messages: [
          {
            role: "system",
            content:
              "You are Toby a Terms and Conditions assistant. You carefully read and interpret the input Terms and Conditions and answer questions based on the content. You are helpful and harmless, and you follow ethical guidelines and promote positive behavior. You respond to any questions related to the Terms and Conditions text provided to you. Here are the Terms and Conditions: " +
              this.pageBody,
          },
          ...this.messages,
        ],
        max_tokens: 200,
        temperature: 0,
        time_limit: 20000,
      };

      const storageService = StorageService.getInstance();
      let accessToken = await storageService.getAccessToken();

      if (await this.modelRequest(requestBody, accessToken)) {
        return;
      }
      const authService = AuthService.getInstance();
      accessToken = await authService.getAccessToken();
      await storageService.setAccessToken(accessToken);
      this.modelRequest(requestBody, accessToken);
    },
    /**
     * @returns false if access token expired and needs to be refreshed
     */
    async modelRequest(
      requestBody: Object,
      accessToken: string
    ): Promise<boolean> {
      const apiService = ApiService.getInstance();
      let result: Response;
      try {
        result = await apiService.postRequestWithStringBody(
          "https://eu-de.ml.cloud.ibm.com/ml/v1/text/chat?version=2023-10-25",
          JSON.stringify(requestBody),
          accessToken
        );
      } catch (error) {
        console.error(error);
        return true;
      }

      if (result.status === 401) {
        console.log("Access token expired");
        return false;
      }

      const json = await result.json();
      const responseContent: string = json.choices[0].message.content;

      this.messages.push({
        role: "assistant",
        content: responseContent,
      });
      console.log(json);
      return true;
    },
    autoResizeTextarea(event: Event) {
      const textarea = event.target;
      if (!(textarea instanceof HTMLTextAreaElement)) {
        return;
      }
      textarea.style.height = "auto";
      const newHeight: number = textarea.scrollHeight - 20;
      textarea.style.height = `${newHeight}px`;

      if (textarea.value === "") {
        textarea.style.height = "20px";
      }
    },
    handleEnter(event: KeyboardEvent) {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        this.request();
      }
    },
  },
});
