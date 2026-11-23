import { getFirebase } from './client'
import { isMobileMode } from '../composables/useUi'

// ---- Contador de visitas anónimo (para el panel) ----
// Suma 1 a los totales del día (total, móvil, escritorio). No guarda cookies, IP ni identificadores,
// y cuenta una sola vez por pestaña del navegador.
export async function countVisit() {
  try {
    if (sessionStorage.getItem('cg-visit')) return
    sessionStorage.setItem('cg-visit', '1')
  } catch { /* sin almacenamiento: se cuenta igual */ }
  const f = await getFirebase()
  if (!f) return
  try {
    const { doc, setDoc, increment } = f.fs
    const d = new Date()
    const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    const mobile = isMobileMode()
    await setDoc(doc(f.db, 'visitas', day), { n: increment(1), m: increment(mobile ? 1 : 0), d: increment(mobile ? 0 : 1) }, { merge: true })
  } catch { /* las reglas aún no están publicadas o sin conexión: se ignora */ }
}

// ---- Google Analytics: solo con el consentimiento del visitante ----
export const CONSENT_KEY = 'cg-analytics'
export const getConsent = () => { try { return localStorage.getItem(CONSENT_KEY) } catch { return null } }
export const setConsent = (v) => { try { localStorage.setItem(CONSENT_KEY, v) } catch { /* sin almacenamiento */ } }

let started = false
export async function startAnalytics() {
  if (started || getConsent() !== 'yes') return
  started = true
  try {
    const f = await getFirebase()
    if (!f) return
    const { getAnalytics, isSupported } = await import('firebase/analytics')
    if (await isSupported()) getAnalytics(f.app)
  } catch { /* bloqueado por el navegador o sin conexión */ }
}
