import { useAuthStore } from "@/store.js";
import router from "@/router/index";

const isAuthenticated = () => {
  const authStore = useAuthStore();
  if (!authStore.authenticated) {
    return router.push("/error-401");
  }
};

export default isAuthenticated;
