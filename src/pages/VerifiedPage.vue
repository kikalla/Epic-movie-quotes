<template>
  <div @click="close()" class="blur-[3px] bg-black">
    <PageHeader></PageHeader>
    <LandingScreen></LandingScreen>
  </div>
  <EmailVerified></EmailVerified>
</template>

<script setup>
import LandingScreen from "@/components/layout/LandingScreen.vue";
import PageHeader from "@/components/layout/PageHeader.vue";
import EmailVerified from "@/components/layout/EmailVerified.vue";
import router from "@/router";

function close() {
  router.push({ path: "/" });
}
</script>
