import { reactive, ref, computed } from 'vue'
import { defaultSiteConfig } from '../data/content'
import { iso, addDays } from './utils'

// Datos en tiempo real del panel (compartidos por todas las vistas).
export const data = reactive({ citas: [], cotizaciones: [], contactos: [], horarios: [], visitas: [], config: null })
export const fb = ref(null)
export const fresh = ref(new Set()) // ids de registros nuevos (se resaltan)
export const error = ref('')

let unsubs = []
let first = {}

function beep() {
  try {
    const c = new (window.AudioContext || window.webkitAudioContext)()
    const o = c.createOscillator(), g = c.createGain()
    o.frequency.value = 880; g.gain.value = 0.06; o.connect(g); g.connect(c.destination)
    o.start(); o.stop(c.currentTime + 0.18)
  } catch { /* sin audio */ }
}

export function startListening(f) {
  stopListening()
  fb.value = f
  const { collection, query, orderBy, where, onSnapshot, doc, documentId } = f.fs
  const fail = (e) => { error.value = 'No se pudieron leer los datos: ' + (e.code || e.message) }

  for (const id of ['citas', 'cotizaciones', 'contactos']) {
    unsubs.push(onSnapshot(query(collection(f.db, id), orderBy('createdAt', 'desc')), (snap) => {
      data[id] = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      // Resalta y avisa con un sonido lo que llega después de la carga inicial.
      if (first[id]) {
        const added = snap.docChanges().filter((c) => c.type === 'added' && !c.doc.metadata.hasPendingWrites)
        if (added.length) { added.forEach((c) => fresh.value.add(c.doc.id)); fresh.value = new Set(fresh.value); beep() }
      }
      first[id] = true
    }, fail))
  }
  // horarios ocupados o bloqueados de ayer en adelante
  unsubs.push(onSnapshot(query(collection(f.db, 'horarios'), where('date', '>=', iso(addDays(new Date(), -1)))), (snap) => {
    data.horarios = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  }, fail))
  // últimos 90 días (filtro por rango del id del documento, que es la fecha AAAA-MM-DD; no necesita índice)
  unsubs.push(onSnapshot(query(collection(f.db, 'visitas'), where(documentId(), '>=', iso(addDays(new Date(), -90)))), (snap) => {
    data.visitas = snap.docs.map((d) => ({ day: d.id, ...d.data() }))
  }, fail))
  unsubs.push(onSnapshot(doc(f.db, 'config', 'site'), (snap) => { data.config = snap.exists() ? snap.data() : null }, fail))
}

export function stopListening() { unsubs.forEach((u) => u()); unsubs = []; first = {}; fb.value = null }

// Configuración efectiva de la agenda: la guardada en el panel o la de fábrica.
export const eff = computed(() => ({
  slots: data.config?.slots?.length ? [...data.config.slots].sort() : defaultSiteConfig.slots,
  closedWeekdays: data.config?.closedWeekdays ?? [],
  blockedDates: data.config?.blockedDates ?? [],
}))

// ---- Acciones ----
const wrap = async (fn) => {
  try { await fn(); return true } catch (e) { error.value = 'No se pudo completar la acción: ' + (e.code || e.message); return false }
}

export function setStage(kind, row, status) {
  return wrap(async () => {
    const { doc, writeBatch, serverTimestamp } = fb.value.fs
    const db = fb.value.db
    const b = writeBatch(db)
    b.update(doc(db, kind, row.id), { status, updatedAt: serverTimestamp() })
    if (kind === 'citas' && status === 'cancelada') b.delete(doc(db, 'horarios', `${row.date}_${row.time}`)) // libera el horario
    await b.commit()
    fresh.value.delete(row.id)
  })
}

export const saveNotes = (kind, row, notas) => wrap(async () => {
  const { doc, updateDoc, serverTimestamp } = fb.value.fs
  await updateDoc(doc(fb.value.db, kind, row.id), { notas: notas.slice(0, 1000), updatedAt: serverTimestamp() })
})

export function removeRow(kind, row) {
  return wrap(async () => {
    const { doc, writeBatch } = fb.value.fs
    const db = fb.value.db
    const b = writeBatch(db)
    b.delete(doc(db, kind, row.id))
    if (kind === 'citas') b.delete(doc(db, 'horarios', `${row.date}_${row.time}`)) // libera el horario
    await b.commit()
  })
}

export function reschedule(row, date, time) {
  return wrap(async () => {
    const { doc, writeBatch, serverTimestamp } = fb.value.fs
    const db = fb.value.db
    const b = writeBatch(db)
    b.delete(doc(db, 'horarios', `${row.date}_${row.time}`))
    b.set(doc(db, 'horarios', `${date}_${time}`), { date, time, createdAt: serverTimestamp() })
    b.update(doc(db, 'citas', row.id), { date, time, updatedAt: serverTimestamp() })
    await b.commit()
  })
}

export const blockSlot = (date, time) => wrap(async () => {
  const { doc, setDoc, serverTimestamp } = fb.value.fs
  await setDoc(doc(fb.value.db, 'horarios', `${date}_${time}`), { date, time, createdAt: serverTimestamp() })
})
export const unblockSlot = (date, time) => wrap(async () => {
  const { doc, deleteDoc } = fb.value.fs
  await deleteDoc(doc(fb.value.db, 'horarios', `${date}_${time}`))
})

export const saveConfig = (cfg) => wrap(async () => {
  const { doc, setDoc, serverTimestamp } = fb.value.fs
  await setDoc(doc(fb.value.db, 'config', 'site'), { ...cfg, updatedAt: serverTimestamp() })
})
export const resetConfig = () => wrap(async () => {
  const { doc, deleteDoc } = fb.value.fs
  await deleteDoc(doc(fb.value.db, 'config', 'site'))
})

export const toggleBlockedDate = (date) => {
  const list = new Set(eff.value.blockedDates)
  list.has(date) ? list.delete(date) : list.add(date)
  return wrap(async () => {
    const { doc, setDoc, serverTimestamp } = fb.value.fs
    await setDoc(doc(fb.value.db, 'config', 'site'), { ...(data.config || {}), blockedDates: [...list].sort(), updatedAt: serverTimestamp() })
  })
}
