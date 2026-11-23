// Pruebas de las reglas de seguridad. Requiere el emulador de Firestore y `@firebase/rules-unit-testing` instalado aparte:
//   npm i --no-save --legacy-peer-deps @firebase/rules-unit-testing
//   npx firebase-tools emulators:exec --only firestore --project cg-test "node tests/firestore.rules.test.mjs"
import { initializeTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing'
import { readFileSync } from 'node:fs'
import { doc, collection, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, writeBatch, serverTimestamp, query, where, increment } from 'firebase/firestore'

const env = await initializeTestEnvironment({
  projectId: 'cg-test',
  firestore: { rules: readFileSync('./firestore.rules', 'utf8'), host: '127.0.0.1', port: 8080 },
})
let pass = 0, fail = 0
const t = async (name, fn) => { try { await fn(); pass++; console.log('  ✓', name) } catch (e) { fail++; console.log('  ✗', name, '\n     ', String(e.message).split('\n')[0]) } }

const anon = env.unauthenticatedContext().firestore()
const admin = env.authenticatedContext('adm', { email: 'breakgasper@gmail.com', email_verified: true }).firestore()
const adminUnverified = env.authenticatedContext('adm2', { email: 'breakgasper@gmail.com', email_verified: false }).firestore()
const other = env.authenticatedContext('x', { email: 'otro@gmail.com', email_verified: true }).firestore()

const cita = (o = {}) => ({ name: 'Ana', contact: 'ana@test.com', date: '2026-12-01', time: '10:00', topic: 'Proyecto nuevo', notes: '', status: 'nueva', createdAt: serverTimestamp(), ...o })
const slot = (date = '2026-12-01', time = '10:00') => ({ date, time, createdAt: serverTimestamp() })
const reservar = (db, c = {}, id = 'c1') => { const b = writeBatch(db); const d = { ...cita(), ...c }; b.set(doc(db, 'horarios', `${d.date}_${d.time}`), slot(d.date, d.time)); b.set(doc(db, 'citas', id), d); return b.commit() }

console.log('CITAS / HORARIOS')
await t('visitante reserva una cita válida (cita + horario)', () => assertSucceeds(reservar(anon)))
await t('no se puede reservar el mismo horario dos veces', () => assertFails(reservar(anon, {}, 'c2')))
await t('otro horario sí se puede reservar', () => assertSucceeds(reservar(anon, { time: '11:00' }, 'c3')))
await t('cita sin reservar su horario es rechazada', () => assertFails(setDoc(doc(anon, 'citas', 'c9'), cita({ time: '12:00' }))))
await t('horario fuera de la lista (14:00) rechazado', () => assertFails(reservar(anon, { time: '14:00' }, 'c10')))
await t('fecha mal formada rechazada', () => assertFails(reservar(anon, { date: '01/12/2026' }, 'c11')))
await t('tema inválido rechazado', () => assertFails(reservar(anon, { time: '13:00', topic: 'hackeo' }, 'c12')))
await t('nombre vacío rechazado', () => assertFails(reservar(anon, { time: '13:00', name: '' }, 'c13')))
await t('campos extra rechazados', () => assertFails(reservar(anon, { time: '13:00', admin: true }, 'c14')))
await t('status distinto de "nueva" rechazado', () => assertFails(reservar(anon, { time: '13:00', status: 'atendida' }, 'c15')))
await t('createdAt falso (fecha del cliente) rechazado', () => assertFails(reservar(anon, { time: '13:00', createdAt: new Date('2020-01-01') }, 'c16')))
await t('visitante lee los horarios ocupados (sin datos personales)', async () => { const r = await assertSucceeds(getDocs(query(collection(anon, 'horarios'), where('date', '==', '2026-12-01')))); if (r.size !== 2) throw new Error('esperaba 2, hay ' + r.size) })
await t('visitante NO puede leer citas', () => assertFails(getDocs(collection(anon, 'citas'))))
await t('visitante NO puede leer una cita por id', () => assertFails(getDoc(doc(anon, 'citas', 'c1'))))
await t('visitante NO puede borrar un horario', () => assertFails(deleteDoc(doc(anon, 'horarios', '2026-12-01_10:00'))))
await t('visitante NO puede editar una cita', () => assertFails(updateDoc(doc(anon, 'citas', 'c1'), { status: 'atendida' })))

console.log('COTIZACIONES')
const cot = (o = {}) => ({ name: 'Ana', contact: 'ana@test.com', type: 'app', extras: ['admin'], complexity: 'mid', urgency: 'normal', maint: false, min: 2150, max: 2900, weeks: 6, status: 'nueva', createdAt: serverTimestamp(), ...o })
await t('cotización válida', () => assertSucceeds(addDoc(collection(anon, 'cotizaciones'), cot())))
await t('tipo inválido rechazado', () => assertFails(addDoc(collection(anon, 'cotizaciones'), cot({ type: 'x' }))))
await t('precio absurdo rechazado', () => assertFails(addDoc(collection(anon, 'cotizaciones'), cot({ max: 9e9 }))))
await t('demasiados extras rechazado', () => assertFails(addDoc(collection(anon, 'cotizaciones'), cot({ extras: ['a','b','c','d','e','f'] }))))
await t('visitante NO puede leer cotizaciones', () => assertFails(getDocs(collection(anon, 'cotizaciones'))))

console.log('CONTACTOS')
const con = (o = {}) => ({ name: 'Ana', email: 'ana@test.com', phone: '', subject: 'Proyecto nuevo', message: 'Necesito una app para mi negocio', status: 'nueva', createdAt: serverTimestamp(), ...o })
await t('contacto válido', () => assertSucceeds(addDoc(collection(anon, 'contactos'), con())))
await t('correo inválido rechazado', () => assertFails(addDoc(collection(anon, 'contactos'), con({ email: 'no-es-correo' }))))
await t('mensaje muy corto rechazado', () => assertFails(addDoc(collection(anon, 'contactos'), con({ message: 'hola' }))))
await t('mensaje de 3000 caracteres rechazado', () => assertFails(addDoc(collection(anon, 'contactos'), con({ message: 'x'.repeat(3000) }))))
await t('visitante NO puede leer contactos', () => assertFails(getDocs(collection(anon, 'contactos'))))

console.log('ADMINISTRADOR')
await t('admin lee citas', () => assertSucceeds(getDocs(collection(admin, 'citas'))))
await t('admin lee cotizaciones', () => assertSucceeds(getDocs(collection(admin, 'cotizaciones'))))
await t('admin lee contactos', () => assertSucceeds(getDocs(collection(admin, 'contactos'))))
await t('admin marca cita como atendida', () => assertSucceeds(updateDoc(doc(admin, 'citas', 'c1'), { status: 'atendida' })))
await t('admin elimina cita y libera horario', async () => { const b = writeBatch(admin); b.delete(doc(admin, 'citas', 'c1')); b.delete(doc(admin, 'horarios', '2026-12-01_10:00')); await assertSucceeds(b.commit()) })
await t('el horario liberado se puede volver a reservar', () => assertSucceeds(reservar(anon, {}, 'c20')))
await t('mismo correo SIN verificar NO tiene acceso', () => assertFails(getDocs(collection(adminUnverified, 'citas'))))
await t('otra cuenta de Google NO tiene acceso', () => assertFails(getDocs(collection(other, 'contactos'))))
await t('colección desconocida bloqueada', () => assertFails(setDoc(doc(anon, 'otra', 'x'), { a: 1 })))


console.log('CONFIGURACIÓN EDITABLE (/config/site)')
await t('visitante lee la configuración', () => assertSucceeds(getDoc(doc(anon, 'config', 'site'))))
await t('visitante NO puede escribir la configuración', () => assertFails(setDoc(doc(anon, 'config', 'site'), { slots: ['09:00'] })))
await t('otra cuenta NO puede escribir la configuración', () => assertFails(setDoc(doc(other, 'config', 'site'), { slots: ['09:00'] })))
await t('admin guarda la configuración', () => assertSucceeds(setDoc(doc(admin, 'config', 'site'), { slots: ['08:00', '09:00', '15:30'], quote: { types: [] } })))
await t('otro documento en /config bloqueado incluso para admin', () => assertFails(setDoc(doc(admin, 'config', 'otro'), { a: 1 })))
await t('con la configuración nueva, 15:30 ya se puede reservar', () => assertSucceeds(reservar(anon, { date: '2026-12-02', time: '15:30' }, 'k1')))
await t('con la configuración nueva, 10:00 (antes válido) se rechaza', () => assertFails(reservar(anon, { date: '2026-12-02', time: '10:00' }, 'k2')))
await t('hora mal formada rechazada aunque esté en la lista', () => assertFails(reservar(anon, { date: '2026-12-03', time: '9:00' }, 'k3')))
await t('admin bloquea un horario sin cita (vacaciones)', () => assertSucceeds(setDoc(doc(admin, 'horarios', '2026-12-24_09:00'), { date: '2026-12-24', time: '09:00', createdAt: serverTimestamp() })))
await t('el horario bloqueado ya no se puede reservar', () => assertFails(reservar(anon, { date: '2026-12-24', time: '09:00' }, 'k4')))

console.log('VISITAS (contador anónimo)')
await t('primera visita del día (escritorio) crea el documento', () => assertSucceeds(setDoc(doc(anon, 'visitas', '2026-12-05'), { n: increment(1), m: increment(0), d: increment(1) }, { merge: true })))
await t('segunda visita (móvil) suma 1', () => assertSucceeds(setDoc(doc(anon, 'visitas', '2026-12-05'), { n: increment(1), m: increment(1), d: increment(0) }, { merge: true })))
await t('sumar 5 de golpe rechazado', () => assertFails(setDoc(doc(anon, 'visitas', '2026-12-05'), { n: increment(5), m: increment(0), d: increment(5) }, { merge: true })))
await t('restar visitas rechazado', () => assertFails(setDoc(doc(anon, 'visitas', '2026-12-05'), { n: increment(-1), m: increment(0), d: increment(-1) }, { merge: true })))
await t('campos extra en visitas rechazados', () => assertFails(setDoc(doc(anon, 'visitas', '2026-12-06'), { n: increment(1), m: increment(0), d: increment(1), ip: '1.2.3.4' }, { merge: true })))
await t('id de día inválido rechazado', () => assertFails(setDoc(doc(anon, 'visitas', 'hoy'), { n: increment(1), m: increment(0), d: increment(1) }, { merge: true })))
await t('visitante NO puede leer las visitas', () => assertFails(getDoc(doc(anon, 'visitas', '2026-12-05'))))
await t('admin lee las visitas', () => assertSucceeds(getDoc(doc(admin, 'visitas', '2026-12-05'))))
await t('admin elimina un día de visitas', () => assertSucceeds(deleteDoc(doc(admin, 'visitas', '2026-12-05'))))

console.log('SEGUIMIENTO (admin)')
await t('admin cambia etapa y agrega notas a una cita', async () => { await assertSucceeds(updateDoc(doc(admin, 'citas', 'c3'), { status: 'confirmada', notas: 'Llamar el lunes' })) })
await t('admin reagenda: libera el horario y toma otro', async () => { const b = writeBatch(admin); b.delete(doc(admin, 'horarios', '2026-12-01_11:00')); b.set(doc(admin, 'horarios', '2026-12-01_09:00'), { date: '2026-12-01', time: '09:00', createdAt: serverTimestamp() }); b.update(doc(admin, 'citas', 'c3'), { date: '2026-12-01', time: '09:00' }); await assertSucceeds(b.commit()) })
await t('visitante NO puede agregar notas ni cambiar etapa', () => assertFails(updateDoc(doc(anon, 'citas', 'c3'), { notas: 'x' })))

console.log(`\n${pass} correctas, ${fail} fallidas`)
await env.cleanup()
process.exit(fail ? 1 : 0)
