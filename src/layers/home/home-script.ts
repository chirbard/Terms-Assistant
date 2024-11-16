import { defineComponent } from "vue";
import ApiService from "../../core/util/api-service";

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
      lastRequest: "",
      response: "",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Who won the world series in 2020?",
            },
          ],
        },
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
      ],
    };
  },
  methods: {
    init() {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];

        function printBody() {
          const body = document.body.innerText;
          console.log(body);
        }

        if (tab.id === undefined) {
          return;
        }
        chrome.scripting
          .executeScript({
            target: { tabId: tab.id },
            func: printBody,
          })
          .then(() => console.log("Injected a function!"));
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
      this.lastRequest = this.input;
      this.input = "";

      const requestBody: Object = {
        model_id: "meta-llama/llama-3-8b-instruct",
        project_id: import.meta.env.VITE_PROJECT_ID,
        messages: [
          {
            role: "system",
            content: "You are an helpful assistant.",
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: this.lastRequest,
              },
            ],
          },
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
          this.response = json.choices[0].message.content;
          console.log(json);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
