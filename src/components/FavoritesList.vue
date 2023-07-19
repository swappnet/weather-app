
<script setup lang="ts">
import { useSavedLocationsStore } from '@/stores/useSavedLocations';
import { storeToRefs } from 'pinia';

import FavoriteLocationCard from '@/components/FavoriteLocationCard.vue'

const savedLocationsStore = useSavedLocationsStore()
const { locations } = storeToRefs(savedLocationsStore);
const { updateLocations } = savedLocationsStore

const savedData = localStorage.getItem('savedLocations')
if (savedData) {
    updateLocations(JSON.parse(savedData))
}

</script>

<template>
    <section>
        <ul v-if="locations.length">
            <FavoriteLocationCard v-for="(location, index) in locations" :key="index" :location="location" />
        </ul>
        <p v-else class="list-not-found">
            No locations available.
        </p>
    </section>
</template>

<style scoped>
section {
    margin-top: 2rem;
}

ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 1rem;
}

.list-not-found {
    font: optional;
    font-family: Roboto, sans-serif;
    color: rgba(67, 67, 67, 1);
    font-weight: 400;
}
</style>