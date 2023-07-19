<script setup lang="ts">
import { ref } from 'vue';

enum PlotMode {
    Day,
    Week
}

const plotMode = ref<PlotMode>(PlotMode.Day)

</script>

<template>
    <section></section>
</template>

<style scoped>
section {
    width: 100%;
    border-radius: 12px;
    background: #F7F7F7;
    padding: 0.5rem;
    margin-top: 2.25rem;
}
</style>