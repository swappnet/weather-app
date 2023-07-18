<script setup lang="ts">
import { useLocationStore } from '@/stores/useLocationStore';
import { useSavedLocationsStore } from '@/stores/useSavedLocations';

import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import Button from './Button.vue';

const savedLocationsStore = useSavedLocationsStore()
const locationStore = useLocationStore()

const { geoPoint } = storeToRefs(locationStore)
const { locations } = storeToRefs(savedLocationsStore);
const { addLocation, checkIfExist } = savedLocationsStore

const isFavorite = ref<Boolean>(false)

onMounted(() => {
    isFavorite.value = checkIfExist(geoPoint.value);
});

watch(locations, (newValue) => {
    if (newValue) {
        localStorage.setItem('savedLocations', JSON.stringify(newValue))

        isFavorite.value = checkIfExist(geoPoint.value)
    }

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
    <button variant="transparent" @click="handleAddToFavorites"
        :style="{ color: isFavorite && '#FFD700' }"><font-awesome-icon icon="bookmark" style="font-size:x-large;"
            title="Save location" /></button>
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