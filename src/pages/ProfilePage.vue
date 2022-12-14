<template>
  <PageHeader></PageHeader>
  <div class="w-full h-screen pt-24 bg-[#0D0B14]">
    <div class="flex">
      <div class="w-1/5 h-[80vh] pl-16 pt-6 text-white bg-[#0D0B14]">
        <UserInfo></UserInfo>
        <div
          @click="newsRoute"
          class="flex items-center my-11 ml-3 cursor-pointer"
        >
          <img src="@/assets/home.svg" class="h-[2rem]" alt="home" />
          <a class="text-2xl ml-11 hover:text-red-500">{{ $t("news_feed") }}</a>
        </div>
        <div @click="moviesRoute" class="flex items-center ml-3 cursor-pointer">
          <img src="@/assets/movie.svg" class="h-[2rem]" alt="home" />
          <a class="text-2xl ml-11 hover:text-red-500">{{
            $t("list_of_movies")
          }}</a>
        </div>
      </div>

      <form
        @submit.prevent="addEmail"
        v-if="showForm"
        ref="form"
        class="bg-[#0b0a11] w-[37.5rem] h-[24rem] px-8 py-4 rounded-xl flex flex-col absolute top-72 z-10 left-[41.25rem]"
      >
        <h2 class="text-2xl text-white mt-4 font-medium">
          {{ $t("add_new_email") }}
        </h2>

        <div class="flex flex-col items-center w-full">
          <div
            class="border-t border-[#efefef] opacity-20 mt-6 mb-14 w-[111%]"
          ></div>
        </div>

        <div class="flex flex-col">
          <p class="text-white">{{ $t("new_email") }}</p>

          <input
            v-model="newEmail"
            class="w-[33rem] h-12 pl-3 mt-1 bg-[#CED4DA] rounded-lg text-black text-xl placeholder:text-black outline-none"
            type="text"
            :placeholder="$t('enter_new_email')"
          />
        </div>
        <div class="text-white text-xl mt-20 flex items-center justify-end">
          <p class="cursor-pointer" @click="showForm = false">
            {{ $t("cancel") }}
          </p>
          <button type="submit" class="py-2 px-3 ml-6 bg-[#E31221] rounded-md">
            {{ $t("add") }}
          </button>
        </div>
      </form>

      <div
        @mouseup="showForm = false"
        v-bind:class="{ 'blur-[3px]': showForm }"
        class="w-4/5 pt-6 pl-20 bg-[#0D0B14] text-white"
      >
        <h2 class="text-2xl font-medium">{{ $t("my_profile") }}</h2>
        <Form @submit="editUser" ref="form">
          <div
            class="mt-20 h-[52rem] w-[62.5rem] px-20 pt-28 bg-[#11101A] rounded-xl relative"
          >
            <div class="flex">
              <label
                class="w-72 m-auto text-center relative right-[1rem] bottom-4 text-xl"
                for="image"
                >{{ $t("upload_new_photo") }}
              </label>
              <input
                class="hidden"
                @change="handleChange"
                id="image"
                name="image"
                type="file"
              />
              <img
                v-if="chosenImage"
                :src="chosenImage"
                class="w-[11.5rem] h-[11.5rem] m-auto absolute left-[24.75rem] -top-[5.75rem] rounded-[50%] object-cover"
                alt="profile"
              />
              <img
                v-else
                class="w-[11.5rem] h-[11.5rem] m-auto absolute left-[24.75rem] -top-[5.75rem] rounded-[50%] object-cover"
                :src="image"
                alt="profile"
              />
            </div>
            <div class="flex items-center">
              <Field
                as="div"
                v-slot="{ meta, field }"
                v-model="username"
                name="username"
                rules="min:3|max:15|low_case|required"
                class="!inline-block"
              >
                <p>{{ $t("username") }}</p>

                <input
                  :class="{
                    'outline-[0.25rem] outline-[#198754] outline-offset-0':
                      meta.valid,
                    'outline-[0.25rem] outline-[#E31221] outline-offset-0':
                      meta.touched && !meta.valid,
                  }"
                  id="username"
                  v-bind="field"
                  class="w-[33rem] h-12 pl-3 mt-1 bg-[#CED4DA] rounded-lg text-black text-xl outline-none"
                  type="text"
                />
                <div class="relative">
                  <ErrorMessage
                    name="username"
                    class="text-red-600 text-sm absolute top-2"
                  />
                </div>
              </Field>
              <div class="ml-8 mt-6 text-xl">{{ $t("edit") }}</div>
            </div>

            <div
              class="border-t border-[#efefef] opacity-20 mt-12 mb-8 w-[33rem]"
            ></div>

            <div class="overflow-scroll scrollbar-hide h-[20vh]">
              <div class="flex flex-col mb-6" id="true">
                <p>{{ $t("email") }}</p>

                <div class="flex items-center">
                  <div class="relative">
                    <input
                      class="w-[33rem] h-12 pl-3 mt-1 bg-[#CED4DA] rounded-lg text-black text-xl outline-none"
                      v-bind:class="
                        primary === true
                          ? 'bg-[#198754] bg-opacity-20 border  border-[#198754] !text-white'
                          : ''
                      "
                      type="text"
                      :value="primaryEmail"
                    />
                    <img
                      v-if="primary === true"
                      class="absolute top-[1.30rem] right-6"
                      src="@/assets/verified.svg"
                      alt="yes"
                    />
                  </div>
                  <div class="flex items-center ml-8 text-xl">
                    <p v-if="primary === true">{{ $t("primary_email") }}</p>
                    <p v-else @click="makePrimary(true)">
                      {{ $t("make_this_primary") }}
                    </p>

                    <div
                      v-if="primary !== true"
                      class="mx-3 h-6 border-[#efefef] opacity-20 border"
                    ></div>
                    <p v-if="primary !== true" @click="deleteEmail(true)">
                      {{ $t("remove") }}
                    </p>
                  </div>
                </div>
              </div>

              <div v-if="!googleUser">
                <div
                  v-for="(email, index) in emails"
                  :key="index"
                  class="flex flex-col mb-6"
                  :id="index"
                >
                  <p>{{ $t("email") }}</p>

                  <div class="flex items-center">
                    <div class="relative">
                      <input
                        v-bind:class="[
                          primary === Number(index)
                            ? 'bg-[#198754] bg-opacity-20 border border-[#198754] !text-white '
                            : '',
                          !verifieds[index]
                            ? 'bg-[#EC9524] bg-opacity-20 border border-[#EC9524] !text-white'
                            : '',
                        ]"
                        class="w-[33rem] h-12 pl-3 mt-1 bg-[#CED4DA] rounded-lg text-black text-xl outline-none"
                        type="text"
                        :value="email"
                      />
                      <img
                        v-if="primary === Number(index)"
                        class="absolute top-[1.30rem] right-6"
                        src="@/assets/verified.svg"
                        alt="yes"
                      />
                      <img
                        v-if="!verifieds[index]"
                        class="absolute top-[1.30rem] right-6"
                        src="@/assets/notVerified.svg"
                        alt="not"
                      />
                    </div>
                    <div class="flex items-center ml-8 text-xl">
                      <p v-if="primary === Number(index)">
                        {{ $t("primary_email") }}
                      </p>
                      <p v-if="!verifieds[index]">{{ $t("not_verified") }}</p>
                      <p
                        v-if="verifieds[index] && primary !== Number(index)"
                        @click="makePrimary(Number(index))"
                      >
                        {{ $t("make_this_primary") }}
                      </p>

                      <div
                        v-if="primary !== Number(index)"
                        class="mx-3 h-6 border-[#efefef] opacity-20 border"
                      ></div>
                      <p
                        v-if="primary !== Number(index)"
                        @click="deleteEmail(index)"
                      >
                        {{ $t("remove") }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center mt-4">
              <div
                v-if="!googleUser"
                @click="showForm = true"
                class="text-white text-base border-white border px-6 h-12 rounded-lg font-normal flex items-center w-52"
              >
                <img
                  class="mr-4 w-6"
                  src="@/assets/plus.svg"
                  alt="add email"
                />{{ $t("add_new_email") }}
              </div>
              <p v-if="!googleUser" class="text-red-600 ml-4 text-xl">
                {{ errorMessage }}
              </p>
            </div>
            <div
              class="border-t border-[#efefef] opacity-20 mt-10 mb-4 w-[33rem]"
            ></div>

            <div class="flex items-center mb-6">
              <Field
                as="div"
                v-slot="{ meta, field }"
                v-model="password"
                name="password"
                rules="min:8|max:15"
                class="!inline-block"
              >
                <p>{{ $t("new_password") }}</p>

                <input
                  :class="{
                    'outline-[0.25rem] outline-[#198754] outline-offset-0':
                      meta.valid,
                    'outline-[0.25rem] outline-[#E31221] outline-offset-0':
                      meta.touched && !meta.valid,
                  }"
                  :disabled="googleUser"
                  id="password"
                  v-bind="field"
                  class="w-[33rem] h-12 pl-3 mt-1 bg-[#CED4DA] rounded-lg text-black text-xl outline-none"
                  type="password"
                  :placeholder="$t('new_password')"
                />
                <div class="relative">
                  <ErrorMessage
                    name="password"
                    class="text-red-600 text-sm absolute top-2"
                  />
                </div>
              </Field>
              <div class="ml-8 mt-6 text-xl">
                {{ $t("edit") }}
              </div>
            </div>
            <div class="flex items-center">
              <Field
                as="div"
                v-slot="{ meta, field }"
                name="confirm"
                rules="confirmed:@password"
                class="!inline-block"
                :value="null"
              >
                <p>{{ $t("confirm_password") }}</p>

                <input
                  :disabled="googleUser"
                  :class="{
                    'outline-[0.25rem] outline-[#198754] outline-offset-0':
                      meta.valid,
                    'outline-[0.25rem] outline-[#E31221] outline-offset-0':
                      meta.touched && !meta.valid,
                  }"
                  id="confirm"
                  v-bind="field"
                  class="w-[33rem] h-12 pl-3 mt-1 bg-[#CED4DA] rounded-lg text-black text-xl outline-none"
                  type="password"
                  :placeholder="$t('password')"
                />
                <div class="relative">
                  <ErrorMessage
                    name="confirm"
                    class="text-red-600 text-sm absolute top-2"
                  />
                </div>
              </Field>
              <div class="ml-8 mt-6 text-xl">{{ $t("edit") }}</div>
              <RedButton
                type="submit"
                class="text-base p-2 rounded-md mt-6 ml-32"
                >{{ $t("save_changes") }}</RedButton
              >
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import PageHeader from "@/components/layout/PageHeader.vue";
import UserInfo from "@/components/layout/UserInfo.vue";
import router from "@/router/index.js";
import axiosInstance from "@/config/axios.js";
import { ref, onBeforeMount } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import RedButton from "@/components/ui/RedButton.vue";

