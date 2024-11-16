import { defineComponent } from "vue";
import ApiService from "../../core/util/api-service";

export default defineComponent({
  name: "HomeView",
  emits: [],
  setup() {
    return {};
  },
  methods: {
    request() {
      const requestBody: string = `{
        "model_id": "meta-llama/llama-3-8b-instruct",
        "project_id": "${import.meta.env.VITE_PROJECT_ID}",
        "messages": [
          {
            "role": "system",
            "content": "You are an helpful assistant."
          },
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": "Who won the world series in 2020?"
              }
            ]
          },
          {
            "role": "assistant",
            "content": "The Los Angeles Dodgers won the World Series in 2020."
          },
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": "Where was it played?"
              }
            ]
          }
        ],
        "max_tokens": 100,
        "temperature": 0,
        "time_limit": 1000
      }`;

      const apiService = ApiService.getInstance();
      apiService
        .postRequestWithStringBody(
          "https://eu-de.ml.cloud.ibm.com/ml/v1/text/chat?version=2023-10-25",
          requestBody
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
