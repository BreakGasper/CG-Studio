<script setup>
import { etapas } from '../data.js'
</script>

<template>
  <section id="metodo" class="wrap section stack" style="gap:56px">
    <div class="stack" style="gap:18px;max-width:760px" v-reveal>
      <div class="mono eyebrow">Metodología · 4 etapas</div>
      <h2 class="h2">Un camino claro desde la idea hasta producción.</h2>
    </div>
    <ol class="steps">
      <li v-for="(e, i) in etapas" :key="e.titulo" class="card step" :class="{ last: i === etapas.length - 1 }" :style="{ marginTop: i * 32 + 'px' }" v-reveal>
        <span class="disp n">{{ i + 1 }}</span>
        <h3 class="disp">{{ e.titulo }}</h3>
        <p>{{ e.texto }}</p>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.steps { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-start; }
.step { flex: 1 1 260px; min-width: 0; display: flex; flex-direction: column; gap: 14px; border-radius: 30px; padding: 30px; }
.n { font-size: 72px; font-weight: 800; line-height: 1; color: var(--accent); }
h3 { font-size: 24px; font-weight: 700; }
p { font-size: 15px; color: var(--mute); }
.step.last { background: var(--accent); color: #10121b; border-color: var(--accent); }
.step.last .n, .step.last p { color: #10121b; }
@media (max-width: 700px) { .step { margin-top: 0 !important; } }
</style>
