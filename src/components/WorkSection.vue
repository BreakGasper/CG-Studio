<script setup>
import { ref, computed } from 'vue'
import { projects, projectFilters } from '../data/projects'
import ProjectCard from './ProjectCard.vue'

const filter = ref('all')
const visible = computed(() => projects.filter((p) => filter.value === 'all' || p.cat === filter.value))
const count = (id) => (id === 'all' ? projects.length : projects.filter((p) => p.cat === id).length)
</script>

<template>
  <section id="work">
    <div class="eyebrow">Proyectos</div>
    <h2 class="disp">Lo que hemos construido</h2>
    <p class="lead">{{ projects.length }} proyectos de apps móviles, web, plugins y servicios. Cada uno con su mockup.</p>
    <div class="tabs">
      <button v-for="f in projectFilters" :key="f.id" class="tab" :class="{ on: filter === f.id }" @click="filter = f.id">
        {{ f.label }} <span class="cnt">{{ count(f.id) }}</span>
      </button>
    </div>
    <div class="grid">
      <ProjectCard v-for="p in visible" :key="p.id" :project="p" />
    </div>
  </section>
</template>
