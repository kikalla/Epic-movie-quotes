import axios from "axios";
import { useAuthStore } from "@/store.js";
import router from "@/router/index.js";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACK_URL,
  timeout: 15000,
});

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      const authStore = useAuthStore();
      authStore.authenticated = false;
    }
    return router.push({ path: "/error-401" });
  }
);

export default axiosInstance;
