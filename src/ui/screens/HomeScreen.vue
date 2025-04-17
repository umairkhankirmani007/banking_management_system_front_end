<script setup lang="ts">
import LineChart from "../components/LineChart.vue";
import Table from "../components/Table.vue";
import UserProfileWidget from "../components/UserProfileWidget.vue";

const columns = [
  { key: "date", label: "Date" },
  { key: "description", label: "Description" },
  { key: "amount", label: "Amount" },
  { key: "type", label: "Type" },
];

const rows = [
  {
    date: "2025-04-01",
    description: "ATM Withdrawal",
    amount: "-$200",
    type: "Debit",
  },
  {
    date: "2025-04-02",
    description: "Salary",
    amount: "+$3,000",
    type: "Credit",
  },
  {
    date: "2025-04-03",
    description: "Grocery",
    amount: "-$150",
    type: "Debit",
  },
  {
    date: "2025-04-04",
    description: "Electric Bill",
    amount: "-$100",
    type: "Debit",
  },
  { date: "2025-04-05", description: "Bonus", amount: "+$500", type: "Credit" },
  // Add more dummy transactions as needed
];
</script>

<template>
  <main class="grid grid-cols-1 md:grid-cols-4 gap-4 py-2">
    <!-- Top Full-Width Header -->
    <section class="md:col-span-4 bg-white p-4 shadow rounded-xl">
      <h2 class="text-xl font-semibold">Dashboard Overview</h2>
    </section>

    <!-- Left Tall Widget -->
    <section
      class="md:col-span-2 row-span-2 space-y-5 bg-white p-4 shadow rounded-xl"
    >
      <h2 class="text-xl font-semibold mb-4">User Profile</h2>
      <UserProfileWidget />
      <h2 class="text-xl font-semibold">Recent Transactions</h2>

      <Table :columns="columns" :rows="rows" :rowsPerPage="7" />
    </section>

    <!-- Bottom Right Small Box -->
    <section class="md:col-span-2 bg-white p-4 shadow rounded-xl">
      <h2 class="text-xl font-semibold mb-4">Notifications</h2>
      <p>Alerts, messages, etc.</p>
    </section>
    <!-- Top Right Small Box -->
    <section class="md:col-span-2 bg-white p-4 shadow rounded-xl">
      <h2 class="text-xl font-semibold mb-4">Recent Activity</h2>
      <LineChart />>
    </section>

    <!-- Bottom Full-Width Section -->
    <section class="md:col-span-4 bg-white p-4 shadow rounded-xl">
      <h2 class="text-xl font-semibold mb-4">Quick Actions</h2>
      <p>Buttons, charts, or summaries.</p>
    </section>
  </main>
</template>
