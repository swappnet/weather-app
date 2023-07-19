import { Languages } from '@/types/global/Languages.types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useControlsStore = defineStore('controls', () => {
  const language = ref<Languages>(Languages.ukrainian)

  const changeLanguage = (newLanguage: Languages) => {
    language.value = newLanguage
  }

  return { language, changeLanguage }
})
