<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div class="flex flex-row items-center">
      <h1 class="text-xl font-bold mb-4 mr-4">CarCatalog</h1>
      <SearchFilters class="w-full" />
    </div>

    <div v-if="loading" class="text-center py-10">
      <div class="text-center text-gray-600 py-10">Загрузка списка...</div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CarCardSkeleton v-for="index in 10" :key="index"/>
      </div>
    </div>
    <div v-else>
      <div v-if="filtered.length === 0" class="text-center text-gray-600 py-10">Ничего не найдено</div>
      <div v-else class="text-center text-gray-600 py-10">Результат поиска:</div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CarCard v-for="c in filtered" :key="c.id" :car="c" />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import SearchFilters from '../components/SearchFilters.vue'
import CarCard from '../components/CarCard.vue'
import { useCarStore } from '../stores/cars'
import { useRoute } from 'vue-router'


const route = useRoute()
const store = useCarStore()


const { pending, error } = await useAsyncData('cars-list', () => store.fetchList())
const isTimeElapsed = ref(false)

onMounted(() => {
  onNuxtReady(() => {
    setTimeout(() => {
      isTimeElapsed.value = true
    }, 1000)
  })
})

const loading = computed(() => {
  if (isTimeElapsed.value === true) {
    return pending.value
  } else {
    return true
  }
})


const q = computed(() => {
  return route.query.q?.toString().toLowerCase() ?? ''
})

const year = computed(() => {
  return route.query.year ? Number(route.query.year) : undefined
})


const filtered = computed(() => {
  return store.list.filter((c) => {
    const matchesQ = q.value ? (c.make + ' ' + c.model).toLowerCase().includes(q.value) : true
    const matchesYear = year.value ? c.year === year.value : true
    return matchesQ && matchesYear
  })
})
</script>