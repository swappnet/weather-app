<script setup lang="ts">
import { ref } from 'vue';

import Button from '@/components/Button.vue'

enum PlotMode {
    Day,
    Week
}

const plotMode = ref<PlotMode>(PlotMode.Day)

const changePlotMode = (mode: PlotMode) => {
    plotMode.value = mode
}

</script>

<template>
    <section>
        <header>
            <Button variant="plot" :disabled="plotMode === PlotMode.Day" @click="changePlotMode(PlotMode.Day)">Day</Button>
            <Button variant="plot" :disabled="plotMode === PlotMode.Week"
                @click="changePlotMode(PlotMode.Week)">Week</Button>
        </header>
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