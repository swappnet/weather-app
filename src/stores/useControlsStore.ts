import { Languages } from '@/types/global/Languages.types'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useControlsStore = defineStore('controls', () => {
  const language = ref<Languages>(Languages.ukrainian)

  const loadLanguageFromLocalStorage = () => {
    const savedLocations = localStorage.getItem('savedLanguage')
    if (savedLocations) {
      language.value = JSON.parse(savedLocations)
    }
  }

  watch(language, (newLanguage) => {
    localStorage.setItem('savedLanguage', JSON.stringify(newLanguage))
  })

  const changeLanguage = (newLanguage: Languages) => {
    language.value = newLanguage
  }

  loadLanguageFromLocalStorage()

  return { language, changeLanguage }
})
