<script setup lang="ts">
import { useLocationStore } from '@/stores/useLocationStore'

const { updateGeoPoint } = useLocationStore()

function updateLocation() {
    const newGeoPoint = { lat: 40.7128, lng: -74.0060 } // Example new location (New York City)
    updateGeoPoint(newGeoPoint)
}



</script>

<template>
    <div>

    </div>
</template>