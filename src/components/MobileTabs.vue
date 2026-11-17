<script setup>
import { tab, setTab } from '../composables/useUi'
import { menuOpen } from '../composables/useUi'

const items = [
  { id: 'inicio', label: 'Inicio', d: 'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10' },
  { id: 'empresa', label: 'Empresa', d: 'M4 21V6l8-3 8 3v15M9 21v-5h6v5M9 9h.01M12 9h.01M15 9h.01M9 12.5h.01M12 12.5h.01M15 12.5h.01' },
  { id: 'cotiza', label: 'Cotiza', d: 'M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6' },
  { id: 'contacto', label: 'Contacto', d: 'M3 6h18v12H3zM3 7l9 7 9-7' },
]
const go = (id) => { menuOpen.value = false; setTab(id) }
</script>

<template>
  <nav class="mtabs" aria-label="Secciones">
    <template v-for="(i, n) in items" :key="i.id">
      <!-- hueco central: aquí se asoma la mascota (ver MascotWidget en móvil) -->
      <span v-if="n === 2" class="mtabs-gap" aria-hidden="true"></span>
      <button type="button" :class="{ on: tab === i.id }" :aria-current="tab === i.id ? 'page' : undefined" @click="go(i.id)">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="i.d" /></svg>
        <span>{{ i.label }}</span>
      </button>
    </template>
  </nav>
</template>
