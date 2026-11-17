<script setup>
import { faqs } from '../data/content'
</script>

<template>
  <section id="faq">
    <div class="eyebrow">Preguntas frecuentes</div>
    <h2 class="disp">Lo que suelen preguntarnos</h2>
    <div class="faq">
      <details v-for="(f, i) in faqs" :key="f.q" :open="i === 0">
        <summary>{{ f.q }}<span class="faq-ic" aria-hidden="true"></span></summary>
        <p>{{ f.a }}</p>
      </details>
    </div>
  </section>
</template>
