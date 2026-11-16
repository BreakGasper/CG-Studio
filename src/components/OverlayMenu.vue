<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { navItems } from '../data/content'
import { menuOpen } from '../composables/useUi'

const close = () => { menuOpen.value = false }
const onKey = (e) => { if (e.key === 'Escape') close() }
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <nav id="ov" :class="{ open: menuOpen }" aria-label="Menú">
    <button class="ib x" aria-label="Cerrar" @click="close">✕</button>
    <a v-for="item in navItems" :key="item.id" :href="'#' + item.id" @click="close">
      {{ item.label }}<small>{{ item.n }}</small>
    </a>
  </nav>
  <button class="ib mobbtn" aria-label="Menú" @click="menuOpen = true">☰</button>
</template>
