import { getFirebase } from './client'

const clean = (v, max) => String(v ?? '').trim().slice(0, max)

// Firebase solo se usa si las reglas de seguridad ya están publicadas (los horarios son de lectura pública).
// Si Firestore responde "permiso denegado" (reglas aún sin publicar), la página usa el correo/WhatsApp de respaldo.
let liveP
async function live() {
  const f = await getFirebase()
  if (!f) return null
  liveP ??= (async () => {
    try {
      const { collection, query, limit, getDocs } = f.fs
      await getDocs(query(collection(f.db, 'horarios'), limit(1)))
      return true
    } catch { return false }
  })()
  return (await liveP) ? f : null
}

// Configuración editable del sitio (precios, paquetes, horarios) guardada por el administrador. null si no hay.
export async function loadSiteConfig() {
  const f = await getFirebase()
  if (!f) return null
  try {
    const snap = await f.fs.getDoc(f.fs.doc(f.db, 'config', 'site'))
    return snap.exists() ? snap.data() : null
  } catch {
    return null
  }
}

// Horarios ya ocupados para una fecha (null si Firebase no está disponible).
export async function takenSlots(date) {
  const f = await live()
  if (!f || !date) return null
  try {
    const { collection, query, where, getDocs } = f.fs
    const snap = await getDocs(query(collection(f.db, 'horarios'), where('date', '==', date)))
    return snap.docs.map((d) => d.data().time)
  } catch {
    return null
  }
}

// Resultado: { ok:true } | { ok:false, reason:'unavailable'|'taken'|'error' }
async function write(fn) {
  const f = await live()
  if (!f) return { ok: false, reason: 'unavailable' }
  try {
    await fn(f)
    return { ok: true }
  } catch (e) {
    return { ok: false, reason: e?.code === 'permission-denied' ? 'taken' : 'error' }
  }
}

// La cita y su horario se guardan en una sola operación: si el horario ya existe, falla todo.
export const saveCita = (c) => write(async ({ db, fs }) => {
  const { writeBatch, doc, collection, serverTimestamp } = fs
  const batch = writeBatch(db)
  batch.set(doc(db, 'horarios', `${c.date}_${c.time}`), { date: c.date, time: c.time, createdAt: serverTimestamp() })
  batch.set(doc(collection(db, 'citas')), {
    name: clean(c.name, 80), contact: clean(c.contact, 120), date: c.date, time: c.time,
    topic: c.topic, notes: clean(c.notes, 500), status: 'nueva', createdAt: serverTimestamp(),
  })
  await batch.commit()
})

export const saveCotizacion = (q) => write(async ({ db, fs }) => {
  const { addDoc, collection, serverTimestamp } = fs
  await addDoc(collection(db, 'cotizaciones'), {
    name: clean(q.name, 80), contact: clean(q.contact, 120), type: q.type, extras: q.extras.slice(0, 5),
    complexity: q.complexity, urgency: q.urgency, maint: !!q.maint, min: q.min, max: q.max, weeks: q.weeks,
    status: 'nueva', createdAt: serverTimestamp(),
  })
})

export const saveContacto = (c) => write(async ({ db, fs }) => {
  const { addDoc, collection, serverTimestamp } = fs
  await addDoc(collection(db, 'contactos'), {
    name: clean(c.name, 80), email: clean(c.email, 120), phone: clean(c.phone, 40), subject: c.subject,
    message: clean(c.message, 2000), status: 'nueva', createdAt: serverTimestamp(),
  })
})
