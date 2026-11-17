<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { getFirebase } from '../firebase/client'

// Solo este correo (verificado) puede entrar; las reglas de Firestore lo exigen también en el servidor.
const ADMIN_EMAIL = 'breakgasper@gmail.com'

const state = ref('loading') // loading | unavailable | signedout | denied | ready
const user = ref(null)
const error = ref('')
const tab = ref('citas')
const onlyNew = ref(true)
const data = ref({ citas: [], cotizaciones: [], contactos: [] })
const fresh = ref(new Set())
let fb, auth, authMod, unsubs = [], first = {}

const tabs = [
  { id: 'citas', label: 'Citas' },
  { id: 'cotizaciones', label: 'Cotizaciones' },
  { id: 'contactos', label: 'Mensajes' },
]
const newCount = (id) => data.value[id].filter((x) => x.status === 'nueva').length
const total = computed(() => tabs.reduce((n, t) => n + newCount(t.id), 0))
const list = computed(() => {
  const rows = data.value[tab.value].filter((x) => !onlyNew.value || x.status === 'nueva')
  return tab.value === 'citas' ? [...rows].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)) : rows
})

const fmt = (d) => new Date(d + 'T12:00').toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' })
const when = (ts) => (ts?.toDate ? ts.toDate().toLocaleString('es', { dateStyle: 'medium', timeStyle: 'short' }) : '')
const isMail = (s) => /\S+@\S+\.\S+/.test(s || '')
const waLink = (s) => `https://wa.me/${String(s).replace(/\D/g, '')}`
const money = (n) => new Intl.NumberFormat('es', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

function beep() {
  try {
    const c = new (window.AudioContext || window.webkitAudioContext)()
    const o = c.createOscillator(), g = c.createGain()
    o.frequency.value = 880; g.gain.value = 0.06; o.connect(g); g.connect(c.destination)
    o.start(); o.stop(c.currentTime + 0.18)
  } catch { /* sin audio */ }
}

function listen() {
  const { collection, query, orderBy, onSnapshot } = fb.fs
  unsubs = tabs.map(({ id }) => onSnapshot(
    query(collection(fb.db, id), orderBy('createdAt', 'desc')),
    (snap) => {
      data.value = { ...data.value, [id]: snap.docs.map((d) => ({ id: d.id, ...d.data() })) }
      // Resalta y avisa con un sonido lo que llega después de la carga inicial.
      if (first[id]) {
        const added = snap.docChanges().filter((c) => c.type === 'added' && !c.doc.metadata.hasPendingWrites)
        if (added.length) { added.forEach((c) => fresh.value.add(c.doc.id)); fresh.value = new Set(fresh.value); beep() }
      }
      first[id] = true
    },
    (e) => { error.value = 'No se pudieron leer los datos: ' + (e.code || e.message) },
  ))
}

function stop() { unsubs.forEach((u) => u()); unsubs = []; first = {} }

async function onUser(u) {
  stop()
  user.value = u
  if (!u) { state.value = 'signedout'; return }
  if (u.email !== ADMIN_EMAIL || !u.emailVerified) { state.value = 'denied'; return }
  state.value = 'ready'
  listen()
}

onMounted(async () => {
  fb = await getFirebase()
  if (!fb) { state.value = 'unavailable'; return }
  authMod = await import('firebase/auth')
  auth = authMod.getAuth(fb.app)
  authMod.onAuthStateChanged(auth, onUser)
})
onBeforeUnmount(stop)

async function login() {
  error.value = ''
  try { await authMod.signInWithPopup(auth, new authMod.GoogleAuthProvider()) }
  catch (e) { error.value = e.code === 'auth/popup-closed-by-user' ? '' : 'No se pudo iniciar sesión: ' + (e.code || e.message) }
}
const logout = () => authMod.signOut(auth)

async function setStatus(col, row, status) {
  try { await fb.fs.updateDoc(fb.fs.doc(fb.db, col, row.id), { status }); fresh.value.delete(row.id) }
  catch (e) { error.value = 'No se pudo actualizar: ' + (e.code || e.message) }
}
async function remove(col, row) {
  if (!confirm('¿Eliminar este registro? No se puede deshacer.')) return
  try {
    const { writeBatch, doc } = fb.fs
    const b = writeBatch(fb.db)
    b.delete(doc(fb.db, col, row.id))
    if (col === 'citas') b.delete(doc(fb.db, 'horarios', `${row.date}_${row.time}`)) // libera el horario
    await b.commit()
  } catch (e) { error.value = 'No se pudo eliminar: ' + (e.code || e.message) }
}
</script>

<template>
  <div class="adm">
    <header>
      <h1>Panel CG Studio <span v-if="total" class="pill">{{ total }} nuevas</span></h1>
      <div v-if="user && state === 'ready'" class="who">{{ user.email }} <button class="lnk" @click="logout">Salir</button></div>
    </header>

    <p v-if="error" class="err" role="alert">{{ error }}</p>

    <section v-if="state === 'loading'" class="box">Cargando…</section>
    <section v-else-if="state === 'unavailable'" class="box">
      No se pudo conectar con Firebase. Abre esta página desde <b>cg-studio-1d248.web.app/admin</b> (ya publicada),
      y verifica que el proyecto tenga una app web registrada.
    </section>
    <section v-else-if="state === 'signedout'" class="box">
      <p>Acceso privado.</p>
      <button class="go" @click="login">Entrar con Google</button>
    </section>
    <section v-else-if="state === 'denied'" class="box">
      <p>La cuenta <b>{{ user?.email }}</b> no tiene acceso a este panel.</p>
      <button class="go" @click="logout">Cambiar de cuenta</button>
    </section>

    <template v-else>
      <nav class="tabs">
        <button v-for="t in tabs" :key="t.id" :class="{ on: tab === t.id }" @click="tab = t.id">
          {{ t.label }} <span v-if="newCount(t.id)" class="pill">{{ newCount(t.id) }}</span>
        </button>
        <label class="flt"><input v-model="onlyNew" type="checkbox"> Solo nuevas</label>
      </nav>

      <p v-if="!list.length" class="box">No hay registros {{ onlyNew ? 'nuevos' : '' }} en esta sección.</p>

      <article v-for="r in list" :key="r.id" class="card" :class="{ fresh: fresh.has(r.id), done: r.status !== 'nueva' }">
        <div class="top">
          <b v-if="tab === 'citas'">{{ fmt(r.date) }} · {{ r.time }}</b>
          <b v-else-if="tab === 'cotizaciones'">{{ money(r.min) }} – {{ money(r.max) }} · ≈{{ r.weeks }} sem.</b>
          <b v-else>{{ r.subject }}</b>
          <span class="st" :class="r.status">{{ r.status }}</span>
        </div>
        <p class="who2">{{ r.name }} · <template v-if="tab === 'contactos'"><a :href="'mailto:' + r.email">{{ r.email }}</a><template v-if="r.phone"> · {{ r.phone }}</template></template>
          <template v-else><a v-if="isMail(r.contact)" :href="'mailto:' + r.contact">{{ r.contact }}</a><a v-else :href="waLink(r.contact)" target="_blank" rel="noopener">{{ r.contact }}</a></template></p>
        <p v-if="tab === 'citas'" class="det">{{ r.topic }}<template v-if="r.notes"> — {{ r.notes }}</template></p>
        <p v-if="tab === 'cotizaciones'" class="det">{{ r.type }} · extras: {{ r.extras.join(', ') || 'ninguno' }} · {{ r.complexity }} · {{ r.urgency }}<template v-if="r.maint"> · con mantenimiento</template></p>
        <p v-if="tab === 'contactos'" class="det msg">{{ r.message }}</p>
        <div class="foot">
          <small>{{ when(r.createdAt) }}</small>
          <span class="acts">
            <button v-if="r.status === 'nueva'" @click="setStatus(tab, r, 'atendida')">Marcar atendida</button>
            <button v-else @click="setStatus(tab, r, 'nueva')">Reabrir</button>
            <button v-if="r.status !== 'archivada'" @click="setStatus(tab, r, 'archivada')">Archivar</button>
            <button class="del" @click="remove(tab, r)">Eliminar</button>
          </span>
        </div>
      </article>
    </template>
  </div>
</template>

<style>
:root{--bg:#f2f5f8;--card:#fff;--ink:#111;--mute:#667;--line:#e2e5ea;--acc:#14c8d8;color-scheme:light dark}
@media(prefers-color-scheme:dark){:root{--bg:#101722;--card:#151d2a;--ink:#f4f6f8;--mute:#8d99a8;--line:#253145}}
*{box-sizing:border-box;margin:0}
body{background:var(--bg);color:var(--ink);font:400 15px/1.5 Inter,system-ui,sans-serif}
.adm{max-width:860px;margin:0 auto;padding:24px 16px 60px}
header{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:20px}
h1{font-size:22px;font-weight:600}
.who{font-size:13px;color:var(--mute)}
.lnk{background:none;border:0;color:var(--acc);cursor:pointer;font:inherit;text-decoration:underline}
.pill{display:inline-block;min-width:22px;padding:1px 8px;border-radius:999px;background:#ff2e97;color:#fff;font-size:12px;font-weight:600;text-align:center;vertical-align:middle}
.box{padding:22px;border:1px solid var(--line);border-radius:16px;background:var(--card);color:var(--mute);margin-bottom:12px}
.go{margin-top:10px;padding:11px 20px;border:0;border-radius:999px;background:var(--acc);color:#04222a;font:600 15px Inter,sans-serif;cursor:pointer}
.err{padding:10px 14px;border-radius:12px;background:#ffe3e0;color:#a3261a;margin-bottom:12px}
.tabs{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:16px}
.tabs button{padding:8px 16px;border:1px solid var(--line);border-radius:999px;background:var(--card);color:var(--ink);cursor:pointer;font:inherit}
.tabs button.on{background:var(--acc);color:#04222a;border-color:var(--acc)}
.flt{margin-left:auto;font-size:14px;color:var(--mute);display:flex;gap:6px;align-items:center}
.card{padding:16px 18px;border:1px solid var(--line);border-radius:16px;background:var(--card);margin-bottom:12px;transition:box-shadow .3s,border-color .3s}
.card.fresh{border-color:#ff2e97;box-shadow:0 0 0 3px rgba(255,46,151,.2)}
.card.done{opacity:.7}
.top{display:flex;justify-content:space-between;gap:10px;align-items:baseline}
.top b{font-size:16px;text-transform:capitalize}
.st{font-size:11px;text-transform:uppercase;letter-spacing:.1em;padding:2px 9px;border-radius:999px;border:1px solid var(--line);color:var(--mute)}
.st.nueva{background:var(--acc);color:#04222a;border-color:var(--acc)}
.who2{margin-top:4px}.who2 a{color:var(--acc)}
.det{color:var(--mute);margin-top:2px}.msg{white-space:pre-wrap;color:var(--ink)}
.foot{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-top:12px;padding-top:10px;border-top:1px solid var(--line)}
.foot small{color:var(--mute)}
.acts{display:flex;gap:6px;flex-wrap:wrap}
.acts button{padding:6px 12px;border:1px solid var(--line);border-radius:999px;background:none;color:var(--ink);cursor:pointer;font:inherit;font-size:13px}
.acts button:hover{border-color:var(--acc);color:var(--acc)}
.acts .del:hover{border-color:#d4351c;color:#d4351c}
</style>
