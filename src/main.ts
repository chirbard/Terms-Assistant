import { createApp } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import App from "./layers/app/App.vue";

import HomeView from "./layers/home/HomeView.vue";
// import i18n from "./core/i18n";

const routes = [{ path: "/", component: HomeView }];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
// app.use(i18n);
app.mount("#app");
