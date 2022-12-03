<template>
  <Form
    ref="form"
    @submit="sendResetPasswordLink()"
    class="bg-[#222030] w-[37.5rem] h-[25rem] px-28 rounded-xl flex flex-col justify-center items-center absolute top-52 left-[41.25rem]"
  >
    <h2 class="text-white text-[2rem]">Forgot password?</h2>
    <p class="text-[#6C757D] text-base text-center mb-4">
      Enter the email and we’ll send an email with instructions to reset your
      password
    </p>
    <div class="w-[22.5rem]">
      <div class="flex flex-col">
        <label for="email" class="mb-2 text-white text-base">Email</label>
        <div class="rounded-md mb-7 flex relative">
          <Field
            v-slot="{ meta, field, errorMessage }"
            v-model="email"
            name="email"
            rules="required|email"
          >
            <input
              id="email"
              type="text"
              class="bg-[#CED4DA] rounded-md h-10 p-3 outline-none w-full focus:outline-gray-500 focus:outline-4 outline-offset-0"
              v-bind="field"
              placeholder="Enter your email"
              :class="{
                'outline-4 outline-[#198754] outline-offset-0': meta.valid,
                'outline-4 outline-[#E31221] outline-offset-0':
                  meta.touched && !meta.valid,
              }"
              @focus="closeEmailButton = true"
              @blur="closeButtonHide('closeEmailButton')"
            />
            <img
              v-if="closeEmailButton"
              @mousedown="clearInput('email')"
              class="w-4 cursor-pointer absolute top-3 right-3 z-20"
              src="@/assets/clearIcon.svg"
              alt="clear"
            />
            <img
              v-if="meta.valid && !closeEmailButton"
              class="w-4 absolute top-3 right-3"
              src="@/assets/validIcon.svg"
              alt="valid"
            />
            <img
              v-if="!meta.valid && !closeEmailButton && errorMessage"
              class="w-6 absolute top-2 right-3 z-0"
              src="@/assets/errorIcon.svg"
              alt="error"
            />
          </Field>
        </div>
        <div class="relative">
          <ErrorMessage
            name="email"
            class="text-red-600 text-sm absolute bottom-1.5"
          />
        </div>
      </div>

      <RedButton type="submit" class="w-full text-base p-2 rounded-md mt-2"
        >Send instructions</RedButton
      >
    </div>
    <div class="flex mt-8 text-[#6C757D]" @click="loginRoute()">
      <img class="mr-2" src="@/assets/arrow.svg" alt="arrow" /> Back to log in
    </div>
  </Form>
</template>

<script setup>
import { ref } from "vue";
import router from "@/router/index.js";
import axiosInstance from "@/config/axios.js";
import { Form, Field, ErrorMessage } from "vee-validate";
import RedButton from "@/components/ui/RedButton.vue";

const BACK_URL = import.meta.env.VITE_BACK_URL;
const email = ref("");
const closeEmailButton = ref(null);
const form = ref(null);

function loginRoute() {
  router.push({ path: "/login" });
}

function closeButtonHide(variable) {
  eval(variable).value = false;
}

function sendResetPasswordLink() {
  const data = {
    email: email.value.trim().toLowerCase(),
  };
  axiosInstance
    .post(BACK_URL + "/forgot/password", data)
    .then(function () {
      router.push({ path: "/reset-sent" });
    })
    .catch((error) => {
      if (error.response.status == 422) {
        if (error.response.data.errors.email) {
          form.value.setFieldError("email", "This email is not registered");
        }
      }
    });
}
</script>
