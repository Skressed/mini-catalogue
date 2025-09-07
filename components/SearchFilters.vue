<template>
  <div class="mb-4 flex gap-2">
    <input v-model="q" @input="onChange" placeholder="По марке или модели" class="p-2 border rounded w-full" />
    <select v-model.number="year" @change="onChange" class="p-2 border rounded">
      <option value="">Все годы</option>
      <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
    </select>
  </div>
</template>


<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const q = ref(route.query.q?.toString() ?? '')
const year = ref<number | ''>(route.query.year ? Number(route.query.year) : '')


const years = computed(() => {
  // Можно динамически собирать года из стора, но здесь для простоты — диапазон
  const arr: number[] = []
  for (let y = 2015; y <= new Date().getFullYear(); y++) arr.unshift(y)
  return arr
})


function applyQuery() {
  const query: Record<string, any> = { ...route.query }
  query.q = q.value || undefined
  query.year = year.value ? String(year.value) : undefined
  router.replace({ query })
}


const debounced = (() => {
  let t: any
  return (fn: () => void, ms = 300) => {
  clearTimeout(t)
  t = setTimeout(fn, ms)
  }
})()


function onChange() {
  debounced(() => applyQuery(), 250)
}
</script>