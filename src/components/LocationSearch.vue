<script setup lang="ts">
import { useLocationStore } from '@/stores/useLocationStore'

import Button from '@/components/Button.vue'
import { reactive } from 'vue';
import { onMounted } from 'vue';

const locationStore = useLocationStore()

const location = reactive({
    loading: false,
    errMsg: '',
})
const geocoder = reactive({
    loading: false,
    resultsOpen: false,
    query: '',
    results: [] as any,
    errMsg: '',
})

const handleInputClick = () => {
}

const handleLocationFind = async () => {
    location.loading = true;

    navigator.geolocation.getCurrentPosition(
        (position) => {
            locationStore.updateGeoPoint({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            }

            )
            location.loading = false;

        },
        (error) => {
            location.loading = false;
            location.errMsg = 'Error getting location: ' + error.message;
        }
    );


}

onMounted(() => {
    handleLocationFind();
});

const searchLocation = (query: string) => {
}


</script>

<template>
    <div class="location-search-wrapper">
        <div class="location-geocoder-wrapper">
            <font-awesome-icon icon="search" style="font-size:large;" class="geocoder-icon" />
            <input class="geocoder-input" placeholder="Search location .." title="Search location" v-model="geocoder.query"
                @input="searchLocation(geocoder.query)" />
        </div>
        <Button variant="transparent" :disabled="location.loading" title="Find your location"
            @click="handleLocationFind()"><font-awesome-icon :icon="location.loading ? 'spinner' : 'location-arrow'"
                style="font-size:x-large;" :class="location.loading && 'spin'" class="find-location-button" /></Button>
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

.location-geocoder-wrapper {
    width: 100%;
    position: relative;
}

.geocoder-input {
    padding: .4rem 1rem;
    padding-left: 2rem;
    border-radius: 8px;
    border: none;
    background-color: #DEFFBC;
    font-family: Roboto, sans-serif;
    font-weight: 500;
    font-size: 1.015rem;
    width: 100%;
    color: #313131;
    transition: all .3s;

    &:hover,
    &:focus {
        background-color: #E8FFD0;
    }

    &::placeholder {
        color: rgba(0, 0, 0, 0.479);
    }
}

.geocoder-icon {
    position: absolute;
    left: .25rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: rgba(102, 102, 102, 1);

}


.find-location-button {
    width: 1.2rem;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.spin {
    animation: spin 1s linear infinite;
}
</style>