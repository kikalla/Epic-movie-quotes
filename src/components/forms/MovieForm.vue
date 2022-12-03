<template>
  <div
    class="w-[56rem] h-[58rem] px-8 bg-[#11101A] flex flex-col absolute top-28 left-[33rem] rounded-xl text-white"
  >
    <img
      @click="close()"
      class="absolute right-8 top-9"
      src="@/assets/close.svg"
      alt="close"
    />

    <div class="flex flex-col items-center mt-8">
      <h2 class="text-2xl font-medium">Add Movie</h2>
      <div class="border-t border-[#efefef] opacity-20 my-6 w-[108%]"></div>
    </div>
    <div class="flex items-center my-2">
      <img src="@/assets/default.png" alt="profile" />
      <p class="text-xl ml-4">Nino Tabagari</p>
    </div>
    <form @submit.prevent="addMovie()" action="">
      <div
        class="border-[#6C757D] border rounded-lg flex justify-between items-center my-5"
      >
        <input
          required
          class="bg-[#11101A] h-12 outline-none ml-2 w-11/12 placeholder:text-white placeholder:text-lg"
          type="text"
          name="name-en"
          placeholder="Movie Name"
        />
        <p class="mr-4 text-[#6C757D]">Eng</p>
      </div>

      <div
        class="border-[#6C757D] border rounded-lg flex justify-between items-center mb-5"
      >
        <input
          required
          class="bg-[#11101A] h-12 outline-none ml-2 w-11/12 placeholder:text-white placeholder:text-lg"
          type="text"
          name="name-ka"
          placeholder="ფილმის სახელი"
        />
        <p class="mr-4 text-[#6C757D]">ქარ</p>
      </div>

      <div
        class="border-[#6C757D] border rounded-lg flex justify-between items-center mb-5"
      >
        <input
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
        <img class="mx-4" src="@/assets/camera.svg" alt="camera" />
        <p class="text-xl">Drag & drop your image here or</p>
        <label
          class="bg-[#9747FF66] cursor-pointer text-xl p-2 ml-2 z-10"
          for="image"
          >Choose file
        </label>
        <input
          required
          class="w-[1px] h-[1px] relative right-1 z-0"
          id="image"
          name="image"
          type="file"
        />
      </div>
      <RedButton class="py-2 rounded-md text-xl w-full"> Add movie </RedButton>
    </form>
  </div>
</template>

<script setup>
import RedButton from "@/components/ui/RedButton.vue";
import router from "@/router/index.js";

function addMovie() {
  console.log("a");
}
function close() {
  router.push({ path: "/movies" });
}
</script>
