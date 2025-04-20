<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/iconify.js";
import { ref } from "vue";

const payeeList = ref([
  {
    id: "8821384729832",
    title: "Talha Mushtaq",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: "9821723456789",
    title: "Sarah Johnson",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: "7632457890123",
    title: "Michael Lee",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    id: "8934523678901",
    title: "Emily Clark",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    id: "1092837465810",
    title: "David Kim",
    image: "https://randomuser.me/api/portraits/men/42.jpg",
  },
  {
    id: "1209384756123",
    title: "Ava Smith",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
]);

const dropdownVisible = ref<string | null>(null);

const toggleDropdown = (id: string) => {
  dropdownVisible.value = dropdownVisible.value === id ? null : id;
};

const editPayee = (id: string) => {
  alert(`Edit Payee ID: ${id}`);
};

const deletePayee = (id: string) => {
  alert(`Delete Payee ID: ${id}`);
};
</script>

<template>
  <div class="grid grid-cols-4 gap-4 p-4">
    <div
      v-for="payee in payeeList"
      :key="payee.id"
      class="relative bg-gradient-to-r from-gray-100 to-white rounded-xl shadow-lg p-4 flex items-center space-x-4 hover:shadow-xl transition"
    >
      <img
        :src="payee.image"
        alt="Payee image"
        class="w-16 h-16 rounded-full object-cover"
      />
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-800">{{ payee.title }}</h3>
        <h3 class="text-sm text-gray-500">{{ payee.id }}</h3>
      </div>

      <div class="relative">
        <Icon
          icon="mdi:dots-vertical"
          class="text-3xl cursor-pointer rounded-full text-gray-400"
          @click="toggleDropdown(payee.id)"
        />
        <div
          v-if="dropdownVisible === payee.id"
          class="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-md z-10"
        >
          <ul class="text-sm text-gray-700">
            <li
              class="px-4 flex items-center gap-2 py-2 hover:bg-gray-100 cursor-pointer"
              @click="editPayee(payee.id)"
            >
              <Icon icon="mdi-edit" />
              Edit
            </li>
            <li
              class="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
              @click="deletePayee(payee.id)"
            >
              <Icon icon="mdi:delete-empty" />

              Delete
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
