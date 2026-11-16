<script setup>
import { computed } from 'vue'
import { theme, toggleMode } from '../composables/useUi'

const isLight = computed(() => theme.value === 'light')
const label = computed(() => (isLight.value ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'))
</script>

<template>
  <button class="theme-toggle" type="button" :aria-label="label" :title="label" :aria-pressed="isLight" @click="toggleMode">
    <!-- Sol: visible en modo oscuro (clic para ir a claro) -->
    <svg class="ic-sun" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
    <!-- Luna: visible en modo claro (clic para ir a oscuro) -->
    <svg class="ic-moon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  </button>
</template>
