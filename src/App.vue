<script setup lang="ts">
import { RouterView } from 'vue-router'
import LanguageChange from '@/components/LanguageChange.vue'
</script>

<template>
  <div>
    <nav>
      <RouterLink to="/favorites">Favorites</RouterLink>
      <RouterLink to="/">Home</RouterLink>
    </nav>

    <RouterView />

    <footer>
      <LanguageChange />
    </footer>
  </div>
</template>

<style scoped></style>
