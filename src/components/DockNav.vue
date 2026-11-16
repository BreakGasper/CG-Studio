<script setup>
import { dockItems, themes } from '../data/content'
import { menuOpen, cfgOpen, setTheme } from '../composables/useUi'
import { useClock } from '../composables/useClock'
import { useScrollSpy } from '../composables/useScrollSpy'

const { date, time } = useClock()
const active = useScrollSpy(dockItems.map((d) => d.id))
</script>

<template>
  <div class="clock"><div>{{ date }}</div><div>{{ time }}</div></div>
  <div class="dock">
    <button class="ib" aria-label="Colores" @click="cfgOpen = !cfgOpen">⚙</button>
    <div class="dock-col">
      <a v-for="d in dockItems" :key="d.id" class="ib" :class="{ on: active === d.id }" :href="'#' + d.id" :title="d.title">{{ d.icon }}</a>
    </div>
    <button class="ib" aria-label="Menú completo" @click="menuOpen = true">☰</button>
  </div>
  <div class="cfgbox" :class="{ show: cfgOpen }">
    <span>Color</span>
    <i v-for="t in themes" :key="t.id" class="sw" :style="{ background: t.color }" @click="setTheme(t.id)"></i>
  </div>
</template>
