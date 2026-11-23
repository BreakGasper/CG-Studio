<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { getFirebase } from '../firebase/client'
import { data, error, startListening, stopListening } from './store'
import { stageOf } from './utils'
import Dashboard from './views/Dashboard.vue'
import Requests from './views/Requests.vue'
import Calendar from './views/Calendar.vue'
import Settings from './views/Settings.vue'
import Visits from './views/Visits.vue'

// Solo este correo (verificado) puede entrar; las reglas de Firestore lo exigen también en el servidor.
const ADMIN_EMAIL = 'breakgasper@gmail.com'

const state = ref('loading') // loading | unavailable | signedout | denied | ready
const user = ref(null)
const tab = ref((location.hash || '#resumen').slice(1))
let fb, auth, authMod

const tabs = [
  { id: 'resumen', label: 'Resumen', icon: '▦' },
  { id: 'citas', label: 'Citas', icon: '📅', kind: 'citas' },
  { id: 'calendario', label: 'Calendario', icon: '🗓' },
  { id: 'cotizaciones', label: 'Cotizaciones', icon: '💲', kind: 'cotizaciones' },
  { id: 'contactos', label: 'Mensajes', icon: '✉', kind: 'contactos' },
  { id: 'visitas', label: 'Visitas', icon: '📈' },
  { id: 'ajustes', label: 'Ajustes', icon: '⚙' },
]
if (!tabs.some((t) => t.id === tab.value)) tab.value = 'resumen'
const newCount = (k) => data[k].filter((r) => stageOf(k, r) === 'nueva').length
const total = computed(() => ['citas', 'cotizaciones', 'contactos'].reduce((n, k) => n + newCount(k), 0))
const go = (id) => { tab.value = id; history.replaceState(null, '', '#' + id); window.scrollTo({ top: 0 }) }

async function onUser(u) {
  stopListening()
  user.value = u
  if (!u) { state.value = 'signedout'; return }
  if (u.email !== ADMIN_EMAIL || !u.emailVerified) { state.value = 'denied'; return }
  state.value = 'ready'
  startListening(fb)
}

onMounted(async () => {
  fb = await getFirebase()
  if (!fb) { state.value = 'unavailable'; return }
  authMod = await import('firebase/auth')
  auth = authMod.getAuth(fb.app)
  // Solo para pruebas locales con el emulador de Auth (no existe en la versión publicada).
  if (import.meta.env.VITE_AUTH_EMULATOR) {
    authMod.connectAuthEmulator(auth, import.meta.env.VITE_AUTH_EMULATOR, { disableWarnings: true })
    window.__adminLogin = (email = ADMIN_EMAIL, verified = true) => authMod.signInWithCredential(auth,
      authMod.GoogleAuthProvider.credential(JSON.stringify({ sub: 'test-' + email, email, email_verified: verified })))
  }
  authMod.onAuthStateChanged(auth, onUser)
})
onBeforeUnmount(stopListening)

async function login() {
  error.value = ''
  try { await authMod.signInWithPopup(auth, new authMod.GoogleAuthProvider()) }
  catch (e) { error.value = e.code === 'auth/popup-closed-by-user' ? '' : 'No se pudo iniciar sesión: ' + (e.code || e.message) }
}
const logout = () => authMod.signOut(auth)
</script>

<template>
  <div class="adm">
    <header>
      <h1>Panel CG Studio <span v-if="total" class="pill">{{ total }} nuevas</span></h1>
      <div v-if="user && state === 'ready'" class="who">{{ user.email }} <button class="lnk" @click="logout">Salir</button> · <a class="lnk" href="/" target="_blank" rel="noopener">Ver página ↗</a></div>
    </header>

    <p v-if="error" class="err" role="alert">{{ error }} <button class="lnk" @click="error = ''">cerrar</button></p>

    <section v-if="state === 'loading'" class="box">Cargando…</section>
    <section v-else-if="state === 'unavailable'" class="box">
      No se pudo conectar con Firebase. Abre esta página desde <b>cg-studio-1d248.web.app/admin</b> (ya publicada).
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
      <nav class="nav" aria-label="Secciones del panel">
        <button v-for="t in tabs" :key="t.id" :class="{ on: tab === t.id }" :aria-current="tab === t.id ? 'page' : undefined" @click="go(t.id)">
          <span class="ic" aria-hidden="true">{{ t.icon }}</span>{{ t.label }}
          <span v-if="t.kind && newCount(t.kind)" class="pill">{{ newCount(t.kind) }}</span>
        </button>
      </nav>

      <Dashboard v-if="tab === 'resumen'" @go="go" />
      <Requests v-else-if="['citas', 'cotizaciones', 'contactos'].includes(tab)" :key="tab" :kind="tab" />
      <Calendar v-else-if="tab === 'calendario'" @go="go" />
      <Visits v-else-if="tab === 'visitas'" />
      <Settings v-else-if="tab === 'ajustes'" />
    </template>
  </div>
</template>

