<template>
  <div
    class="w-[56rem] max-h-[54rem] h-[75vh] px-8 bg-[#11101A] flex flex-col absolute top-28 left-[33rem] rounded-xl text-white"
  >
    <img
      @click="close()"
      class="absolute right-8 top-9 cursor-pointer"
      src="@/assets/close.svg"
      alt="close"
    />

    <div class="flex flex-col items-center mt-8">
      <h2 class="text-2xl font-medium">{{ $t("write_new_quote") }}</h2>
      <div class="border-t border-[#efefef] opacity-20 my-6 w-[108%]"></div>
    </div>
    <div class="scrollbar-hide overflow-scroll">
      <div class="flex items-center my-2">
        <img
          class="w-[3.75rem] h-[3.75rem] rounded-[50%] object-cover"
          :src="userImage"
          alt="profile"
        />
        <p class="text-xl ml-4">{{ username }}</p>
      </div>
      <div v-if="movie" class="flex mt-5">
        <img
          class="w-1/3 h-40 rounded-xl object-cover"
          :src="BACK_URL_IMAGE + '/storage/' + movie.image"
          alt=""
        />
        <div class="ml-5 w-2/3">
          <div class="flex justify-between">
            <h2 class="text-2xl font-medium text-[#DDCCAA]">
              {{ movie.title[$i18n.locale] }}
            </h2>
          </div>
          <div class="my-5">
            {{ $t("director") }}:
            <span class="ml-2">{{ movie.director[$i18n.locale] }}</span>
          </div>
        </div>
      </div>

      <form @submit.prevent="addQuote">
        <div
          class="border-[#6C757D] border rounded-lg flex justify-between items-start pt-2 my-5"
        >
          <textarea
            v-model="quoteEn"
            required
            name="quote-en"
            class="bg-[#11101A] h-[5.5rem] outline-none ml-2 w-11/12 placeholder:text-white placeholder:text-lg resize-none"
            placeholder="Start create new quote"
          ></textarea>
          <p class="mr-4 text-[#6C757D]">Eng</p>
        </div>

        <div
          class="border-[#6C757D] border rounded-lg flex justify-between items-start pt-2 mb-5"
        >
          <textarea
            v-model="quoteKa"
            required
            name="quote-ka"
            class="bg-[#11101A] h-[5.5rem] outline-none ml-2 w-11/12 placeholder:text-white placeholder:text-lg resize-none"
            placeholder="??????????????? ??????????????????"
          ></textarea>
          <p class="mr-4 text-[#6C757D]">?????????</p>
        </div>

        <div
          class="border-[#6C757D] border rounded-lg flex items-center h-[5.5rem] mb-16"
        >
          <img class="mx-4 w-[2rem]" src="@/assets/camera.svg" alt="camera" />
          <p class="text-xl">{{ $t("drag_drop_your_image_here_or") }}</p>
          <label
            class="bg-[#9747FF66] cursor-pointer text-xl p-2 ml-2 z-10"
            for="image"
            >{{ $t("choose_file") }}
          </label>

          <input
            @change="handleChange"
            required
            class="w-[1px] h-[1px] relative right-1 z-0"
            id="image"
            name="image"
            type="file"
          />
        </div>
        <RedButton class="py-2 rounded-md text-xl w-full">{{
          $t("add_quote")
        }}</RedButton>
      </form>
    </div>
  </div>
</template>

<script setup>
import RedButton from "@/components/ui/RedButton.vue";
import router from "@/router/index.js";
import axiosInstance from "@/config/axios.js";
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

const quoteEn = ref("");
const quoteKa = ref("");
const movieId = useRouter().currentRoute.value.params.movieId;
const image = ref(null);
const userImage = ref(null);
const username = ref(null);
const BACK_URL = import.meta.env.VITE_BACK_URL;
const BACK_URL_IMAGE = BACK_URL.replace("/api", "");

defineProps({ movie: { type: Object } });

function close() {
  router.push({ path: "/movies/" + movieId });
}

function handleChange(e) {
  const file = e.target.files[0];
  image.value = file;
}

function addQuote() {
  const formData = new FormData();
  formData.append("quote_en", quoteEn.value);
  formData.append("quote_ka", quoteKa.value);
  formData.append("movie_id", movieId);
  formData.append("image", image.value);

  axiosInstance
    .post(BACK_URL + "/add-quote", formData)
    .then(() => {
      router.push({ path: "/movies/" + movieId });
    })
    .catch((error) => {
      if (error.response.status === 422) {
        console.log("Unprocessable Entity: " + error.response);
      }
    });
}

onBeforeMount(() => {
  axiosInstance
    .post(BACK_URL + "/get-user-info")
    .then((response) => {
      if (response.data[0] === "/images/default.jpg") {
        userImage.value = BACK_URL_IMAGE + response.data[0];
      } else {
        userImage.value = BACK_URL_IMAGE + "/storage/" + response.data[0];
      }
      username.value = response.data[1];
    })
    .catch((error) => {
      if (error.response.status === 401) {
        router.push({ path: "/error-401" });
      }
    });
});
</script>
