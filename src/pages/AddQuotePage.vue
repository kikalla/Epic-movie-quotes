<template>
  <div @click="close()" class="blur-[1px] bg-black">
    <PageHeader></PageHeader>
    <MoviePage @movie="getMovie"></MoviePage>
  </div>
  <QuoteForm :movie="movie"></QuoteForm>
</template>

<script setup>
import MoviePage from "@/pages/MoviePage.vue";
import PageHeader from "@/components/layout/PageHeader.vue";
import QuoteForm from "@/components/forms/QuoteForm.vue";
import router from "@/router/index.js";
import { ref } from "vue";

const movie = ref(null);

function getMovie(response) {
  movie.value = response;
}

function close() {
  router.push({ path: "/movies/" + movie.value.id });
}
</script>
