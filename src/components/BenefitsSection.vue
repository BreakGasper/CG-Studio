<script setup>
import { beneficios } from '../data.js'
</script>

<template>
  <section class="ben">
    <div class="wrap section stack" style="gap:56px">
      <div class="stack" style="gap:18px;max-width:760px" v-reveal>
        <div class="mono eyebrow">Beneficios</div>
        <h2 class="h2">Por qué trabajar con CG STUDIO.</h2>
      </div>
      <div class="grid">
        <div v-for="b in beneficios" :key="b.titulo" class="item" v-reveal>
          <h3 class="disp">{{ b.titulo }}</h3>
          <p class="mute">{{ b.texto }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ben { background: var(--panel); border-block: 1px solid var(--line); }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
.item { padding: 30px 28px; border-top: 1px solid var(--line); }
h3 { font-size: 26px; font-weight: 700; margin-bottom: 8px; }
p { font-size: 15px; }
</style>
