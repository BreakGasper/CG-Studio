<script setup>
import LogoMark from './LogoMark.vue'
import { contacto } from '../data.js'
</script>

<template>
  <footer>
    <div class="wrap top">
      <div class="stack brand">
        <div class="row" style="align-items:center;gap:14px"><LogoMark :width="64" /><span class="disp name">CG STUDIO</span></div>
        <p class="mute">Ingeniería digital para productos que escalan: plataformas, APIs, inteligencia artificial y automatización.</p>
      </div>
      <div class="stack col"><div class="mono h">Navegación</div><a href="#portfolio">Proyectos</a><a href="#servicios">Servicios</a><a href="#metodo">Metodología</a><a href="#contacto">Contacto</a></div>
      <div class="stack col"><div class="mono h">Servicios</div><span>Software a medida</span><span>Desarrollo web</span><span>APIs e integraciones</span><span>Automatización</span></div>
      <div class="stack col"><div class="mono h">Redes</div><a v-for="r in contacto.redes" :key="r.nombre" :href="r.url">{{ r.nombre }}</a></div>
    </div>
    <div class="wrap legal mute">© {{ new Date().getFullYear() }} CG STUDIO · Digital Engineering. Todos los derechos reservados.</div>
  </footer>
</template>

<style scoped>
footer { border-top: 1px solid var(--line); background: #0b0d14; }
.top { display: flex; flex-wrap: wrap; gap: 48px; justify-content: space-between; padding-block: 64px 40px; }
.brand { flex: 1 1 300px; max-width: 380px; gap: 18px; }
.name { font-weight: 800; font-size: 22px; letter-spacing: 0.14em; line-height: 1; }
.brand p { font-size: 15px; }
.col { flex: 0 1 180px; gap: 10px; font-size: 15px; }
.h { font-size: 11px; color: var(--accent); font-weight: 700; margin-bottom: 4px; }
.legal { padding-bottom: 40px; font-size: 13px; }
</style>
