<script setup>
import ProjectMockup from './mockups/ProjectMockup.vue'
import { SHOW_REPO_LINKS } from '../data/projects'
import { hasPreview } from '../previews'

defineProps({ project: { type: Object, required: true } })
defineEmits(['preview'])
</script>

<template>
  <article class="proj">
    <div class="shot">
      <ProjectMockup :project="project" />
      <span class="tag">{{ project.platform }}</span>
      <span class="num">{{ project.year }}</span>
      <button v-if="hasPreview(project.id)" class="pbtn" type="button" :aria-label="`Ver preview de ${project.name}`" @click="$emit('preview', project)">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
        Preview
      </button>
    </div>
    <div class="meta">
      <h3>{{ project.name }}</h3>
      <p>{{ project.desc }}</p>
      <div class="chips"><span v-for="t in project.tags" :key="t">{{ t }}</span></div>
      <div v-if="SHOW_REPO_LINKS" class="plinks">
        <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener noreferrer">Ver código ↗</a>
        <span v-else class="priv">Repositorio privado</span>
      </div>
    </div>
  </article>
</template>
