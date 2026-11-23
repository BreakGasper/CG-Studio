<script setup>
import { ref, computed, watch } from 'vue'
import { data, fresh, setStage, saveNotes, removeRow } from '../store'
import { STAGES, KIND_LABEL, CSV_COLS, stageOf, fmtDate, when, money, isMail, waLink, toCSV, download, todayIso } from '../utils'
import Reschedule from './Reschedule.vue'

const props = defineProps({ kind: { type: String, required: true } })

const q = ref('')
const stage = ref('nueva') // 'todas' | id de etapa
const from = ref('')
const to = ref('')
const resched = ref(null)
const saved = ref('')

watch(() => props.kind, () => { q.value = ''; stage.value = 'nueva'; from.value = ''; to.value = '' })

const stages = computed(() => STAGES[props.kind])
const all = computed(() => data[props.kind])
const countOf = (id) => all.value.filter((r) => stageOf(props.kind, r) === id).length

const text = (r) => [r.name, r.contact, r.email, r.phone, r.topic, r.subject, r.message, r.notes, r.notas, r.type, r.date].join(' ').toLowerCase()
const rows = computed(() => {
  const term = q.value.trim().toLowerCase()
  let out = all.value.filter((r) => (stage.value === 'todas' || stageOf(props.kind, r) === stage.value) && (!term || text(r).includes(term)))
  if (from.value || to.value) {
    out = out.filter((r) => {
      const d = props.kind === 'citas' ? r.date : (r.createdAt?.toDate ? r.createdAt.toDate().toISOString().slice(0, 10) : '')
      return (!from.value || d >= from.value) && (!to.value || d <= to.value)
    })
  }
  return props.kind === 'citas' ? [...out].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)) : out
})

function exportCsv() {
  download(`${props.kind}-${todayIso()}.csv`, toCSV(rows.value, CSV_COLS[props.kind]))
}

const contact = (r) => (props.kind === 'contactos' ? r.email : r.contact)
function mailHref(r) {
  const subj = props.kind === 'citas' ? `Tu cita con CG Studio (${r.date} ${r.time})` : props.kind === 'cotizaciones' ? 'Tu cotización con CG Studio' : `Re: ${r.subject}`
  return `mailto:${contact(r)}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(`Hola ${r.name.split(' ')[0]},\n\n`)}`
}

const drafts = ref({})
const draft = (r) => (r.id in drafts.value ? drafts.value[r.id] : (r.notas || ''))
async function commitNotes(r) {
  const v = drafts.value[r.id]
  if (v === undefined || v === (r.notas || '')) return
  if (await saveNotes(props.kind, r, v)) { saved.value = r.id; setTimeout(() => (saved.value = ''), 1500) }
  delete drafts.value[r.id]
}
async function del(r) {
  if (confirm('¿Eliminar este registro? No se puede deshacer.')) await removeRow(props.kind, r)
}
</script>

<template>
  <div>
    <div class="bar">
      <input v-model="q" class="in grow" type="search" placeholder="Buscar por nombre, correo, mensaje…" aria-label="Buscar" />
      <select v-model="stage" class="in" aria-label="Etapa">
        <option value="todas">Todas ({{ all.length }})</option>
        <option v-for="[id, label] in stages" :key="id" :value="id">{{ label }} ({{ countOf(id) }})</option>
      </select>
      <label class="dt">Desde <input v-model="from" class="in" type="date" /></label>
      <label class="dt">Hasta <input v-model="to" class="in" type="date" /></label>
      <button class="go sm" :disabled="!rows.length" @click="exportCsv">⬇ Exportar a Excel</button>
    </div>
    <p class="count">{{ rows.length }} {{ KIND_LABEL[kind].toLowerCase() }}</p>

    <p v-if="!rows.length" class="box">No hay registros con ese filtro.</p>

    <article v-for="r in rows" :key="r.id" class="card" :class="{ fresh: fresh.has(r.id), done: stageOf(kind, r) !== 'nueva' }">
      <div class="top">
        <b v-if="kind === 'citas'">{{ fmtDate(r.date) }} · {{ r.time }}</b>
        <b v-else-if="kind === 'cotizaciones'">{{ money(r.min) }} – {{ money(r.max) }} · ≈{{ r.weeks }} sem.</b>
        <b v-else>{{ r.subject }}</b>
        <select class="st-sel" :class="stageOf(kind, r)" :value="stageOf(kind, r)" aria-label="Etapa" @change="setStage(kind, r, $event.target.value)">
          <option v-for="[id, label] in stages" :key="id" :value="id">{{ label }}</option>
        </select>
      </div>
      <p class="who2">{{ r.name }} · {{ contact(r) }}<template v-if="kind === 'contactos' && r.phone"> · {{ r.phone }}</template></p>
      <p v-if="kind === 'citas'" class="det">{{ r.topic }}<template v-if="r.notes"> — {{ r.notes }}</template></p>
      <p v-if="kind === 'cotizaciones'" class="det">{{ r.type }} · extras: {{ r.extras.join(', ') || 'ninguno' }} · {{ r.complexity }} · {{ r.urgency }}<template v-if="r.maint"> · con mantenimiento</template></p>
      <p v-if="kind === 'contactos'" class="det msg">{{ r.message }}</p>

      <textarea class="notes" rows="2" placeholder="Notas internas (solo tú las ves)…" :value="draft(r)"
        @input="drafts[r.id] = $event.target.value" @blur="commitNotes(r)"></textarea>
      <small v-if="saved === r.id" class="ok">Guardado ✓</small>

      <div class="foot">
        <small>Recibida {{ when(r.createdAt) }}</small>
        <span class="acts">
          <a v-if="isMail(contact(r))" :href="mailHref(r)">✉ Correo</a>
          <a v-else :href="waLink(contact(r))" target="_blank" rel="noopener">💬 WhatsApp</a>
          <button v-if="kind === 'citas'" @click="resched = r">📅 Reagendar</button>
          <button class="del" @click="del(r)">Eliminar</button>
        </span>
      </div>
    </article>

    <Reschedule v-if="resched" :row="resched" @close="resched = null" />
  </div>
</template>
