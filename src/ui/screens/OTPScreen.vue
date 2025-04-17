<script setup lang="ts">
import CButton from "../components/CButton.vue";
import CInput from "../components/CInput.vue";
import router from "../routes";

const handleOTP = () => {
  router.push("/dashboard");
};
</script>

<template>
  <form @submit.prevent="handleOTP" class="flex flex-col gap-5">
    <h2 class="text-4xl text-accent text-center">Enter OTP</h2>
    <span>Otp has been sent to registered email address</span>
    <CInput placeholder="Enter OTP " type="number" icon="mdi:verified-user" />
    <CButton
      type="submit"
      width="w-full"
      height="h-10"
      color="bg-accent"
      textColor="text-black"
      >Submit</CButton
    >
  </form>
</template>
