<template>
  <div
    class="w-[33.75rem] h-[25.5rem] bg-[#222030] rounded-lg absolute top-56 left-[43.125rem] flex flex-col items-center text-center px-20 py-16"
  >
    <img class="w-14" src="@/assets/paperPlane.png" alt="paper-plane" />
    <h2 class="text-white text-4xl mt-5 mb-8 font-medium">Check your email</h2>
    <p class="text-white">
      We have sent a password recover instructions to your email
    </p>
    <a
      @click="newWindow()"
      class="text-white bg-[#E31221] w-full py-2 mt-10 rounded-lg"
      href="/"
      >Go to my email</a
    >
  </div>
</template>

<script setup>
function newWindow() {
  window.open("https://www.google.com/");
}
</script>
