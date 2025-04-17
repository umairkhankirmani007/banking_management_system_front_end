<script setup lang="ts">
import router from "../routes";
import { userStore } from "../store/userInfo";
import staticData from "../store/utils";
import { Icon } from "@iconify/vue/dist/iconify.js";
import { notify } from "../store/helpers";

const { user } = userStore();
const handleCardClick = () => {
  router.push("/profile");
};

const copyAccountNumber = async () => {
  try {
    await navigator.clipboard.writeText(user.id);
    notify("Account No Copied");
  } catch (err) {
    notify("Unable To Copy Account Number", "error");
  }
};
</script>

<template>
  <div
    @click="handleCardClick"
    class="min-w-[450px] max-w-[450px] h-64 cursor-pointer bg-gradient-to-r from-blue-800 to-blue-500 p-5 rounded-md"
  >
    <div class="flex justify-end">
      <img :src="staticData.masterCardLogo" class="w-20" />
    </div>
    <div class="mt-10 space-y-3">
      <h2 class="text-white text-sm tracking-widest">Account Number</h2>
      <h2
        @click.stop="copyAccountNumber"
        class="text-white text-md flex items-center gap-3"
        style="letter-spacing: 6px"
      >
        {{ user.id }} <Icon icon="mdi:content-copy" />
      </h2>
    </div>
    <div class="flex justify-between mt-5 items-center">
      <section>
        <h2 class="text-white text-md tracking-widest">
          {{ user.firstName }} {{ user.lastName }}
        </h2>
        <h2 class="text-white text-sm tracking-widest">
          {{ user.email }}
        </h2>
      </section>
      <section>
        <h2 class="text-xl text-white font-semibold">£ {{ user.balance }}</h2>
      </section>
    </div>
  </div>
</template>
