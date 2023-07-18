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
    return locations.value.some((loc) => loc.geoPoint === geoPoint)
  }

  const addLocation = (newLocation: { date: Date; geoPoint: GeoPoint }) => {
    if (checkIfExist(newLocation.geoPoint)) {
      removeLocation(newLocation.geoPoint)

      return true
    }

    if (locations.value.length < 5) {
      // Add the new location to the savedLocationsStore
      updateLocations([...locations.value, newLocation])
      return true // Location added successfully
    } else {
      return false // Cannot add more than 5 locations
    }
  }

  return { locations, updateLocations, addLocation, checkIfExist, removeLocation }
})
