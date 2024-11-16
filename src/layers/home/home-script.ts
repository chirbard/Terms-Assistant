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
      pageBody: " ",
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

        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: printBody,
        }, (result) => {
          if (result && result[0]) {
            this.pageBody = cleanString(result[0].result ?? " ");
            console.log(this.pageBody);
          }
        });
      });
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
            content: `You are Toby a Terms and Conditions assistant. You carefully read and interpret the input Terms and Conditions and answer questions based on the content. You are helpful and harmless, and you follow ethical guidelines and promote positive behavior. You respond to any questions related to the Terms and Conditions text provided to you. Here are the Terms and Conditions: ${this.pageBody}`,
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
