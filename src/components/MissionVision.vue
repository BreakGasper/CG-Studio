<script setup>
import { missionVision } from '../data/content'

// Iconos de línea (24x24): mira/objetivo para la misión, ojo para la visión.
const icons = {
  mision: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 12h.01',
  vision: 'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
}
</script>

<template>
  <section id="mission">
    <div class="eyebrow">Propósito</div>
    <h2 class="disp">Misión y visión</h2>
    <div class="mv">
      <article v-for="m in missionVision" :key="m.id" class="mv-card">
        <span class="mv-ico" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path :d="icons[m.id]" /></svg>
        </span>
        <h3>{{ m.label }}</h3>
        <p>{{ m.text }}</p>
      </article>
    </div>
  </section>
</template>
