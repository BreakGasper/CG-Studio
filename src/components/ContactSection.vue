<script setup>
import { contactEmail } from '../data/content'
</script>

<template>
  <section id="contact">
    <div class="cta-big">
      <div class="mbadge"><svg viewBox="0 0 560 1150" aria-label="Mascota CG"><use href="#mcv" /></svg></div>
      <h2 class="disp">Construyamos algo grande</h2>
      <span class="btn">{{ contactEmail }}</span>
      <div class="cta-acts">
        <a class="btn pri" href="#book">Agendar cita</a>
        <a class="btn" href="#book">Cotizar proyecto</a>
      </div>
    </div>
  </section>
</template>
