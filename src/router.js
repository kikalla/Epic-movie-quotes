import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import VerificationSendPage from "@/pages/VerificationSendPage.vue";
import VerifiedPage from "@/pages/VerifiedPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterPage,
    },
    {
      path: "/verification-send",
      name: "verification-send",
      component: VerificationSendPage,
    },
    {
      path: "/verified",
      name: "verified",
      component: VerifiedPage,
    },
  ],
});

export default router;
