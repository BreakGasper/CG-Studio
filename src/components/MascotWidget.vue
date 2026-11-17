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
      <div v-if="show" :key="tick" class="ghost" :class="'fx' + fx" aria-hidden="true">
        <svg viewBox="0 0 560 1150">
          <!-- fantasma de una sola pieza: cabeza (rellena la C), brazo por la diagonal y manita grande -->
          <g class="hand-pop">
            <g class="body">
              <path d="M176 392 C112 330 118 214 200 160 C270 112 390 128 436 218 C456 262 452 316 436 352 C420 392 300 428 176 392 Z" />
              <path class="armb" d="M236 330 L474 612" />
              <path class="armb" d="M380 262 L556 360" />
              <g class="wv">
                <rect x="528" y="330" width="164" height="330" rx="70" />
                <line class="fg f1" x1="560" y1="350" x2="556" y2="218" />
                <line class="fg f2" x1="602" y1="340" x2="602" y2="186" />
                <line class="fg f3" x1="644" y1="342" x2="648" y2="198" />
                <line class="fg f4" x1="676" y1="372" x2="688" y2="262" />
                <line class="fg th" x1="544" y1="440" x2="486" y2="392" />
              </g>
            </g>
            <circle class="geye" cx="236" cy="257" r="21" />
            <circle class="geye" cx="326" cy="257" r="21" />
          </g>
        </svg>
        <template v-if="fx > 1">
          <span v-for="(b, i) in bits" :key="i" class="bit" :style="{ '--x': b.x + 'px', '--y': b.y + 'px', animationDelay: b.d + 's' }">{{ glyphs[fx - 1] }}</span>
        </template>
      </div>
    </div>
  </div>
</template>