const BACK_URL = import.meta.env.VITE_BACK_URL;
const emails = ref([]);
const verifieds = ref([]);
const primary = ref(true);
const primaryEmail = ref("");
const newEmail = ref(null);
const showForm = ref(false);
const googleUser = ref(null);
const errorMessage = ref("");
const username = ref(null);
const password = ref(null);
const image = ref(null);
const newImage = ref(null);
const chosenImage = ref(null);
const BACK_URL_IMAGE = BACK_URL.replace("/api", "");
const form = ref(null);

function moviesRoute() {
  router.push({ path: "/movies" });
}

function newsRoute() {
  router.push({ path: "/news-feed" });
}

function handleChange(e) {
  const file = e.target.files[0];
  newImage.value = file;
  chosenImage.value = URL.createObjectURL(file);
}

function editUser() {
  const formData = new FormData();

  if (newImage.value) {
    formData.append("image", newImage.value);
  }
  if (username.value) {
    formData.append("username", username.value);
  }
  if (password.value) {
    formData.append("password", password.value);
  }

  axiosInstance
    .post(BACK_URL + "/edit-user", formData)
    .then(() => {
      router.push({ path: "/news-feed" });
    })
    .catch((error) => {
      if (error.response.data == "Username already taken") {
        return form.value.setFieldError("username", error.response.data);
      }
    });
}

