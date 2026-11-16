<script setup>
import ProjectMockup from './mockups/ProjectMockup.vue'

defineProps({ project: { type: Object, required: true } })
</script>

<template>
  <article class="proj">
    <div class="shot">
      <ProjectMockup :project="project" />
      <span class="tag">{{ project.platform }}</span>
      <span class="num">{{ project.year }}</span>
    </div>
    <div class="meta">
      <h3>{{ project.name }}</h3>
      <p>{{ project.desc }}</p>
      <div class="chips"><span v-for="t in project.tags" :key="t">{{ t }}</span></div>
      <div class="plinks">
        <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener noreferrer">Ver código ↗</a>
        <span v-else class="priv">
          <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
          Repositorio privado
        </span>
      </div>
    </div>
  </article>
</template>
