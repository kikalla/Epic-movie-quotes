<template>
  <div
    class="w-1/2 max-h-[58rem] h-[85%] px-8 bg-[#11101A] flex flex-col absolute top-28 left-1/4 rounded-xl text-white"
  >
    <img
      @click="close()"
      class="absolute right-8 top-9"
      src="@/assets/close.svg"
      alt="close"
    />

    <div class="flex flex-col items-center mt-8">
      <h2 class="text-2xl font-medium">{{ $t("edit_movie") }}</h2>
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
      <form @submit.prevent="updateMovie">
        <div
          class="border-[#6C757D] border rounded-lg flex justify-between items-center my-5"
        >
          <input
            v-model="titleEn"
            required
            class="bg-[#11101A] h-12 outline-none ml-2 w-11/12 placeholder:text-white placeholder:text-lg"
            type="text"
            name="title-en"
            placeholder="Movie Name"
          />
          <p class="mr-4 text-[#6C757D]">Eng</p>
        </div>

        <div
          class="border-[#6C757D] border rounded-lg flex justify-between items-center mb-5"
        >
          <input
            v-model="titleKa"
            required
            class="bg-[#11101A] h-12 outline-none ml-2 w-11/12 placeholder:text-white placeholder:text-lg"
            type="text"
            name="title-ka"
            placeholder="ფილმის სახელი"
          />
          <p class="mr-4 text-[#6C757D]">ქარ</p>
        </div>

        <div
          class="border-[#6C757D] border rounded-lg flex justify-between items-center mb-5"
        >
          <input
            v-model="directorEn"
            required
            class="bg-[#11101A] h-12 outline-none ml-2 w-11/12 placeholder:text-white placeholder:text-lg"
            type="text"
            name="director-en"
            placeholder="Director"
          />
          <p class="mr-4 text-[#6C757D]">Eng</p>
        </div>

        <div
          class="border-[#6C757D] border rounded-lg flex justify-between items-center mb-5"
        >
          <input
            v-model="directorKa"
            required
            class="bg-[#11101A] h-12 outline-none ml-2 w-11/12 placeholder:text-white placeholder:text-lg"
            type="text"
            name="director-ka"
            placeholder="რეჟისორი"
          />
          <p class="mr-4 text-[#6C757D]">ქარ</p>
        </div>

        <div
          class="border-[#6C757D] border rounded-lg flex justify-between items-start pt-2 mb-5"
        >
          <textarea
            v-model="descriptionEn"
            required
            name="description-en"
            class="bg-[#11101A] h-[5.5rem] outline-none ml-2 w-11/12 placeholder:text-white placeholder:text-lg resize-none"
            placeholder="Movie description"
          ></textarea>
          <p class="mr-4 text-[#6C757D]">Eng</p>
        </div>

        <div
          class="border-[#6C757D] border rounded-lg flex justify-between items-start pt-2 mb-5"
        >
          <textarea
            v-model="descriptionKa"
            required
            name="description-ka"
            class="bg-[#11101A] h-[5.5rem] outline-none ml-2 w-11/12 placeholder:text-white placeholder:text-lg resize-none"
            placeholder="ფილმის აღწერა"
          ></textarea>
          <p class="mr-4 text-[#6C757D]">ქარ</p>
        </div>

        <div
          class="border-[#6C757D] border rounded-lg flex items-center h-[5.5rem] mb-5"
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
            class="w-[1px] h-[1px] relative right-1 z-0"
            id="image"
            name="image"
            type="file"
          />
        </div>
        <RedButton class="py-2 mb-4 rounded-md text-xl w-full">
          {{ $t("edit_movie") }}
        </RedButton>
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

const titleEn = ref("");
const titleKa = ref("");
const directorEn = ref("");
const directorKa = ref("");
const descriptionEn = ref("");
const descriptionKa = ref("");
const image = ref(null);
const userImage = ref(null);
const username = ref(null);
const BACK_URL = import.meta.env.VITE_BACK_URL;
const BACK_URL_IMAGE = BACK_URL.replace("/api", "");
const movieId = useRouter().currentRoute.value.params.movieId;

function close() {
  router.push({ path: "/movies/" + movieId });
}

function handleChange(e) {
  const file = e.target.files[0];
  image.value = file;
}

function updateMovie() {
  const formData = new FormData();
  formData.append("title_en", titleEn.value);
  formData.append("title_ka", titleKa.value);
  formData.append("director_en", directorEn.value);
  formData.append("director_ka", directorKa.value);
  formData.append("description_en", descriptionEn.value);
  formData.append("description_ka", descriptionKa.value);
  formData.append("image", image.value);
  formData.append("movie_id", movieId);

  axiosInstance
    .post(BACK_URL + "/edit-movie", formData)
    .then(() => {
      router.push({ path: "/movies/" + movieId });
    })
    .catch((error) => {
      if (error.response.status === 403) {
        router.push({ path: "/error-403" });
      }
    });
}

onBeforeMount(() => {
  axiosInstance
    .post(BACK_URL + "/get-movie", { movie_id: movieId })
    .then((response) => {
      const movie = response.data[0];
      titleEn.value = movie.title.en;
      titleKa.value = movie.title.ka;
      directorEn.value = movie.director.en;
      directorKa.value = movie.director.ka;
      descriptionEn.value = movie.description.en;
      descriptionKa.value = movie.description.ka;
      if (response.data[1] === "/images/default.jpg") {
        userImage.value = BACK_URL_IMAGE + response.data[1];
      } else {
        userImage.value = BACK_URL_IMAGE + "/storage/" + response.data[1];
      }
      username.value = response.data[2];
    })
    .catch(() => {
      router.push({ path: "/error-404" });
    });
});
</script>
