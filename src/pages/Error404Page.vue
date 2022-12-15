<template>
  <div class="w-full h-screen bg-[#181623] text-white">
    <div class="flex flex-col items-center justify-center pt-72">
      <img src="@/assets/ghost.png" class="w-1/12 object-contain" />
      <h2 class="text-5xl mt-4">Whoops!</h2>
      <p class="text-2xl my-6">
        {{ $t("we_can_see_the_page_you_are_looking_for") }}
      </p>
      <RedButton
        @click="$router.go(-1)"
        class="p-4 mt-4 rounded-xl text-2xl text-center"
      >
        {{ $t("return_back") }}
      </RedButton>
    </div>
  </div>
</template>

<script setup>
import RedButton from "@/components/ui/RedButton.vue";
</script>
