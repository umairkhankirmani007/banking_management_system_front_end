<script setup lang="ts">
import { ref } from "vue";
import BackButton from "../components/BackButton.vue";
import CInput from "../components/CInput.vue";
import { notify, validateForm, type ValidationRules } from "../store/helpers";

const formData = ref({
  email: "",
  subject: "",
  message: "",
});

const rules: ValidationRules = {
  email: { required: true, type: "email" },
  subject: { required: true, minLength: 3 },
  message: { required: true, minLength: 10 },
};

const handleSFormSubmit = () => {
  const { valid, errors } = validateForm(formData.value, rules);

  if (!valid) {
    const firstError = Object.values(errors)[0] as string;
    notify(firstError, "error");
    return;
  }

  notify("Email Sent To Support Staff", "info");
};
</script>

<template>
  <main class="flex items-center justify-center h-screen">
    <BackButton />
    <form
      @submit.prevent="handleSFormSubmit"
      class="bg-white shadow-xl p-10 w-1/3 rounded-xl space-y-5"
    >
      <h2 class="text-2xl font-bold text-center">Support Form</h2>
      <p class="text-gray-600 text-center">
        Please provide your contact email, a short subject, and a detailed
        message so our team can assist you better.
      </p>

      <div>
        <label class="block mb-1 font-semibold">Email Address</label>
        <CInput
          type="email"
          v-model="formData.email"
          placeholder="e.g. yourname@example.com"
          icon="mdi:email"
          width="w-full"
        />
      </div>

      <div>
        <label class="block mb-1 font-semibold">Subject</label>
        <CInput
          type="text"
          v-model="formData.subject"
          placeholder="Brief Subject"
          icon="mdi:card-text"
          width="w-full"
        />
      </div>

      <div>
        <label class="block mb-1 font-semibold">Message</label>
        <textarea
          v-model="formData.message"
          class="h-40 w-full border border-gray-300 p-2 rounded-md resize-none"
          placeholder="Describe your issue or question in detail..."
        />
      </div>

      <button
        class="bg-accent font-semibold w-full h-10 text-white rounded-md hover:bg-indigo-300 transition"
        type="submit"
      >
        Send Message
      </button>
    </form>
  </main>
</template>
