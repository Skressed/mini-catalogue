<template>
  <div class="p-6 max-w-3xl mx-auto">
    <NuxtLink to="/" class="text-sm text-blue-600">← К списку</NuxtLink>

    <div v-if="!car" class="py-10 text-center">
      Автомобиль не найден. Подгружаю список...
    </div>

    <div v-else class="mt-4">
      <h1 class="text-2xl font-bold text-center">
        {{ car.make }} {{ car.model }}
        <span class="text-gray-600">({{ car.year }})</span>
      </h1>

      <!-- <img
        :src="imageUrl"
        :alt="`Фото ${car.make} ${car.model}`"
        class="w-full h-60 object-cover mt-4 rounded"
      /> -->

      <div class="mt-4 text-left">
        <div v-if="detailsLoading" class="py-4">Загружаем расширенную информацию...</div>

        <div v-else-if="detailsError" class="text-red-600 py-4">Ошибка: {{ detailsError }}</div>

        <div v-else-if="hasTrims">
          <h2 class="font-semibold mt-2 mb-1">Доступные комплектации (Trims) (можно развернуть кликом или ховером):</h2>
          <ul @click="toggleTrims" class="bg-gray-100 rounded list-disc pl-5 h-[140px] hover:h-auto overflow-hidden" :class="{'!h-auto': isTrimslistExpanded}">
            <li v-for="(t, idx) in detailsTrims" :key="idx">
              {{ trimLabel(t) }}
            </li>
          </ul>
        </div>

        <div v-else class="text-gray-600">Нет расширенной информации.</div>

        <div v-if="detailsData" class="mt-4">
          <h3 class="font-medium mb-2">RAW data (debug):</h3>
          <pre class="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-64">
            {{ JSON.stringify(detailsData, null, 2) }}
          </pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCarStore } from '~/stores/cars'
import type { CarBasic } from '~/types/car'

const route = useRoute()
const id = Number(route.params.id)
const store = useCarStore()

const car = computed<CarBasic | undefined>(() => store.list.find((c) => c.id === id))

const detailsState = computed(() => store.details[id] ?? { loading: false })
const detailsLoading = computed(() => Boolean(detailsState.value.loading))
const detailsError = computed(() => detailsState.value.error)
const detailsData = computed(() => detailsState.value.data as any | undefined)

const detailsTrims = computed(() => {
  const d = detailsData.value
  return d?.Trims ?? d?.trims ?? d?.TrimsList ?? []
})
const hasTrims = computed(() => Array.isArray(detailsTrims.value) && detailsTrims.value.length > 0)

// const imageUrl = computed(() => {
  // if (!car.value) return ''
  // return `https://api.carsxe.com/vehicle-images?make=${car.value.make}&model=${car.value.model}&year=2020&color=red&angle=front`;
  // return `https://source.unsplash.com/1000x600/?${encodeURIComponent(car.value.make + ' ' + car.value.model)}`
// })

function trimLabel(t: any) {
  return t.model_trim || t.trim_name || t.model_name || t.name || JSON.stringify(t)
}

// При монтировании — если локального списка нет, подгружаем его, затем запрашиваем детали
onMounted(async () => {
  try {
    if (!car.value) {
      await store.fetchList()
    }
    // даже если details уже есть — fetchDetails сам проверит кеш
    await store.fetchDetails(id)
  } catch (err) {
    console.error('Error loading car details:', err)
  }
})

const isTrimslistExpanded = ref(false)
const toggleTrims = () => isTrimslistExpanded.value = !isTrimslistExpanded.value
</script>
