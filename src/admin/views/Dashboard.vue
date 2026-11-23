<script setup>
import { computed } from 'vue'
import { data } from '../store'
import { addDays, iso, todayIso, fmtDate, money, stageOf, when } from '../utils'

const emit = defineEmits(['go'])

const nuevas = computed(() => ({
  citas: data.citas.filter((r) => stageOf('citas', r) === 'nueva').length,
  cotizaciones: data.cotizaciones.filter((r) => stageOf('cotizaciones', r) === 'nueva').length,
  contactos: data.contactos.filter((r) => stageOf('contactos', r) === 'nueva').length,
}))

// Citas de hoy en adelante (sin canceladas ni archivadas)
const proximas = computed(() => data.citas
  .filter((r) => r.date >= todayIso() && !['cancelada', 'archivada', 'realizada'].includes(stageOf('citas', r)))
  .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)))
const proximas7 = computed(() => proximas.value.filter((r) => r.date <= iso(addDays(new Date(), 7))).length)

// Valor potencial de las cotizaciones que siguen abiertas (punto medio del rango estimado)
const abiertas = computed(() => data.cotizaciones.filter((r) => ['nueva', 'contactada', 'propuesta'].includes(stageOf('cotizaciones', r))))
const potencial = computed(() => abiertas.value.reduce((s, r) => s + ((r.min || 0) + (r.max || 0)) / 2, 0))
const ganadasMes = computed(() => {
  const ym = todayIso().slice(0, 7)
  return data.cotizaciones.filter((r) => stageOf('cotizaciones', r) === 'ganada' && (r.createdAt?.toDate ? iso(r.createdAt.toDate()).slice(0, 7) === ym : false))
    .reduce((s, r) => s + ((r.min || 0) + (r.max || 0)) / 2, 0)
})

// Solicitudes por semana (últimas 8), apiladas por tipo
const weeks = computed(() => {
  const start = new Date(); start.setHours(0, 0, 0, 0)
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7)) // lunes de esta semana
  const out = Array.from({ length: 8 }, (_, i) => {
    const d = addDays(start, (i - 7) * 7)
    return { from: d, label: d.toLocaleDateString('es', { day: 'numeric', month: 'short' }), citas: 0, cotizaciones: 0, contactos: 0 }
  })
  for (const k of ['citas', 'cotizaciones', 'contactos']) {
    for (const r of data[k]) {
      const t = r.createdAt?.toDate?.(); if (!t) continue
      const w = out.findLast ? out.findLast((x) => x.from <= t) : [...out].reverse().find((x) => x.from <= t)
      if (w) w[k]++
    }
  }
  return out
})
const maxWeek = computed(() => Math.max(3, ...weeks.value.map((w) => w.citas + w.cotizaciones + w.contactos)))

// Visitas de los últimos 14 días
const dias = computed(() => {
  const map = Object.fromEntries(data.visitas.map((v) => [v.day, v]))
  return Array.from({ length: 14 }, (_, i) => { const d = iso(addDays(new Date(), i - 13)); return { day: d, n: map[d]?.n || 0 } })
})
const maxDia = computed(() => Math.max(3, ...dias.value.map((d) => d.n)))
const visitasHoy = computed(() => dias.value[13].n)
const visitas14 = computed(() => dias.value.reduce((s, d) => s + d.n, 0))

// Lo más reciente de todo
const recientes = computed(() => [
  ...data.citas.map((r) => ({ kind: 'citas', r, t: 'Cita', d: `${fmtDate(r.date)} · ${r.time}` })),
  ...data.cotizaciones.map((r) => ({ kind: 'cotizaciones', r, t: 'Cotización', d: `${money(r.min)} – ${money(r.max)}` })),
  ...data.contactos.map((r) => ({ kind: 'contactos', r, t: 'Mensaje', d: r.subject })),
].filter((x) => x.r.createdAt?.toDate).sort((a, b) => b.r.createdAt.toDate() - a.r.createdAt.toDate()).slice(0, 6))
</script>

