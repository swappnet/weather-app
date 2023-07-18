<script setup lang="ts">
import { RouterView } from 'vue-router'

import NavBar from '@/components/NavBar.vue'
import LanguageChange from '@/components/LanguageChange.vue'

</script>

<template>
  <div class="main-wrapper">
    <div class="content-wrapper">
      <NavBar />

      <RouterView />

      <footer>
        <LanguageChange />
      </footer>
    </div>

  </div>
</template>

<style scoped>
.main-wrapper {
  width: 100%;
  /* max and min values are from TT */
  max-width: 1200px;
  min-width: 360px;
  margin: 0 auto;
  padding: 0 .5rem;
}

.content-wrapper {
  width: 100%;
  display: grid;
  max-width: 680px;
  margin: 0 auto;
}



footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: .5rem 0;
}
</style>
