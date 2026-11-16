<script setup>
import { ref, computed } from 'vue'
import { proyectos, categorias } from '../data.js'
import ProjectMockup from './ProjectMockup.vue'

const activa = ref('Todos')
const visibles = computed(() =>
  activa.value === 'Todos' ? proyectos : proyectos.filter((p) => p.categoria === activa.value)
)
</script>

<template>
  <section id="portfolio" class="port">
    <div class="wrap section stack" style="gap:56px">
      <div class="row head" v-reveal>
        <div class="stack" style="flex:1 1 480px;gap:18px;min-width:0">
          <div class="mono eyebrow">Portfolio</div>
          <h2 class="h2">Sistemas que ya trabajan por sus dueños.</h2>
        </div>
        <p class="mute note">Proyectos de ejemplo. Edita <code>src/data.js</code> para añadir los reales.</p>
      </div>

      <div class="row" style="gap:10px" role="group" aria-label="Filtrar por categoría">
        <button v-for="c in categorias" :key="c" type="button" class="pill" :class="{ on: c === activa }" :aria-pressed="c === activa" @click="activa = c">{{ c }}</button>
      </div>

      <TransitionGroup name="grid" tag="div" class="grid">
        <article v-for="p in visibles" :key="p.id" class="card proj" :class="p.tamano">
          <ProjectMockup :tipo="p.mockup" />
          <div class="mono cat">{{ p.categoria }}</div>
          <h3 class="disp pn">{{ p.nombre }}</h3>
          <p class="mute"><b>Problema:</b> {{ p.problema }}</p>
          <p class="mute"><b>Funciones:</b> {{ p.funciones }}</p>
          <div class="row" style="gap:8px;margin-top:auto"><span v-for="t in p.tecnologias" :key="t" class="mono chip">{{ t }}</span></div>
        </article>
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
.port { background: var(--panel); border-block: 1px solid var(--line); }
.head { align-items: flex-end; justify-content: space-between; gap: 28px; }
.note { flex: 1 1 320px; max-width: 400px; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.proj { background: var(--bg); border-radius: 32px; padding: 20px; display: flex; flex-direction: column; gap: 14px; }
.proj.grande { grid-column: 1 / -1; }
.cat { font-size: 11px; color: var(--accent); font-weight: 700; margin-top: 6px; }
.pn { font-size: 28px; line-height: 1.05; font-weight: 800; }
.proj p { font-size: 15px; }
.proj b { color: var(--ink); }
.grid-enter-active, .grid-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.grid-enter-from, .grid-leave-to { opacity: 0; transform: scale(0.96); }
.grid-leave-active { position: absolute; }
@media (min-width: 900px) {
  .proj.grande { flex-direction: row; align-items: stretch; }
  .proj.grande > :first-child { flex: 1.1; }
}
</style>
