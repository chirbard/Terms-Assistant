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
      const apiService = ApiService.getInstance();
      apiService
        .postRequestWithStringBody(
          "https://jsonplaceholder.typicode.com/posts",
          "title=foo&body=bar&userId=1"
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
