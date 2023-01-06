<template>
  <PageHeader></PageHeader>
  <div class="w-full h-screen pt-24 bg-[#0D0B14]">
    <div class="flex">
      <div class="w-1/5 pl-16 pt-6 text-white bg-[#0D0B14]">
        <UserInfo></UserInfo>
        <div @click="newsRoute" class="flex items-center my-11 ml-3">
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

      <div v-if="quote" class="w-4/5 pt-4 px-20 bg-[#0D0B14] text-white">
        <div
          class="w-[44rem] max-h-[58rem] h-[80vh] m-auto px-8 right-[6.5rem] bg-[#11101A] flex flex-col relative rounded-xl text-white"
        >
          <img
            @click="close()"
            class="absolute right-8 top-9 cursor-pointer"
            src="@/assets/close.svg"
            alt="close"
          />
          <div
            v-if="userId === quote.user_id || userId === movieUserId"
            class="absolute left-4 top-4 flex justify-between items-center w-36 h-10 px-7 py-2 rounded-lg"
          >
            <a
              v-if="userId === quote.user_id"
              @click="editQuote"
              class="cursor-pointer"
              ><img src="@/assets/edit.svg" class="w-[1.3rem]" alt="edit"
            /></a>
            <div
              v-if="userId === quote.user_id"
              class="h-3/4 border-[#6C757D] border"
            ></div>
            <a @click="deleteQuote" class="cursor-pointer"
              ><img src="@/assets/delete.svg" class="w-[1.3rem]" alt="delete"
            /></a>
          </div>
          <div class="flex flex-col items-center mt-4">
            <h2 class="text-2xl font-medium">{{ $t("view_quote") }}</h2>
            <div
              class="border-t border-[#efefef] opacity-20 my-6 w-[108%]"
            ></div>
          </div>

          <div class="scrollbar-hide overflow-scroll">
            <div class="flex items-center">
              <img
                :src="creatorImage"
                class="w-[3.75rem] h-[3.75rem] rounded-[50%] object-cover"
                alt="profile"
              />
              <p class="text-xl ml-4">{{ username }}</p>
            </div>
            <div
              class="h-12 border-[#6C757D] border rounded-md flex justify-between items-center my-5"
            >
              <p
                v-if="locale === 'en'"
                class="bg-[#11101A] ml-2 w-11/12 text-xl"
              >
                {{ quote.quote.en }}
              </p>
              <p
                v-if="locale === 'ka'"
                class="bg-[#11101A] ml-2 w-11/12 text-xl"
              >
                {{ quote.quote.ka }}
              </p>
            </div>

            <img
              class="rounded-xl mt-6 w-full h-[20rem] object-cover"
              :src="BACK_URL_IMAGE + '/storage/' + quote.image"
              alt=""
            />
            <div class="flex items-center mt-3">
              <div class="flex items-center mr-8">
                <p class="text-xl mr-3">{{ quote.comment_number }}</p>
                <img
                  src="@/assets/comment.svg"
                  class="w-[2rem]"
                  alt="comment"
                />
              </div>
              <div
                @click="likeDislike"
                class="flex items-center mr-8 cursor-pointer"
              >
                <p class="text-xl mr-3">{{ likes }}</p>
                <img
                  v-if="liked"
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
            <div class="overflow-scroll scrollbar-hide h-[22vh] mt-4">
              <div v-for="(comment, index) in comments" :key="index">
                <div class="flex items-center">
                  <img
                    class="w-[3.25rem] h-[3.25rem] rounded-[50%] object-cover"
                    :src="usersImages[index]"
                    alt="user-image"
                  />
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
              <h2 class="text-2xl" v-if="!showComments">
                {{ $t("no_comments_yet") }}
              </h2>
            </div>
          </div>
          <form @submit.prevent="quoteComment" class="flex items-center mb-4">
            <img
              class="w-[3.25rem] h-[3.25rem] rounded-[50%] object-cover"
              :src="userImage"
              alt="user-image"
            />
            <input
              v-model="comment"
              class="bg-[#24222F] px-4 h-12 ml-3 w-11/12 rounded-lg outline-none placeholder:text-white placeholder:text-lg"
              type="text"
              :placeholder="$t('write_comeent')"
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
import axiosInstance from "@/config/axios.js";
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store.js";
import i18n from "@/i18n";

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
const usersImages = ref([]);
const userImage = ref(null);
const creatorImage = ref(null);
const username = ref(null);
const userId = useAuthStore().userId;
const movieUserId = ref(null);
const locale = ref(i18n.global.locale);

