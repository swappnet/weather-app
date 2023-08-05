<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import Button from '@/components/Button.vue';
import { useControlsStore } from '@/stores/useControlsStore';
import { Languages } from '@/types/global/Languages.types';
import { storeToRefs } from 'pinia';
import LanguageChange from './LanguageChange.vue';

const controlsStore = useControlsStore()
const { language } = storeToRefs(controlsStore)

const route = useRoute();

const path = computed(() => route.path)
</script>

<template>
    <nav>
        <router-link :to="path === '/' ? '/favorites' : '/'" class="nav-link">
            <Button variant="transparent" size="medium"
                :aria-label="path === '/' ? language === Languages.english ? 'Favorites' : 'Збережені' : language === Languages.english ? 'Home' : 'Головна'">
                <font-awesome-icon :icon="path === '/' ? 'bars' : 'arrow-left-long'" style="font-size:x-large;" />
                <span v-if="path === '/favorites'">{{ language === Languages.english ? 'Back to Home' : "Назад на Головну"
                }}</span>
            </Button>
        </router-link>
        <LanguageChange />
    </nav>
</template>

<style scoped>
nav {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: .75rem 0;
}

.nav-link {
    text-decoration: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
}
</style>