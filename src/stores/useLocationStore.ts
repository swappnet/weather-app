import type { GeoPoint } from '@/types/global/GeoPoint.types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const defaultLatLng = { lat: 50.4501, lng: 30.5234 }

export const useLocationStore = defineStore('location', () => {
  const latLng = ref<GeoPoint>(defaultLatLng)

  function updateGeoPoint(newGeoPoint: GeoPoint) {
    latLng.value = newGeoPoint
  }

  return { latLng, updateGeoPoint }
})
