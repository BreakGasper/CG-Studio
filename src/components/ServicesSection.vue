<script setup>
import { servicios } from '../data.js'
const shapes = ['14px', '50%', '14px 44px 14px 44px', '44px 14px 44px 14px']
const colors = ['var(--accent)', 'var(--accent2)', 'var(--gold)']
</script>

<template>
  <section id="servicios" class="wrap section stack" style="gap:56px">
    <div class="stack" style="gap:18px;max-width:760px" v-reveal>
      <div class="mono eyebrow">Soluciones y servicios</div>
      <h2 class="h2">Todo lo que tu operación necesita para escalar.</h2>
    </div>
    <div class="grid">
      <div v-for="(s, i) in servicios" :key="s.titulo" class="card" v-reveal>
        <span class="ic" :style="{ background: colors[i % 3], borderRadius: shapes[i % 4] }"></span>
        <h3 class="disp">{{ s.titulo }}</h3>
        <p class="mute">{{ s.texto }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
.card { display: flex; flex-direction: column; gap: 14px; border-radius: 26px; }
.ic { width: 44px; height: 44px; }
h3 { font-size: 24px; font-weight: 700; }
p { font-size: 15px; }
</style>
