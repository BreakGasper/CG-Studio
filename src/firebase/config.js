// Configuración PÚBLICA de la app web de Firebase (CG-Studio). No es un secreto: la apiKey de Firebase solo identifica
// el proyecto; lo que protege los datos son las reglas de seguridad (firestore.rules) y el inicio de sesión del panel.
export const firebaseConfig = {
  apiKey: 'AIzaSyDk7aM-hIW4C2V4_4t6a-mnZhwR7XZEBTE',
  authDomain: 'cg-studio-1d248.firebaseapp.com',
  projectId: 'cg-studio-1d248',
  storageBucket: 'cg-studio-1d248.firebasestorage.app',
  messagingSenderId: '530382553123',
  appId: '1:530382553123:web:af1e92ef42638fcfecb196',
  measurementId: 'G-SNHB44B5KY', // Google Analytics (solo se activa si el visitante lo acepta)
}
