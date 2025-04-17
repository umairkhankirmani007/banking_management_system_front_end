<script setup lang="ts">
const props = defineProps<{
  tabs: { label: string; value: string }[];
  modelValue: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  color?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const sizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-5 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

function selectTab(value: string) {
  emit("update:modelValue", value);
}
</script>

<template>
  <div
    :class="[
      'inline-flex p-1 rounded-md shadow-inner transition-all',
      fullWidth ? 'w-full justify-between' : '',
      `bg-${color || 'gray'}-200`,
    ]"
  >
    <button
      v-for="tab in props.tabs"
      :key="tab.value"
      @click="selectTab(tab.value)"
      :class="[
        'font-medium rounded-md transition-all duration-200',
        sizes[size || 'md'],
        fullWidth ? 'flex-1 text-center' : '',
        modelValue === tab.value
          ? `bg-white shadow text-${color || 'gray'}-900`
          : `text-${color || 'gray'}-600 hover:text-${color || 'gray'}-800`,
      ]"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
