<template>
<nuxt-link :to="`/car/${car.id}`" class="block p-4 border rounded hover:shadow">
<div class="flex items-center gap-4">
<img :src="imageUrl" alt="photo" class="w-32 h-20 object-cover rounded" />
<div>
<h3 class="font-semibold">{{ car.make }} {{ car.model }}</h3>
<div class="text-sm text-gray-600">Год: {{ car.year }}</div>
</div>
</div>
</nuxt-link>
</template>


<script setup lang="ts">
import type { CarBasic } from '~/types/car'
const props = defineProps<{ car: CarBasic }>()


const imageUrl = computed(() => {
// Простая подмена фотографий через Unsplash Source — не требует ключа
return `https://source.unsplash.com/400x300/?${encodeURIComponent(props.car.make + ' ' + props.car.model)}`
})
</script>


<style scoped>
/* небольшие стили через Tailwind лучше, но можно дописать */
</style>