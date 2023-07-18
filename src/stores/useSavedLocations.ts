import type { GeoPoint } from '@/types/global/GeoPoint.types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSavedLocationsStore = defineStore('locations', () => {
  const locations = ref<{ date: Date; geoPoint: GeoPoint }[]>([])

  const updateLocations = (newLocations: { date: Date; geoPoint: GeoPoint }[]) => {
    locations.value = newLocations
  }

  const removeLocation = (geoPointToRemove: GeoPoint) => {
    const filteredLocations = locations.value.filter((loc) => loc.geoPoint !== geoPointToRemove)
    updateLocations(filteredLocations)
  }

  const checkIfExist = (geoPoint: GeoPoint) => {
    const exists = locations.value.some((loc) => loc.geoPoint === geoPoint)

    if (exists) {
      return true
    } else {
      return false
    }
  }

  const addLocation = (newLocation: { date: Date; geoPoint: GeoPoint }) => {
    const exists = locations.value.some((loc) => loc.geoPoint === newLocation.geoPoint)

    if (!exists) {
      // Check if there are fewer than 6 locations
      if (locations.value.length < 5) {
        // Add the new location to the savedLocationsStore
        updateLocations([...locations.value, newLocation])
        return true // Location added successfully
      } else {
        return false // Cannot add more than 5 locations
      }
    } else {
      removeLocation(newLocation.geoPoint)
    }
  }

  return { locations, updateLocations, addLocation, checkIfExist, removeLocation }
})
