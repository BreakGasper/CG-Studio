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

// ---- Pestañas del modo móvil (en escritorio la página es un solo scroll y esto no se usa) ----
export const MOBILE_QUERY = '(max-width:1100px)'
export const isMobileMode = () => typeof matchMedia !== 'undefined' && matchMedia(MOBILE_QUERY).matches
export const tab = ref('inicio')

// Sección -> pestaña
const PANES = {
  inicio: ['home', 'clients', 'work'],
  empresa: ['about', 'mission', 'services', 'experience', 'tech', 'method', 'testimonials', 'faq'],
  cotiza: ['packages', 'book'],
  contacto: ['contact'],
}
export const paneOf = (id) => Object.keys(PANES).find((k) => PANES[k].includes(id)) || 'inicio'

export function setTab(t, { top = true } = {}) {
  tab.value = t
  document.documentElement.dataset.tab = t
  if (top) window.scrollTo({ top: 0, behavior: 'instant' })
}
if (typeof document !== 'undefined') document.documentElement.dataset.tab = tab.value

// Lleva a una sección; en móvil cambia antes a la pestaña que la contiene.
export function goToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  const mobile = isMobileMode()
  const t = mobile ? paneOf(id) : null
  if (t && t !== tab.value) setTab(t, { top: false })
  requestAnimationFrame(() => {
    if (mobile && (id === 'home' || id === 'inicio')) { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

export function openBooking(tab2, type = null) {
  bookTab.value = tab2
  if (type) quoteType.value = type
  goToSection('book')
}
