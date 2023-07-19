<script setup lang="ts">

import LocationFinding from '@/components/LocationFinding.vue'
import Geocoder from '@/components/Geocoder.vue'



</script>

<template>
    <div class="location-search-wrapper">
        <Geocoder />
        <LocationFinding />
    </div>
</template>

<style scoped>
.location-search-wrapper {
    width: 100%;
    max-width: 25rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: .75rem;
}
</style>