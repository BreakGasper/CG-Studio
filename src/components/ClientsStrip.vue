<script setup>
import { clients } from '../data/content'
</script>

<template>
  <div class="clients">
    <div class="eyebrow">◍ Nuestros clientes (2018–26)</div>
    <div class="logos"><span v-for="c in clients" :key="c">{{ c }}</span></div>
  </div>
</template>
