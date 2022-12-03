<template>
  <div
    class="w-[33.75rem] h-[25.5rem] bg-[#222030] rounded-lg absolute top-56 left-[43.125rem] flex flex-col items-center text-center px-20 py-16"
  >
    <img class="w-14" src="@/assets/checked.png" alt="checked" />
    <h2 class="text-white text-4xl mt-5 mb-8 font-medium">Success!</h2>
    <p class="text-white">Your Password changed successfully</p>
    <a
      @mousedown="loginRoute()"
      class="text-white bg-[#E31221] w-full py-2 mt-10 rounded-lg"
      href="/"
      >Go to login</a
    >
  </div>
</template>

<script setup>
import router from "@/router/index.js";

function loginRoute() {
  router.push({ path: "/login" });
}
</script>
