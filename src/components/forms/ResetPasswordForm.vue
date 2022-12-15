<template>
  <Form
    ref="form"
    @submit="resetPassword()"
    class="bg-[#222030] w-[37.5rem] h-[31rem] px-28 rounded-xl flex flex-col justify-center items-center absolute top-40 left-[35%]"
  >
    <h2 class="text-white text-center text-[2rem]">
      {{ $t("create_new_password") }}
    </h2>
    <p class="text-[#6C757D] text-base text-center mb-4">
      {{
        $t("your_new_password_must_be_different_from_previous_used_passwords")
      }}
    </p>
    <div class="w-[22.5rem]">
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
      <div class="flex flex-col">
        <label for="confirm" class="mb-2 text-white text-base"
          >{{ $t("confirm_password") }}
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
              class="bg-[#CED4DA] rounded-md h-10 p-3 outline-none w-full focus:outline-gray-500 focus:outline-[0.25rem] outline-offset-0"
              v-bind="field"
              :placeholder="$t('confirm_password')"
              :class="{
                'outline-[0.25rem] outline-[#198754] outline-offset-0':
                  meta.valid,
                'outline-[0.25rem] outline-[#E31221] outline-offset-0':
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
          <p name="password" class="text-red-600 text-sm absolute bottom-0.5">
            {{ $t("invalid_token") }}
          </p>
        </div>
      </div>

      <RedButton type="submit" class="w-full text-base p-2 rounded-md mt-2">{{
        $t("reset_password")
      }}</RedButton>
    </div>
  </Form>
</template>

<script setup>
import { ref } from "vue";
import router from "@/router/index.js";
import axiosInstance from "@/config/axios.js";
import { Form, Field, ErrorMessage } from "vee-validate";
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
