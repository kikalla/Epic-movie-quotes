<template>
  <div @click="close" class="blur-[3px]"><MoviePage></MoviePage></div>
  <EditMovieForm headline="Edit Movie"></EditMovieForm>
</template>

<script setup>
import MoviePage from "@/pages/MoviePage.vue";
import EditMovieForm from "@/components/forms/EditMovieForm.vue";
import router from "@/router/index.js";
import { useRouter } from "vue-router";

const movieId = useRouter().currentRoute.value.params.movieId;

function close() {
  router.push({ path: "/movies/" + movieId });
}
</script>
