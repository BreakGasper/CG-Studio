<script setup>
import { contactEmail } from '../data/content'
</script>

<template>
  <section id="contact">
    <div class="cta-big">
      <div class="mbadge"><svg viewBox="0 0 560 1150" aria-label="Mascota CG"><use href="#mcv" /></svg></div>
      <h2 class="disp">Construyamos algo grande</h2>
      <span class="btn">{{ contactEmail }}</span>
    </div>
  </section>
</template>
