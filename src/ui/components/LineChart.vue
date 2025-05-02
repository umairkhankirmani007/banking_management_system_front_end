<script setup lang="ts">
import { Bar } from "vue-chartjs";
import { computed } from "vue";
import dayjs from "dayjs";
import { useTransactionsStore } from "../store/TransactionsStore";

// Store
const transactionStore = useTransactionsStore();

console.log(transactionStore.chartsData);
const chartData = computed(() => {
  const dates = Array.from({ length: 10 }, (_, i) =>
    dayjs().subtract(i, "day").format("YYYY-MM-DD")
  ).reverse();

  const dailyData = dates.map((date) => {
    const dailyTransactions = transactionStore.chartsData.filter(
      (t) => t.date === date
    );

    const netAmount = dailyTransactions.reduce((sum, transaction) => {
      return transaction.credited
        ? sum + transaction.amount
        : sum - transaction.amount;
    }, 0);

    return { date, netAmount };
  });

  return {
    labels: dailyData.map((d) => dayjs(d.date).format("MMM D")),
    datasets: [
      {
        label: "Net Amount",
        data: dailyData.map((d) => d.netAmount),
        backgroundColor: "#4f46e5",
        borderWidth: 0,
        barThickness: 40,
      },
    ],
  };
});

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
  elements: {
    bar: {
      borderRadius: 6,
      borderSkipped: false,
      backgroundColor: "#ccc",
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
        display: false,
        text: "Net Amount",
      },
    },
  },
};
</script>

<template>
  <div class="h-full">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
