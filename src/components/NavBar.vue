<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import Button from '@/components/Button.vue'
import LanguageChange from './LanguageChange.vue';
import { useControlsStore } from '@/stores/useControlsStore';
import { storeToRefs } from 'pinia';
import { Languages } from '@/types/global/Languages.types';

const controlsStore = useControlsStore()
const { language } = storeToRefs(controlsStore)

const route = useRoute();

const path = computed(() => route.path)
</script>

<template>
    <nav>
        <router-link :to="path === '/' ? '/favorites' : '/'" class="nav-link">
            <Button variant="transparent" size="medium" :title="path === '/' ? 'Favorites' : 'Home'">
                <font-awesome-icon :icon="path === '/' ? 'bars' : 'arrow-left-long'" style="font-size:x-large;" />
                <span v-if="path === '/favorites'">{{ language === Languages.english ? 'Back to Home' : language ===
                    Languages.ukrainian && "Назад на Головну" }}</span>
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