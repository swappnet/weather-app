<script setup lang="ts">
import { onMounted, ref } from 'vue';

import Button from '@/components/Button.vue'
import { useLocationStore } from '@/stores/useLocationStore';
import { storeToRefs } from 'pinia';
import { useControlsStore } from '@/stores/useControlsStore';
import { Languages } from '@/types/global/Languages.types';

enum PlotMode {
    Day,
    Week
}

const locationStore = useLocationStore()
const { geoPoint } = storeToRefs(locationStore)
const controlsStore = useControlsStore()
const { language } = storeToRefs(controlsStore)

const plotMode = ref<PlotMode>(PlotMode.Day)
const weatherData = ref<any | null>(null);


const changePlotMode = async (mode: PlotMode) => {
    plotMode.value = mode;

    fetchForecast()
};

const fetchForecast = async () => {
    if (geoPoint.value) {
        try {
            const apiKey = import.meta.env.VITE_API_KEY;
            const latitude = geoPoint.value.lat;
            const longitude = geoPoint.value.lon;
            const baseUrl = 'https://api.openweathermap.org/data/2.5';
            const units = 'metric';

            if (plotMode.value === PlotMode.Day) {
                const url = `${baseUrl}/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,alerts,daily,&units=${units}&appid=${apiKey}`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Failed to fetch weather forecast.')
                }

                const data = await response.json();
                weatherData.value = data;
            } else if (plotMode.value === PlotMode.Week) {
                const url = `${baseUrl}/forecast?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Failed to fetch weather forecast.')
                }

                const data = await response.json();
                weatherData.value = data;
            }
        } catch (err) {
            throw new Error('Failed to fetch weather forecast.')
        }

    }
}

onMounted(() => {
    // Fetch initial data on component mount (hourly/day forecast by default)
    changePlotMode(plotMode.value);
});

</script>

<template>
    <section>
        <header>
            <Button variant="plot" :title="language === Languages.english ? 'Day' : 'День'"
                :disabled="plotMode === PlotMode.Day" @click="changePlotMode(PlotMode.Day)">{{ language ===
                    Languages.english ? 'Day' : "День" }}</Button>
            <Button variant="plot" :title="language === Languages.english ? 'Week' : 'Тиждень'"
                :disabled="plotMode === PlotMode.Week" @click="changePlotMode(PlotMode.Week)">{{ language ===
                    Languages.english ? 'Week' : "Тиждень" }}</Button>
        </header>
        <div v-if="weatherData">
            <div v-if="plotMode === PlotMode.Day">
                <!-- Display hourly/day forecast data -->
                <ul>
                    <li v-for="hourlyData in weatherData.hourly" :key="hourlyData.dt">
                        {{ new Date(hourlyData.dt * 1000).toLocaleTimeString() }} - {{ hourlyData.weather[0].description }}
                    </li>
                </ul>
            </div>
            <div v-else-if="plotMode === PlotMode.Week">
                <!-- Display weekly forecast data -->
                <ul>
                    <li v-for="dailyData in weatherData.daily" :key="dailyData.dt">
                        {{ new Date(dailyData.dt * 1000).toLocaleDateString() }} - {{ dailyData.weather[0].description }}
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<style scoped>
section {
    width: 100%;
    border-radius: 12px;
    background: #F7F7F7;
    padding: 0.5rem;
    margin-top: 2.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: .75rem;
    margin-bottom: 1.5rem;
}
</style>