<!-- TransactionTable.vue -->
<script setup lang="ts">
import { ref, computed, watch } from "vue";

// Props
const props = defineProps<{
  columns: { key: string; label: string }[];
  rows: Record<string, any>[];
  rowsPerPage?: number;
}>();

// Pagination state
const currentPage = ref(1);
const perPage = ref(props.rowsPerPage || 5);

const totalPages = computed(() => Math.ceil(props.rows.length / perPage.value));

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return props.rows.slice(start, start + perPage.value);
});

// Reset to page 1 when rows change
watch(
  () => props.rows,
  () => {
    currentPage.value = 1;
  }
);
</script>

<template>
  <div class="w-full overflow-x-auto">
    <table class="min-w-full text-left border border-gray-300 rounded-md">
      <thead class="bg-gray-100 text-sm uppercase">
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            class="py-2 px-4 border-b border-gray-300"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in paginatedRows"
          :key="index"
          class="hover:bg-gray-50"
        >
          <td
            v-for="col in columns"
            :key="col.key"
            class="py-2 px-4 border-b border-gray-200"
          >
            <span v-if="col.key === 'tid'">
              {{ row[col.key]?.slice(0, 8) }}...
            </span>
            <span v-else>
              {{ row[col.key] }}
            </span>
          </td>
        </tr>
        <tr v-if="!rows.length">
          <td :colspan="columns.length" class="text-center py-4 text-gray-500">
            <h2>No Record Found</h2>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-between items-center mt-4 text-sm text-gray-700">
      <p>Page {{ currentPage }} of {{ totalPages }}</p>
      <div class="flex items-center gap-2">
        <button
          class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Prev
        </button>
        <button
          class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
