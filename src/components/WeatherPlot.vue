<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

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
const weekData = ref<any | null>(null);
const hourlyData = ref<any | null>(null);

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
        } catch (err) {
            throw new Error('Failed to fetch weather forecast.')
        }

    }
}
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
                <ul>
                    <li v-for="data in hourlyData" :key="data.dt">
                        <p>{{ data.weather[0].id }}</p>
                        <p>{{ Math.round(parseFloat(data.main.temp) - 273.15) }}°C</p>
                        <p>
                            {{ new Date(data.dt * 1000).toLocaleString('en-GB', {
                                hour: '2-digit',
                                minute: '2-digit',
                            }) }}
                        </p>
                        <p>
                            {{ new Date(data.dt * 1000).toLocaleString('en-GB', {
                                month: 'short',
                                day: '2-digit'
                            }) }}
                        </p>
                    </li>
                </ul>
            </div>
            <div v-else-if="plotMode === PlotMode.Week">
                <ul>
                    <li v-for="data in fiveDayData" :key="data.dt">
                        <p>{{ data.weather[0].id }}</p>
                        <p>{{ Math.round(parseFloat(data.main.temp) - 273.15) }}°C</p>
                        <p>
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

ul {
    display: flex;
    gap: 3rem;
}
</style>