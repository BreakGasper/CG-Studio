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
          <defs>
            <linearGradient id="gGhost" gradientUnits="userSpaceOnUse" x1="150" y1="140" x2="640" y2="690">
              <stop offset="0" class="gs0" /><stop offset=".5" class="gs1" /><stop offset="1" class="gs2" />
            </linearGradient>
          </defs>
          <!-- el fantasma solo ocupa el hueco de la C y el espacio libre junto a la diagonal: nunca toca lo negro -->
          <g class="gh-head">
            <path class="gh-fill" d="M282 152 C304 152 328 161 345 171 C362 181 374 196 384 212 C394 228 400 246 403 264 C406 282 405 302 401 319 C397 336 389 353 380 366 C371 379 358 390 345 399 C332 408 314 416 299 418 C284 420 267 415 252 409 C237 403 223 393 210 381 C197 369 184 353 176 336 C168 319 160 299 159 280 C158 261 160 238 168 220 C176 202 191 184 210 173 C229 162 260 152 282 152 Z" />
            <path class="gh-rim" d="M282 152 C304 152 328 161 345 171 C362 181 374 196 384 212 C394 228 400 246 403 264 C406 282 405 302 401 319 C397 336 389 353 380 366 C371 379 358 390 345 399 C332 408 314 416 299 418 C284 420 267 415 252 409 C237 403 223 393 210 381 C197 369 184 353 176 336 C168 319 160 299 159 280 C158 261 160 238 168 220 C176 202 191 184 210 173 C229 162 260 152 282 152 Z" />
            <ellipse class="gh-shine" cx="222" cy="204" rx="46" ry="24" transform="rotate(-32 222 204)" />
          </g>
          <path class="gh-tube" pathLength="1" d="M309 411 C314 420 326 446 337 465 C348 484 358 506 375 527 C392 548 417 573 437 593 C457 613 478 633 497 648 C516 663 535 683 552 685 C569 687 589 672 599 661 C609 650 609 626 611 619" />
          <g class="gh-hand">
            <g class="wv">
              <circle class="gh-fill" cx="620" cy="545" r="62" />
              <line class="fg f1" x1="584" y1="510" x2="574" y2="415" />
              <line class="fg f2" x1="612" y1="490" x2="612" y2="395" />
              <line class="fg f3" x1="642" y1="492" x2="652" y2="405" />
              <line class="fg f4" x1="668" y1="520" x2="686" y2="452" />
              <line class="fg th" x1="572" y1="562" x2="522" y2="524" />
              <circle class="gl" cx="604" cy="556" r="8" />
              <circle class="gl" cx="638" cy="556" r="8" />
            </g>
          </g>
          <circle class="geye" cx="234" cy="256" r="21" />
          <circle class="geye" cx="324" cy="256" r="21" />
        </svg>
        <template v-if="fx > 1">
          <span v-for="(b, i) in bits" :key="i" class="bit" :style="{ '--x': b.x + 'px', '--y': b.y + 'px', animationDelay: b.d + 's' }">{{ glyphs[fx - 1] }}</span>
        </template>
      </div>
    </div>
  </div>
</template>
