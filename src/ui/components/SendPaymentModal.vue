<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["close"]);

const emitClose = () => {
  emit("close");
};

const payeesList = ref([]);
</script>
<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
    @click.self="emitClose"
  >
    <div class="bg-primary flex flex-col gap-10 rounded-lg p-6 w-2/3 shadow-lg">
      <section>
        <h2 class="text-xl font-semibold">Send Payment</h2>
      </section>
      <section>2</section>
    </div>
  </div>
</template>
