<script setup>
defineProps({
  project: { type: Object, required: true },
  index: { type: Number, required: true },
  total: { type: Number, required: true },
})
const pad = (n) => String(n).padStart(2, '0')
</script>

<template>
  <article class="proj">
    <div class="thumb" :style="{ background: `linear-gradient(135deg,${project.from},${project.to})` }">
      <span v-if="project.isNew" class="tag">Nuevo</span>
      <span class="num">{{ pad(index + 1) }} / {{ pad(total) }}</span>
      {{ project.title }}
    </div>
    <div class="meta">
      <h3>{{ project.title }}</h3>
      <p>{{ project.desc }}</p>
      <div class="chips"><span v-for="t in project.tags" :key="t">{{ t }}</span></div>
    </div>
  </article>
</template>
