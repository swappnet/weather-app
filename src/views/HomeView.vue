<script setup lang="ts">
import LocationSearch from '@/components/LocationSearch.vue';
import AddToFavorites from '@/components/AddToFavorites.vue';
import CurrentWeather from '@/components/CurrentWeather.vue'
import WeatherPlot from '@/components/WeatherPlot.vue'
</script>

<template>
    <header>
        <LocationSearch />
        <AddToFavorites />
    </header>
    <main>
        <CurrentWeather />
        <WeatherPlot />
    </main>
</template>

<style scoped>
header {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: .5rem;
}

main {
    width: 100%;
}
</style>
