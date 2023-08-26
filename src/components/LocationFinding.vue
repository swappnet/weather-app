<script setup lang="ts">
import { useLocationStore } from '@/stores/useLocationStore'

import Button from '@/components/Button.vue'
import { reactive, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const locationStore = useLocationStore()

const location = reactive({
    loading: false,
})

const { initialLocationFounded } = storeToRefs(locationStore)
const { updateGeoPoint } = useLocationStore()

onMounted(() => {
    if (!initialLocationFounded.value) {
        handleLocationFind();

        locationStore.updateInitialLocationFounded(true)
    }

});


const handleLocationFind = async () => {
    location.loading = true;

    navigator.geolocation.getCurrentPosition(
        (position) => {
            updateGeoPoint({
                lat: Number(position.coords.latitude.toFixed(2)),
                lon: Number(position.coords.longitude.toFixed(2)),
            }

            )
            location.loading = false;

        },
        (error) => {
            updateGeoPoint({
                lat: 50.4501,
                lon: 30.5234,
            })
            location.loading = false;
            throw new Error('Error getting location: ' + error.message);
        }
    );
}

</script>

<template>
    <Button variant="filled" :disabled="location.loading" aria-label="Find location"
        @click="handleLocationFind()"><font-awesome-icon :icon="location.loading ? 'spinner' : 'location-arrow'"
            style="font-size:x-large;" :class="location.loading && 'spin'" class="find-location-button" /></Button>
</template>

<style scoped>
.find-location-button {
    width: 1.2rem;
    height: 1.7rem;
}
</style>