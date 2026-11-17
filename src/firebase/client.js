// Conexión a Firebase, cargada solo cuando hace falta (no pesa en la carga inicial de la página).
// La configuración pública se lee de /__/firebase/init.json, que Firebase Hosting sirve en el propio dominio.
// En desarrollo local se puede definir VITE_FIREBASE_CONFIG (JSON) en un archivo .env.local.
let cached

async function readConfig() {
  try {
    const r = await fetch('/__/firebase/init.json', { cache: 'no-store' })
    if (r.ok) {
      const j = await r.json()
      if (j && j.projectId) return j
    }
  } catch { /* sin hosting de Firebase (p. ej. desarrollo local) */ }
  try {
    const raw = import.meta.env.VITE_FIREBASE_CONFIG
    if (raw) return JSON.parse(raw)
  } catch { /* variable mal formada */ }
  return null
}

// Devuelve { app, db, fs } o null si Firebase no está disponible (la página sigue funcionando sin él).
export function getFirebase() {
  if (!cached) {
    cached = (async () => {
      const cfg = await readConfig()
      if (!cfg) return null
      const [{ initializeApp }, fs] = await Promise.all([import('firebase/app'), import('firebase/firestore')])
      const app = initializeApp(cfg)
      const db = fs.getFirestore(app)
      // Solo para pruebas locales con el emulador de Firestore (VITE_FIRESTORE_EMULATOR=127.0.0.1:8080).
      const emu = import.meta.env.VITE_FIRESTORE_EMULATOR
      if (emu) { const [h, p] = emu.split(':'); fs.connectFirestoreEmulator(db, h, Number(p)) }
      return { app, db, fs }
    })().catch(() => null)
  }
  return cached
}
