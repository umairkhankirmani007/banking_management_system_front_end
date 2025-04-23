<script setup lang="ts"></script>

<template>
  <main class="flex items-center justify-between">
    <section class="w-2/3 mx-auto p-10">
      <div class="space-y-6">
        <h2 class="text-text text-5xl text-center font-bold">
          Banking Management System
        </h2>
        <!-- <h2 class="text-center">geidekauneutei-4597@yopmail.com</h2> -->
        <h4 class="text-dark text-lg text-center max-w-2xl mx-auto">
          Secure, fast, and user-friendly banking at your fingertips. Open an
          account, manage your finances, and track your transactions—all in one
          place.
        </h4>
        <ul
          class="list-disc text-dark text-base ml-[280px] max-w-xl mx-auto space-y-2"
        >
          <li>Instant account setup with advanced encryption</li>
          <li>Real-time transaction tracking and spending insights</li>
          <li>24/7 access to your financial data from any device</li>
          <li>No hidden fees, fully transparent service</li>
        </ul>
      </div>
    </section>

    <section
      class="flex-1 bg-primary h-screen flex items-center justify-center"
    >
      <slot />
    </section>
  </main>
</template>
