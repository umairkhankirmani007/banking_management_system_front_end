<script setup lang="ts">
import CreditCard from "../components/CreditCard.vue";
import Header from "../components/Header.vue";
import LineChart from "../components/LineChart.vue";
import QuickActionWidgets from "../components/QuickActionWidgets.vue";
import SendPaymentModal from "../components/SendPaymentModal.vue";
import Table from "../components/Table.vue";
import LineChart2 from "../components/LineChart2.vue";
import PayeeCard from "../components/PayeeCard.vue";
import NewPayeeModal from "../components/NewPayeeModal.vue";
import TopUpModal from "../components/TopUpModal.vue";
import { addnewPyeeModal, sendMoneyModal, topUpModal } from "../store/Scopes";
import { onMounted } from "vue";
import { useTransactionsStore } from "../store/TransactionsStore";
import Loading from "../components/Loading.vue";

const columns = [
  { key: "userName", label: "User" },
  { key: "amount", label: "Amount" },
  { key: "status", label: "Transaction Type" }, // assuming 'status' shows Credit/Debit
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { key: "tid", label: "TID" },
];

const transactionStore = useTransactionsStore();
onMounted(() => {
  transactionStore.GetTransactionsHistory();
});
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

      <Table
        v-if="!transactionStore.isLoading"
        :columns="columns"
        :rows="transactionStore.tableData"
        :rowsPerPage="7"
      />
      <Loading v-else />
    </section>

    <!-- Bottom Right Small Box -->
    <section
      class="md:col-span-2 bg-gradient-to-r from-40% from-[#60B5FF60] to-blue-400 p-4 shadow rounded-xl"
    >
      <h2 class="text-xl font-semibold mb-4">Actions</h2>
      <QuickActionWidgets
        @openPymentModal="sendMoneyModal = true"
        @openPayeeModal="addnewPyeeModal = true"
        @open-top-up-model="topUpModal = true"
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
    <SendPaymentModal v-if="sendMoneyModal" @close="sendMoneyModal = false" />
    <NewPayeeModal v-if="addnewPyeeModal" @close="addnewPyeeModal = false" />
    <TopUpModal v-if="topUpModal" @close="topUpModal = false" />
  </main>
</template>
