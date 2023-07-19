<script setup lang="ts">
import { useControlsStore } from '@/stores/useControlsStore';
import Button from './Button.vue';
import { storeToRefs } from 'pinia';
import { Languages } from '@/types/global/Languages.types';

const controlsStore = useControlsStore()
const { changeLanguage } = useControlsStore()

const { language } = storeToRefs(controlsStore)

const switchLanguage = (newLanguage: Languages) => {
    changeLanguage(newLanguage)
}

</script>

<template>
    <div class="languages-wrapper">
        <Button variant="transparent" title="EN" @click="switchLanguage(Languages.english)" size="small"
            :disabled="language === Languages.english">EN</Button>
        <Button variant="transparent" title="UKR" @click="switchLanguage(Languages.ukrainian)" size="small"
            :disabled="language === Languages.ukrainian">UKR</Button>
    </div>
</template>

<style scoped>
.languages-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .25rem;
    margin-left: auto;
}
</style>