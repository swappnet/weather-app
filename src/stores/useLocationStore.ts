import type { GeoPoint } from '@/types/global/GeoPoint.types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const defaultLatLng = { lat: 50.4501, lon: 30.5234 }

export const useLocationStore = defineStore('location', () => {
  const geoPoint = ref<GeoPoint>(defaultLatLng)
  const initialLocationFounded = ref<Boolean>(false)

  const updateGeoPoint = (newGeoPoint: GeoPoint) => {
    geoPoint.value = newGeoPoint
  }

  const updateInitialLocationFounded = (state: Boolean) => {
    initialLocationFounded.value = state
  }

  return { geoPoint, updateGeoPoint, initialLocationFounded, updateInitialLocationFounded }
})
