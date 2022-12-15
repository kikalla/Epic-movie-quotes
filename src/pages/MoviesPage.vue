<template>
  <PageHeader></PageHeader>
  <div class="w-full h-screen pt-24 bg-[#0D0B14]">
    <div class="flex">
      <div class="w-1/5 h-[80vh] pl-16 pt-6 text-white bg-[#0D0B14]">
        <UserInfo></UserInfo>
        <div
          @click="newsRoute"
          class="flex items-center my-11 ml-3 cursor-pointer"
        >
          <img src="@/assets/home.svg" class="h-[2rem]" alt="home" />
          <a class="text-2xl ml-11 hover:text-red-500">{{ $t("news_feed") }}</a>
        </div>
        <div @click="moviesRoute" class="flex items-center ml-3 cursor-pointer">
          <img src="@/assets/activeMovie.svg" class="h-[2rem]" alt="home" />
          <a class="text-2xl ml-11 hover:text-red-500">{{
            $t("list_of_movies")
          }}</a>
        </div>
      </div>

      <div class="w-4/5 pt-8 px-20 bg-[#0D0B14] text-white">
        <div class="flex justify-between items-center mb-16">
          <h2 class="text-2xl font-medium">
            {{ $t("my_list_of_movies") + " " + $t("total") }} ({{
              movies.length
            }})
          </h2>
          <div class="flex">
            <div class="flex items-center w-36">
              <img class="mr-2 h-6" src="@/assets/search.png" alt="search" />
              <form @submit.prevent="search">
                <input
                  v-model="searchValue"
                  class="w-4/5 h-12 bg-[#0D0B14] outline-none"
                  type="text"
                  name=""
                  id=""
                  :placeholder="$t('search')"
                />
              </form>
            </div>
            <RedButton
              @click="addMovieRoute"
              class="flex items-center h-12 rounded-md p-4"
            >
              <img class="mr-2 w-6" src="@/assets/plus.svg" alt="plus" />{{
                $t("add_movie")
              }}
            </RedButton>
          </div>
        </div>

        <div
          class="grid grid-cols-3 grid-rows-[repeat(auto-fit_,50%)] gap-14 h-[75vh] overflow-scroll scrollbar-hide"
        >
          <div v-for="movie in movies" :key="movie.image">
            <a @click="movieRoute(movie.id)" class="cursor-pointer">
              <img
                class="rounded-xl h-80 w-full object-cover"
                :src="BACK_URL_IMAGE + '/storage/' + movie.image"
                alt="movie"
              />
              <h2 class="text-2xl mt-4">{{ movie.title[$i18n.locale] }}</h2>
              <div class="flex items-center mt-4">
                <p class="mr-3">{{ movie.quote_number }}</p>
                <img src="@/assets/quote.svg" class="w-[2rem]" alt="quote" />
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
const searchValue = ref("");

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

function search() {
  axiosInstance
    .post(BACK_URL + "/search-movies", { search: searchValue.value })
    .then((response) => {
      movies.value = response.data;
    });
}
onBeforeMount(() => {
  axiosInstance
    .post(BACK_URL + "/get-movies")
    .then((response) => {
      movies.value = response.data;
    })
    .catch(() => {
      router.push({ path: "/error-404" });
    });
});
</script>
