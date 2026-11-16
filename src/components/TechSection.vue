<script setup>
import { techStack } from '../data/content'
import TechRow from './TechRow.vue'
</script>

<template>
  <section id="tech">
    <div class="eyebrow">Stack</div>
    <h2 class="disp">Herramientas que dominamos</h2>
    <div class="tech" style="margin-top:28px">
      <TechRow v-for="t in techStack" :key="t.name" v-bind="t" />
    </div>
  </section>
</template>
