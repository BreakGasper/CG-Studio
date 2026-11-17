<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { typedWords, sectionSays, sideFacts } from '../data/content'
import { useTyped } from '../composables/useTyped'
import { useScrollSpy } from '../composables/useScrollSpy'

const typed = useTyped(typedWords, 'Hola, somos ')

// ---- Mensaje según la sección visible (y guiño al cambiar) ----
const section = useScrollSpy(Object.keys(sectionSays))
const say = ref(sectionSays.home)
const wink = ref(false)
watch(section, (id) => {
  say.value = sectionSays[id] || say.value
  wink.value = false
  requestAnimationFrame(() => { wink.value = true; setTimeout(() => (wink.value = false), 600) })
})

// ---- Datos que rotan ----
const fi = ref(0)
let ft

// ---- Ojos, inclinación y luz que siguen el puntero ----
const card = ref(null)
const tilt = ref(null)
const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0, calm
const target = { x: 0, y: 0 }

function onMove(e) {
  const c = card.value, t = tilt.value
  if (!c || !t) return
  const r = c.getBoundingClientRect()
  const px = Math.min(Math.max(e.clientX - r.left, 0), r.width)
  const py = Math.min(Math.max(e.clientY - r.top, 0), r.height)
  c.style.setProperty('--mx', px + 'px')
  c.style.setProperty('--my', py + 'px')
  const tr = t.getBoundingClientRect()
  const dx = (e.clientX - (tr.left + tr.width / 2)) / (window.innerWidth / 2)
  const dy = (e.clientY - (tr.top + tr.height / 2)) / (window.innerHeight / 2)
  target.x = Math.max(-1, Math.min(1, dx))
  target.y = Math.max(-1, Math.min(1, dy))
}

// En celular no hay puntero: al hacer scroll los ojos miran hacia donde se desplaza la página.
let lastY = window.scrollY
function onScroll() {
  const y = window.scrollY
  target.y = y > lastY ? 1 : -1
  target.x = 0
  lastY = y
  clearTimeout(calm)
  calm = setTimeout(() => { target.x = 0; target.y = 0 }, 700)
}

function loop() {
  cx += (target.x - cx) * 0.12
  cy += (target.y - cy) * 0.12
  const t = tilt.value
  if (t) {
    t.style.setProperty('--ex', (cx * 13).toFixed(2) + 'px')
    t.style.setProperty('--ey', (cy * 8).toFixed(2) + 'px')
    t.style.setProperty('--ry', (cx * 9).toFixed(2) + 'deg')
    t.style.setProperty('--rx', (-cy * 6).toFixed(2) + 'deg')
  }
  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  ft = setInterval(() => { fi.value = (fi.value + 1) % sideFacts.length }, 3200)
  if (reduce) return
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('scroll', onScroll, { passive: true })
  raf = requestAnimationFrame(loop)
})
onBeforeUnmount(() => {
  clearInterval(ft); clearTimeout(calm); cancelAnimationFrame(raf)
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <aside ref="card">
    <div class="mono">
      <div class="glow" aria-hidden="true"></div>
      <div ref="tilt" class="tilt" :class="{ winking: wink }">
        <svg class="float" viewBox="0 0 1114 530" aria-label="Mascota de CG Studio"><use href="#mc" /></svg>
      </div>
    </div>
    <div class="a-top">
      <svg class="a-logo" viewBox="0 0 1114 530" aria-hidden="true"><use href="#cg" /></svg>
      <div class="socials">
        <a href="#" aria-label="X">X</a>
        <a href="#" aria-label="LinkedIn">in</a>
        <a href="https://github.com/BreakGasper" target="_blank" rel="noopener noreferrer" aria-label="GitHub">Gh</a>
      </div>
    </div>
    <div class="avail"><i class="dot"></i>Disponible para proyectos</div>

    <Transition name="say" mode="out-in">
      <div :key="say" class="a-say" aria-live="polite">{{ say }}</div>
    </Transition>

    <div class="a-mid">
      <Transition name="fact" mode="out-in">
        <div :key="fi" class="a-fact"><b>{{ sideFacts[fi].n }}</b><span>{{ sideFacts[fi].l }}</span></div>
      </Transition>
      <div class="a-dots"><i v-for="(f, i) in sideFacts" :key="f.l" :class="{ on: i === fi }"></i></div>
    </div>

    <div class="a-bot">
      <h3><span>{{ typed }}</span><span class="caret"></span></h3>
      <p>Desarrollamos software, plataformas e inteligencia artificial para que tu negocio crezca y automatice, con sede en LATAM.</p>
      <div class="row">
        <a class="btn blue" href="#contact">Hablemos</a>
        <a class="btn blue" href="#work">Ver demos</a>
      </div>
    </div>
  </aside>
</template>
