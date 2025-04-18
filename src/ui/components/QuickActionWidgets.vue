<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/iconify.js";
import { ref } from "vue";

const quickActions = ref([
  {
    id: "1",
    title: "Send Money",
    value: "sendMoney",
    icon: "mdi:paper-airplane-outline",
    color: "#C68EFD60",
  },
  {
    id: "2",
    title: "Statement",
    value: "statement",
    icon: "mdi:file-pdf-box",
    color: "#FCB45460",
  },
  {
    id: "3",
    title: "Support",
    value: "support",
    icon: "mdi:customer-service",
    color: "#88304E60",
  },
  {
    id: "4",
    title: "Open Dispute",
    value: "dispute",
    icon: "mdi:hand-front-left",
    color: "#DCA06D60",
  },
]);

const emit = defineEmits(["openPymentModal"]);

const sendPayment = () => {
  emit("openPymentModal", true);
};
const openStatement = () => {
  console.log("Statement function executed");
};

const openSupport = () => {
  console.log("Support function executed");
};

const openDispute = () => {
  console.log("Dispute function executed");
};

const handleActionClick = (value: string) => {
  switch (value) {
    case "sendMoney":
      sendPayment();
      break;
    case "statement":
      openStatement();
      break;
    case "support":
      openSupport();
      break;
    case "dispute":
      openDispute();
      break;
    default:
      console.log("Unknown action");
  }
};
</script>

<template>
  <section class="flex gap-2 items-center justify-between">
    <div
      v-for="item in quickActions"
      :key="item.id"
      @click="handleActionClick(item.value)"
      class="p-3 cursor-pointer text-midDark hover:scale-105 duration-100 shadow-md font-semibold w-[210px] h-15 flex items-center rounded-full justify-center gap-3"
      :style="{ background: item.color }"
    >
      <Icon class="text-4xl" :icon="item.icon" />
      <h2>{{ item.title }}</h2>
    </div>
  </section>
</template>