<template>
  <div class="dash">
    <div class="tiles">
      <button class="tile" @click="emit('go', 'citas')"><small>Citas nuevas</small><b>{{ nuevas.citas }}</b><span>{{ proximas7 }} en los próximos 7 días</span></button>
      <button class="tile" @click="emit('go', 'cotizaciones')"><small>Cotizaciones nuevas</small><b>{{ nuevas.cotizaciones }}</b><span>{{ abiertas.length }} abiertas</span></button>
      <button class="tile" @click="emit('go', 'contactos')"><small>Mensajes sin responder</small><b>{{ nuevas.contactos }}</b><span>{{ data.contactos.length }} en total</span></button>
      <button class="tile pot" @click="emit('go', 'cotizaciones')"><small>Valor potencial abierto</small><b>{{ money(potencial) }}</b><span>Ganado este mes: {{ money(ganadasMes) }}</span></button>
    </div>

    <div class="a-grid2">
      <section class="a-card">
        <h3>Solicitudes por semana</h3>
        <svg class="chart" viewBox="0 0 320 130" role="img" aria-label="Solicitudes por semana">
          <g v-for="(w, i) in weeks" :key="i">
            <rect :x="i * 40 + 8" :y="104 - (w.citas / maxWeek) * 90" width="24" :height="(w.citas / maxWeek) * 90" fill="var(--acc)" />
            <rect :x="i * 40 + 8" :y="104 - ((w.citas + w.cotizaciones) / maxWeek) * 90" width="24" :height="(w.cotizaciones / maxWeek) * 90" fill="#ff2e97" />
            <rect :x="i * 40 + 8" :y="104 - ((w.citas + w.cotizaciones + w.contactos) / maxWeek) * 90" width="24" :height="(w.contactos / maxWeek) * 90" fill="#8d99a8" />
            <text :x="i * 40 + 20" y="122" text-anchor="middle" font-size="8" fill="var(--mute)">{{ w.label }}</text>
          </g>
        </svg>
        <p class="leg"><i style="background:var(--acc)"></i>Citas <i style="background:#ff2e97"></i>Cotizaciones <i style="background:#8d99a8"></i>Mensajes</p>
      </section>

      <section class="a-card">
        <h3>Visitas <small>(últimos 14 días)</small></h3>
        <svg class="chart" viewBox="0 0 320 110" role="img" aria-label="Visitas por día">
          <rect v-for="(d, i) in dias" :key="d.day" :x="i * 22.8 + 4" :y="90 - (d.n / maxDia) * 80" width="16" :height="Math.max(2, (d.n / maxDia) * 80)" rx="3" fill="var(--acc)" :opacity="i === 13 ? 1 : 0.6" />
          <text x="4" y="106" font-size="8" fill="var(--mute)">{{ dias[0].day.slice(5) }}</text>
          <text x="316" y="106" text-anchor="end" font-size="8" fill="var(--mute)">hoy</text>
        </svg>
        <p class="leg"><b>{{ visitasHoy }}</b> hoy · <b>{{ visitas14 }}</b> en 14 días</p>
      </section>
    </div>

    <div class="a-grid2">
      <section class="a-card">
        <h3>Próximas citas</h3>
        <p v-if="!proximas.length" class="muted">No hay citas próximas.</p>
        <ul class="mini">
          <li v-for="r in proximas.slice(0, 5)" :key="r.id" @click="emit('go', 'citas')">
            <b>{{ fmtDate(r.date) }} · {{ r.time }}</b><span>{{ r.name }} — {{ r.topic }}</span>
          </li>
        </ul>
      </section>
      <section class="a-card">
        <h3>Lo más reciente</h3>
        <p v-if="!recientes.length" class="muted">Aún no hay solicitudes.</p>
        <ul class="mini">
          <li v-for="x in recientes" :key="x.kind + x.r.id" @click="emit('go', x.kind)">
            <b>{{ x.t }} · {{ x.r.name }}</b><span>{{ x.d }} · {{ when(x.r.createdAt) }}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
