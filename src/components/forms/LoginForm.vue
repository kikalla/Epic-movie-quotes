<template>
  <Form
    ref="form"
    @submit="loginUser()"
    class="bg-[#222030] w-[37.5rem] h-[35rem] px-28 rounded-xl flex flex-col justify-center items-center absolute top-40 left-[41.25rem]"
  >
    <h2 class="text-white text-[2rem]">Create an account</h2>
    <p class="text-[#6C757D] text-base">Start your journey!</p>
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

      <div class="flex flex-col">
        <label for="password" class="mb-2 text-white text-base">Password</label>
        <div class="bg-[#CED4DA] rounded-md mb-7 flex relative">
          <Field
            v-slot="{ meta, field }"
            v-model="password"
            name="password"
            rules="required|min:8|max:15"
          >
            <input
              id="password"
              type="password"
              class="bg-[#CED4DA] rounded-md h-10 p-3 outline-none w-full focus:outline-gray-500 focus:outline-4 outline-offset-0"
              v-bind="field"
              placeholder="At least 8 & max.15 lower case characters"
              :class="{
                'outline-4 outline-[#198754] outline-offset-0': meta.valid,
                'outline-4 outline-[#E31221] outline-offset-0':
                  meta.touched && !meta.valid,
              }"
            />
            <img
              @click="showHide('password')"
              class="w-6 cursor-pointer absolute top-2 right-3"
              src="@/assets/eyeIcon.svg"
              alt="eye"
            />
          </Field>
        </div>
        <div class="relative">
          <ErrorMessage
            name="password"
            class="text-red-600 text-sm absolute bottom-1.5"
          />
        </div>
      </div>
      <div class="flex justify-between mb-2">
        <div>
          <input
            v-model="remember"
            class="w-4 h-4 align-middle"
            name="remember"
            id="remember"
            type="checkbox"
          />
          <label class="text-white ml-2" for="remember">Remember me</label>
        </div>
        <a class="text-[#0D6EFD]" @click="resetRoute()">Forgot password</a>
      </div>

      <RedButton type="submit" class="w-full text-base p-2 rounded-md mt-2"
        >Sign In</RedButton
      >
      <a
        :href="BACK_URL + '/auth/redirect/login'"
        class="flex w-full text-base p-2 rounded-md mt-6 border-[#CED4DA] border text-white justify-center items-center"
      >
        <img class="mr-2" src="@/assets/googleIcon.svg" alt="" />Sign in with
        Google
      </a>
    </div>
    <div class="flex mt-8">
      <p class="text-[#6C757D] mr-1">Already have an account?</p>
      <a class="text-[#0D6EFD]" @click="signUp()">Sign Up</a>
    </div>
  </Form>
</template>

<script setup>
import { ref } from "vue";
import router from "@/router/index.js";
import axiosInstance from "@/config/axios.js";
import { Form, Field, ErrorMessage } from "vee-validate";
import "@/config/vee-validate/rules.js";
import "@/config/vee-validate/messages.js";
import RedButton from "@/components/ui/RedButton.vue";
import { useAuthStore } from "@/store.js";

const BACK_URL = import.meta.env.VITE_BACK_URL;
const email = ref("");
const password = ref("");
const remember = ref(false);
const closeEmailButton = ref(null);
const form = ref(null);

function resetRoute() {
  router.push({ path: "/reset-password" });
}

function signUp() {
  router.push({ path: "/register" });
}

function clearInput(variable) {
  eval(variable).value = "";
}

function closeButtonHide(variable) {
  eval(variable).value = false;
}

function showHide(id) {
  let eye = document.getElementById(id);
  if (eye.type === "password") {
    eye.type = "text";
  } else {
    eye.type = "password";
  }
}

function loginUser() {
  const data = {
    email: email.value.trim().toLowerCase(),
    password: password.value,
    remember: remember.value,
  };
  axiosInstance
    .post(BACK_URL + "/login", data)
    .then(function () {
      useAuthStore().authenticated = true;
      router.push({ path: "/news-feed" });
    })
    .catch((error) => {
      if (error.response.status == 422) {
        if (error.response.data == "Wrong password") {
          return form.value.setFieldError("password", error.response.data);
        }
        if (error.response.data.errors.email) {
          form.value.setFieldError("email", "This email is not registered");
          return form.value.setFieldError("password", "Wrong password");
        }
      }
    });
}
</script>
