<script setup lang="ts">
import router from "../routes";
import { useUserStore } from "../store/userInfo";
import staticData from "../store/utils";

const userStore = useUserStore();

const handleNavigate = () => {
  router.push("/profile");
};
</script>

<template>
  <div class="flex items-center justify-between">
    <h2 class="text-xl font-semibold">Dashboard Overview</h2>
    <div class="flex items-center gap-2">
      <button
        @click="userStore.logout"
        class="bg-red-500 text-white rounded-full px-7 h-8 hover:bg-red-400 cursor-pointer"
      >
        Logout
      </button>
      <img
        @click="handleNavigate"
        :src="userStore.user?.imageUrl || staticData.userImage"
        class="rounded-full h-12 w-12 object-cover border-2 object-top border-accent cursor-pointer"
      />
    </div>
  </div>
</template>