<style>
:root{--bg:#f2f5f8;--card:#fff;--ink:#111;--mute:#667;--line:#e2e5ea;--acc:#14c8d8;color-scheme:light dark}
@media(prefers-color-scheme:dark){:root{--bg:#101722;--card:#151d2a;--ink:#f4f6f8;--mute:#8d99a8;--line:#253145}}
*{box-sizing:border-box;margin:0}
body{background:var(--bg);color:var(--ink);font:400 15px/1.5 Inter,system-ui,sans-serif}
.adm{max-width:1000px;margin:0 auto;padding:20px 16px 90px}
header{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:16px}
h1{font-size:22px;font-weight:600}h3{font-size:16px;font-weight:600;margin-bottom:10px}h4{font-size:13px;color:var(--mute);font-weight:600;margin:14px 0 6px}
.who{font-size:13px;color:var(--mute)}
.lnk{background:none;border:0;color:var(--acc);cursor:pointer;font:inherit;text-decoration:underline;padding:0}
a.lnk{color:var(--acc)}
.pill{display:inline-block;min-width:22px;padding:1px 8px;border-radius:999px;background:#ff2e97;color:#fff;font-size:12px;font-weight:600;text-align:center;vertical-align:middle}
.box{padding:22px;border:1px solid var(--line);border-radius:16px;background:var(--card);color:var(--mute);margin-bottom:12px}
.muted{color:var(--mute);font-size:14px}
.go{padding:11px 20px;border:0;border-radius:999px;background:var(--acc);color:#04222a;font:600 15px Inter,sans-serif;cursor:pointer;text-decoration:none;display:inline-block}
.go.sm,.sm{padding:7px 14px;font-size:13px}
.go:disabled{opacity:.5;cursor:not-allowed}
button.sm,.acts button,.acts a,.cal-head button,.savebar button:not(.go){padding:6px 12px;border:1px solid var(--line);border-radius:999px;background:none;color:var(--ink);cursor:pointer;font:inherit;font-size:13px;text-decoration:none}
button.sm:hover,.acts button:hover,.acts a:hover,.cal-head button:hover{border-color:var(--acc);color:var(--acc)}
.err{padding:10px 14px;border-radius:12px;background:#ffe3e0;color:#a3261a;margin-bottom:12px}
.ok{color:#1b7f4b;font-size:13px;font-weight:600}
/* navegación por secciones */
.nav{display:flex;gap:6px;overflow-x:auto;padding-bottom:6px;margin-bottom:16px;scrollbar-width:none}
.nav::-webkit-scrollbar{display:none}
.nav button{flex:none;display:flex;align-items:center;gap:6px;padding:8px 15px;border:1px solid var(--line);border-radius:999px;background:var(--card);color:var(--ink);cursor:pointer;font:inherit;font-size:14px}
.nav button.on{background:var(--acc);color:#04222a;border-color:var(--acc);font-weight:600}
.nav .ic{font-size:14px;opacity:.85}
/* controles */
.in{background:var(--bg);color:var(--ink);border:1px solid var(--line);border-radius:12px;padding:9px 12px;font:inherit;font-size:14px;max-width:100%}
.in:focus{outline:2px solid var(--acc);outline-offset:1px}
.in.num{width:100px}.in.grow{flex:1;min-width:180px}
.bar{display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:6px}
.bar .dt{display:flex;flex-direction:column;font-size:12px;color:var(--mute);gap:2px}
.count{font-size:13px;color:var(--mute);margin:6px 2px 12px}
/* tarjetas de solicitudes */
.card,.a-card{padding:16px 18px;border:1px solid var(--line);border-radius:16px;background:var(--card);margin-bottom:12px;transition:box-shadow .3s,border-color .3s}
.card.fresh{border-color:#ff2e97;box-shadow:0 0 0 3px rgba(255,46,151,.2)}
.card.done{opacity:.78}
.top{display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap}
.top b{font-size:16px;text-transform:capitalize}
.st-sel{font:inherit;font-size:12px;padding:4px 10px;border-radius:999px;border:1px solid var(--line);background:var(--bg);color:var(--ink);cursor:pointer}
.st-sel.nueva{background:var(--acc);color:#04222a;border-color:var(--acc);font-weight:600}
.st-sel.ganada,.st-sel.realizada,.st-sel.confirmada{border-color:#1b7f4b;color:#1b7f4b}
.st-sel.perdida,.st-sel.cancelada{border-color:#d4351c;color:#d4351c}
.who2{margin-top:4px}.det{color:var(--mute);margin-top:2px}.msg{white-space:pre-wrap;color:var(--ink)}
.notes{width:100%;margin-top:10px;background:var(--bg);color:var(--ink);border:1px dashed var(--line);border-radius:12px;padding:8px 10px;font:inherit;font-size:13px;resize:vertical}
.foot{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-top:12px;padding-top:10px;border-top:1px solid var(--line)}
.foot small{color:var(--mute)}.acts{display:flex;gap:6px;flex-wrap:wrap}
.acts .del:hover{border-color:#d4351c;color:#d4351c}
/* resumen */
.tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:12px}
.tile{display:flex;flex-direction:column;gap:2px;text-align:left;padding:16px 18px;border:1px solid var(--line);border-radius:16px;background:var(--card);color:var(--ink);font:inherit;cursor:pointer}
button.tile:hover{border-color:var(--acc)}
.tile small{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:var(--mute)}
.tile b{font-size:30px;font-weight:600;line-height:1.15}.tile span{font-size:13px;color:var(--mute)}
.tile.pot b{color:var(--acc)}
.a-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media(max-width:760px){.a-grid2{grid-template-columns:1fr}}
.chart{width:100%;height:auto;display:block}
.leg{font-size:12.5px;color:var(--mute);margin-top:6px}.leg i{display:inline-block;width:10px;height:10px;border-radius:3px;margin:0 4px 0 10px;vertical-align:middle}.leg i:first-child{margin-left:0}
.mini{list-style:none;padding:0;display:flex;flex-direction:column;gap:8px}
.mini li{display:flex;flex-direction:column;padding:8px 10px;border-radius:10px;background:var(--bg);cursor:pointer}
.mini li b{font-size:14px}.mini li span{font-size:12.5px;color:var(--mute)}
/* calendario */
.cal-head{display:flex;align-items:center;gap:8px;margin-bottom:10px}.cal-head h3{flex:1;margin:0;text-align:center}
.cal{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:14px}
.cal .wd{text-align:center;font-size:12px;color:var(--mute);padding:4px 0}
.cell{position:relative;min-height:52px;border:1px solid var(--line);border-radius:10px;background:var(--card);color:var(--ink);cursor:pointer;display:flex;flex-direction:column;align-items:flex-start;padding:5px 7px;font:inherit}
.cell.empty{border:0;background:none;cursor:default}
.cell i{font-style:normal;font-size:13px}
.cell.off{background:repeating-linear-gradient(135deg,var(--bg),var(--bg) 6px,var(--card) 6px,var(--card) 12px);color:var(--mute)}
.cell.today{border-color:var(--acc)}
.cell.sel{background:var(--acc);color:#04222a;border-color:var(--acc)}
.dot{position:absolute;right:6px;bottom:5px;font-style:normal;font-size:11px;font-weight:700;background:#ff2e97;color:#fff;border-radius:999px;padding:0 6px}
.slots-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:6px;margin-bottom:12px}
.slots-list li{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:8px 10px;border-radius:10px;background:var(--bg)}
.slots-list li b{width:52px}.slots-list li span:nth-of-type(1){flex:1;min-width:120px}
.slots-list li.busy{border-left:4px solid #ff2e97}.slots-list li.blocked{border-left:4px solid var(--mute);opacity:.8}
/* reagendar */
.modal{position:fixed;inset:0;z-index:50;background:rgba(0,0,0,.5);display:grid;place-items:center;padding:16px}
.sheet{width:min(460px,100%);background:var(--card);border-radius:20px;padding:22px;display:flex;flex-direction:column;gap:12px}
.slots{display:flex;flex-wrap:wrap;gap:8px}
.slot{padding:8px 14px;border:1px solid var(--line);border-radius:999px;background:none;color:var(--ink);cursor:pointer;font:inherit}
.slot.on{background:var(--acc);color:#04222a;border-color:var(--acc)}.slot:disabled{opacity:.35;text-decoration:line-through;cursor:not-allowed}
.sheet .dt{display:flex;flex-direction:column;font-size:12px;color:var(--mute);gap:2px}
.sheet .acts{justify-content:flex-end}
/* ajustes */
.tbl{width:100%;border-collapse:collapse;margin-bottom:12px;font-size:14px}.tbl th{text-align:left;font-size:12px;color:var(--mute);font-weight:600;padding:4px 6px}.tbl td{padding:4px 6px;border-top:1px solid var(--line)}
.two{display:grid;grid-template-columns:1fr 1fr;gap:14px}@media(max-width:700px){.two{grid-template-columns:1fr}}
.row{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:4px 0;font-size:14px}
.settings label{display:flex;flex-direction:column;gap:4px;font-size:13px;color:var(--mute)}.settings label.row{flex-direction:row;color:var(--ink)}
.settings label.chk{flex-direction:row;align-items:center;color:var(--ink);padding-top:20px}
.pkg{padding:14px 0;border-top:1px solid var(--line);display:flex;flex-direction:column;gap:10px}
.pkg textarea{width:100%;resize:vertical}
.chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px}
.chip{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border:1px solid var(--line);border-radius:999px;background:var(--bg);font-size:13px;color:var(--ink)}
.chip button{background:none;border:0;color:var(--mute);cursor:pointer;padding:0;font-size:12px}
.chip.tgl{cursor:pointer}.chip.tgl.on{background:#d4351c;color:#fff;border-color:#d4351c}
.add{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.savebar{position:sticky;bottom:10px;display:flex;gap:10px;justify-content:flex-end;align-items:center;flex-wrap:wrap;padding:12px 16px;border:1px solid var(--line);border-radius:999px;background:color-mix(in srgb,var(--card) 92%,transparent);backdrop-filter:blur(10px)}
</style>
