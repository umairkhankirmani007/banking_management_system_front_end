<script setup lang="ts">
import { Icon } from "@iconify/vue";
const emit = defineEmits(["click"]);

const props = defineProps({
  width: {
    type: String,
    default: "w-full",
  },
  height: {
    type: String,
    default: "h-12",
  },
  color: {
    type: String,
    default: "bg-accent",
  },
  textColor: {
    type: String,
    default: "text-white",
  },
  rounded: {
    type: String,
    default: "rounded-md",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: "",
  },
  iconPosition: {
    type: String,
    default: "left",
    validator: (val: string) => ["left", "right"].includes(val),
  },
});
</script>

<template>
  <button
    :class="[
      'flex items-center justify-center gap-2 px-4',
      width,
      height,
      color,
      textColor,
      rounded,
      'transition duration-200 ease-in-out hover:opacity-90',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
    ]"
    :disabled="disabled"
    @click="emit('click')"
  >
    <Icon v-if="icon && iconPosition === 'left'" :icon="icon" class="w-5 h-5" />
    <slot />
    <Icon
      v-if="icon && iconPosition === 'right'"
      :icon="icon"
      class="w-5 h-5"
    />
  </button>
</template>
