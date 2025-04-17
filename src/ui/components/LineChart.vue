USDUSD
<script setup lang="ts">
import { Line } from "vue-chartjs";
import { ref } from "vue";
import dayjs from "dayjs";

const daysInMonth = dayjs().daysInMonth();
const labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);

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
      position: "top" as const,
    },
    title: {
      display: true,
      text: `Payments for ${dayjs().format("MMMM YYYY")}`,
    },
  },
  scales: {
    x: {
      title: {
        display: false,
        text: "Day of the Month",
      },
    },
    y: {
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
