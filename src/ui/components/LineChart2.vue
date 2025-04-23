<script setup lang="ts">
import { Line } from "vue-chartjs";
import { computed } from "vue";
import dayjs from "dayjs";
import { useTransactionsStore } from "../store/TransactionsStore";

// Store
const transactionStore = useTransactionsStore();

// Compute the last 10 transactions safely
const last10Transactions = computed(() => {
  const data = Array.isArray(transactionStore.chartsData)
    ? transactionStore.chartsData
    : [];

  return [...data]
    .sort((a, b) => {
      const dateTimeA = dayjs(`${a.date} ${a.time}`, "YYYY-MM-DD HH:mm A");
      const dateTimeB = dayjs(`${b.date} ${b.time}`, "YYYY-MM-DD HH:mm A");
      return dateTimeB.valueOf() - dateTimeA.valueOf(); // latest first
    })
    .slice(0, 10)
    .reverse(); // oldest to newest
});

// Format data for Chart.js
const chartData = computed(() => ({
  labels: last10Transactions.value.map((t) =>
    dayjs(`${t.date} ${t.time}`, "YYYY-MM-DD HH:mm A").format("HH:mm")
  ),
  datasets: [
    {
      label: "Transaction Amount",
      data: last10Transactions.value.map((t) =>
        t.credited ? t.amount : -t.amount
      ),
      borderColor: "#3b82f6", // Tailwind blue-500
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      fill: true,
    },
  ],
}));

// Net total over the last 10 transactions
const totalLast10Days = computed(() =>
  last10Transactions.value.reduce((sum, t) => {
    return sum + (t.credited ? t.amount : -t.amount);
  }, 0)
);

// Chart config
const chartOptions = {
  responsive: true,
  elements: {
    line: { tension: 0.2, borderWidth: 2 },
    point: { radius: 0 },
  },
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    x: { display: false, grid: { display: false } },
    y: { display: false, grid: { display: false } },
  },
};
</script>

<template>
  <div class="relative rounded-lg h-64 bg-white shadow-md p-4">
    <h3 class="text-sm font-semibold text-gray-600 mb-1">
      Last 10 Transactions
    </h3>

    <div v-if="transactionStore.isLoading" class="text-gray-400 text-lg">
      Loading...
    </div>

    <template v-else>
      <h2 class="text-4xl font-bold text-gray-800 mb-4">
        {{ totalLast10Days >= 0 ? "+" : "" }}{{ totalLast10Days }} £
      </h2>
      <Line
        class="absolute bottom-0 left-0 right-0 h-32"
        :data="chartData"
        :options="chartOptions"
      />
    </template>
  </div>
</template>
