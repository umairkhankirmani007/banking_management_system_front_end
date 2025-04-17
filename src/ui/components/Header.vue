<script setup lang="ts">
import router from "../routes";
import { userStore } from "../store/userInfo";

const { user } = userStore();

const handleNavigate = () => {
  router.push("/profile");
};
</script>

<template>
  <div class="flex items-center justify-between">
    <h2 class="text-xl font-semibold">Dashboard Overview</h2>
    <div class="flex items-center gap-2">
      <button
        class="bg-red-500 text-white rounded-full px-7 h-8 hover:bg-red-400 cursor-pointer"
      >
        Logout
      </button>
      <img
        @click="handleNavigate"
        :src="user.image"
        class="rounded-full w-12 border-2 border-accent cursor-pointer"
      />
    </div>
  </div>
</template>
