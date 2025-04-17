<script setup lang="ts">
import { ref } from "vue";
import CInput from "../components/CInput.vue";
import CButton from "../components/CButton.vue";
import { userStore } from "../store/userInfo";
import { useRouter } from "vue-router";

const user = userStore();
const router = useRouter();
const formData = ref({
  email: "",
  password: "",
});

const handleLogin = () => {
  console.log("Submitted:", formData.value);
  user.userIsAuthenticated = true;
  router.push("/");
};
</script>

<template>
  <main class="flex flex-col items-center gap-10">
    <div>
      <h2 class="text-6xl text-white">Login</h2>
    </div>
    <form @submit.prevent="handleLogin" class="space-y-5">
      <CInput
        v-model="formData.email"
        placeholder="Enter your email"
        icon="mdi:email"
        width="w-80"
      />
      <CInput
        type="password"
        v-model="formData.password"
        placeholder="Enter your password"
        icon="mdi:lock"
        width="w-80"
      />
      <CButton
        type="submit"
        width="w-full"
        height="h-10"
        color="bg-accent"
        textColor="text-black"
      >
        Login
      </CButton>
    </form>
  </main>
</template>
