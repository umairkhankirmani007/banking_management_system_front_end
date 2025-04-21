<script setup lang="ts">
import { Bar } from "vue-chartjs";
import { computed } from "vue";
import dayjs from "dayjs";
import { useTransactionsStore } from "../store/TransactionsStore";

// Store
const transactionStore = useTransactionsStore();

// Labels: Last 10 days
const labels = Array.from({ length: 10 }, (_, i) =>
  dayjs()
    .subtract(9 - i, "day")
    .format("MMM D")
);

const dailyNetAmounts = computed(() => {
  return Array.from({ length: 10 }, (_, i) => {
    const targetDate = dayjs()
      .subtract(9 - i, "day")
      .format("YYYY-MM-DD");

    let credited = 0;
    let debited = 0;

    transactionStore.tableData.forEach((txn) => {
      if (txn.date === targetDate) {
        if (txn.status === "CREDITED") credited += txn.amount;
        else if (txn.status === "DEBITED") debited += txn.amount;
      }
    });

    return credited - debited;
  });
});

const chartData = computed(() => ({
  labels,
  datasets: [
    {
      label: "Net Payments",
      data: dailyNetAmounts.value,
      backgroundColor: "#3b82f6",
      borderRadius: 6,
      barThickness: 20,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context: any) => `$${context.parsed.y.toLocaleString("en-US")}`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
    },
    y: {
      beginAtZero: true,
      grid: { display: false },
      title: {
        display: true,
        text: "Net Amount",
      },
    },
  },
};
</script>

<template>
  <div>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
