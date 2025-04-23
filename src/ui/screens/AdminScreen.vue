<script setup lang="ts">
import { onMounted } from "vue";
import Header from "../components/Header.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/userInfo";

const router = useRouter();
const userSession = useUserStore();

onMounted(() => {
  if (userSession.user?.role !== "admin") {
    router.push("/dashboard");
  }
});
</script>

<template>
  <main class="grid md:grid-cols-4 mx-auto gap-2">
    <section
      class="sticky top-0 z-50 col-span-4 bg-white p-4 shadow rounded-xl"
    >
      <Header />
    </section>
    <section class="h-40 p-4 bg-white shadow rounded-xl col-span-2">
      <h2>Latest Transaction By Users</h2>
    </section>
  </main>
</template>
