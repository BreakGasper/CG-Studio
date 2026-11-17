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

// Alterna entre modo claro y oscuro (cualquier tema que no sea claro pasa a claro).
export function toggleMode() {
  setTheme(theme.value === 'light' ? 'dark' : 'light')
}

// Carga el tema guardado; si no hay, respeta la preferencia del sistema.
export function loadTheme() {
  let saved = null
  try { saved = localStorage.getItem('cg-theme') } catch { /* sin almacenamiento */ }
  if (saved) {
    theme.value = saved
    document.documentElement.dataset.theme = saved
    return
  }
  const prefersLight = window.matchMedia?.('(prefers-color-scheme: light)').matches
  theme.value = prefersLight ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme.value
}

// Agenda/cotizador: pestaña activa y tipo de proyecto preseleccionado desde otras secciones.
export const bookTab = ref('cita')
export const quoteType = ref(null)

export function openBooking(tab, type = null) {
  bookTab.value = tab
  if (type) quoteType.value = type
  document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
