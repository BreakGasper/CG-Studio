<script setup>
import { steps } from '../data/content'
</script>

<template>
  <section id="method">
    <div class="eyebrow">Método en 3 pasos</div>
    <h2 class="disp">Descubrir, construir, lanzar</h2>
    <div class="steps" style="margin-top:28px">
      <div v-for="s in steps" :key="s.n" class="step"><b>{{ s.n }}</b><h3>{{ s.title }}</h3><p>{{ s.text }}</p></div>
    </div>
  </section>
</template>
