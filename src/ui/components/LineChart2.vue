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
      tension: 0.5,
    },
  ],
});

const chartOptions = {
  responsive: true,
  elements: {
    line: {
      tension: 0.2, // smoother curve
      borderWidth: 2,
    },
    point: {
      radius: 0,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
    },
  },
};
</script>

<template>
  <div class="relative rounded-lg h-64">
    <h3 class="px-2 text-sm font-semibold text-midDark">Last 10 Days</h3>
    <h2 class="px-1 text-4xl font-bold text-midDark">+1245 £</h2>
    <Line
      class="absolute bottom-0 rounded-lg"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>
