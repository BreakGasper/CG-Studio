<script setup>
import { experience } from '../data/content'
</script>

<template>
  <section id="experience">
    <div class="eyebrow">Experiencia por sector</div>
    <h2 class="disp">Áreas en las que hemos desarrollado</h2>
    <p class="lead">Conocemos cómo funciona cada negocio, no solo cómo se programa. Esto es lo que hemos construido.</p>
    <div class="xp-grid">
      <article v-for="x in experience" :key="x.id" class="xp">
        <span class="xp-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><path :d="x.icon" /></svg></span>
        <h3>{{ x.title }}</h3>
        <p>{{ x.text }}</p>
        <div class="chips"><span v-for="t in x.tags" :key="t">{{ t }}</span></div>
      </article>
    </div>
  </section>
</template>
