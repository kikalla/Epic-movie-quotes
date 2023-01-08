<template>
  <div
    class="bg-[#181624] w-full h-24 flex px-[4.5rem] items-center justify-between fixed top-0 z-50"
  >
    <h2 class="text-[#DDCCAA] text-base font-medium">MOVIE QUOTES</h2>
    <div class="flex items-center">
      <div class="relative">
        <NotificationsField></NotificationsField>
      </div>
      <select
        name="lang"
        id="lang"
        class="h-7 text-white bg-[#181624] mx-6 outline-none cursor-pointer"
        v-model="$i18n.locale"
      >
        <option value="en">Eng</option>
        <option value="ka">Geo</option>
      </select>
      <RedButton
        v-if="!authStore.authenticated"
        class="h-9 w-28 mr-6 rounded-lg"
        @click="registerRoute()"
      >
        {{ $t("sign_up") }}
      </RedButton>
      <button
        v-if="!authStore.authenticated"
        @click="loginRoute()"
        class="text-white text-base border-white border h-9 rounded-lg w-28 font-normal"
      >
        {{ $t("log_in") }}
      </button>

      <button
        v-else
        @click="logout()"
        class="text-white text-base border-white border h-9 rounded-lg w-28 font-normal"
      >
        {{ $t("log_out") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import router from "@/router/index.js";
import RedButton from "@/components/ui/RedButton.vue";
import NotificationsField from "@/components/layout/NotificationsField.vue";
import { useAuthStore } from "@/store.js";
import axios from "axios";
import { setLocale } from "@vee-validate/i18n";
import { watch, ref } from "vue";
import i18n from "@/i18n";

const BACK_URL = import.meta.env.VITE_BACK_URL;
const authStore = useAuthStore();
const locale = ref(i18n.global.locale);

watch(locale, () => {
  setLocale(locale.value);
});

function registerRoute() {
  router.push({ path: "/register" });
}

function loginRoute() {
  router.push({ path: "/login" });
}

function logout() {
  axios.get(BACK_URL + "/logout").then(() => {
    authStore.authenticated = false;
    authStore.verified = false;
    router.push({ path: "/" });
  });
}
</script>
