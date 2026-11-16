<script setup>
defineProps({ width: { type: Number, default: 64 } })
</script>

<template>
  <svg viewBox="0 0 156 100" :width="width" :height="width * 0.64" fill="none" role="img" aria-label="Logo CG STUDIO">
    <path d="M57.8 30.2A28 28 0 1 0 57.8 69.8L97.4 30.2A28 28 0 0 1 141.5 36" stroke="#F4F0E8" stroke-width="15" />
    <path d="M97.4 69.8A28 28 0 0 0 145.2 50L125 50" stroke="var(--accent)" stroke-width="15" />
  </svg>
</template>
