<script setup lang="ts">
import LocationsList from '@/components/FavoritesList.vue'
import { useControlsStore } from '@/stores/useControlsStore';
import { Languages } from '@/types/global/Languages.types';
import { storeToRefs } from 'pinia';

const controlsStore = useControlsStore()
const { language } = storeToRefs(controlsStore)
</script>

<template>
    <header>
        <h1>{{ language === Languages.english ? 'Saved locations' : language ===
            Languages.ukrainian && "Збережені локації" }}</h1>
        <p>{{ language === Languages.english ? 'Maximum 5 location' : language ===
            Languages.ukrainian && "Максимально 5 локацій" }}</p>
    </header>
    <main>
        <LocationsList />
    </main>
</template>

<style scoped>
h1 {
    font-display: optional;
    font-family: Inter, sans-serif;
    color: #434343;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.95px;
}

p {
    font-display: optional;
    font-family: Roboto, sans-serif;
    color: #797979;
    font-size: .9rem;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.06px;
}
</style>
