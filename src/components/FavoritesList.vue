
<script setup lang="ts">
import { useSavedLocationsStore } from '@/stores/useSavedLocations';
import { storeToRefs } from 'pinia';

import FavoriteLocationCard from '@/components/FavoriteLocationCard.vue';
import { useControlsStore } from '@/stores/useControlsStore';
import { Languages } from '@/types/global/Languages.types';

const savedLocationsStore = useSavedLocationsStore()
const { locations } = storeToRefs(savedLocationsStore);
const { updateLocations } = savedLocationsStore


const savedData = localStorage.getItem('savedLocations')
if (savedData) {
    updateLocations(JSON.parse(savedData))
}

const controlsStore = useControlsStore()
const { language } = storeToRefs(controlsStore)

</script>

<template>
    <section>
        <ul v-if="locations.length">
            <FavoriteLocationCard v-for="location in locations" :key="location.date.toString()" :location="location" />
        </ul>
        <p v-else class="list-not-found">
            {{ language === Languages.english ? 'No locations available.' : "Немає доступних локацій." }}
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