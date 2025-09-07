import { defineStore } from 'pinia'
import type { CarBasic, CachedCarDetails } from '~/types/car'

export const useCarStore = defineStore('cars', {
  state: () => ({
    list: [] as CarBasic[],
    details: {} as Record<number, CachedCarDetails>
  }),
  actions: {
    async fetchList() {
      if (this.list.length) return this.list
      const data = await $fetch<CarBasic[]>('/api/cars')
      this.list = data
      return this.list
    },

    async fetchDetails(id: number) {
      if (this.details[id]?.data || this.details[id]?.loading) return
      const car = this.list.find((c) => c.id === id)
      if (!car) throw new Error('Car not found')

      this.details[id] = { loading: true }
      try {
        const data = await $fetch(`/api/car-details/${car.make.toLowerCase()}/${car.year}`)
        this.details[id] = { loading: false, data }
      } catch (err: any) {
        this.details[id] = { loading: false, error: String(err?.message ?? err) }
      }
    }
  },
  persist: true
})
