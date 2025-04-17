<script setup lang="ts">
import { ref } from "vue";
import CInput from "../components/CInput.vue";
import CButton from "../components/CButton.vue";
import { userStore } from "../store/userInfo";
import { useRouter } from "vue-router";
import Tabs from "../components/Tabs.vue";

const user = userStore();
const router = useRouter();
const formData = ref({
  email: "",
  password: "",
});
const currentTab = ref("login");

const handleLogin = () => {
  console.log("Submitted:", formData.value);
  user.userIsAuthenticated = true;
  router.push("/");
};

const tabOptions = [
  { label: "Login", value: "login" },
  { label: "Sign Up", value: "signup" },
];
</script>

<template>
  <main class="w-3/4 max-w-md mx-auto">
    <h2 class="text-6xl text-accent text-center mb-10">
      {{ currentTab === "login" ? "Login" : "Sign up" }}
    </h2>

    <Tabs
      :tabs="tabOptions"
      v-model="currentTab"
      size="sm"
      :fullWidth="true"
      class="mb-6"
    />

    <Transition
      name="fade"
      mode="out-in"
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div :key="currentTab">
        <!-- Login Form -->
        <form
          v-if="currentTab === 'login'"
          @submit.prevent="handleLogin"
          class="space-y-5"
        >
          <CInput
            v-model="formData.email"
            placeholder="Enter your email"
            icon="mdi:email"
            width="w-full"
          />
          <CInput
            type="password"
            v-model="formData.password"
            placeholder="Enter your password"
            icon="mdi:lock"
            width="w-full"
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

        <!-- Sign Up Form -->
        <form v-else @submit.prevent="handleLogin" class="space-y-5">
          <CInput
            v-model="formData.email"
            placeholder="Email"
            icon="mdi:email"
            width="w-full"
          />
          <CInput
            v-model="formData.email"
            placeholder="First Name"
            icon="mdi:user"
            width="w-full"
          />
          <CInput
            v-model="formData.email"
            placeholder="Last Name"
            icon="mdi:user"
            width="w-full"
          />
          <CInput
            type="number"
            v-model="formData.email"
            placeholder="Phone Number"
            icon="mdi:phone"
            width="w-full"
          />
          <CInput
            type="password"
            v-model="formData.password"
            placeholder="Choose a password"
            icon="mdi:lock"
            width="w-full"
          />

          <CButton
            type="submit"
            width="w-full"
            height="h-10"
            color="bg-accent"
            textColor="text-black"
          >
            Sign Up
          </CButton>
        </form>
      </div>
    </Transition>
  </main>
</template>
