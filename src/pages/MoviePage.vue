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
        <div class="flex flex-col mb-14">
          <h2 class="text-2xl font-medium mb-8">
            {{ $t("movie_discription") }}
          </h2>
          <div v-if="movie" class="flex">
            <img
              class="w-[50.625rem] h-[27.5rem] rounded-xl object-cover"
              :src="BACK_URL_IMAGE + '/storage/' + movie.image"
              alt=""
            />
            <div class="ml-5 w-1/2">
              <div class="flex justify-between">
                <h2 class="text-2xl font-medium text-[#DDCCAA]">
                  {{ movie.title[$i18n.locale] }}
                </h2>
                <div
                  v-if="userId === movie.user_id"
                  class="flex justify-between items-center w-36 h-10 px-7 py-2 rounded-lg bg-[#24222F]"
                >
                  <a @click="editMovie" class="cursor-pointer"
                    ><img src="@/assets/edit.svg" class="w-[1.3rem]" alt="edit"
                  /></a>
                  <div class="h-3/4 border-[#6C757D] border"></div>
                  <a @click="deleteMovie" class="cursor-pointer"
                    ><img
                      src="@/assets/delete.svg"
                      class="w-[1.3rem]"
                      alt="delete"
                  /></a>
                </div>
              </div>
              <div class="my-5">
                {{ $t("director") }}:
                <span class="ml-2">{{ movie.director[$i18n.locale] }}</span>
              </div>
              <p class="text-[#CED4DA] text-lg">
                {{ movie.description[$i18n.locale] }}
              </p>
            </div>
          </div>

          <div class="flex justify-start items-center mt-10">
            <h2 v-if="movie" class="text-2xl font-medium mr-8">
              {{ $t("quotes") }} ({{ $t("total") }} {{ movie.quote_number }})
            </h2>
            <RedButton
              @click="addQuoteRoute"
              class="flex items-center h-12 rounded-md p-4"
            >
              <img class="mr-2 w-6" src="@/assets/plus.svg" alt="plus" />{{
                $t("add_quote")
              }}
            </RedButton>
          </div>
        </div>

        <div class="overflow-scroll scrollbar-hide h-[26vh]">
          <div
            :id="quote.id + 'delete'"
            v-for="(quote, index) in quotes"
            :key="index"
            class="w-[46.5rem] h-[16.75rem] mb-10 py-6 px-8 bg-[#11101A] relative"
          >
            <img
              @click="showQuoteOptions(quote.id)"
              class="absolute right-9 top-9 cursor-pointer"
              src="@/assets/dots.svg"
              alt="dots"
            />
            <div
              :id="quote.id"
              v-bind:class="[
                userId !== quote.user_id && userId !== movie.user_id
                  ? 'h-14 pt-4'
                  : '',
                userId !== quote.user_id && userId === movie.user_id
                  ? 'h-28 pt-4'
                  : '',
              ]"
              class="absolute hidden w-64 h-52 pl-10 pt-9 bg-[#24222F] rounded-lg top-12 -right-48 z-10"
            >
              <div
                @click="quoteRoute(quote.id)"
                class="flex mb-8 cursor-pointer"
              >
                <img class="mr-4" src="@/assets/openEye.svg" alt="eye" />
                <p>{{ $t("view_quote") }}</p>
              </div>
              <div
                v-if="userId === quote.user_id"
                @click="quoteEditRoute(quote.id)"
                class="flex mb-8 cursor-pointer"
              >
                <img
                  class="mr-4 w-[1.3rem]"
                  src="@/assets/edit.svg"
                  alt="eye"
                />
                <p>{{ $t("edit") }}</p>
              </div>
              <div
                v-if="userId === movie.user_id || userId === quote.user_id"
                @click="deleteQuote(quote.id, quote.id + 'delete')"
                class="flex cursor-pointer"
              >
                <img
                  class="mr-4 w-[1.3rem]"
                  src="@/assets/delete.svg"
                  alt="eye"
                />
                <p>{{ $t("delete") }}</p>
              </div>
            </div>
            <div class="flex items-center mb-6">
              <img
                class="w-56 h-36 object-cover mr-8"
                :src="BACK_URL_IMAGE + '/storage/' + quote.image"
                alt="photo"
              />
              <p class="text-2xl">"{{ quote.quote[$i18n.locale] }}"</p>
            </div>
            <div class="border-t border-[#efefef] opacity-20 w-full"></div>
            <div class="flex items-center mt-6">
              <div class="flex mr-8 items-center">
                <p class="text-xl mr-3">{{ quote.comment_number }}</p>
                <img
                  src="@/assets/comment.svg"
                  class="w-[2rem]"
                  alt="comment"
                />
              </div>
              <div
                @click="likeDislike(quote.id, index)"
                class="flex mr-8 items-center cursor-pointer"
              >
                <p class="text-xl mr-3">{{ quotesLikes[index] }}</p>
                <img
                  v-if="userLikes[index]"
                  src="@/assets/activeLike.svg"
                  class="w-[2rem]"
                  alt="like"
                />
                <img
                  v-else
                  src="@/assets/like.svg"
                  class="w-[2rem]"
                  alt="like"
                />
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
import axiosInstance from "@/config/axios.js";
import { ref, onBeforeMount, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store.js";

const movie = ref(null);
const movieId = useRouter().currentRoute.value.params.movieId;
const BACK_URL = import.meta.env.VITE_BACK_URL;
const BACK_URL_IMAGE = BACK_URL.replace("/api", "");
const quotes = ref(null);
const quotesLikes = ref([]);
const userLikes = ref([]);
const emit = defineEmits(["movie"]);
const userId = useAuthStore().userId;

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

function newsRoute() {
  router.push({ path: "/news-feed" });
}

function moviesRoute() {
  router.push({ path: "/movies" });
}

function quoteRoute(quoteId) {
  router.push({ path: "/quote/" + quoteId });
}

function quoteEditRoute(quoteId) {
  router.push({ path: "/quote/" + quoteId + "/edit" });
}

function addQuoteRoute() {
  router.push({ path: "/movies/" + movieId + "/add-quote" });
}

function likeDislike(quoteId, index) {
  axiosInstance
    .post(BACK_URL + "/like-dislike", {
      quote_id: quoteId,
    })
    .then((response) => {
      if (response.status === 201) {
        quotesLikes.value[index]++;
        userLikes.value[index] = true;
      } else {
        quotesLikes.value[index]--;
        userLikes.value[index] = false;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteMovie() {
  axiosInstance
    .post(BACK_URL + "/delete-movie", { movie_id: movieId })
    .then(() => {
      router.push({ path: "/movies" });
    })
    .catch((error) => {
      if (error.response.status === 403) router.push({ path: "/error-403" });
    });
}

function deleteQuote(id, idDelete) {
  axiosInstance
    .post(BACK_URL + "/delete-quote", { quote_id: id })
    .then(() => {
      document.getElementById(idDelete).remove();
      movie.value.quote_number = movie.value.quote_number - 1;
    })
    .catch((error) => {
      if (error.response.status === 403) router.push({ path: "/error-403" });
    });
}

onBeforeMount(() => {
  axiosInstance
    .post(BACK_URL + "/get-movie", { movie_id: movieId })
    .then((response) => {
      movie.value = response.data[0];
    })
    .catch(() => {
      router.push({ path: "/error-404" });
    });
  axiosInstance
    .post(BACK_URL + "/get-quotes", {
      movie_id: movieId,
    })
    .then((response) => {
      quotes.value = response.data[0];
      quotesLikes.value = response.data[1];
      userLikes.value = response.data[2];
    })
    .catch(() => {
      router.push({ path: "/error-404" });
    });
});
</script>
