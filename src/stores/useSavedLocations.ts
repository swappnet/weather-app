import type { GeoPoint } from '@/types/global/GeoPoint.types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSavedLocationsStore = defineStore('location', () => {
  const locations = ref<{ date: Date; geoPoint: GeoPoint }[]>([])

  function updateLocations(newLocations: { date: Date; geoPoint: GeoPoint }[]) {
    locations.value = newLocations
  }

  return { locations, updateLocations }
})
