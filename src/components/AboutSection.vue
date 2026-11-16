<script setup>
import { timeline, awards } from '../data/content'
</script>

<template>
  <section id="about">
    <div class="eyebrow">Nosotros</div>
    <h2 class="disp">Software con claridad, estrategia y velocidad</h2>
    <p class="lead">Combinamos ingeniería, producto e IA para que cada proyecto sea funcional, escalable y fácil de mantener.</p>
    <div class="about-grid">
      <div class="tl">
        <div v-for="t in timeline" :key="t.title"><small>{{ t.when }}</small><h3>{{ t.title }}</h3><p>{{ t.text }}</p></div>
      </div>
      <div class="awards">
        <div v-for="a in awards" :key="a.name"><span>{{ a.name }}</span><small>{{ a.note }}</small></div>
      </div>
    </div>
  </section>
</template>
