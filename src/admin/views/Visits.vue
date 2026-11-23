<script setup>
import { computed } from 'vue'
import { data } from '../store'
import { addDays, iso } from '../utils'

const days = computed(() => {
  const map = Object.fromEntries(data.visitas.map((v) => [v.day, v]))
  return Array.from({ length: 30 }, (_, i) => {
    const d = iso(addDays(new Date(), i - 29))
    return { day: d, n: map[d]?.n || 0, m: map[d]?.m || 0, d: map[d]?.d || 0 }
  })
})
const max = computed(() => Math.max(3, ...days.value.map((d) => d.n)))
const sum = (a, k) => a.reduce((s, x) => s + x[k], 0)
const total30 = computed(() => sum(days.value, 'n'))
const total7 = computed(() => sum(days.value.slice(-7), 'n'))
const hoy = computed(() => days.value[29].n)
const movilPct = computed(() => (total30.value ? Math.round((sum(days.value, 'm') / total30.value) * 100) : 0))
</script>

<template>
  <div>
    <div class="tiles">
      <div class="tile"><small>Hoy</small><b>{{ hoy }}</b><span>visitas</span></div>
      <div class="tile"><small>Últimos 7 días</small><b>{{ total7 }}</b><span>visitas</span></div>
      <div class="tile"><small>Últimos 30 días</small><b>{{ total30 }}</b><span>visitas</span></div>
      <div class="tile"><small>Desde celular</small><b>{{ movilPct }}%</b><span>de las visitas</span></div>
    </div>

    <section class="a-card">
      <h3>Visitas por día (30 días)</h3>
      <svg class="chart" viewBox="0 0 330 120" role="img" aria-label="Visitas por día">
        <g v-for="(d, i) in days" :key="d.day">
          <rect :x="i * 10.9 + 3" :y="100 - (d.d / max) * 90" width="8" :height="(d.d / max) * 90" fill="var(--acc)" />
          <rect :x="i * 10.9 + 3" :y="100 - (d.n / max) * 90" width="8" :height="(d.m / max) * 90" fill="#ff2e97" />
        </g>
        <text x="3" y="116" font-size="8" fill="var(--mute)">{{ days[0].day.slice(5) }}</text>
        <text x="327" y="116" text-anchor="end" font-size="8" fill="var(--mute)">hoy</text>
      </svg>
      <p class="leg"><i style="background:var(--acc)"></i>Escritorio <i style="background:#ff2e97"></i>Celular</p>
    </section>

    <section class="a-card">
      <h3>Reportes completos de Google Analytics</h3>
      <p class="muted">Este contador es anónimo y cuenta una visita por pestaña del navegador (sin cookies). Para ver de dónde llegan tus visitantes, qué secciones leen más y el tiempo en la página, abre Google Analytics. Solo registra a quienes aceptan el aviso de analítica de la página.</p>
      <p><a class="go sm lnk" href="https://console.firebase.google.com/project/cg-studio-1d248/analytics" target="_blank" rel="noopener">Abrir Analytics ↗</a></p>
    </section>
  </div>
</template>
