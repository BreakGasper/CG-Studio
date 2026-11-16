<script setup>
import { ref } from 'vue'
import { mascotMessages } from '../data/content'

const index = ref(0)
const next = () => { index.value = (index.value + 1) % mascotMessages.length }
</script>

<template>
  <div class="mascot">
    <div class="bub">{{ mascotMessages[index] }}</div>
    <button aria-label="Mascota CG" @click="next">
      <svg viewBox="0 0 560 1150" aria-hidden="true"><use href="#mcv" /></svg>
    </button>
  </div>
</template>