function moviesRoute() {
  router.push({ path: "/movies" });
}

function newsRoute() {
  router.push({ path: "/news-feed" });
}

function editQuote() {
  router.push({ path: "/quote/" + quoteId + "/edit" });
}

function close() {
  router.push({ path: "/movies/" + quote.value.movie_id });
}

function deleteQuote() {
  axiosInstance
    .post(BACK_URL + "/delete-quote", { quote_id: quoteId })
    .then(() => {
      router.push({ path: "/movies/" + quote.value.movie_id });
    })
    .catch((error) => {
      if (error.response.status === 403) {
        router.push({ path: "/error-403" });
      }
    });
}

function likeDislike() {
  axiosInstance
    .post(BACK_URL + "/like-dislike", {
      quote_id: quoteId,
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
  };
  if (comment.value !== "") {
    axiosInstance
      .post(BACK_URL + "/add-comment", data)
      .then((response) => {
        comment.value = "";
        quote.value.comment_number = quote.value.comment_number + 1;
        comments.value.push(response.data[0]);
        usernames.value.push(response.data[1]);
        if (response.data[2] === "/images/default.jpg") {
          usersImages.value.push(BACK_URL_IMAGE + response.data[2]);
        } else {
          usersImages.value.push(
            BACK_URL_IMAGE + "/storage/" + response.data[2]
          );
        }
        showComments.value = true;
      })
      .catch((error) => {
        if (error.response.status === 422) {
          console.log("Unprocessable Entity: " + error.response);
        }
      });
  }
}

onBeforeMount(() => {
  axiosInstance
    .post(BACK_URL + "/get-quote", { quote_id: quoteId })
    .then((response) => {
      quote.value = response.data[0];
      if (response.data[1] === "/images/default.jpg") {
        creatorImage.value = BACK_URL_IMAGE + response.data[1];
      } else {
        creatorImage.value = BACK_URL_IMAGE + "/storage/" + response.data[1];
      }
      username.value = response.data[2];
      movieUserId.value = response.data[3];
    })
    .catch(() => {
      router.push({ path: "/error-404" });
    });
  axiosInstance
    .post(BACK_URL + "/get-comments", {
      quote_id: quoteId,
    })
    .then((response) => {
      usernames.value = response.data[1];
      comments.value = response.data[0];
      if (comments.value.length !== 0) {
        showComments.value = true;
      }
      response.data[2].forEach((image, index) => {
        if (image === "/images/default.jpg") {
          image = BACK_URL_IMAGE + "/images/default.jpg";
          usersImages.value[index] = image;
        } else {
          usersImages.value[index] = BACK_URL_IMAGE + "/storage/" + image;
        }
      });
    })
    .catch(() => {
      router.push({ path: "/error-404" });
    });
  axiosInstance
    .post(BACK_URL + "/get-likes", {
      quote_id: quoteId,
    })
    .then((response) => {
      likes.value = response.data[0];
      liked.value = response.data[1];
    })
    .catch(() => {
      router.push({ path: "/error-404" });
    });
  axiosInstance.post(BACK_URL + "/get-user-info").then((response) => {
    if (response.data[0] === "/images/default.jpg") {
      userImage.value = BACK_URL_IMAGE + response.data[0];
    } else {
      userImage.value = BACK_URL_IMAGE + "/storage/" + response.data[0];
    }
  });
});
</script>
