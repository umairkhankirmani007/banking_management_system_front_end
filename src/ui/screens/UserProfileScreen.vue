<script setup lang="ts">
import { ref } from "vue";
import CInput from "../components/CInput.vue";
import staticData from "../store/utils";
import CButton from "../components/CButton.vue";
import BackButton from "../components/BackButton.vue";

const fomrData = ref({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
});
</script>

<template>
  <main class="flex items-center justify-center h-screen">
    <BackButton />
    <section
      class="bg-white shadow-lg p-5 rounded-lg flex flex-col gap-4 items-center"
    >
      <h2 class="text-xl font-semibold text-accent">Edit Profile</h2>
      <img
        :src="staticData.masterCardLogo"
        class="w-24 h-24 rounded-full object-cover"
      />
      <div class="grid grid-cols-2 gap-5">
        <CInput
          icon="mdi:user"
          placeholder="First name"
          type="text"
          v-model="fomrData.firstName"
        />
        <CInput
          icon="mdi:user"
          placeholder="Last name"
          type="text"
          v-model="fomrData.lastName"
        />
        <CInput
          icon="mdi:email"
          placeholder="Email"
          type="text"
          v-model="fomrData.email"
        />
        <CInput
          icon="mdi:phone"
          placeholder="Phone Number"
          type="text"
          v-model="fomrData.phoneNumber"
        />
        <CInput
          icon="mdi:password"
          placeholder="Password"
          type="text"
          v-model="fomrData.password"
        />
        <CButton>Update Info</CButton>
      </div>
    </section>
  </main>
</template>
