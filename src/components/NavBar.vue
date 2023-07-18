<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import Button from '@/components/Button.vue'

const route = useRoute();

const path = computed(() => route.path)
</script>

<template>
    <nav>
        <router-link :to="path === '/' ? '/favorites' : '/'" class="nav-link">
            <Button variant="transparent" size="medium" :title="path === '/' ? 'Favorites' : 'Home'">
                <font-awesome-icon :icon="path === '/' ? 'bars' : ['fas', 'arrow-left-long']" style="font-size:x-large;" />
                <span v-if="path === '/favorites'">Back to Home</span>
            </Button>
        </router-link>
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