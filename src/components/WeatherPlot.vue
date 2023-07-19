<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

import Button from '@/components/Button.vue'
import { useLocationStore } from '@/stores/useLocationStore';
import { storeToRefs } from 'pinia';
import { useControlsStore } from '@/stores/useControlsStore';
import { Languages } from '@/types/global/Languages.types';
import { getWeatherIconName } from '@/utils/getWeatherIconName';

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
const weekData = ref<any | null>(null);
const hourlyData = ref<any | null>(null);
const isLoading = ref<Boolean>(true)

onMounted(() => {
    if (geoPoint.value) {
        fetchForecast();
    }
});

watch(geoPoint, () => {
    if (geoPoint.value) {
        fetchForecast()
    }
});

const fiveDayData = computed(() => {
    if (weekData.value) {
        return weekData.value.slice(0, 5);
    } else {
        return [];
    }
});

const changePlotMode = async (mode: PlotMode) => {
    plotMode.value = mode;
};

const fetchForecast = async () => {
    if (geoPoint.value) {
        try {
            const apiKey = import.meta.env.VITE_API_KEY;
            const latitude = geoPoint.value.lat;
            const longitude = geoPoint.value.lon;
            const baseUrl = 'https://api.openweathermap.org/data/2.5';

            const url = `${baseUrl}/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch weather forecast.')
            }

            const data = await response.json();
            weatherData.value = data

            const fiveDayData = data.list.filter((item: any) => item.dt_txt.includes('12:00:00'));
            const nearHoursData = data.list.slice(0, 10);

            hourlyData.value = nearHoursData
            weekData.value = fiveDayData;
            isLoading.value = false;
        } catch (err) {
            isLoading.value = false;
            throw new Error('Failed to fetch weather forecast.')
        }

    }
}
</script>

<template>
    <section>
        <header>
            <Button variant="plot" :title="language === Languages.english ? 'Hourly' : 'Погодинно'"
                :disabled="plotMode === PlotMode.Day" @click="changePlotMode(PlotMode.Day)">{{ language ===
                    Languages.english ? 'Hourly' : "Погодинно" }}</Button>
            <Button variant="plot" :title="language === Languages.english ? '5 Days' : ' 5 Днів'"
                :disabled="plotMode === PlotMode.Week" @click="changePlotMode(PlotMode.Week)">{{ language ===
                    Languages.english ? '5 Days' : "5 Днів" }}</Button>
        </header>
        <div v-if="isLoading" class="plot-main-wrapper">
            <div class="plot-list">
                <div v-for="index in 10" :key="index" class="skeleton" />
            </div>
        </div>
        <div v-else-if="weatherData" class="plot-main-wrapper">
            <div v-if="plotMode === PlotMode.Day">
                <ul class="plot-list">
                    <li v-for="data in hourlyData" :key="data.dt" class="plot-list-item">
                        <img alt="Weather icon" width="30" height="30" class="plot-icon"
                            :src="`../assets/weather/${getWeatherIconName(data.weather[0].id)}.svg`" />
                        <p class="plot-temp">{{ Math.round(parseFloat(data.main.temp) - 273.15) }}°C</p>
                        <p class="plot-date">
                            {{ new Date(data.dt * 1000).toLocaleString('en-GB', {
                                hour: '2-digit',
                                minute: '2-digit',
                            }) }}
                        </p>
                        <p class="plot-date-day">
                            {{ new Date(data.dt * 1000).toLocaleString('en-GB', {
                                month: 'short',
                                day: '2-digit'
                            }) }}
                        </p>


                    </li>
                </ul>
            </div>
            <div v-else-if="plotMode === PlotMode.Week">
                <ul class="plot-list">
                    <li v-for="data in fiveDayData" :key="data.dt" class="plot-list-item">
                        <img alt="Weather icon" width="30" height="30"
                            :src="`../assets/weather/${getWeatherIconName(data.weather[0].id)}.svg`" />
                        <p class="plot-temp">{{ Math.round(parseFloat(data.main.temp) - 273.15) }}°C</p>
                        <p class="plot-date">
                            {{ new Date(data.dt * 1000).toLocaleString('en-GB', {
                                month: 'short',
                                day: '2-digit'
                            }) }}
                        </p>
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
    justify-content: flex-start;
    flex-direction: column;
    height: 13rem;
}

div {
    width: 100%;
}



header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: .75rem;
    margin-bottom: 1.5rem;
}



.plot-list {
    max-width: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    overflow: auto;
    display: flex;
    padding-bottom: 1rem;
}

.plot-list::-webkit-scrollbar {
    display: none;
}

.plot-list-item {
    width: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font: optional;
    font-family: Inter, sans-serif;

}

.plot-temp {
    color: #434343;
    letter-spacing: -1px;
    font-weight: 600;
    font-size: 1rem;
    margin-top: .75rem;
}

.plot-date {
    margin-top: 1rem;
    font-size: .9rem;
}

.plot-date,
.plot-date-day {
    font-weight: 500;
    color: #6b6b6b;
}

.plot-date-day {
    font-size: .8rem;
    white-space: nowrap;
}

.skeleton {
    width: 3rem;
    height: 5rem;
    background: #fafafa;
    border-radius: 8px;
    animation: pulse 1.3s infinite;
}
</style>