<script setup>
// Captura real de la app dentro del marco del navegador (por ejemplo, Daily Express).
const props = defineProps({ m: Object })
const src = import.meta.env.BASE_URL + String(props.m.image || '').replace(/^\//, '')
</script>

<template>
  <g>
    <rect width="400" height="262" fill="#f3f3f1" />
    <image :href="src" width="400" height="262" preserveAspectRatio="xMidYMin slice" />
  </g>
</template>
