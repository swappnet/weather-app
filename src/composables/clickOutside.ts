import { onBeforeUnmount, onMounted, type Ref } from 'vue'

export default function useClickOutside(component: Ref<HTMLElement | null>, callback: () => void) {
  if (!component) return
  const listener = (event: MouseEvent) => {
    if (component.value === null) return
    if (event.target !== component.value && event.composedPath().includes(component.value)) {
      return
    }
    if (typeof callback === 'function') {
      callback()
    }
  }
  onMounted(() => {
    window.addEventListener('click', listener)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('click', listener)
  })

  return { listener }
}
