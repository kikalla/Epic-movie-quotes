<template>
  <PageHeader></PageHeader>
  <div class="w-full h-screen pt-24 bg-[#0D0B14]">
    <div class="flex">
      <div class="w-1/5 h-[80vh] pl-16 pt-6 text-white bg-[#0D0B14]">
        <UserInfo></UserInfo>
        <div @click="newsRoute" class="flex items-center my-11 ml-3">
          <img src="@/assets/home.svg" alt="home" />
          <a class="text-2xl ml-11">News feed</a>
        </div>
        <div @click="moviesRoute" class="flex items-center ml-3 cursor-pointer">
          <img src="@/assets/activeMovie.svg" alt="home" />
          <a class="text-2xl ml-11">List of movies</a>
        </div>
      </div>

      <EditQuoteForm></EditQuoteForm>
    </div>
  </div>
</template>

<script setup>
import PageHeader from "@/components/layout/PageHeader.vue";
import UserInfo from "@/components/layout/UserInfo.vue";
import router from "@/router/index.js";
import EditQuoteForm from "@/components/forms/EditQuoteForm.vue";

function newsRoute() {
  router.push({ path: "/news-feed" });
}

function moviesRoute() {
  router.push({ path: "/movies" });
}
</script>
