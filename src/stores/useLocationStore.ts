import type { GeoPoint } from '@/types/global/GeoPoint.types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLocationStore = defineStore('location', () => {
  const geoPoint = ref<GeoPoint | null>(null)
  const initialLocationFounded = ref<Boolean>(false)

  const updateGeoPoint = (newGeoPoint: GeoPoint) => {
    geoPoint.value = newGeoPoint
  }

  const updateInitialLocationFounded = (state: Boolean) => {
    initialLocationFounded.value = state
  }

  return { geoPoint, updateGeoPoint, initialLocationFounded, updateInitialLocationFounded }
})
