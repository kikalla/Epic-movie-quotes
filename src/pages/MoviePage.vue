<template>
  <PageHeader></PageHeader>
  <div class="w-full h-screen pt-24 bg-[#0D0B14]">
    <div class="flex">
      <div class="w-1/5 h-[80vh] pl-16 pt-6 text-white bg-[#0D0B14]">
        <UserInfo></UserInfo>
        <div class="flex items-center my-11 ml-3">
          <img src="@/assets/home.svg" alt="home" />
          <a href="" class="text-2xl ml-11">News feed</a>
        </div>
        <div class="flex items-center ml-3">
          <img src="@/assets/activeMovie.svg" alt="home" />
          <a href="" class="text-2xl ml-11">List of movies</a>
        </div>
      </div>

      <div class="w-4/5 pt-8 px-20 bg-[#0D0B14] text-white">
        <div class="flex flex-col mb-16">
          <h2 class="text-2xl font-medium mb-8">Movie discription</h2>
          <div v-if="movie" class="flex">
            <img
              class="w-1/2 rounded-xl object-cover"
              :src="BACK_URL_IMAGE + '/storage/' + movie.image"
              alt=""
            />
            <div class="ml-5 w-1/2">
              <div class="flex justify-between">
                <h2 class="text-2xl font-medium text-[#DDCCAA]">
                  {{ JSON.parse(movie.title).en }}
                </h2>
                <div
                  class="flex justify-between items-center w-36 h-10 px-7 py-2 rounded-lg bg-[#24222F]"
                >
                  <a href=""><img src="@/assets/edit.svg" alt="edit" /></a>
                  <div class="h-3/4 border-[#6C757D] border"></div>
                  <a href=""><img src="@/assets/delete.svg" alt="delete" /></a>
                </div>
              </div>
              <div class="my-5">
                Director:
                <span class="ml-2">{{ JSON.parse(movie.director).en }}</span>
              </div>
              <p class="text-[#CED4DA] text-lg">
                {{ JSON.parse(movie.description).en }}
              </p>
            </div>
          </div>
          <div class="flex justify-start items-center mt-10">
            <h2 class="text-2xl font-medium mr-8">Quotes (Total 7)</h2>
            <RedButton class="flex items-center h-12 rounded-md p-4">
              <img class="mr-2" src="@/assets/plus.svg" alt="plus" />Add quote
            </RedButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PageHeader from "@/components/layout/PageHeader.vue";
import UserInfo from "@/components/layout/UserInfo.vue";
import RedButton from "@/components/ui/RedButton.vue";
import router from "@/router/index.js";
import axios from "axios";
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

// import { useAuthStore } from "@/store.js";
const movie = ref(null);
const movieId = useRouter().currentRoute.value.params.movieId;
const BACK_URL = import.meta.env.VITE_BACK_URL;
const BACK_URL_IMAGE = BACK_URL.replace("/api", "");

// function addMovieRoute() {
//   router.push({ path: "/movies/add-movie" });
// }

onBeforeMount(() => {
  axios
    .post(BACK_URL + "/get-movie", { movie_id: movieId })
    .then((response) => {
      movie.value = response.data;
    })
    .catch(() => {
      router.push({ path: "/error-404" });
    });
});
</script>
