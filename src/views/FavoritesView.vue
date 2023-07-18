<script setup lang="ts">
import LocationsList from '@/components/LocationsList.vue'
</script>

<template>
    <header>
        <h1>Saved locations</h1>
        <p>Maximum 5 location</p>
    </header>
    <main>
        <LocationsList />
    </main>
</template>

<style scoped>
h1 {
    font-family: Inter, sans-serif;
    color: #434343;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.95px;
}

p {
    font-family: Roboto, sans-serif;
    color: #797979;
    font-size: .9rem;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.06px;
}
</style>
