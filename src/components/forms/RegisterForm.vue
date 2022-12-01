<template>
  <Form
    ref="form"
    @submit="createUser()"
    class="bg-[#222030] w-[37.5rem] h-[43.75rem] px-28 rounded-xl flex flex-col justify-center items-center absolute top-40 left-[41.25rem]"
  >
    <h2 class="text-white text-[2rem]">Create an account</h2>
    <p class="text-[#6C757D] text-base">Start your journey!</p>
    <div class="w-[22.5rem]">
      <div class="flex flex-col">
        <label for="username" class="mb-2 text-white text-base">Username</label>
        <div class="rounded-md mb-7 flex relative">
          <Field
            v-slot="{ meta, field, errorMessage }"
            v-model="username"
            name="username"
            rules="required|min:3|max:15|low_case|"
          >
            <input
              id="username"
              type="text"
              class="bg-[#CED4DA] rounded-md h-10 p-3 outline-none w-full focus:outline-gray-500 focus:outline-4 outline-offset-0"
              v-bind="field"
              placeholder="At least 3 & max.15 lower case characters"
              :class="{
                'outline-4 outline-[#198754] outline-offset-0': meta.valid,
                'outline-4 outline-[#E31221] outline-offset-0':
                  meta.touched && !meta.valid,
              }"
              @focus="closeUsernameButton = true"
              @blur="closeButtonHide('closeUsernameButton')"
            />
            <img
              v-if="closeUsernameButton"
              @mousedown="clearInput('username')"
              class="w-4 cursor-pointer absolute top-3 right-3 z-20"
              src="@/assets/clearIcon.svg"
              alt="clear"
            />
            <img
              v-if="meta.valid && !closeUsernameButton"
              class="w-4 absolute top-3 right-3"
              src="@/assets/validIcon.svg"
              alt="valid"
            />
            <img
              v-if="!meta.valid && !closeUsernameButton && errorMessage"
              class="w-6 absolute top-2 right-3 z-0"
              src="@/assets/errorIcon.svg"
              alt="error"
            />
          </Field>
        </div>
        <div class="relative">
          <ErrorMessage
            name="username"
            class="text-red-600 text-sm absolute bottom-1.5"
          />
        </div>
      </div>

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

      <div class="flex flex-col">
        <label for="confirm" class="mb-2 text-white text-base"
          >Confirm Password
        </label>
        <div class="bg-[#CED4DA] rounded-md mb-7 flex relative">
          <Field
            v-slot="{ meta, field }"
            name="confirm"
            placeholder="Confirm password"
            rules="required|confirmed:@password"
          >
            <input
              id="confirm"
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
              @click="showHide('confirm')"
              class="w-6 cursor-pointer absolute top-2 right-3"
              src="@/assets/eyeIcon.svg"
              alt="eye"
            />
          </Field>
        </div>
        <div class="relative">
          <ErrorMessage
            name="confirm"
            class="text-red-600 text-sm absolute bottom-1.5"
          />
        </div>
      </div>
      <RedButton type="submit" class="w-full text-base p-2 rounded-md mt-2"
        >Get Started</RedButton
      >
      <a
        :href="BACK_URL + '/auth/redirect/register'"
        class="flex w-full text-base p-2 rounded-md mt-6 border-[#CED4DA] border text-white justify-center items-center"
      >
        <img class="mr-2" src="@/assets/googleIcon.svg" alt="" />Sign up with
        Google
      </a>
    </div>
    <div class="flex mt-8">
      <p class="text-[#6C757D] mr-1">Already have an account?</p>
      <a class="text-[#0D6EFD]" @click="loginRoute()">Log in</a>
    </div>
  </Form>
</template>

<script setup>
import { ref } from "vue";
import router from "@/router/index.js";
import axios from "axios";
import { Form, Field, ErrorMessage } from "vee-validate";
import "@/config/vee-validate/rules.js";
import "@/config/vee-validate/messages.js";
import RedButton from "@/components/ui/RedButton.vue";

const BACK_URL = import.meta.env.VITE_BACK_URL;
const username = ref("");
const email = ref("");
const password = ref("");
const closeUsernameButton = ref(null);
const closeEmailButton = ref(null);
const form = ref(null);

function loginRoute() {
  router.push({ path: "/login" });
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

function createUser() {
  const data = {
    username: username.value.trim(),
    email: email.value.trim().toLowerCase(),
    password: password.value,
  };
  axios
    .post(BACK_URL + "/register", data)
    .then(function () {
      router.push({ path: "/verification-send" });
    })
    .catch((error) => {
      if (error.response.status == 422) {
        let errorMessage = error.response.data.errors;
        if (errorMessage.username) {
          form.value.setFieldError("username", errorMessage.username[0]);
        }
        if (errorMessage.email) {
          form.value.setFieldError("email", errorMessage.email[0]);
        }
      }
    });
}
</script>
