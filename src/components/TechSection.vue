<script setup>
import { techGroups } from '../data/content'
import { useIsMobile } from '../composables/useIsMobile'

const mobile = useIsMobile()
</script>

<template>
  <section id="tech">
    <div class="eyebrow">Tecnologías</div>
    <h2 class="disp">Herramientas que dominamos</h2>
    <p class="lead">Del móvil nativo a la web, SAP, bases de datos y la nube.</p>
    <div class="tgrid">
      <!-- En móvil cada grupo se abre de uno en uno (acordeón); en escritorio se ven todos abiertos. -->
      <details v-for="(g, i) in techGroups" :key="g.title" class="tgroup" :open="!mobile || i === 0" :name="mobile ? 'tech' : undefined">
        <summary><h3>{{ g.title }}</h3><span class="tcnt">{{ g.items.length }}</span><i class="tpm" aria-hidden="true"></i></summary>
        <ul class="tchips">
          <li v-for="it in g.items" :key="it">{{ it }}</li>
        </ul>
      </details>
    </div>
  </section>
</template>
