<script setup>
import LogoMark from './LogoMark.vue'
const links = [
  { t: 'Proyectos', h: '#portfolio' },
  { t: 'Servicios', h: '#servicios' },
  { t: 'Metodología', h: '#metodo' },
  { t: 'Contacto', h: '#contacto' }
]
</script>

<template>
  <header class="wrap nav">
    <a href="#top" class="brand" aria-label="CG STUDIO, inicio">
      <LogoMark :width="64" />
      <span class="disp name">CG STUDIO</span>
    </a>
    <nav aria-label="Principal" class="links">
      <a v-for="l in links" :key="l.h" :href="l.h" class="navlink">{{ l.t }}</a>
      <a href="#contacto" class="btn cta">Cotizar</a>
    </nav>
  </header>
</template>

<style scoped>
.nav { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px; padding-block: 28px; }
.brand { display: flex; align-items: center; gap: 14px; }
.name { font-weight: 800; font-size: 22px; letter-spacing: 0.14em; line-height: 1; }
.links { display: flex; flex-wrap: wrap; gap: 30px; align-items: center; font-size: 15px; font-weight: 500; }
.navlink { position: relative; padding: 6px 0; }
.navlink::after { content: ''; position: absolute; left: 0; bottom: 0; height: 2px; width: 0; background: var(--accent); transition: width 0.25s ease; }
.navlink:hover::after { width: 100%; }
.cta { padding: 11px 22px; min-height: 0; }
</style>
