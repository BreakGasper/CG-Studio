<script setup>
import { dockItems, themes } from '../data/content'
import { menuOpen, cfgOpen, setTheme } from '../composables/useUi'
import { useClock } from '../composables/useClock'
import { useScrollSpy } from '../composables/useScrollSpy'

const { date, time } = useClock()
const active = useScrollSpy(dockItems.map((d) => d.id))

// Iconos de línea (24x24) para cada sección del dock.
const icons = {
  home: 'M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  about: 'M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 21a8 8 0 0 1 16 0',
  work: 'M4 7h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zM9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18',
  services: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z',
  tech: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5',
  method: 'M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01',
  contact: 'M22 2L11 13M22 2l-7 20-4-9-9-4z',
}
const sliders = 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6'
const burger = 'M3 6h18M3 12h18M3 18h18'
</script>

<template>
  <div class="clock"><div>{{ date }}</div><div>{{ time }}</div></div>
  <div class="dock">
    <button class="ib" data-label="Colores" aria-label="Colores" @click="cfgOpen = !cfgOpen">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="sliders" /></svg>
    </button>
    <div class="dock-col">
      <a v-for="d in dockItems" :key="d.id" class="ib" :class="{ on: active === d.id }" :href="'#' + d.id" :data-label="d.title" :aria-label="d.title">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="icons[d.id]" /></svg>
      </a>
    </div>
    <button class="ib" data-label="Menú completo" aria-label="Menú completo" @click="menuOpen = true">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="burger" /></svg>
    </button>
  </div>
  <div class="cfgbox" :class="{ show: cfgOpen }">
    <span>Color</span>
    <i v-for="t in themes" :key="t.id" class="sw" :style="{ background: t.color }" @click="setTheme(t.id)"></i>
  </div>
</template>
