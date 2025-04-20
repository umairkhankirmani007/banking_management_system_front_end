<script setup lang="ts">
import { ref } from "vue";
import Stepper from "./Stepper.vue";
import Tabs from "./Tabs.vue";
import { Icon } from "@iconify/vue/dist/iconify.js";
import { notify } from "../store/helpers";
import CInput from "./CInput.vue";
import TransitionComponent from "./TransitionComponent.vue";

interface Payee {
  id: string;
  title: string | null;
}

const emit = defineEmits(["close"]);
const emitClose = () => emit("close");

const steps = [
  { id: "1", title: "Select Payee", value: "step1", icon: "mdi:user-add" },
  { id: "2", title: "Select Amount", value: "step2", icon: "mdi:euro" },
  { id: "3", title: "Confirm", value: "step3", icon: "mdi:tick-circle" },
];

const payeesList = ref<Payee[]>([
  { id: "18717749231921", title: "Arslan Matllob" },
  { id: "23423421321321", title: "Talha Mushtaq" },
  { id: "45343242321312", title: "Muhammad Imran" },
  { id: "56564564543454", title: "Fahad Butt" },
  { id: "86576564345343", title: "Umair Khan" },
  { id: "42342433432434", title: "Ali Qasim" },
]);

const tabOptions = [
  { label: "Existing User", value: "existing" },
  { label: "New User", value: "newuser" },
];

const paymentOptions = ref({
  currentTab: "existing",
  currentStep: 0,
  selectedUser: "",
  amount: "",
});

const onUserSelection = () => {
  const { currentStep, selectedUser, amount } = paymentOptions.value;

  if (!selectedUser) {
    return notify("Please select a user", "error");
  }

  if (currentStep === 1 && (!amount || Number(amount) <= 0)) {
    return notify("Please enter a valid amount", "error");
  }

  if (currentStep === 2) {
    console.log(paymentOptions.value, "=====>");
    emitClose();
  } else {
    paymentOptions.value.currentStep++;
  }
};

const stepBack = () =>
  (paymentOptions.value.currentStep = Math.max(
    paymentOptions.value.currentStep - 1,
    0
  ));
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
    @click.self="emitClose"
  >
    <div
      class="bg-primary no-scrollbar flex flex-col items-center justify-center gap-8 overflow-hidden overflow-y-visible rounded-xl p-6 w-1/3 shadow-lg"
    >
      <section class="w-full flex items-center gap-3">
        <button
          v-if="paymentOptions.currentStep > 0"
          @click="stepBack"
          class="text-3xl hover:bg-indigo-300 duration-150 cursor-pointer bg-accent rounded-full text-white"
        >
          <Icon icon="mdi:keyboard-arrow-left" />
        </button>
        <h2 class="text-xl font-semibold">Send Payment</h2>
      </section>

      <section class="w-full">
        <Stepper :steps="steps" :currentStep="paymentOptions.currentStep" />
      </section>

      <!-- Wrapped in your TransitionComponent -->
      <TransitionComponent
        :step="paymentOptions.currentStep"
        transition="slide"
        mode="out-in"
      >
        <!-- Step 0 -->
        <template #step0>
          <section class="w-full">
            <Tabs
              :tabs="tabOptions"
              v-model="paymentOptions.currentTab"
              size="sm"
              :fullWidth="true"
              class="mb-6"
            />
          </section>

          <section class="w-full space-y-5">
            <h2 class="font-semibold">
              {{
                paymentOptions.currentTab === "existing"
                  ? "Select User"
                  : "Enter User's Account Number"
              }}
            </h2>

            <v-select
              v-if="paymentOptions.currentTab === 'existing'"
              v-model="paymentOptions.selectedUser"
              :options="payeesList"
              :reduce="(user: Payee) => user.id"
              label="title"
              class="w-full"
              placeholder="Search..."
            />

            <CInput
              v-else
              v-model="paymentOptions.selectedUser"
              placeholder="Account Number"
              icon="mdi:bank"
              width="w-full"
              type="number"
              focused
            />

            <button
              @click="onUserSelection"
              class="w-full h-10 rounded-md bg-accent text-white hover:bg-indigo-300 duration-200 cursor-pointer font-bold"
            >
              Next
            </button>
          </section>
        </template>

        <!-- Step 1 -->
        <template #step1>
          <section class="w-full mt-5 flex items-center flex-col">
            <div
              class="flex items-center flex-col gap-1 w-fit p-2 text-midDark rounded-lg font-semibold"
            >
              Available balance
              <h3 class="text-2xl">63283 £</h3>
            </div>
            <div class="space-y-5 w-full">
              <CInput
                v-model="paymentOptions.amount"
                placeholder="Enter Amount"
                icon="mdi:cash-100"
                width="w-full"
                type="number"
                required
              />
              <button
                @click="onUserSelection"
                class="w-full h-10 rounded-md bg-accent text-white hover:bg-indigo-300 duration-200 cursor-pointer font-bold"
              >
                Next
              </button>
            </div>
          </section>
        </template>

        <!-- Step 2 -->
        <template #step2>
          <section class="w-full mt-10 space-y-5">
            <div class="flex items-center w-full justify-center">
              <h2 class="font-semibold">
                You are about to send {{ paymentOptions.amount }} £ to
              </h2>
            </div>
            <button
              @click="onUserSelection"
              class="w-full h-10 rounded-md bg-accent text-white hover:bg-indigo-300 duration-200 cursor-pointer font-bold"
            >
              Confirm
            </button>
          </section>
        </template>
      </TransitionComponent>
    </div>
  </div>
</template>
