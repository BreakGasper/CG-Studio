<script setup>
import { ref, computed } from 'vue'
import { data, eff, blockSlot, unblockSlot, toggleBlockedDate } from '../store'
import { iso, todayIso, fmtDate, stageOf } from '../utils'
import Reschedule from './Reschedule.vue'

const emit = defineEmits(['go'])
const now = new Date()
const year = ref(now.getFullYear())
const month = ref(now.getMonth())
const sel = ref(todayIso())
const resched = ref(null)

const title = computed(() => { const t = new Date(year.value, month.value, 1).toLocaleDateString('es', { month: 'long', year: 'numeric' }); return t.charAt(0).toUpperCase() + t.slice(1) })
function move(n) {
  const d = new Date(year.value, month.value + n, 1)
  year.value = d.getFullYear(); month.value = d.getMonth()
}
function today() { year.value = now.getFullYear(); month.value = now.getMonth(); sel.value = todayIso() }

// Citas vigentes (no canceladas) por fecha
const byDate = computed(() => {
  const m = {}
  for (const c of data.citas) if (stageOf('citas', c) !== 'cancelada') (m[c.date] ||= []).push(c)
  for (const k in m) m[k].sort((a, b) => a.time.localeCompare(b.time))
  return m
})

const cells = computed(() => {
  const first = new Date(year.value, month.value, 1)
  const lead = (first.getDay() + 6) % 7 // lunes primero
  const days = new Date(year.value, month.value + 1, 0).getDate()
  const out = []
  for (let i = 0; i < lead; i++) out.push(null)
  for (let d = 1; d <= days; d++) {
    const date = iso(new Date(year.value, month.value, d))
    const wd = new Date(date + 'T12:00').getDay()
    out.push({ d, date, citas: byDate.value[date] || [], off: eff.value.closedWeekdays.includes(wd) || eff.value.blockedDates.includes(date) })
  }
  return out
})

// Detalle del día seleccionado: cada horario libre, con cita o bloqueado
const dayOff = computed(() => eff.value.blockedDates.includes(sel.value) || eff.value.closedWeekdays.includes(new Date(sel.value + 'T12:00').getDay()))
const slots = computed(() => eff.value.slots.map((time) => {
  const cita = (byDate.value[sel.value] || []).find((c) => c.time === time)
  const taken = data.horarios.some((h) => h.date === sel.value && h.time === time)
  return { time, cita, blocked: !cita && taken }
}))
const wdNames = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
const dayClosedByWeekday = computed(() => eff.value.closedWeekdays.includes(new Date(sel.value + 'T12:00').getDay()))
</script>

<template>
  <div class="cal-wrap">
    <div class="cal-head">
      <button @click="move(-1)" aria-label="Mes anterior">‹</button>
      <h3>{{ title }}</h3>
      <button @click="move(1)" aria-label="Mes siguiente">›</button>
      <button class="sm" @click="today">Hoy</button>
    </div>

    <div class="cal">
      <b v-for="n in ['L', 'M', 'M', 'J', 'V', 'S', 'D']" :key="n + Math.random()" class="wd">{{ n }}</b>
      <template v-for="(c, i) in cells" :key="i">
        <span v-if="!c" class="cell empty"></span>
        <button v-else class="cell" :class="{ sel: sel === c.date, today: c.date === todayIso(), off: c.off }" @click="sel = c.date">
          <i>{{ c.d }}</i>
          <em v-if="c.citas.length" class="dot">{{ c.citas.length }}</em>
        </button>
      </template>
    </div>

    <section class="a-card day">
      <h3>{{ fmtDate(sel) }}</h3>
      <p v-if="dayClosedByWeekday" class="muted">Los {{ wdNames[new Date(sel + 'T12:00').getDay()] }} están cerrados (se cambia en Ajustes).</p>
      <p v-else-if="eff.blockedDates.includes(sel)" class="muted">Día marcado como no disponible.</p>
      <ul class="slots-list">
        <li v-for="s in slots" :key="s.time" :class="{ busy: s.cita, blocked: s.blocked }">
          <b>{{ s.time }}</b>
          <span v-if="s.cita">{{ s.cita.name }} — {{ s.cita.topic }}</span>
          <span v-else-if="s.blocked">Bloqueado</span>
          <span v-else class="muted">Libre</span>
          <span class="acts">
            <button v-if="s.cita" @click="resched = s.cita">Reagendar</button>
            <button v-if="s.cita" @click="emit('go', 'citas')">Ver</button>
            <button v-if="s.blocked" @click="unblockSlot(sel, s.time)">Desbloquear</button>
            <button v-if="!s.cita && !s.blocked && !dayOff" @click="blockSlot(sel, s.time)">Bloquear</button>
          </span>
        </li>
      </ul>
      <button class="sm" @click="toggleBlockedDate(sel)">{{ eff.blockedDates.includes(sel) ? 'Volver a abrir este día' : 'Marcar el día completo como no disponible' }}</button>
    </section>

    <Reschedule v-if="resched" :row="resched" @close="resched = null" />
  </div>
</template>
