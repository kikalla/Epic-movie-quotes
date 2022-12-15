<template>
  <div
    class="w-[33.75rem] h-[25.5rem] bg-[#222030] rounded-lg absolute top-56 left-[43.125rem] flex flex-col items-center text-center px-20 py-16"
  >
    <img class="w-14" src="@/assets/paperPlane.png" alt="paper-plane" />
    <h2 class="text-white text-4xl mt-5 mb-8 font-medium">
      {{ $t("thank_you") }}!
    </h2>
    <p class="text-white">
      {{
        $t(
          "please_check_your_email_and_follow_the_instructions_to_activate_your_account"
        )
      }}
    </p>
    <a
      @click="newWindow()"
      class="text-white bg-[#E31221] w-full py-2 mt-10 rounded-lg"
      href=""
      >{{ $t("go_to_my_email") }}</a
    >
  </div>
</template>

<script setup>
function newWindow() {
  window.open("https://www.google.com/");
}
</script>
