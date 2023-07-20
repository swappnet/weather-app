<script setup lang="ts">
import router from '@/router';
import { useControlsStore } from '@/stores/useControlsStore';
import { useLocationStore } from '@/stores/useLocationStore';
import { useSavedLocationsStore } from '@/stores/useSavedLocations';
import { type GeoPoint } from '@/types/global/GeoPoint.types';
import { Languages } from '@/types/global/Languages.types';
import { convertTemperature } from '@/utils/convertTemperature';
import { getWeatherIconName } from '@/utils/getWeatherIconName';
import { storeToRefs } from 'pinia';
import { onBeforeMount, onMounted, ref } from 'vue';

type CardProps = {
    location: {
        date: Date;
        geoPoint: GeoPoint
    }
}

const editMenuRef = ref<HTMLDivElement>()
const { location } = defineProps<CardProps>()


const { removeLocation } = useSavedLocationsStore()
const { updateGeoPoint } = useLocationStore()
const controlsStore = useControlsStore()
const { language } = storeToRefs(controlsStore)


const isLoading = ref<Boolean>(true)
const isMenuOpen = ref<Boolean>(false)
const weatherData = ref<any>(null);

onMounted(() => {
    if (location.geoPoint) {
        fetchCurrentWeather(location.geoPoint)
    }
    document.addEventListener('click', handleClickOutside);
})

onBeforeMount(() => {
    document.removeEventListener('click', handleClickOutside);
});

const handleEditMenuOpen = () => {
    isMenuOpen.value = !isMenuOpen.value;
}

const handleClickOutside = (event: MouseEvent) => {
    if (editMenuRef.value && !editMenuRef.value.contains(event.target as Node)) {
        isMenuOpen.value = false;
    }
};

const handleLocationRemove = () => {
    const isConfirmed = window.confirm(language.value ===
        Languages.english ? 'Are you sure you want to delete location?' : 'Ви впевнені що хочете видалити збережену локацію?')
    if (location.geoPoint && isConfirmed) {
        removeLocation(location.geoPoint)
    } else if (!isConfirmed) {
        isMenuOpen.value = false;
    }
}

const handleLocationOpen = () => {
    if (location.geoPoint) {
        updateGeoPoint(location.geoPoint)
        router.push('/')
    }
}

const fetchCurrentWeather = async (geoPoint: GeoPoint) => {
    if (geoPoint) {
        const apiKey = import.meta.env.VITE_API_KEY;
        const latitude = geoPoint.lat;
        const longitude = geoPoint.lon;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const data = await response.json();
            weatherData.value = data;
            isLoading.value = false;
        } catch (error) {
            isLoading.value = false;
            throw new Error('Can not load weather right now.');
        }
    }

};

</script>

<template>
    <li v-if="isLoading" class="skeleton" />
    <li v-else class="card-wrapper">
        <div><img alt="Weather icon" class="weather-image" width="40" height="40"
                :src="`../assets/weather/${getWeatherIconName(weatherData.weather[0].id)}.svg`" /></div>
        <h2 class="card-city">{{ weatherData.name }}</h2>
        <div class="card-info-wrapper">
            <p class="info-temp">{{ convertTemperature(weatherData.main.temp) }}°C</p>
        </div>
        <div class="card-edit-wrapper" ref="editMenuRef">
            <button variant="transparent" @click="handleEditMenuOpen" class="edit-menu-button"
                title="Edit menu"><font-awesome-icon icon="ellipsis-vertical" style="font-size:large;" /></button>
            <div v-if="isMenuOpen" class="edit-menu">
                <button class="menu-button danger" :title="language ===
                    Languages.english ? 'Remove' : 'Видалити'" @click="handleLocationRemove">{{ language ===
        Languages.english ? 'Remove' : "Видалити" }}
                    <font-awesome-icon icon="remove" style="font-size:large;" /></button>
                <button class="menu-button" :title="language ===
                    Languages.english ? 'Open' : 'Відкрити'" @click="handleLocationOpen">{{ language ===
        Languages.english ? 'Open' : "Відкрити" }}<font-awesome-icon icon="arrow-right"
                        style="font-size:large;" /></button>
            </div>
        </div>
    </li>
</template>

<style scoped>
li {
    max-width: 25rem;
    width: 100%;
    list-style: none;
    border-radius: 8px;
    height: 5rem;
}

.card-wrapper {
    padding: .5rem;
    border: 1px solid #FFF;
    background: #F7F7F7;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: .5rem;
}

.card-city {
    color: #434343;
    font: optional;
    font-family: Inter, sans-serif;
    font-size: 1.1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.9px;
    padding-left: .5rem;
}

.card-info-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: .25rem;
    margin-left: auto;
    margin-right: .75rem;
}

.info-temp {
    color: #434343;
    font: optional;
    font-family: Inter, sans-serif;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.99px;
}

.card-edit-wrapper {
    position: relative;
    align-self: flex-start;
}

.skeleton {
    background-color: #ececec6b;
    animation: pulse 1.3s infinite;
}

.edit-menu-button {
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
    outline: none;
    padding: .25rem;
    width: 1.7rem;
    height: 2.25rem;
    background-color: transparent;
    color: #424242;

    &:hover {
        background-color: #f3f3f3;
        color: #777777;
    }

    &:focus {
        background-color: #f3f3f3;
        color: #777777;
    }

    &:active {
        background-color: rgb(247, 247, 247);
        color: #424242;
    }

}

.edit-menu {
    position: absolute;
    width: 7rem;
    padding: .25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ebebeb;
    border-radius: 8px;
    top: 2.5rem;
    right: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 20;
    gap: .15rem;
}

.menu-button {
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
    outline: none;
    padding: .25rem;
    width: 100%;
    height: 2.25rem;
    background-color: transparent;
    color: #424242;
    font-weight: 500;
    font-size: .9rem;
    font: optional;
    font-family: Roboto, sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .25rem;

    &:hover {
        background-color: #f3f3f3;
    }

    &:focus {
        background-color: #f3f3f3;
    }

    &:active {
        background-color: rgb(247, 247, 247);
    }
}

.danger {
    color: rgb(255, 44, 44);
}
</style>