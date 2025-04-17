<script setup lang="ts">
import { Icon } from "@iconify/vue";

const props = defineProps({
  placeholder: {
    type: String,
    default: "Placeholder...",
  },
  icon: {
    type: String,
    default: "", // e.g., 'mdi:email'
  },
  width: {
    type: String,
    default: "w-full",
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
});

const modelValue = defineModel<string>();
</script>

<template>
  <div :class="['relative text-white', props.width]">
    <!-- Icon inside input -->
    <Icon
      v-if="props.icon"
      :icon="props.icon"
      class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
    />
    <input
      :type="props.type"
      :placeholder="props.placeholder"
      :value="modelValue"
      @input="modelValue = ($event.target as HTMLInputElement).value"
      :class="[
        'border border-gray-300 rounded-md w-full bg-transparent focus:outline-none',
        'pl-10', // space for the icon
        'p-3',
      ]"
    />
  </div>
</template>
