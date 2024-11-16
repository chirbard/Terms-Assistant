import { defineComponent } from "vue";
import ApiService from "../../core/util/api-service";

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
      messages: [
        {
          role: "assistant",
          content: "The Los Angeles Dodgers won the World Series in 2020.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Where was it played?",
            },
          ],
        },
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
              console.log(this.pageBody);
            }
          }
        );
      });
    },
    formatMessageContent(content: string | { type: string; text: string }[]) {
      if (typeof content === "string") {
        return content;
      } else if (Array.isArray(content)) {
        return content[0].text;
      }
    },
    request() {
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
        model_id: "meta-llama/llama-3-8b-instruct",
        project_id: import.meta.env.VITE_PROJECT_ID,
        messages: [
          {
            role: "system",
            content: `You are Toby a Terms and Conditions assistant. You carefully read and interpret the input Terms and Conditions and answer questions based on the content. You are helpful and harmless, and you follow ethical guidelines and promote positive behavior. You respond to any questions related to the Terms and Conditions text provided to you. Here are the Terms and Conditions: ${this.pageBody}`,
          },
          ...this.messages,
        ],
        max_tokens: 30,
        temperature: 0,
        time_limit: 1000,
      };

      const apiService = ApiService.getInstance();
      apiService
        .postRequestWithStringBody(
          "https://eu-de.ml.cloud.ibm.com/ml/v1/text/chat?version=2023-10-25",
          JSON.stringify(requestBody)
        )
        .then(async (response) => {
          console.log(response);
          const json = await response.json();
          const responseContent: string = json.choices[0].message.content;

          this.messages.push({
            role: "assistant",
            content: responseContent,
          });
          console.log(json);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
