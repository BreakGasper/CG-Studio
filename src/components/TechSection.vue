<script setup>
import { techGroups } from '../data/content'
</script>

<template>
  <section id="tech">
    <div class="eyebrow">Tecnologías</div>
    <h2 class="disp">Herramientas que dominamos</h2>
    <p class="lead">Del móvil nativo a la web, SAP, bases de datos y la nube.</p>
    <div class="tgrid">
      <article v-for="g in techGroups" :key="g.title" class="tgroup">
        <h3>{{ g.title }}</h3>
        <ul class="tchips">
          <li v-for="it in g.items" :key="it">{{ it }}</li>
        </ul>
      </article>
    </div>
  </section>
</template>
