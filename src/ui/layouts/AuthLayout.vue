<script setup lang="ts">
import staticData from "../store/utils";
</script>

<template>
  <main class="flex items-center justify-between">
    <section class="w-2/3">
      <img :src="staticData.bankImage" class="h-screen object-cover" />
    </section>
    <section class="flex-1 bg-dark h-screen flex items-center justify-center">
      <slot />
    </section>
  </main>
</template>
