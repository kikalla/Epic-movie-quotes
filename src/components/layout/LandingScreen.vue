<template>
  <div
    class="text-white font-bold text-6xl text-center w-[43rem] m-auto pt-80 h-[100vh]"
  >
    <h1 class="text-[#DDCCAA] leading-relaxed">
      {{ $t("find_any_quote_in_millions_of_movie_lines") }}
    </h1>
    <RedButton
      @click="registerRoute()"
      class="mx-6 text-xl h-12 rounded-lg w-32 mt-12 font-normal"
      >{{ $t("get_started") }}
    </RedButton>
  </div>
</template>

<script setup>
import router from "@/router/index.js";
import RedButton from "@/components/ui/RedButton.vue";

function registerRoute() {
  router.push({ path: "/register" });
}
</script>
