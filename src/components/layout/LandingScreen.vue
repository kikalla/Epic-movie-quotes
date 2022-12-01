<template>
  <div
    class="text-white font-bold text-6xl text-center w-[43rem] m-auto pt-80 pb-[34rem]"
  >
    <h1 class="text-[#DDCCAA]">Find any quote in millions of movie lines</h1>
    <RedButton
      @click="registerRoute()"
      class="mx-6 text-xl h-12 rounded-lg w-32 mt-12 font-normal"
      >Get Started
    </RedButton>
  </div>
</template>

<script setup>
import router from "@/router/index.js";
import RedButton from "@/components/ui/RedButton.vue";

function registerRoute() {
  router.push({ path: "/register" });
}
</script>
