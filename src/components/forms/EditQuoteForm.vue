<template>
  <div v-if="quote" class="w-4/5 pt-4 px-20 bg-[#0D0B14] text-white">
    <div
      class="w-[44rem] max-h-[54rem] h-[85vh] m-auto px-8 right-[6.5rem] bg-[#11101A] flex flex-col relative rounded-xl text-white"
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
        <a @click="deleteQuote" class="cursor-pointer"
          ><img src="@/assets/delete.svg" alt="delete"
        /></a>
      </div>
      <div class="flex flex-col items-center mt-4">
        <h2 class="text-2xl font-medium">{{ $t("view_quote") }}</h2>
        <div class="border-t border-[#efefef] opacity-20 my-6 w-[108%]"></div>
      </div>
      <div class="scrollbar-hide overflow-scroll">
        <div class="flex items-center">
          <img
            class="w-[3.75rem] h-[3.75rem] rounded-[50%] object-cover"
            :src="userImage"
            alt="profile"
          />
          <p class="text-xl ml-4">{{ username }}</p>
        </div>
        <form @submit.prevent="updateQuote">
          <div
            class="border-[#6C757D] border rounded-lg flex justify-between items-start pt-2 my-5"
          >
            <textarea
              v-model="quoteEn"
              required
              name="quote-en"
              class="bg-[#11101A] h-[4.5rem] outline-none ml-2 w-11/12 placeholder:text-white placeholder:text-lg resize-none"
              placeholder="Start create new quote
"
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
              class="bg-[#11101A] h-[4.5rem] outline-none ml-2 w-11/12 placeholder:text-white placeholder:text-lg resize-none"
              placeholder="??????????????? ??????????????????"
            ></textarea>
            <p class="mr-4 text-[#6C757D]">?????????</p>
          </div>

          <div class="rounded-xl my-4 w-full h-[24rem] relative">
            <label
              class="bg-[#11101A] p-4 rounded-lg opacity-80 absolute top-[35%] left-[40%] z-10 flex flex-col justify-center items-center"
              for="image"
              ><img class="w-1/4" src="@/assets/camera.svg" alt="" />{{
                $t("change_photo")
              }}
            </label>
            <input
              @change="handleChange"
              class="absolute w-[1px] h-[1px] right-1 z-0"
              id="image"
              name="image"
              type="file"
            />
            <div>
              <img
                v-if="chosenImage"
                class="w-full h-[24rem] object-contain"
                :src="chosenImage"
                alt=""
              />
              <img
                v-else
                class="w-full h-[24rem] object-contain"
                :src="BACK_URL_IMAGE + '/storage/' + quote.image"
                alt=""
              />
            </div>
          </div>

          <RedButton class="py-2 rounded-md text-xl w-full mb-4">
            {{ $t("edit_quote") }}
          </RedButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router/index.js";
import axiosInstance from "@/config/axios.js";
import RedButton from "@/components/ui/RedButton.vue";
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

const quoteId = useRouter().currentRoute.value.params.quoteId;
const BACK_URL = import.meta.env.VITE_BACK_URL;
const BACK_URL_IMAGE = BACK_URL.replace("/api", "");
const quote = ref(null);
const quoteEn = ref("");
const quoteKa = ref("");
const image = ref(null);
const chosenImage = ref(null);
const userImage = ref(null);
const username = ref(null);

function close() {
  router.push({ path: "/quote/" + quoteId });
}

function handleChange(e) {
  const file = e.target.files[0];
  image.value = file;
  chosenImage.value = URL.createObjectURL(file);
}

function deleteQuote() {
  axiosInstance
    .post(BACK_URL + "/delete-quote", { quote_id: quoteId })
    .then(() => {
      router.push({ path: "/movies/" + quote.value.movie_id });
    })
    .catch((error) => {
      if (error.response.status === 403) router.push({ path: "/error-403" });
    });
}

function updateQuote() {
  const formData = new FormData();
  formData.append("quote_id", quoteId);
  formData.append("quote_en", quoteEn.value);
  formData.append("quote_ka", quoteKa.value);
  formData.append("image", image.value);

  axiosInstance
    .post(BACK_URL + "/edit-quote", formData)
    .then(() => {
      router.push({ path: "/quote/" + quoteId });
    })
    .catch((error) => {
      if (error.response.status === 403) router.push({ path: "/error-403" });
    });
}

onBeforeMount(() => {
  axiosInstance
    .post(BACK_URL + "/get-quote", { quote_id: quoteId })
    .then((response) => {
      quote.value = response.data[0];
      quoteEn.value = quote.value.quote.en;
      quoteKa.value = quote.value.quote.ka;
      username.value = response.data[2];
      if (response.data[1] === "/images/default.jpg") {
        userImage.value = BACK_URL_IMAGE + response.data[1];
      } else {
        userImage.value = BACK_URL_IMAGE + "/storage/" + response.data[1];
      }
    })
    .catch(() => {
      router.push({ path: "/error-404" });
    });
});
</script>
