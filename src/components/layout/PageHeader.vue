<template>
  <div
    class="bg-black w-full h-24 flex px-[4.5rem] items-center justify-between fixed top-0 z-50"
  >
    <h2 class="text-white text-base font-medium">MOVIE QUOTES</h2>
    <div>
      <select name="lang" id="lang" class="h-7 text-white bg-black">
        <option value="en">Eng</option>
        <option value="ka">Geo</option>
      </select>
      <RedButton class="h-9 w-28 mx-6 rounded-lg" @click="registerRoute()"
        >Sign Up
      </RedButton>
      <button
        @click="loginRoute()"
        class="text-white text-base border-white border h-9 rounded-lg w-28 font-normal"
      >
        Log In
      </button>
    </div>
  </div>
</template>

<script setup>
import router from "@/router/index.js";
import RedButton from "@/components/ui/RedButton.vue";

function registerRoute() {
  router.push({ path: "/register" });
}

function loginRoute() {
  router.push({ path: "/login" });
}
</script>
