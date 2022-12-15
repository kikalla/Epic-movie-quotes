import { useAuthStore } from "@/store.js";
import router from "@/router/index";

const guards = {
  verified() {
    const authStore = useAuthStore();
    if (authStore.verified) {
      return router.push("/news-feed");
    }
  },
  mustAuthenticated() {
    const authStore = useAuthStore();
    if (!authStore.authenticated) {
      return router.push("/error-401");
    }
  },
  Authenticated() {
    const authStore = useAuthStore();
    if (authStore.authenticated && authStore.verified) {
      return router.push("/news-feed");
    }
    if (authStore.authenticated) {
      return router.push("/error-401");
    }
  },
};

export default guards;
