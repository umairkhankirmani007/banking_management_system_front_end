<script setup lang="ts">
import { ref } from "vue";
import CreditCard from "../components/CreditCard.vue";
import Header from "../components/Header.vue";
import LineChart from "../components/LineChart.vue";
import QuickActionWidgets from "../components/QuickActionWidgets.vue";
import SendPaymentModal from "../components/SendPaymentModal.vue";
import Table from "../components/Table.vue";
import LineChart2 from "../components/LineChart2.vue";
import PayeeCard from "../components/PayeeCard.vue";
import NewPayeeModal from "../components/NewPayeeModal.vue";

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
];

const showModal = ref(false);
const payeeModal = ref(false);
</script>

<template>
  <main class="grid grid-cols-1 md:grid-cols-4 gap-4 py-2">
    <!-- Top Full-Width Header -->
    <section
      class="sticky top-0 z-50 md:col-span-4 bg-white p-4 shadow rounded-xl"
    >
      <Header />
    </section>

    <!-- Left Tall Widget -->
    <section
      class="md:col-span-2 row-span-2 space-y-5 bg-white p-4 shadow rounded-xl"
    >
      <h2 class="text-xl font-semibold mb-4">Overview</h2>
      <div class="flex flex-col lg:flex-row gap-5 items-center">
        <CreditCard />
        <!-- <DonutChart /> -->
        <LineChart2 class="flex-1" />
      </div>
      <h2 class="text-xl font-semibold">Recent Transactions</h2>

      <Table :columns="columns" :rows="rows" :rowsPerPage="7" />
    </section>

    <!-- Bottom Right Small Box -->
    <section
      class="md:col-span-2 bg-gradient-to-r from-40% from-[#60B5FF60] to-blue-400 p-4 shadow rounded-xl"
    >
      <h2 class="text-xl font-semibold mb-4">Actions</h2>
      <QuickActionWidgets
        @openPymentModal="showModal = true"
        @openPayeeModal="payeeModal = true"
      />
    </section>
    <!-- Top Right Small Box -->
    <section class="md:col-span-2 bg-white p-4 shadow rounded-xl">
      <h2 class="text-xl font-semibold mb-4">Recent Activity</h2>
      <LineChart />
    </section>

    <!-- Bottom Full-Width Section -->
    <section class="md:col-span-4 bg-white p-4 shadow rounded-xl">
      <h2 class="text-xl font-semibold mb-4">Payees</h2>
      <!-- <Payees /> -->
      <PayeeCard />
    </section>
    <SendPaymentModal v-if="showModal" @close="showModal = false" />
    <NewPayeeModal v-if="payeeModal" @close="payeeModal = false" />
  </main>
</template>
