<template>
  <Form
    ref="form"
    @submit="resetPassword()"
    class="bg-[#222030] w-[37.5rem] h-[31rem] px-28 rounded-xl flex flex-col justify-center items-center absolute top-40 left-[41.25rem]"
  >
    <h2 class="text-white text-[2rem]">Create new password</h2>
    <p class="text-[#6C757D] text-base text-center mb-4">
      Your new password must be different from previous used passwords
    </p>
    <div class="w-[22.5rem]">
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
        <div class="bg-[#CED4DA] rounded-md mb-10 flex relative">
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
            class="text-red-600 text-sm absolute bottom-4"
          />
        </div>
        <div v-if="invalid" class="relative w-28 m-auto">
          <p name="password" class="text-red-600 text-sm absolute bottom-0">
            Invalid token
          </p>
        </div>
      </div>

      <RedButton type="submit" class="w-full text-base p-2 rounded-md mt-2"
        >Reset password</RedButton
      >
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
import { useRouter } from "vue-router";

const BACK_URL = import.meta.env.VITE_BACK_URL;
const password = ref("");
const form = ref(null);
const invalid = ref(false);
const routerUse = useRouter();

function showHide(id) {
  let eye = document.getElementById(id);
  if (eye.type === "password") {
    eye.type = "text";
  } else {
    eye.type = "password";
  }
}

function resetPassword() {
  const data = {
    email: routerUse.currentRoute.value.query.email,
    password: password.value,
    token: routerUse.currentRoute.value.query.token,
  };
  axiosInstance
    .post(BACK_URL + "/reset/password", data)
    .then(function () {
      router.push({ path: "/reset-success" });
    })
    .catch((error) => {
      if (error.response.data === "Invalid token") {
        invalid.value = true;
      }
    });
}
</script>
