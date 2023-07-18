
<script setup lang="ts">
import { useSavedLocationsStore } from '@/stores/useSavedLocations';
import { storeToRefs } from 'pinia';

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
            <li v-for="(location, index) in locations" :key="index">
                {{ location.date }} - {{ location.geoPoint }}
            </li>
        </ul>
        <p v-else>
            No locations available.
        </p>
    </section>
</template>

<style scoped>
section {
    margin-top: 2rem;
}
</style>