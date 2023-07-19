import type { GeoPoint } from '@/types/global/GeoPoint.types'
import { isEqualGeoPoint } from '@/utils/isEqualGeoPoint'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useSavedLocationsStore = defineStore('locations', () => {
  const locations = ref<{ date: Date; geoPoint: GeoPoint }[]>([])

  const loadLocationsFromLocalStorage = () => {
    const savedLocations = localStorage.getItem('savedLocations')
    if (savedLocations) {
      locations.value = JSON.parse(savedLocations)
    }
  }

  watch(locations, (newLocations) => {
    localStorage.setItem('savedLocations', JSON.stringify(newLocations))
  })

  const updateLocations = (newLocations: { date: Date; geoPoint: GeoPoint }[]) => {
    locations.value = newLocations
  }

  const removeLocation = (geoPointToRemove: GeoPoint) => {
    const updatedLocations = locations.value.filter(
      (loc) => !isEqualGeoPoint(loc.geoPoint, geoPointToRemove)
    )

    localStorage.setItem('savedLocations', JSON.stringify(updatedLocations))

    locations.value = updatedLocations
  }

  const checkIfExist = (geoPoint: GeoPoint) => {
    return locations.value.some((loc) => isEqualGeoPoint(loc.geoPoint, geoPoint))
  }

  const addLocation = (newLocation: { date: Date; geoPoint: GeoPoint }) => {
    if (checkIfExist(newLocation.geoPoint)) {
      removeLocation(newLocation.geoPoint)
      return
    }

    if (locations.value.length < 5) {
      updateLocations([...locations.value, newLocation])
      return
    }
  }

  loadLocationsFromLocalStorage()

  return { locations, updateLocations, addLocation, checkIfExist, removeLocation }
})
