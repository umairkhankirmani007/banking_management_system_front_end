<script setup lang="ts">
import { Line } from "vue-chartjs";
import { ref } from "vue";
import dayjs from "dayjs";

// Generate last 10 days' labels
const labels = Array.from({ length: 10 }, (_, i) =>
  dayjs()
    .subtract(9 - i, "day")
    .format("MMM D")
);

// Generate mock data for each of those 10 days
const payments = labels.map(() => Math.floor(Math.random() * 5000) + 100);

const chartData = ref({
  labels,
  datasets: [
    {
      label: "Payments",
      data: payments,
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59, 130, 246, 0.3)",
      fill: true,
      tension: 0.4,
    },
  ],
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: false,
      text: `Payments (Last 10 Days)`,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
      title: {
        display: true,
        text: "Amount",
      },
      beginAtZero: true,
    },
  },
};
</script>

<template>
  <div>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
