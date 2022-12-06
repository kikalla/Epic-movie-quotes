<template>
  <div @click="close()" class="blur-[1px] bg-black">
    <PageHeader></PageHeader>
    <MoviesPage></MoviesPage>
  </div>
  <MovieForm></MovieForm>
</template>

<script setup>
import MoviesPage from "@/pages/MoviesPage.vue";
import PageHeader from "@/components/layout/PageHeader.vue";
import MovieForm from "@/components/forms/MovieForm.vue";
import router from "@/router/index.js";

function close() {
  router.push({ path: "/movies" });
}
</script>
