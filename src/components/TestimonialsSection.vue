<script setup>
import { testimonials } from '../data/content'
</script>

<template>
  <section>
    <div class="eyebrow">Testimonios</div>
    <h2 class="disp">Lo que dicen</h2>
    <div class="tst" style="margin-top:28px">
      <blockquote v-for="t in testimonials" :key="t.name">
        “{{ t.quote }}”<cite>{{ t.name }}<small>{{ t.role }}</small></cite>
      </blockquote>
    </div>
  </section>
</template>
