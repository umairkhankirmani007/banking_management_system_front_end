<script setup lang="ts">
import { onMounted } from "vue";
import { userStore } from "../store/userInfo";
import { useRouter } from "vue-router";

const user = userStore();
const router = useRouter();

onMounted(() => {
  console.log(user.userIsAuthenticated);
  if (!user.userIsAuthenticated) {
    router.push("/login");
  }
});
</script>

<template>
  <h1>Home Page</h1>
</template>
