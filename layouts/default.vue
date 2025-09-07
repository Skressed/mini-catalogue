<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-800">
    <header class="bg-white shadow p-4">
      <div class="max-w-4xl mx-auto flex items-center justify-between">
        <NuxtLink to="/" class="text-2xl font-bold text-blue-600">
          Mini Car Catalog
        </NuxtLink>
      </div>
    </header>

    <main class="flex-1 max-w-5xl mx-auto w-full p-4">
      <NuxtPage />
    </main>

    <footer class="bg-white shadow-inner p-4 text-center text-gray-500 text-sm">
      &copy; {{ new Date().getFullYear() }} Mini Car Catalog 
      <!-- надо не забыть подключить https://getfullyear.com/ 😂 -->
    </footer>
  </div>
</template>
