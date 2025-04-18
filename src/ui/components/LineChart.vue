<script setup lang="ts">
import { Bar } from "vue-chartjs"; // Change from Line to Bar
import { ref } from "vue";
import dayjs from "dayjs";

// Generate last 10 days' labels
const labels = Array.from({ length: 10 }, (_, i) =>
  dayjs()
    .subtract(9 - i, "day")
    .format("MMM D")
);

// Generate mock data
const payments = labels.map(() => Math.floor(Math.random() * 5000) + 100);

const chartData = ref({
  labels,
  datasets: [
    {
      label: "Payments",
      data: payments,
      backgroundColor: "#3b82f6", // solid fill for bar
      borderRadius: 6,
      barThickness: 20,
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
  },
  scales: {
    x: {
      grid: {
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
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
