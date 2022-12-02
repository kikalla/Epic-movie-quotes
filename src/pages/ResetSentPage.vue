<template>
  <div @click="close()" class="blur-[3px] bg-black">
    <PageHeader></PageHeader>
    <LandingScreen></LandingScreen>
  </div>
  <ResetSent></ResetSent>
</template>

<script setup>
import LandingScreen from "@/components/layout/LandingScreen.vue";
import PageHeader from "@/components/layout/PageHeader.vue";
import ResetSent from "@/components/layout/ResetSent.vue";
import router from "@/router/index.js";

function close() {
  router.push({ path: "/" });
}
</script>
