import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import VerificationSendPage from "@/pages/VerificationSendPage.vue";
import VerifiedPage from "@/pages/VerifiedPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import NewsPage from "@/pages/NewsPage.vue";
import ResetPasswordPage from "@/pages/ResetPasswordPage.vue";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage.vue";
import ResetSentPage from "@/pages/ResetSentPage.vue";
import ResetSuccessPage from "@/pages/ResetSuccessPage.vue";
import MoviesPage from "@/pages/MoviesPage.vue";
import MoviePage from "@/pages/MoviePage.vue";
import MovieEditPage from "@/pages/MovieEditPage.vue";
import AddMoviePage from "@/pages/AddMoviePage.vue";
import AddQuotePage from "@/pages/AddQuotePage.vue";
import QuotePage from "@/pages/QuotePage.vue";
import QuoteEditPage from "@/pages/QuoteEditPage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import Error401Page from "@/pages/Error401Page.vue";
import { useAuthStore } from "@/store.js";
import axios from "axios";
// import guards from "@/router/guards.js";

axios.defaults.withCredentials = true;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
      // beforeEnter: guards.notAuthenticated,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterPage,
      // beforeEnter: guards.notAuthenticated,
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
      // beforeEnter: guards.notAuthenticated,
    },
    {
      path: "/news-feed",
      name: "news-feed",
      component: NewsPage,
      // beforeEnter: guards.isAuthenticated,
    },
    {
      path: "/error-401",
      name: "error-401",
      component: Error401Page,
    },
    {
      path: "/reset/password",
      name: "reset-password",
      component: ResetPasswordPage,
    },
    {
      path: "/forgot/password",
      name: "forgot-password",
      component: ForgotPasswordPage,
    },
    {
      path: "/reset-sent",
      name: "reset-sent",
      component: ResetSentPage,
    },
    {
      path: "/reset-success",
      name: "reset-success",
      component: ResetSuccessPage,
    },
    {
      path: "/movies",
      name: "movies",
      component: MoviesPage,
      // beforeEnter: guards.isAuthenticated,
    },
    {
      path: "/movies/:movieId",
      name: "movie",
      component: MoviePage,
    },
    {
      path: "/movies/:movieId/edit",
      name: "movie-edit",
      component: MovieEditPage,
    },
    {
      path: "/movies/add-movie",
      name: "add-movie",
      component: AddMoviePage,
      // beforeEnter: guards.isAuthenticated,
    },
    {
      path: "/movies/:movieId/add-quote",
      name: "add-quote",
      component: AddQuotePage,
    },
    {
      path: "/quote/:quoteId",
      name: "quote",
      component: QuotePage,
    },
    {
      path: "/quote/:quoteId/edit",
      name: "quote-edit",
      component: QuoteEditPage,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfilePage,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const BACK_URL = import.meta.env.VITE_BACK_URL;

  if (authStore.authenticated === null) {
    try {
      await axios.get(BACK_URL + "/check-jwt").then((response) => {
        authStore.authenticated = true;
        authStore.userId = response.data.user.id;
        if (response.data.user.email_verified_at !== null) {
          authStore.verified = true;
        } else {
          authStore.verified = false;
        }
      });
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
