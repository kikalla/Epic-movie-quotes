<template>
  <div
    @click="showNotifications = !showNotifications"
    class="relative cursor-pointer"
  >
    <img
      v-if="authStore.authenticated"
      class="w-6"
      src="@/assets/bell.svg"
      alt="bell"
    />
    <p
      v-if="authStore.notificationsCount !== 0"
      class="absolute w-6 h-6 rounded-full bg-red-600 text-white -top-1 -right-3 text-center"
    >
      {{ authStore.notificationsCount }}
    </p>
  </div>
  <div
    v-if="showNotifications"
    class="w-[40rem] h-[35rem] absolute right-[-10rem] top-10 bg-black rounded-lg p-8 text-white"
  >
    <div class="flex justify-between items-center">
      <h1 class="text-2xl">Notifications</h1>
      <div class="flex flex-col items-center">
        <p
          @click="readAllNotifications"
          class="mb-2 cursor-pointer hover:text-red-500"
        >
          Read All
        </p>
        <p
          @click="deleteAllNotifications"
          class="cursor-pointer hover:text-red-500"
        >
          Delete All
        </p>
      </div>
    </div>
    <h2 v-if="notifications === null" class="text-2xl mt-10">
      No notifications
    </h2>
    <div class="overflow-scroll scrollbar-hide h-[90%]">
      <div
        v-for="notification in notifications"
        :key="notification"
        class="w-full border border-[#efefef] border-opacity-20 p-4 flex justify-between my-4"
        @click="readNotification(notification.quote_id, notification.id)"
      >
        <div class="flex items-center cursor-pointer">
          <img
            class="w-[3.75rem] h-[3.75rem] rounded-[50%] object-cover"
            :src="
              notification.from.image === '/images/default.jpg'
                ? BACK_URL_IMAGE + notification.from.image
                : BACK_URL_IMAGE + '/storage/' + notification.from.image
            "
            alt="profile"
          />
          <div class="ml-6">
            <h2 class="text-2xl">{{ notification.from.username }}</h2>
            <div
              v-if="notification.type === 'comment'"
              class="flex items-center mt-2"
            >
              <img class="w-6 h-6 mr-3" src="@/assets/quote.svg" alt="" />
              <a class="text-[#CED4DA]">Commented to Your Quote</a>
            </div>
            <div v-else class="flex items-center mt-2">
              <img class="w-6 h-6 mr-3" src="@/assets/activeLike.svg" alt="" />
              <a class="text-[#CED4DA]">Liked Your Quote</a>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-end">
          <p>{{ timeDiff(notification.created_at) }}</p>
          <p v-if="!notification.is_read" class="text-green-600 mt-3">New</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router/index.js";
import timeDiff from "time-diff-for-humans";
import axios from "axios";
import { onBeforeMount, ref } from "vue";
import axiosInstance from "@/config/axios.js";
import { useAuthStore } from "@/store.js";

const BACK_URL = import.meta.env.VITE_BACK_URL;
const BACK_URL_IMAGE = BACK_URL.replace("/api", "");
const notifications = ref(null);
const authStore = useAuthStore();
const showNotifications = ref(false);

function readNotification(quoteId, notificationId) {
  axios
    .post(BACK_URL + "/read-notification", { notification_id: notificationId })
    .then(() => {
      router.push({ path: "/quote/" + quoteId });
      showNotifications.value = false;
    });
}

function readAllNotifications() {
  axiosInstance.post(BACK_URL + "/read-notifications");
  showNotifications.value = false;
}

function deleteAllNotifications() {
  axiosInstance.post(BACK_URL + "/delete-notifications");
  showNotifications.value = false;
}

onBeforeMount(() => {
  axios.post(BACK_URL + "/get-notifications").then((response) => {
    if (response.data.length !== 0) {
      notifications.value = response.data;
      response.data.forEach((notification) => {
        if (!notification.is_read) {
          authStore.notificationsCount += 1;
        }
      });
    }
  });
});
</script>
