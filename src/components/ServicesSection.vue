<script setup>
import { services } from '../data/content'
</script>

<template>
  <section id="services">
    <div class="eyebrow">Servicios</div>
    <h2 class="disp">Lo que hacemos</h2>
    <div class="svc" style="margin-top:28px">
      <div v-for="s in services" :key="s.n">
        <div class="ico">{{ s.n }}</div>
        <h3>{{ s.title }}</h3>
        <ul><li v-for="i in s.items" :key="i">{{ i }}</li></ul>
        <p>{{ s.text }}</p>
      </div>
    </div>
  </section>
</template>