function makePrimary(index) {
  const makePrimaryEmail = ref(null);

  if (index === true) {
    makePrimaryEmail.value = primaryEmail.value;
  } else {
    makePrimaryEmail.value = emails.value[index];
  }

  axiosInstance
    .post(BACK_URL + "/make-primary", {
      email: makePrimaryEmail.value,
    })
    .then(() => {
      primary.value = index;
    })
    .catch((error) => {
      console.log(error);
    });
}

function addEmail() {
  showForm.value = false;

  axiosInstance
    .post(BACK_URL + "/add-email", {
      email: newEmail.value,
    })
    .then(() => {
      emails.value.push(newEmail.value);
      console.log(emails.value);
      errorMessage.value = "";
    })
    .catch((error) => {
      errorMessage.value = error.response.data;
    });
}

function deleteEmail(index) {
  const deleteEmail = ref(null);

  if (index === true) {
    deleteEmail.value = primaryEmail.value;
  } else {
    deleteEmail.value = emails.value[index];
  }
  axiosInstance
    .post(BACK_URL + "/delete-email", {
      email: deleteEmail.value,
    })
    .then(() => {
      document.getElementById(index).remove();
    });
}

onBeforeMount(() => {
  axiosInstance.post(BACK_URL + "/get-emails").then((response) => {
    emails.value = response.data[0];
    verifieds.value = response.data[1];
    googleUser.value = response.data[2];
    primaryEmail.value = emails.value[emails.value.length - 1];
    username.value = response.data[3];
    if (response.data[4] === "/images/default.jpg") {
      image.value = BACK_URL_IMAGE + "/images/default.jpg";
    } else {
      image.value = BACK_URL_IMAGE + "/storage/" + response.data[4];
    }

    emails.value.pop();
    verifieds.value.pop();
  });
});
</script>
