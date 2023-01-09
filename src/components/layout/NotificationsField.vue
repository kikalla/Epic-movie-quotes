<template>
  <div v-click-out-side="customMethod">
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
        v-if="notificationsCount !== 0"
        class="absolute w-6 h-6 rounded-full bg-red-600 text-white -top-1 -right-3 text-center"
      >
        {{ notificationsCount }}
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
                <img
                  class="w-6 h-6 mr-3"
                  src="@/assets/activeLike.svg"
                  alt=""
                />
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
  </div>
</template>

<script setup>
import router from "@/router/index.js";
import timeDiff from "time-diff-for-humans";
import axios from "axios";
import { onMounted, ref } from "vue";
import axiosInstance from "@/config/axios.js";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useAuthStore } from "@/store.js";
import { clickOutSide as vClickOutSide } from "@mahdikhashan/vue3-click-outside";

const authStore = useAuthStore();
const BACK_URL = import.meta.env.VITE_BACK_URL;
const BACK_URL_IMAGE = BACK_URL.replace("/api", "");
const notifications = ref(null);
const showNotifications = ref(false);
const notificationsCount = ref(0);

function customMethod() {
  showNotifications.value = false;
}

function readNotification(quoteId, notificationId) {
  axios
    .post(BACK_URL + "/read-notification", { notification_id: notificationId })
    .then(() => {
      router.push({ path: "/quote/" + quoteId });
      showNotifications.value = false;
      console.log(
        notifications.value.find(
          (notification) => notification.id === notificationId
        ).is_read
      );
      if (
        !notifications.value.find(
          (notification) => notification.id === notificationId
        ).is_read
      ) {
        notificationsCount.value -= 1;
        notifications.value.find(
          (notification) => notification.id === notificationId
        ).is_read = 1;
      }
    });
}

function readAllNotifications() {
  axiosInstance.post(BACK_URL + "/read-notifications");
  showNotifications.value = false;
  notificationsCount.value = 0;
  notifications.value.forEach((notifivation) => {
    notifivation.is_read = 1;
  });
}

function deleteAllNotifications() {
  axiosInstance.post(BACK_URL + "/delete-notifications");
  showNotifications.value = false;
  notificationsCount.value = 0;
  notifications.value = null;
}

onMounted(() => {
  axios.post(BACK_URL + "/get-notifications").then((response) => {
    if (response.data.length !== 0) {
      notifications.value = response.data;
      notificationsCount.value = 0;
      response.data.forEach((notification) => {
        if (!notification.is_read) {
          notificationsCount.value += 1;
        }
      });
    }
  });
  window.Pusher = Pusher;
  Pusher.logToConsole = false;
  window.Echo = new Echo({
    broadcaster: "pusher",
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
    encrypted: true,
    withCredentials: true,
  });

  window.Echo.channel("notifications." + authStore.userId).listen(
    "NotificationCreated",
    (e) => {
      if (notifications.value === null) {
        notifications.value = [];
      }
      notifications.value.unshift(e.notification);
      notificationsCount.value += 1;
    }
  );
});
</script>
