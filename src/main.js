import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/App.vue";
import router from "@/router/index.js";

import "@/config/vee-validate/rules.js";
import "@/config/vee-validate/messages.js";

import "@/assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
