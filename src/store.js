import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const authenticated = ref(null);
  const verified = ref(null);
  const userId = ref(null);

  return { authenticated, verified, userId };
});
