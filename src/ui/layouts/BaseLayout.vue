<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-gray-100 p-4 shadow">My App Header</header>
    <main class="flex-1 p-4">
      <slot />
    </main>
    <footer class="bg-gray-100 p-4 text-center">Footer</footer>
  </div>
</template>
