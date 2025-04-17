<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/iconify.js";
import { ref } from "vue";

const quickActions = ref([
  {
    id: "1",
    title: "Send Money",
    value: "sendMoney",
    icon: "mdi:paper-airplane-outline",
    action: "",
    color: "#C68EFD60",
  },
  {
    id: "2",
    title: "Statement",
    value: "sendMoney",
    icon: "mdi:file-pdf-box",
    action: "",
    color: "#FCB45460",
  },
  {
    id: "3",
    title: "Support",
    value: "sendMoney",
    icon: "mdi:customer-service",
    action: "",
    color: "#88304E60",
  },
  {
    id: "4",
    title: "Open Dispute",
    value: "sendMoney",
    icon: "mdi:hand-front-left",
    action: "",
    color: "#DCA06D60",
  },
]);

const handleActionClick = (id: string) => {
  console.log(id);
};
</script>
<template>
  <section class="flex gap-2 items-center justify-between">
    <div
      v-for="item in quickActions"
      :key="item.id"
      @click="handleActionClick(item.id)"
      class="p-3 cursor-pointer text-midDark hover:scale-105 duration-100 shadow-md font-semibold w-[210px] h-15 flex items-center rounded-full justify-center gap-3"
      :style="{ background: item.color }"
    >
      <Icon class="text-4xl" :icon="item.icon" />
      <h2>{{ item.title }}</h2>
    </div>
  </section>
</template>
