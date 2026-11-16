import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'

// La configuración web de Firebase es pública por diseño; la seguridad la dan las reglas de Firestore.
const firebaseConfig = {
  apiKey: 'AIzaSyDk7aM-hIW4C2V4_4t6a-mnZhwR7XZEBTE',
  authDomain: 'cg-studio-1d248.firebaseapp.com',
  projectId: 'cg-studio-1d248',
  storageBucket: 'cg-studio-1d248.firebasestorage.app',
  messagingSenderId: '530382553123',
  appId: '1:530382553123:web:af1e92ef42638fcfecb196',
  measurementId: 'G-SNHB44B5KY'
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

isSupported().then((ok) => { if (ok) getAnalytics(app) }).catch(() => {})

export function enviarContacto({ nombre, correo, tipo, mensaje }) {
  return addDoc(collection(db, 'contactos'), {
    nombre, correo, tipo, mensaje, creado: serverTimestamp()
  })
}
