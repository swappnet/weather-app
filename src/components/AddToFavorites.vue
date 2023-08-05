<script setup lang="ts">
import { useLocationStore } from '@/stores/useLocationStore';
import { useSavedLocationsStore } from '@/stores/useSavedLocations';

import { useControlsStore } from '@/stores/useControlsStore';
import { Languages } from '@/types/global/Languages.types';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import Button from './Button.vue';

const savedLocationsStore = useSavedLocationsStore()
const locationStore = useLocationStore()

const { geoPoint } = storeToRefs(locationStore)
const { locations } = storeToRefs(savedLocationsStore);
const { addLocation, checkIfExist } = savedLocationsStore
const controlsStore = useControlsStore()
const { language } = storeToRefs(controlsStore)

const isFavorite = ref<Boolean>(false)

onMounted(() => {
    if (geoPoint.value) {
        isFavorite.value = checkIfExist(geoPoint.value);
    }
    if (geoPoint) {
        watch(geoPoint, (newGeoPoint) => {
            if (newGeoPoint) {
                isFavorite.value = checkIfExist(newGeoPoint);
            }
        });
    }
});

const handleAddToFavorites = () => {
    if (!geoPoint.value) {
        return
    }

    if (locations.value.length > 4 && !checkIfExist(geoPoint.value)) {
        window.alert("You cannot add more than 5 locations.");
        return;
    }

    if (geoPoint.value) {
        const newLocation = {
            date: new Date(),
            geoPoint: geoPoint.value,
        };

        isFavorite.value = !isFavorite.value;
        addLocation(newLocation)
    }

};

</script>

<template>
    <button variant="transparent" @click="handleAddToFavorites" :style="{ color: isFavorite ? '#FFD700' : '#c2c2c2' }"
        :aria-label="language ===
            Languages.english ? 'Save location' : 'Зберегти локацію'"><font-awesome-icon icon="bookmark"
            style="font-size:x-large;" /></button>
</template>

<style scoped>
button {
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
    outline: none;
    padding: .25rem;
    width: 1.7rem;
    height: 2.25rem;
    background-color: transparent;

    &:hover {
        background-color: #f7f7f7;
        color: #777777;
    }

    &:focus {
        background-color: #f7f7f7;
        color: #777777;
    }

    &:active {
        background-color: #fafafa;
        color: #7D7D7D;
    }

}
</style>