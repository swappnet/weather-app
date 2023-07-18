<script setup lang="ts">

import { onBeforeMount, onMounted, reactive, ref } from 'vue';

import LocationFinding from '@/components/LocationFinding.vue'
import { useLocationStore } from '@/stores/useLocationStore';

interface GeoResponse {
    lat: number
    lon: number
    display_name?: string
}

const resultsRef = ref<HTMLDivElement>()
const locationStore = useLocationStore()

const geocoder = reactive({
    loading: false,
    resultsOpen: false,
    query: '',
    results: [] as GeoResponse[],
})

const handleResultSelect = (result: GeoResponse) => {
    const { lat, lon } = result;

    locationStore.updateGeoPoint({ lat, lon })

    geocoder.resultsOpen = false
    if (result.display_name) {
        geocoder.query = result.display_name
    }
}

const handleInputClick = () => {
    geocoder.query = ''
    geocoder.results = []
}

const searchLocation = async () => {
    let timer: ReturnType<typeof setTimeout>

    if (geocoder.query.length >= 3) {
        timer = setTimeout(async () => {
            await fetchGeoData()
        }, 400)
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
            geocoder.resultsOpen = false;
            geocoder.loading = false
            throw new Error(`HTTP error! Status: ${response.status}.`);
        }
        const data = await response.json()

        if (data.length > 0) {
            geocoder.results = data;
            geocoder.resultsOpen = true;
        }

    } catch (error) {
        throw new Error('An error occurred while searching location.');
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onBeforeMount(() => {
    document.removeEventListener('click', handleClickOutside);
});

const handleClickOutside = (event: MouseEvent) => {
    if (resultsRef.value && !resultsRef.value.contains(event.target as Node)) {
        geocoder.resultsOpen = false;
    }
};


</script>

<template>
    <div class="location-search-wrapper">
        <div class="location-geocoder-wrapper" @click="handleClickOutside">
            <font-awesome-icon icon="search" style="font-size:large;" class="geocoder-icon" />
            <input class="geocoder-input" placeholder="Search location .." title="Search location" v-model="geocoder.query"
                @input="searchLocation()" @click="handleInputClick" />

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
    padding: .5rem 1rem;
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
    left: .5rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: rgba(155, 155, 155, 0.575);
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
    top: 2.3rem;
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
    color: #313131;
    font-size: .9rem;

    &:hover,
    &:focus {
        background-color: #e0fac6;
    }
}
</style>