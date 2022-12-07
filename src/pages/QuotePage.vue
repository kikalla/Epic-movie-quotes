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

      <div v-if="quote" class="w-4/5 pt-4 px-20 bg-[#0D0B14] text-white">
        <div
          class="w-[44rem] h-[59rem] m-auto px-8 right-[6.5rem] bg-[#11101A] flex flex-col relative rounded-xl text-white"
        >
          <img
            @click="close()"
            class="absolute right-8 top-9 cursor-pointer"
            src="@/assets/close.svg"
            alt="close"
          />
          <div
            class="absolute left-4 top-4 flex justify-between items-center w-36 h-10 px-7 py-2 rounded-lg"
          >
            <a @click="editQuote" class="cursor-pointer"
              ><img src="@/assets/edit.svg" alt="edit"
            /></a>
            <div class="h-3/4 border-[#6C757D] border"></div>
            <a @click="deleteQuote" class="cursor-pointer"
              ><img src="@/assets/delete.svg" alt="delete"
            /></a>
          </div>
          <div class="flex flex-col items-center mt-4">
            <h2 class="text-2xl font-medium">View Quote</h2>
            <div
              class="border-t border-[#efefef] opacity-20 my-6 w-[108%]"
            ></div>
          </div>
          <div class="flex items-center">
            <img src="@/assets/default.png" alt="profile" />
            <p class="text-xl ml-4">Nino Tabagari</p>
          </div>
          <div
            class="h-12 border-[#6C757D] border rounded-md flex justify-between items-center my-5"
          >
            <p class="bg-[#11101A] ml-2 w-11/12 text-xl">
              {{ quote.quote.en }}
            </p>
            <p class="mr-4 text-[#6C757D]">Eng</p>
          </div>

          <div
            class="h-12 border-[#6C757D] border rounded-md flex justify-between items-center"
          >
            <p class="bg-[#11101A] ml-2 w-11/12 text-xl">
              {{ quote.quote.ka }}
            </p>
            <p class="mr-4 text-[#6C757D]">ქარ</p>
          </div>
          <img
            class="rounded-xl mt-6 w-full h-[24rem] object-contain"
            :src="BACK_URL_IMAGE + '/storage/' + quote.image"
            alt=""
          />
          <div class="flex items-center mt-3">
            <div class="flex items-center mr-8">
              <p class="text-xl mr-3">{{ quote.comment_number }}</p>
              <img src="@/assets/comment.svg" alt="comment" />
            </div>
            <div
              @click="likeDislike"
              class="flex items-center mr-8 cursor-pointer"
            >
              <p class="text-xl mr-3">{{ likes }}</p>
              <img v-if="liked" src="@/assets/activeLike.svg" alt="like" />
              <img v-else src="@/assets/like.svg" alt="like" />
            </div>
          </div>
          <div class="overflow-scroll h-[26vh] mt-4">
            <div v-for="(comment, index) in comments" :key="index">
              <div class="flex items-center">
                <img class="w-[3.25rem]" src="@/assets/default.png" alt="" />
                <h2 class="text-xl ml-4">{{ usernames[index] }}</h2>
              </div>
              <div>
                <p class="ml-[4.3rem] break-words">
                  {{ comment.comment }}
                </p>
                <div
                  class="border-t border-[#efefef] opacity-20 my-2 w-full"
                ></div>
              </div>
            </div>
            <h2 class="text-2xl" v-if="!showComments">No comments yet</h2>
          </div>
          <form @submit.prevent="quoteComment" class="flex items-center">
            <img class="w-[3.25rem]" src="@/assets/default.png" alt="" />
            <input
              v-model="comment"
              class="bg-[#24222F] px-4 h-12 ml-3 w-11/12 rounded-lg outline-none placeholder:text-white placeholder:text-lg"
              type="text"
              placeholder="Write a comment"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PageHeader from "@/components/layout/PageHeader.vue";
import UserInfo from "@/components/layout/UserInfo.vue";
import router from "@/router/index.js";
import axios from "axios";
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store.js";

const quoteId = useRouter().currentRoute.value.params.quoteId;
const BACK_URL = import.meta.env.VITE_BACK_URL;
const BACK_URL_IMAGE = BACK_URL.replace("/api", "");
const showComments = ref(false);
const quote = ref(null);
const likes = ref();
const liked = ref(false);
const comment = ref("");
const comments = ref([]);
const usernames = ref([]);

function moviesRoute() {
  router.push({ path: "/movies" });
}

function editQuote() {
  router.push({ path: "/quote/" + quoteId + "/edit" });
}

function close() {
  router.push({ path: "/movies/" + quote.value.movie_id });
}

function deleteQuote() {
  axios
    .post(BACK_URL + "/delete-quote", { quote_id: quoteId })
    .then(() => {
      router.push({ path: "/movies/" + quote.value.movie_id });
    })
    .catch((error) => {
      console.log(error);
    });
}

function likeDislike() {
  axios
    .post(BACK_URL + "/like-dislike", {
      quote_id: quoteId,
      user_id: useAuthStore().userId,
    })
    .then((response) => {
      if (response.status === 201) {
        likes.value++;
        liked.value = true;
      } else {
        likes.value--;
        liked.value = false;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function quoteComment() {
  const data = {
    comment: comment.value,
    quote_id: quote.value.id,
    user_id: useAuthStore().userId,
  };
  axios.post(BACK_URL + "/add-comment", data).then((response) => {
    comment.value = "";
    quote.value.comment_number = quote.value.comment_number + 1;
    comments.value.push(response.data[0]);
    usernames.value.push(response.data[1]);
    showComments.value = true;
  });
}

onBeforeMount(() => {
  axios
    .post(BACK_URL + "/get-quote", { quote_id: quoteId })
    .then((response) => {
      quote.value = response.data;
    })
    .catch(() => {
      router.push({ path: "/error-404" });
    });
  axios
    .post(BACK_URL + "/get-comments", {
      quote_id: quoteId,
    })
    .then((response) => {
      usernames.value = response.data[1];
      comments.value = response.data[0];
      if (comments.value.length !== 0) {
        showComments.value = true;
      }
    })
    .catch(() => {
      router.push({ path: "/error-404" });
    });
  axios
    .post(BACK_URL + "/get-likes", {
      quote_id: quoteId,
      user_id: useAuthStore().userId,
    })
    .then((response) => {
      likes.value = response.data[0];
      liked.value = response.data[1];
    })
    .catch(() => {
      router.push({ path: "/error-404" });
    });
});
</script>
