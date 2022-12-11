<template>
  <div @click="userRoute" class="flex items-center">
    <img
      class="w-[3.75rem] h-[3.75rem] rounded-[50%] object-cover"
      :src="image"
      alt="profile"
    />
    <div class="ml-6">
      <h2 class="text-2xl">{{ username }}</h2>
      <a class="text-[#CED4DA]">Edit your profile</a>
    </div>
  </div>
</template>

<script setup>
import axiosInstance from "@/config/axios.js";
import { ref, onBeforeMount } from "vue";
import router from "@/router/index.js";

const BACK_URL = import.meta.env.VITE_BACK_URL;
const BACK_URL_IMAGE = BACK_URL.replace("/api", "");
const image = ref(null);
const username = ref("");

function userRoute() {
  router.push({ path: "/profile" });
}

onBeforeMount(() => {
  axiosInstance.post(BACK_URL + "/get-user-info").then((response) => {
    if (response.data[0] === "/images/default.jpg") {
      image.value = BACK_URL_IMAGE + response.data[0];
    } else {
      image.value = BACK_URL_IMAGE + "/storage/" + response.data[0];
    }
    username.value = response.data[1];
  });
});
</script>
