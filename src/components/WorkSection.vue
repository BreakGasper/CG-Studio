<script setup>
import { ref, computed } from 'vue'
import { projects, projectFilters } from '../data/content'
import ProjectCard from './ProjectCard.vue'

const filter = ref('all')
const visible = computed(() => projects.filter((p) => filter.value === 'all' || p.cat === filter.value))
</script>

<template>
  <section id="work">
    <div class="eyebrow">Proyectos y demos</div>
    <h2 class="disp">Elige y prueba</h2>
    <div class="tabs">
      <button v-for="f in projectFilters" :key="f.id" class="tab" :class="{ on: filter === f.id }" @click="filter = f.id">{{ f.label }}</button>
    </div>
    <div class="grid">
      <ProjectCard v-for="(p, i) in visible" :key="p.title" :project="p" :index="i" :total="visible.length" />
    </div>
  </section>
</template>
