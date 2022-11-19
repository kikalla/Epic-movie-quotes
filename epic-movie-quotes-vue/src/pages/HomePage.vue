<template>
  <div class="w-full h-full bg-black">
    <PageHeader></PageHeader>
    <div
      class="text-white font-bold text-6xl text-center w-[43rem] m-auto pt-80 pb-[34.5rem]"
    >
      <h1 class="text-[#DDCCAA]">Find any quote in millions of movie lines</h1>
      <button
        class="text-white text-xl h-12 bg-[#E31221] rounded-lg w-32 font-normal hover:bg-[#CC0E10] mt-12"
      >
        Get Started
      </button>
    </div>
    <div
      class="relative h-screen bg-cover bg-fixed bg-[url(/src/assets/landing1.png)]"
    >
      <h2
        class="absolute top-[25rem] left-60 font-bold text-[3.125rem] text-white w-[47.5rem]"
      >
        “You have to leave somethig behind to go forward”
      </h2>
      <p
        class="absolute top-[36rem] left-60 font-bold text-3xl text-white w-[47.5rem]"
      >
        Interstellar, 2014
      </p>
    </div>
    <div
      class="relative h-screen bg-cover bg-fixed bg-[url(/src/assets/landing2.png)]"
    >
      <h2
        class="absolute top-[25rem] left-60 font-bold text-[3.125rem] text-white w-[47.5rem]"
      >
        “I think we’re just gonna have to be secretly in love with earch other
        and leave it that”
      </h2>
      <p
        class="absolute top-[39.5rem] left-60 font-bold text-3xl text-white w-[47.5rem]"
      >
        The Royal Tenenbaums, 2001
      </p>
    </div>
    <div
      class="relative h-screen bg-cover bg-fixed bg-[url(/src/assets/landing3.png)]"
    >
      <h2
        class="absolute top-[25rem] left-60 font-bold text-[3.125rem] text-white w-[47.5rem]"
      >
        ““I see in your eyes the same fear that would take the heart of me....””
      </h2>
      <p
        class="absolute top-[39.5rem] left-60 font-bold text-3xl text-white w-[47.5rem]"
      >
        The Lord of the Rings, 2003
      </p>
    </div>
  </div>
</template>

<script setup>
import PageHeader from "@/components/layout/PageHeader.vue";
</script>
