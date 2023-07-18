<script setup lang="ts">
import { useLocationStore } from '@/stores/useLocationStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';

const locationStore = useLocationStore()
const { geoPoint } = storeToRefs(locationStore)

const isLoading = ref<Boolean>(true)
const weatherData = ref<any>(null);

onMounted(() => {
    fetchCurrentWeather()
})

watch(geoPoint, () => {
    fetchCurrentWeather();
});

const fetchCurrentWeather = async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const latitude = geoPoint.value.lat;
    const longitude = geoPoint.value.lon;
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
};

</script>

<template>
    <section>
        <div v-if="isLoading">Loading ...</div>
        <div v-else>
            <div v-if="weatherData">
                <p>{{ weatherData.name }}</p>
                <p>{{ Math.round(parseFloat(weatherData.main.temp) - 273.15) }}°C</p>
                <p>{{ weatherData.weather[0].description }}</p>
            </div>
            <div v-else>No weather data available.</div>
        </div>
    </section>
</template>

<style scoped>
section {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 6rem;
}
</style>