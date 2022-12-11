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

      <div class="w-4/5 pt-8 px-20 bg-[#0D0B14] text-white">
        <div class="flex justify-between items-center mb-16">
          <h2 class="text-2xl font-medium">
            My list of movies (Total {{ movies.length }})
          </h2>
          <div class="flex">
            <div class="flex items-center w-36">
              <img class="mr-2 h-6" src="@/assets/search.png" alt="search" />
              <input
                class="w-4/5 h-12 bg-[#0D0B14] outline-none"
                type="text"
                name=""
                id=""
                placeholder="Search"
              />
            </div>
            <RedButton
              @click="addMovieRoute"
              class="flex items-center h-12 rounded-md p-4"
            >
              <img class="mr-2" src="@/assets/plus.svg" alt="plus" />Add movie
            </RedButton>
          </div>
        </div>

        <div
          class="grid grid-cols-3 grid-rows-[repeat(auto-fit_,50%)] gap-14 h-[75vh] overflow-scroll"
        >
          <div v-for="movie in movies" :key="movie.image">
            <a @click="movieRoute(movie.id)" class="cursor-pointer">
              <img
                class="rounded-xl h-80 w-full object-cover"
                :src="BACK_URL_IMAGE + '/storage/' + movie.image"
                alt="movie"
              />
              <h2 class="text-2xl mt-4">{{ movie.title.en }}</h2>
              <div class="flex items-center mt-4">
                <p class="mr-3">{{ movie.quote_number }}</p>
                <img src="@/assets/quote.svg" alt="quote" />
              </div>
            </a>
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
import axiosInstance from "@/config/axios.js";
import { ref, onBeforeMount } from "vue";

const BACK_URL = import.meta.env.VITE_BACK_URL;
const BACK_URL_IMAGE = BACK_URL.replace("/api", "");
const movies = ref({});

function moviesRoute() {
  router.push({ path: "/movies" });
}

function newsRoute() {
  router.push({ path: "/news-feed" });
}

function movieRoute(movieId) {
  router.push({ path: "/movies/" + movieId });
}

function addMovieRoute() {
  router.push({ path: "/movies/add-movie" });
}

onBeforeMount(() => {
  axiosInstance.post(BACK_URL + "/get-movies").then((response) => {
    movies.value = response.data;
  });
});
</script>
