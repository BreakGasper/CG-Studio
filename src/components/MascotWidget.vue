<script setup>
import { ref, nextTick, onBeforeUnmount } from 'vue'
import { mascotMessages } from '../data/content'

const index = ref(0)
const show = ref(false)
const fx = ref(0)
const tick = ref(0)
let timer = 0

// Un efecto distinto en cada clic (nunca el mismo dos veces seguidas):
// 1 saludo · 2 saludo con destellos · 3 brinquito con corazones · 4 choca esos cinco · 5 dedos juguetones
const EFFECTS = 5
const glyphs = ['', '✦', '♥', '★', '✿']
const bits = [
  { x: 6, y: -8, d: 0 }, { x: 22, y: -22, d: 0.15 }, { x: 34, y: -4, d: 0.3 },
  { x: -4, y: -30, d: 0.45 }, { x: 16, y: -42, d: 0.6 }, { x: 40, y: -26, d: 0.75 },
]

function onClick() {
  index.value = (index.value + 1) % mascotMessages.length
  let n = fx.value
  while (n === fx.value) n = 1 + Math.floor(Math.random() * EFFECTS)
  fx.value = n
  show.value = false
  nextTick(() => {
    tick.value++
    show.value = true
    clearTimeout(timer)
    timer = setTimeout(() => (show.value = false), 3000)
  })
}
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="mascot">
    <div class="bub">{{ mascotMessages[index] }}</div>
    <div class="mwrap">
      <button type="button" aria-label="Mascota CG" @click="onClick">
        <svg viewBox="0 0 560 1150" aria-hidden="true"><use href="#mcv" /></svg>
      </button>
      <div v-if="show" :key="tick" class="hand" :class="'fx' + fx" aria-hidden="true">
        <div class="hand-pop">
          <svg class="hand-svg" viewBox="0 0 64 96">
            <g class="wv">
              <path class="arm" d="M12 94 C14 80 14 70 22 60" />
              <circle class="palm" cx="31" cy="42" r="17" />
              <line class="fg f1" x1="19" y1="34" x2="17" y2="14" />
              <line class="fg f2" x1="27" y1="30" x2="27" y2="6" />
              <line class="fg f3" x1="36" y1="30" x2="38" y2="8" />
              <line class="fg f4" x1="44" y1="35" x2="49" y2="17" />
              <line class="fg th" x1="15" y1="46" x2="3" y2="38" />
              <circle class="gl" cx="26" cy="46" r="2.2" />
              <circle class="gl" cx="36" cy="46" r="2.2" />
            </g>
          </svg>
        </div>
        <template v-if="fx > 1">
          <span v-for="(b, i) in bits" :key="i" class="bit" :style="{ '--x': b.x + 'px', '--y': b.y + 'px', animationDelay: b.d + 's' }">{{ glyphs[fx - 1] }}</span>
        </template>
      </div>
    </div>
  </div>
</template>
