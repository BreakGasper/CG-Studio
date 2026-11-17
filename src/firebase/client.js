// Conexión a Firebase, cargada solo cuando hace falta (no pesa en la carga inicial de la página).
// La configuración pública está en ./config.js. Para pruebas locales se puede sustituir con la variable
// VITE_FIREBASE_CONFIG (JSON) y, con el emulador, VITE_FIRESTORE_EMULATOR=127.0.0.1:8080.
import { firebaseConfig } from './config'

let cached

function readConfig() {
  try {
    const raw = import.meta.env.VITE_FIREBASE_CONFIG
    if (raw) return JSON.parse(raw)
  } catch { /* variable mal formada */ }
  return firebaseConfig
}

// Devuelve { app, db, fs } o null si Firebase no está disponible (la página sigue funcionando sin él).
export function getFirebase() {
  if (!cached) {
    cached = (async () => {
      const cfg = readConfig()
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
