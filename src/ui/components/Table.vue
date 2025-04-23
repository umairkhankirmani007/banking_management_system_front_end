<script setup lang="ts">
import { ref, computed, watch } from "vue";
import staticData from "../store/utils";
import type { SimplifiedTransaction } from "../store/interfaces";

const props = defineProps<{
  columns: { key: string; label: string }[];
  rows: SimplifiedTransaction[];
  rowsPerPage?: number;
  loggedUserId?: string;
}>();

const currentPage = ref(1);
const perPage = ref(props.rowsPerPage || 5);

const totalPages = computed(() => Math.ceil(props.rows.length / perPage.value));

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return props.rows.slice(start, start + perPage.value);
});

watch(
  () => props.rows,
  () => {
    currentPage.value = 1;
  }
);

function getTransactionType(
  senderID: string,
  receiverID: string,
  message: string
): string {
  // Explicitly check for Top-Up first
  if (message.toLowerCase().includes("top-up")) {
    return "Top-Up";
  }

  // Now check debit/credit
  if (senderID === props.loggedUserId) {
    return "Debited";
  } else if (receiverID === props.loggedUserId) {
    return "Credited";
  }

  return "Other"; // Fallback
}

console.log(props.rows);
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
            <template v-if="col.key === 'transactionID'">
              {{ row.transactionID.slice(0, 8) }}...
            </template>

            <template v-else-if="col.key === 'sender'">
              <div class="flex items-center gap-2">
                <img
                  :src="row.senderImage || staticData.userImage"
                  alt="Sender"
                  class="w-8 h-8 rounded-full object-cover"
                />
                <span>{{ row.sender }}</span>
              </div>
            </template>

            <template v-else-if="col.key === 'receivedBy'">
              <div class="flex items-center gap-2">
                <img
                  :src="row.receiverImage || staticData.userImage"
                  alt="Recipient"
                  class="w-8 h-8 rounded-full object-cover"
                />
                <span>{{ row.receivedBy }}</span>
              </div>
            </template>

            <template v-else-if="col.key === 'message'">
              {{
                getTransactionType(row.senderID, row.receiverID, row.message)
              }}
            </template>

            <template v-else-if="col.key === 'status'">
              <span
                :class="{
                  'text-green-600': row.status === 'completed',
                  'text-yellow-600': row.status === 'pending',
                  'text-red-600': row.status === 'failed',
                }"
              >
                {{ row.status }}
              </span>
            </template>

            <template v-else>
              <!-- {{ row[col.key] }} -->
            </template>
          </td>
        </tr>

        <tr v-if="!rows.length">
          <td
            :colspan="columns.length"
            class="text-center h-52 py-4 text-gray-500"
          >
            <h2>No Record Found</h2>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
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
