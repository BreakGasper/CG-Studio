<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { booking, quote, contactEmail } from '../data/content'
import { bookTab, quoteType } from '../composables/useUi'
import { takenSlots, saveCita, saveCotizacion } from '../firebase/store'

const tab = bookTab
const KEY = 'cg-agenda'
const money = (n) => new Intl.NumberFormat('es', { style: 'currency', currency: booking.currency, maximumFractionDigits: 0 }).format(n)

// ---------- Agenda (guardada en este navegador) ----------
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] } }
const agenda = ref(load())
watch(agenda, (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)) } catch {} }, { deep: true })

const today = new Date().toISOString().slice(0, 10)
const f = reactive({ name: '', contact: '', date: '', time: '', topic: booking.topics[0], notes: '' })
const sent = ref(null)
const busy = ref(false)
const bookError = ref('')
const remoteTaken = ref([])

// Horarios ocupados: los de todos los visitantes (Firestore) más los de este navegador.
const taken = computed(() => new Set([...agenda.value.filter(a => a.kind === 'cita' && a.date === f.date).map(a => a.time), ...remoteTaken.value]))
async function refreshSlots() { remoteTaken.value = f.date ? (await takenSlots(f.date)) || [] : [] }
const canBook = computed(() => f.name.trim() && f.contact.trim() && f.date && f.time)
const sortedAgenda = computed(() => [...agenda.value].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)))
watch(() => f.date, async () => { bookError.value = ''; await refreshSlots(); if (taken.value.has(f.time)) f.time = '' })

const fmtDate = (d) => new Date(d + 'T12:00').toLocaleDateString('es', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6)

