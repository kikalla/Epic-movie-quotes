<template>
  <Form
    ref="form"
    @submit="loginUser()"
    class="bg-[#222030] w-[37.5rem] h-[35rem] px-28 rounded-xl flex flex-col justify-center items-center absolute top-40 left-[34%]"
  >
    <h2 class="text-white text-[2rem]">{{ $t("create_an_account") }}</h2>
    <p class="text-[#6C757D] text-base my-4">{{ $t("start_your_journey") }}!</p>
    <div class="w-[22.5rem]">
      <div class="flex flex-col">
        <label for="email" class="mb-2 text-white text-base">{{
          $t("email")
        }}</label>
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
              class="bg-[#CED4DA] rounded-md h-10 p-3 outline-none w-full focus:outline-gray-500 focus:outline-[0.25rem] outline-offset-0"
              v-bind="field"
              :placeholder="$t('enter_your_email')"
              :class="{
                'outline-[0.25rem] outline-[#198754] outline-offset-0':
                  meta.valid,
                'outline-[0.25rem] outline-[#E31221] outline-offset-0':
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
            class="text-red-600 text-sm absolute bottom-0.5"
          />
        </div>
      </div>

      <div class="flex flex-col">
        <label for="password" class="mb-2 text-white text-base">{{
          $t("password")
        }}</label>
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
              class="bg-[#CED4DA] rounded-md h-10 p-3 outline-none w-full focus:outline-gray-500 focus:outline-[0.25rem] outline-offset-0"
              v-bind="field"
              :placeholder="$t('at_least_8_max_15_lower_case_characters')"
              :class="{
                'outline-[0.25rem] outline-[#198754] outline-offset-0':
                  meta.valid,
                'outline-[0.25rem] outline-[#E31221] outline-offset-0':
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
            class="text-red-600 text-sm absolute bottom-0.5"
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
          <label class="text-white ml-2" for="remember">{{
            $t("remember_me")
          }}</label>
        </div>
        <a class="text-[#0D6EFD] cursor-pointer" @click="resetRoute()">{{
          $t("forgot_password")
        }}</a>
      </div>

      <RedButton type="submit" class="w-full text-base p-2 rounded-md mt-2">{{
        $t("sign_in")
      }}</RedButton>
      <a
        :href="BACK_URL + '/auth/redirect/login'"
        class="flex w-full text-base p-2 rounded-md mt-6 border-[#CED4DA] border text-white justify-center items-center"
      >
        <img class="mr-2 w-4" src="@/assets/googleIcon.svg" alt="" />{{
          $t("sign_in_with_google")
        }}
      </a>
    </div>
    <div class="flex mt-8">
      <p class="text-[#6C757D] mr-1">{{ $t("already_have_an_account") }}?</p>
      <a class="text-[#0D6EFD] cursor-pointer" @click="signUp()">{{
        $t("sign_up")
      }}</a>
    </div>
  </Form>
</template>

<script setup>
import { ref } from "vue";
import router from "@/router/index.js";
import axios from "axios";
import { Form, Field, ErrorMessage } from "vee-validate";
import RedButton from "@/components/ui/RedButton.vue";
import { useAuthStore } from "@/store.js";
import i18n from "@/i18n";

const BACK_URL = import.meta.env.VITE_BACK_URL;
const email = ref("");
const password = ref("");
const remember = ref(false);
const closeEmailButton = ref(null);
const form = ref(null);
const locale = ref(i18n.global.locale);

function resetRoute() {
  router.push({ path: "/forgot/password" });
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
  axios
    .post(BACK_URL + "/login", data)
    .then(function () {
      useAuthStore().authenticated = true;
      router.push({ path: "/news-feed" });
    })
    .catch((error) => {
      if (error.response.status == 422) {
        if (error.response.data == "Wrong password") {
          if (locale.value === "en") {
            return form.value.setFieldError("password", error.response.data);
          } else {
            return form.value.setFieldError("password", "პაროლი არასწორია");
          }
        }
        if (error.response.data.errors.email) {
          if (locale.value === "en") {
            form.value.setFieldError("email", error.response.data.errors.email);
          } else {
            form.value.setFieldError("email", "იმეილი არარის რეგისტრირებული");
          }
          if (locale.value === "en") {
            return form.value.setFieldError("password", "Wrong password");
          } else {
            return form.value.setFieldError("password", "პაროლი არასწორია");
          }
        }
      }
    });
}
</script>
