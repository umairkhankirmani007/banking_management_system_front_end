<script setup lang="ts">
import { Line } from "vue-chartjs";
import { computed } from "vue";
import dayjs from "dayjs";
import { useTransactionsStore } from "../store/TransactionsStore";

// Store
const transactionStore = useTransactionsStore();

// Generate last 10 days' labels
const labels = Array.from({ length: 10 }, (_, i) =>
  dayjs()
    .subtract(9 - i, "day")
    .format("MMM D")
);

// Computed: filter tableData for last 10 days and calculate totals
const totalLast10Days = computed(() => {
  // Initialize totals with default values
  let totalCredited = 0;
  let totalDebited = 0;

  // Return default values if no tableData is available
  if (!transactionStore.tableData || transactionStore.tableData.length === 0) {
    return {
      credited: 0,
      debited: 0,
      net: 0,
    };
  }

  const last10DaysData = transactionStore.tableData.filter((txn) => {
    return labels.includes(dayjs(txn.date).format("MMM D"));
  });

  last10DaysData.forEach((txn) => {
    if (txn.status === "CREDITED") {
      totalCredited += txn.amount;
    } else if (txn.status === "DEBITED") {
      totalDebited += txn.amount;
    }
  });

  return {
    credited: totalCredited,
    debited: totalDebited,
    net: totalCredited - totalDebited,
  };
});

// Computed: chart data for the last 10 days
const chartData = computed(() => {
  // Initialize the payment array with 0s
  const payments = Array(10).fill(0);

  // Filter data for the last 10 days and populate the payment data
  transactionStore.tableData.forEach((txn) => {
    const txnDate = dayjs(txn.date).format("MMM D");
    const dayIndex = labels.indexOf(txnDate);

    if (dayIndex !== -1) {
      if (txn.status === "CREDITED") {
        payments[dayIndex] += txn.amount;
      } else if (txn.status === "DEBITED") {
        payments[dayIndex] -= txn.amount;
      }
    }
  });

  return {
    labels,
    datasets: [
      {
        label: "Net Payments",
        data: payments,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        fill: true,
        tension: 0.5,
      },
    ],
  };
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
    <!-- Display the net amount in h2 with a fallback value -->
    <h2 class="px-1 text-4xl font-bold text-midDark">
      {{
        totalLast10Days.net !== undefined
          ? (totalLast10Days.net >= 0 ? "+" : "") + totalLast10Days.net
          : "0"
      }}
      £
    </h2>
    <Line
      class="absolute bottom-0 rounded-lg"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>