function send(subject, body) {
  const text = `${subject}\n\n${body}`
  if (booking.whatsapp) return `https://wa.me/${booking.whatsapp}?text=${encodeURIComponent(text)}`
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

async function book() {
  if (!canBook.value || busy.value) return
  busy.value = true
  bookError.value = ''
  const data = { ...f }
  const r = await saveCita(data)
  if (!r.ok && r.reason !== 'unavailable') {
    // Otro visitante reservó ese horario, o no se pudo guardar.
    await refreshSlots()
    if (taken.value.has(f.time)) f.time = ''
    bookError.value = r.reason === 'taken'
      ? 'Ese horario acaba de ser reservado. Elige otro, por favor.'
      : 'No pudimos guardar tu cita. Inténtalo de nuevo o escríbenos por correo.'
    busy.value = false
    return
  }
  const item = { id: uid(), kind: 'cita', ...data }
  agenda.value.push(item)
  sent.value = {
    item,
    saved: r.ok,
    href: send(`Cita CG Studio: ${data.topic}`,
      `Nombre: ${data.name}\nContacto: ${data.contact}\nFecha: ${fmtDate(data.date)} ${data.time}\nTema: ${data.topic}\nNotas: ${data.notes || '-'}`),
  }
  Object.assign(f, { name: '', contact: '', time: '', notes: '' })
  await refreshSlots()
  busy.value = false
}

function remove(id) { agenda.value = agenda.value.filter(a => a.id !== id) }

function ics(a) {
  const d = a.date.replace(/-/g, '') + 'T' + a.time.replace(':', '') + '00'
  const [h, m] = a.time.split(':').map(Number)
  const end = a.date.replace(/-/g, '') + 'T' + String(h + 1).padStart(2, '0') + String(m).padStart(2, '0') + '00'
  const txt = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT', `UID:${a.id}@cgstudio`, `DTSTART:${d}`, `DTEND:${end}`,
    `SUMMARY:Cita CG Studio - ${a.topic}`, `DESCRIPTION:${a.name} (${a.contact})`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n')
  const url = URL.createObjectURL(new Blob([txt], { type: 'text/calendar' }))
  const l = document.createElement('a'); l.href = url; l.download = 'cita-cg-studio.ics'; l.click()
  URL.revokeObjectURL(url)
}

// ---------- Cotizador ----------
const q = reactive({ type: 'web', extras: [], cx: 'low', ug: 'normal', maint: false })
const calc = computed(() => {
  const t = quote.types.find(x => x.id === q.type)
  const ex = quote.extras.filter(x => q.extras.includes(x.id))
  const cx = quote.complexity.find(x => x.id === q.cx).mult
  const ug = quote.urgency.find(x => x.id === q.ug).mult
  const total = (t.price + ex.reduce((s, x) => s + x.price, 0)) * cx * ug
  const weeks = Math.ceil((t.weeks + ex.reduce((s, x) => s + x.weeks, 0)) * cx / (ug > 1 ? 1.5 : 1))
  const r = (n) => Math.round(n / 50) * 50
  return { t, ex, total: r(total), min: r(total * (1 - quote.spread)), max: r(total * (1 + quote.spread)), weeks }
})
watch(quoteType, (t) => { if (t) q.type = t }, { immediate: true })
const qc = reactive({ name: '', contact: '' })
const qSent = ref(null)

function summary() {
  const c = calc.value
  return `Tipo: ${c.t.label}\nExtras: ${c.ex.map(x => x.label).join(', ') || 'ninguno'}\nComplejidad: ${quote.complexity.find(x => x.id === q.cx).label}\nUrgencia: ${quote.urgency.find(x => x.id === q.ug).label}\n` +
    `Mantenimiento: ${q.maint ? 'sí' : 'no'}\nEstimado: ${money(c.min)} – ${money(c.max)} (~${c.weeks} sem.)`
}
const qBusy = ref(false)
const qSaved = ref(false)
async function requestQuote() {
  if (!qc.name.trim() || !qc.contact.trim() || qBusy.value) return
  qBusy.value = true
  const c = calc.value
  const r = await saveCotizacion({
    name: qc.name, contact: qc.contact, type: q.type, extras: [...q.extras], complexity: q.cx, urgency: q.ug,
    maint: q.maint, min: c.min, max: c.max, weeks: c.weeks,
  })
  qSaved.value = r.ok
  const body = `Nombre: ${qc.name}\nContacto: ${qc.contact}\n${summary()}`
  agenda.value.push({ id: uid(), kind: 'cotización', date: today, time: '', name: qc.name, contact: qc.contact, topic: `${c.t.label} · ${money(c.min)}–${money(c.max)}` })
  qSent.value = send('Solicitud de cotización CG Studio', body)
  qBusy.value = false
}
</script>

<template>
  <section id="book">
    <div class="eyebrow">Agenda y cotización</div>
    <h2 class="disp">Agenda una cita o cotiza en minutos</h2>

    <div class="bk">
      <div class="bk-main">
        <div class="bk-tabs" role="tablist">
          <button type="button" :class="{ on: tab === 'cita' }" role="tab" @click="tab = 'cita'">Agendar cita</button>
          <button type="button" :class="{ on: tab === 'cotiza' }" role="tab" @click="tab = 'cotiza'">Cotizador</button>
        </div>
      <!-- CITA -->
      <form v-if="tab === 'cita'" class="bk-card" @submit.prevent="book">
        <div class="bk-row">
          <label>Nombre<input v-model="f.name" required autocomplete="name" /></label>
          <label>Correo o WhatsApp<input v-model="f.contact" required autocomplete="email" /></label>
        </div>
        <div class="bk-row">
          <label>Fecha<input v-model="f.date" type="date" :min="today" required /></label>
          <label>Tema
            <select v-model="f.topic"><option v-for="t in booking.topics" :key="t">{{ t }}</option></select>
          </label>
        </div>
        <div class="bk-lbl">Horario</div>
        <div class="bk-slots">
          <button v-for="s in booking.slots" :key="s" type="button" class="tab" :class="{ on: f.time === s }"
            :disabled="!f.date || taken.has(s)" @click="f.time = s">{{ s }}</button>
        </div>
        <label>Notas (opcional)<textarea v-model="f.notes" rows="2" /></label>
        <button class="btn pri" :disabled="!canBook || busy">{{ busy ? 'Guardando…' : 'Registrar cita' }}</button>
        <p v-if="bookError" class="bk-err" role="alert">{{ bookError }}</p>
        <p v-if="sent" class="bk-ok">
          <template v-if="sent.saved">✓ Cita recibida para el {{ fmtDate(sent.item.date) }} a las {{ sent.item.time }}. Te confirmaremos pronto.</template>
          <template v-else>✓ Cita registrada para el {{ fmtDate(sent.item.date) }} a las {{ sent.item.time }}.
            <a :href="sent.href" target="_blank" rel="noopener">Enviar confirmación →</a></template>
        </p>
      </form>

      <!-- COTIZADOR -->
      <div v-else class="bk-card">
        <div class="bk-lbl">¿Qué necesitas?</div>
        <div class="bk-opts">
          <label v-for="t in quote.types" :key="t.id" class="tab" :class="{ on: q.type === t.id }">
            <input v-model="q.type" type="radio" :value="t.id" hidden />{{ t.label }}
          </label>
        </div>
        <div class="bk-lbl">Extras</div>
        <div class="bk-opts">
          <label v-for="x in quote.extras" :key="x.id" class="tab" :class="{ on: q.extras.includes(x.id) }">
            <input v-model="q.extras" type="checkbox" :value="x.id" hidden />{{ x.label }}
          </label>
        </div>
        <div class="bk-row">
          <div><div class="bk-lbl">Complejidad</div>
            <div class="bk-opts"><label v-for="c in quote.complexity" :key="c.id" class="tab" :class="{ on: q.cx === c.id }">
              <input v-model="q.cx" type="radio" :value="c.id" hidden />{{ c.label }}</label></div></div>
          <div><div class="bk-lbl">Urgencia</div>
            <div class="bk-opts"><label v-for="u in quote.urgency" :key="u.id" class="tab" :class="{ on: q.ug === u.id }">
              <input v-model="q.ug" type="radio" :value="u.id" hidden />{{ u.label }}</label></div></div>
        </div>
        <label class="tab" :class="{ on: q.maint }" style="align-self:flex-start">
          <input v-model="q.maint" type="checkbox" hidden />{{ quote.maintenance.label }} (+{{ money(quote.maintenance.price) }}/mes)
        </label>

        <div class="bk-total">
          <small>Estimado</small>
          <b>{{ money(calc.min) }} – {{ money(calc.max) }}</b>
          <span>≈ {{ calc.weeks }} semanas<template v-if="q.maint"> · + {{ money(quote.maintenance.price) }}/mes</template></span>
        </div>
        <div class="bk-row">
          <label>Nombre<input v-model="qc.name" autocomplete="name" /></label>
          <label>Correo o WhatsApp<input v-model="qc.contact" autocomplete="email" /></label>
        </div>
        <button class="btn pri" :disabled="!qc.name.trim() || !qc.contact.trim() || qBusy" @click="requestQuote">{{ qBusy ? 'Enviando…' : 'Solicitar esta cotización' }}</button>
        <p v-if="qSent" class="bk-ok"><template v-if="qSaved">✓ Solicitud recibida. Te enviaremos tu cotización pronto.</template><template v-else>✓ Cotización registrada. <a :href="qSent" target="_blank" rel="noopener">Enviar solicitud →</a></template></p>
        <p class="bk-note">Estimado orientativo; la cotización final se confirma tras revisar el alcance.</p>
      </div>

      </div>

      <!-- AGENDA -->
      <div class="bk-card bk-agenda">
        <h3>Mis solicitudes <span class="cnt">{{ sortedAgenda.length }}</span></h3>
        <p v-if="!sortedAgenda.length" class="bk-note">Aún no hay citas ni cotizaciones registradas.</p>
        <ul>
          <li v-for="a in sortedAgenda" :key="a.id">
            <div><b>{{ a.kind === 'cita' ? fmtDate(a.date) + ' · ' + a.time : 'Cotización · ' + fmtDate(a.date) }}</b>
              <span>{{ a.name }} — {{ a.topic }}</span></div>
            <div class="bk-act">
              <button v-if="a.kind === 'cita'" title="Añadir al calendario" @click="ics(a)">📅</button>
              <button title="Eliminar" @click="remove(a.id)">✕</button>
            </div>
          </li>
        </ul>
        <p class="bk-note">Se guarda en este navegador.</p>
      </div>
    </div>
  </section>
</template>
