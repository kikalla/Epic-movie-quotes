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
        <div @click="moviesRoute" class="flex items-center ml-3 cursor-pointer">
          <img src="@/assets/activeMovie.svg" alt="home" />
          <a class="text-2xl ml-11">List of movies</a>
        </div>
      </div>

      <div class="w-4/5 pt-8 px-20 bg-[#0D0B14] text-white">
        <div class="flex flex-col mb-14">
          <h2 class="text-2xl font-medium mb-8">Movie discription</h2>
          <div v-if="movie" class="flex">
            <img
              class="w-[50.625rem] h-[27.5rem] rounded-xl object-cover"
              :src="BACK_URL_IMAGE + '/storage/' + movie.image"
              alt=""
            />
            <div class="ml-5 w-1/2">
              <div class="flex justify-between">
                <h2 class="text-2xl font-medium text-[#DDCCAA]">
                  {{ movie.title.en }}
                </h2>
                <div
                  class="flex justify-between items-center w-36 h-10 px-7 py-2 rounded-lg bg-[#24222F]"
                >
                  <a @click="editMovie" class="cursor-pointer"
                    ><img src="@/assets/edit.svg" alt="edit"
                  /></a>
                  <div class="h-3/4 border-[#6C757D] border"></div>
                  <a @click="deleteMovie" class="cursor-pointer"
                    ><img src="@/assets/delete.svg" alt="delete"
                  /></a>
                </div>
              </div>
              <div class="my-5">
                Director:
                <span class="ml-2">{{ movie.director.en }}</span>
              </div>
              <p class="text-[#CED4DA] text-lg">
                {{ movie.description.en }}
              </p>
            </div>
          </div>

          <div class="flex justify-start items-center mt-10">
            <h2 v-if="movie" class="text-2xl font-medium mr-8">
              Quotes (Total {{ movie.quote_number }})
            </h2>
            <RedButton
              @click="addQuoteRoute"
              class="flex items-center h-12 rounded-md p-4"
            >
              <img class="mr-2" src="@/assets/plus.svg" alt="plus" />Add quote
            </RedButton>
          </div>
        </div>

        <div class="overflow-scroll h-[26vh]">
          <div
            :id="quote.id + 'delete'"
            v-for="quote in quotes"
            :key="quote.image"
            class="w-[50.625rem] h-[16.75rem] mb-10 py-6 px-8 bg-[#11101A] relative"
          >
            <img
              @click="showQuoteOptions(quote.id)"
              class="absolute right-9 top-9 cursor-pointer"
              src="@/assets/dots.svg"
              alt="dots"
            />
            <div
              :id="quote.id"
              class="absolute hidden w-64 h-52 pl-10 pt-9 bg-[#24222F] rounded-lg top-12 -right-48 z-10"
            >
              <div class="flex">
                <img class="mr-4" src="@/assets/openEye.svg" alt="eye" />
                <p>View Quote</p>
              </div>
              <div class="flex my-8">
                <img class="mr-4" src="@/assets/edit.svg" alt="eye" />
                <p>Edit</p>
              </div>
              <div
                @click="deleteQuote(quote.id, quote.id + 'delete')"
                class="flex cursor-pointer"
              >
                <img class="mr-4" src="@/assets/delete.svg" alt="eye" />
                <p>Delete</p>
              </div>
            </div>
            <div class="flex items-center mb-6">
              <img
                class="w-56 h-36 object-cover mr-8"
                :src="BACK_URL_IMAGE + '/storage/' + quote.image"
                alt="photo"
              />
              <p class="text-2xl">"{{ quote.quote.en }}"</p>
            </div>
            <div class="border-t border-[#efefef] opacity-20 w-full"></div>
            <div class="flex items-center mt-6">
              <div class="flex mr-8">
                <p class="text-xl mr-3">5</p>
                <img src="@/assets/comment.svg" alt="comment" />
              </div>
              <div class="flex mr-8">
                <p class="text-xl mr-3">5</p>
                <img src="@/assets/like.svg" alt="like" />
              </div>
            </div>
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
import { ref, onBeforeMount, watch } from "vue";
import { useRouter } from "vue-router";

const movie = ref(null);
const movieId = useRouter().currentRoute.value.params.movieId;
const BACK_URL = import.meta.env.VITE_BACK_URL;
const BACK_URL_IMAGE = BACK_URL.replace("/api", "");
const quotes = ref(null);
const emit = defineEmits(["movie"]);

watch(movie, () => {
  emit("movie", movie.value);
});

function showQuoteOptions(id) {
  let div = document.getElementById(id);
  div.classList.toggle("hidden");
}

function editMovie() {
  router.push({ path: "/movies/" + movieId + "/edit" });
}

function moviesRoute() {
  router.push({ path: "/movies" });
}

function addQuoteRoute() {
  router.push({ path: "/movies/" + movieId + "/add-quote" });
}

function deleteMovie() {
  axios
    .post(BACK_URL + "/delete-movie", { movie_id: movieId })
    .then(() => {
      router.push({ path: "/movies" });
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteQuote(id, idDelete) {
  axios
    .post(BACK_URL + "/delete-quote", { quote_id: id, movie_id: movieId })
    .then(() => {
      document.getElementById(idDelete).remove();
      movie.value.quote_number = movie.value.quote_number - 1;
    })
    .catch((error) => {
      console.log(error);
    });
}

onBeforeMount(() => {
  axios
    .post(BACK_URL + "/get-movie", { movie_id: movieId })
    .then((response) => {
      movie.value = response.data;
    })
    .catch(() => {
      router.push({ path: "/error-404" });
    });
  axios
    .post(BACK_URL + "/get-quotes", { movie_id: movieId })
    .then((response) => {
      quotes.value = response.data;
    })
    .catch(() => {
      router.push({ path: "/error-404" });
    });
});
</script>
