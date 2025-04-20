<script setup lang="ts">
import { ref } from "vue";
import Stepper from "./Stepper.vue";
import { Icon } from "@iconify/vue"; // Shorter import
import { notify } from "../store/helpers";
import CInput from "./CInput.vue";
import TransitionComponent from "./TransitionComponent.vue";

const emit = defineEmits(["close"]);
const emitClose = () => emit("close");

interface Step {
  id: string;
  title: string;
  value: string;
  icon: string;
}

const steps: Step[] = [
  { id: "1", title: "Select Payee", value: "step1", icon: "mdi:user-add" },
  { id: "2", title: "Select Amount", value: "step2", icon: "mdi:verified" },
];

const currentStep = ref(0);
const accountNumber = ref("");

const handleNewPayeeSubmit = () => {
  if (accountNumber.value.length < 5) {
    notify("Enter a valid Account Number", "error");
    return;
  }
  currentStep.value = 1;
};

const stepBack = () => {
  currentStep.value = Math.max(currentStep.value - 1, 0);
};
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
    @click.self="emitClose"
  >
    <div
      class="bg-primary overflow-hidden flex flex-col items-center justify-center gap-8 rounded-xl p-6 w-1/3 shadow-lg"
    >
      <section class="w-full flex items-center gap-3">
        <button
          v-if="currentStep > 0"
          @click="stepBack"
          class="text-3xl hover:bg-indigo-300 duration-150 cursor-pointer bg-accent rounded-full text-white"
        >
          <Icon icon="mdi:keyboard-arrow-left" />
        </button>
        <h2 class="text-xl font-semibold">Add New Payee</h2>
      </section>

      <section class="w-full">
        <Stepper :steps="steps" :currentStep="currentStep" />
      </section>

      <TransitionComponent mode="out-in" transition="slide" :step="currentStep">
        <template #step0>
          <section class="w-full space-y-5">
            <h2 class="text-xl font-semibold">Enter Account Number</h2>
            <CInput
              v-model="accountNumber"
              placeholder="Account Number"
              icon="mdi:bank"
              width="w-full"
              type="number"
              focused
            />
            <button
              @click="handleNewPayeeSubmit"
              class="w-full h-10 rounded-md bg-accent text-white hover:bg-indigo-300 duration-200 cursor-pointer font-bold"
            >
              Next
            </button>
          </section>
        </template>
        <template #step1>
          <section class="w-full">
            <h3 class="text-xl font-semibold">Confirm</h3>
          </section>
        </template>
      </TransitionComponent>
    </div>
  </div>
</template>
