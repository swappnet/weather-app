<script setup lang="ts">

import { reactive, ref } from 'vue';

import LocationFinding from '@/components/LocationFinding.vue'
import { useLocationStore } from '@/stores/useLocationStore';

interface GeoResponse {
    lat: number
    lon: number
    display_name?: string
}

const resultsRef = ref<HTMLDivElement>(null)
const locationStore = useLocationStore()

const geocoder = reactive({
    loading: false,
    resultsOpen: false,
    query: '',
    results: [] as GeoResponse[],
    errMsg: '',
})

const handleResultSelect = (result: GeoResponse) => {
    const { lat, lon } = result;

    locationStore.updateGeoPoint({ lat, lon })

    geocoder.resultsOpen = false
}

const searchLocation = () => {
    let timer: ReturnType<typeof setTimeout>

    if (geocoder.query.length >= 3) {
        timer = setTimeout(() => {
            fetchGeoData()
        }, 300)
    } else if (geocoder.query.length < 3) {
        geocoder.resultsOpen = false;
        geocoder.loading = false
        geocoder.results = []
    }

    return () => clearTimeout(timer)
}

const fetchGeoData = async () => {
    try {
        // public API
        let url = `https://geocode.maps.co/search?q=${geocoder.query}`

        geocoder.loading = true

        const response = await fetch(url)

        if (!response.ok) {
            geocoder.errMsg = `HTTP error! Status: ${response.status}.`
            geocoder.resultsOpen = false;
            geocoder.loading = false
        }
        const data = await response.json()

        if (data.length > 0) {
            geocoder.results = data;
            geocoder.resultsOpen = true;
        }

    } catch (error) {
        geocoder.errMsg = `An error occurred while searching location.`
    }
}


</script>

<template>
    <div class="location-search-wrapper">
        <div class="location-geocoder-wrapper">
            <font-awesome-icon icon="search" style="font-size:large;" class="geocoder-icon" />
            <input class="geocoder-input" placeholder="Search location .." title="Search location" v-model="geocoder.query"
                @input="searchLocation()" />

            <div v-if="geocoder.resultsOpen && geocoder.results.length > 0" class="geocoder-results-wrapper"
                ref="resultsRef">
                <button v-for="(result, index) in geocoder.results.slice(0, 4)" :key="index" :title="result.display_name"
                    @click="handleResultSelect(result)">
                    {{ result.display_name }}
                </button>
            </div>
        </div>
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

.geocoder-results-wrapper {
    width: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #EFFFDF;
    padding: .25rem;
    border-radius: 8px;
    top: 2.2rem;
    gap: .25rem;
}

.geocoder-results-wrapper button {
    width: 100%;
    padding: .5rem;
    padding-top: .75rem;
    background-color: transparent;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-family: Roboto, sans-serif;
    font-weight: 500;

    &:hover,
    &:focus {
        background-color: #e0fac6;
    }
}
</style>