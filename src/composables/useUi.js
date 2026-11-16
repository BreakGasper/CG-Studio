import { ref } from 'vue'

// Estado compartido de la interfaz: menú, selector de color y tema.
export const menuOpen = ref(false)
export const cfgOpen = ref(false)
export const theme = ref('dark')

export function setTheme(id) {
  theme.value = id
  document.documentElement.dataset.theme = id
  try { localStorage.setItem('cg-theme', id) } catch { /* sin almacenamiento */ }
}

export function loadTheme() {
  try {
    const saved = localStorage.getItem('cg-theme')
    if (saved) setTheme(saved)
  } catch { /* sin almacenamiento */ }
}
