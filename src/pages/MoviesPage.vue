<template>
  <PageHeader></PageHeader>
  <div class="w-full h-screen pt-24 bg-[#0D0B14]">
    <div class="flex">
      <div class="w-1/5 h-[80vh] pl-16 pt-6 text-white bg-[#0D0B14]">
        <div class="flex items-center">
          <img class="w-[3.75rem]" src="@/assets/default.png" alt="profile" />
          <div class="ml-6">
            <h2 class="text-2xl">Nino Tabagari</h2>
            <a href="" class="text-[#CED4DA]">Edit your profile</a>
          </div>
        </div>
        <div class="flex items-center my-11 ml-3">
          <img src="@/assets/home.svg" alt="home" />
          <a href="" class="text-2xl ml-11">News feed</a>
        </div>
        <div class="flex items-center ml-3">
          <img src="@/assets/activeMovie.svg" alt="home" />
          <a href="" class="text-2xl ml-11">List of movies</a>
        </div>
      </div>

      <div class="w-4/5 pt-8 px-20 bg-[#0D0B14] text-white">
        <div class="flex justify-between items-center mb-16">
          <h2 class="text-2xl font-medium">My list of movies (Total 25)</h2>
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
          <div>
            <img
              class="rounded-xl h-4/5 object-cover"
              src="@/assets/moviePhoto.png"
              alt="movie"
            />
            <h2 class="text-2xl mt-4">Loki Mobius (2021)</h2>
            <div class="flex items-center mt-4">
              <p class="mr-3">10</p>
              <img src="@/assets/quote.svg" alt="quote" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PageHeader from "@/components/layout/PageHeader.vue";
import RedButton from "@/components/ui/RedButton.vue";
import router from "@/router/index.js";

function addMovieRoute() {
  router.push({ path: "/movies/add-movie" });
}
</script>
