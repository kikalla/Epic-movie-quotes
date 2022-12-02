<template>
  <div @click="close()" class="blur-[3px] bg-black">
    <PageHeader></PageHeader>
    <LandingScreen></LandingScreen>
  </div>
  <ForgetPasswordForm></ForgetPasswordForm>
</template>

<script setup>
import LandingScreen from "@/components/layout/LandingScreen.vue";
import PageHeader from "@/components/layout/PageHeader.vue";
import ForgetPasswordForm from "@/components/forms/ForgetPasswordForm.vue";
import router from "@/router/index.js";

function close() {
  router.push({ path: "/" });
}
</script>
