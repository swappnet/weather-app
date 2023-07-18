<script setup lang="ts">
import { useSavedLocationsStore } from '@/stores/useSavedLocations';
import { useLocationStore } from '@/stores/useLocationStore';

import { storeToRefs } from 'pinia';
import Button from './Button.vue';
import { onMounted, ref, watch } from 'vue';

const savedLocationsStore = useSavedLocationsStore()
const locationStore = useLocationStore()

const { geoPoint } = storeToRefs(locationStore)
const { locations } = storeToRefs(savedLocationsStore);
const { addLocation, updateLocations, checkIfExist } = savedLocationsStore

const isFavorite = ref<Boolean>(false)

watch(locations, (newValue) => {
    localStorage.setItem('savedLocations', JSON.stringify(newValue))
})

const handleAddToFavorites = () => {
    const newLocation = {
        date: new Date(),
        geoPoint: geoPoint.value,
    };

    addLocation(newLocation)
};

</script>

<template>
    <button variant="transparent" @click="handleAddToFavorites"><font-awesome-icon icon="bookmark"
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

    background-color: transparent;
    color: #7D7D7D;

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