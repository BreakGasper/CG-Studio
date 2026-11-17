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
          <!-- contorno claro alrededor de los ojos (dentro de la C) -->
          <path class="cont-fill" d="M170 400 C140 330 150 230 215 175 C280 135 370 150 405 235 C425 290 415 360 385 410 Z" />
          <path class="cont" pathLength="1" d="M170 400 C140 330 150 230 215 175 C280 135 370 150 405 235 C425 290 415 360 385 410" />
          <!-- brazo y manita que salen por la abertura de la C -->
          <g class="hand-pop">
            <g class="wv">
              <path class="arm" d="M385 410 C395 450 410 485 460 490 C520 495 560 450 585 395" />
              <circle class="palm" cx="620" cy="330" r="80" />
              <line class="fg f1" x1="582" y1="300" x2="572" y2="190" />
              <line class="fg f2" x1="612" y1="262" x2="614" y2="150" />
              <line class="fg f3" x1="650" y1="266" x2="662" y2="160" />
              <line class="fg f4" x1="685" y1="296" x2="702" y2="215" />
              <line class="fg th" x1="560" y1="350" x2="505" y2="308" />
              <circle class="gl" cx="606" cy="345" r="9" />
              <circle class="gl" cx="644" cy="345" r="9" />
            </g>
          </g>
        </svg>
        <template v-if="fx > 1">
          <span v-for="(b, i) in bits" :key="i" class="bit" :style="{ '--x': b.x + 'px', '--y': b.y + 'px', animationDelay: b.d + 's' }">{{ glyphs[fx - 1] }}</span>
        </template>
      </div>
    </div>
  </div>
</template>
