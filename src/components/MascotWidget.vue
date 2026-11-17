<script setup>
import { ref } from 'vue'
import { mascotMessages } from '../data/content'

const index = ref(0)
const spinning = ref(false)
const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

// Al hacer clic: cambia el mensaje y la mascota da una vuelta completa.
function onClick() {
  index.value = (index.value + 1) % mascotMessages.length
  if (!reduce) spinning.value = true
}
</script>

<template>
  <div class="mascot">
    <div class="bub">{{ mascotMessages[index] }}</div>
    <button type="button" aria-label="Mascota CG" @click="onClick">
      <svg :class="{ spin: spinning }" viewBox="0 0 560 1150" aria-hidden="true" @animationend="spinning = false"><use href="#mcv" /></svg>
    </button>
  </div>
</template>
