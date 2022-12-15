<template>
  <div class="w-full h-screen bg-[#181623] text-white">
    <div class="flex flex-col items-center justify-center pt-44">
      <img src="@/assets/gendolf.png" class="w-1/3 object-contain" />
      <h2 class="text-5xl">"You shall not pass!"</h2>
      <p class="text-2xl my-6">
        {{ $t("sorry_but_you_dont_have_permission_to_access_this_page") }}
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
