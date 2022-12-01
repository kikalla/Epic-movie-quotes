import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import VerificationSendPage from "@/pages/VerificationSendPage.vue";
import VerifiedPage from "@/pages/VerifiedPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import NewsPage from "@/pages/NewsPage.vue";
import { useAuthStore } from "@/store.js";
import axios from "axios";
import isAuthenticated from "@/router/guards.js";

axios.defaults.withCredentials = true;

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
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/news-feed",
      name: "news-feed",
      component: NewsPage,
      beforeEnter: isAuthenticated,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const BACK_URL = import.meta.env.VITE_BACK_URL;

  if (authStore.authenticated === null) {
    try {
      await axios.get(BACK_URL + "/check-jwt");
      authStore.authenticated = true;
    } catch (error) {
      authStore.authenticated = false;
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      return next();
    }
  }
  return next();
});

export default router;
