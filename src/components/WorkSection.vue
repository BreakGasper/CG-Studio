<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { projects, projectFilters } from '../data/projects'
import ProjectCard from './ProjectCard.vue'
import PreviewModal from './PreviewModal.vue'

const VIEW_KEY = 'cg-work-view'
const filter = ref('all')
const open = ref(null)
const view = ref('carousel')
try { const v = localStorage.getItem(VIEW_KEY); if (v === 'grid' || v === 'carousel') view.value = v } catch {}
watch(view, (v) => { try { localStorage.setItem(VIEW_KEY, v) } catch {}; nextTick(update) })

const visible = computed(() => projects.filter((p) => filter.value === 'all' || p.cat === filter.value))
const count = (id) => (id === 'all' ? projects.length : projects.filter((p) => p.cat === id).length)

// ---------- Carrusel ----------
const track = ref(null)
const active = ref(0)
const playing = ref(true)
const hover = ref(false)
const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
if (reduce) playing.value = false

const items = () => (track.value ? [...track.value.children] : [])

function update() {
  const t = track.value
  if (!t) return
  const mid = t.scrollLeft + t.clientWidth / 2
  let best = 0, d = Infinity
  items().forEach((el, i) => {
    const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid)
    if (dist < d) { d = dist; best = i }
  })
  active.value = best
}
let raf = 0
const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update) }

function go(i) {
  const els = items()
  if (!els.length) return
  const n = (i + els.length) % els.length
  const el = els[n]
  track.value.scrollTo({ left: el.offsetLeft + el.offsetWidth / 2 - track.value.clientWidth / 2, behavior: 'smooth' })
}
const next = () => go(active.value + 1)
const prev = () => go(active.value - 1)

watch(filter, () => nextTick(() => { track.value && (track.value.scrollLeft = 0); update() }))

// autoplay: se pausa con el puntero encima, con el modal abierto o si el usuario lo detiene
let timer = 0
const run = computed(() => view.value === 'carousel' && playing.value && !hover.value && !open.value)
watch(run, (r) => { clearInterval(timer); if (r) timer = setInterval(next, 3800) }, { immediate: true })

// arrastrar con el mouse
let drag = null
function down(e) {
  if (e.pointerType !== 'mouse') return
  drag = { x: e.clientX, left: track.value.scrollLeft, moved: false }
}
function move(e) {
  if (!drag) return
  const dx = e.clientX - drag.x
  if (Math.abs(dx) > 5) { drag.moved = true; track.value.classList.add('dragging') }
  if (drag.moved) track.value.scrollLeft = drag.left - dx
}
function up() {
  if (!drag) return
  const moved = drag.moved
  drag = null
  track.value.classList.remove('dragging')
  if (moved) { suppress = true; setTimeout(() => (suppress = false), 0); go(active.value) }
}
let suppress = false
const blockClick = (e) => { if (suppress) { e.stopPropagation(); e.preventDefault() } }

function onKey(e) {
  if (view.value !== 'carousel' || open.value) return
  if (!track.value?.contains(document.activeElement) && document.activeElement !== track.value) return
  if (e.key === 'ArrowRight') { e.preventDefault(); next() }
  if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
}

onMounted(() => { update(); window.addEventListener('keydown', onKey); window.addEventListener('resize', update) })
onBeforeUnmount(() => { clearInterval(timer); cancelAnimationFrame(raf); window.removeEventListener('keydown', onKey); window.removeEventListener('resize', update) })
</script>

<template>
  <section id="work">
    <div class="eyebrow">Proyectos</div>
    <h2 class="disp">Lo que hemos construido</h2>
    <p class="lead">{{ projects.length }} proyectos de apps móviles, web, plugins y servicios. Cada uno con su mockup.</p>

    <div class="wk-bar">
      <div class="tabs">
        <button v-for="f in projectFilters" :key="f.id" class="tab" :class="{ on: filter === f.id }" @click="filter = f.id">
          {{ f.label }} <span class="cnt">{{ count(f.id) }}</span>
        </button>
      </div>
      <div class="seg" role="group" aria-label="Vista de proyectos">
        <button type="button" :class="{ on: view === 'carousel' }" :aria-pressed="view === 'carousel'" @click="view = 'carousel'">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="5" width="10" height="14" rx="2" /><path d="M3 8v8M21 8v8" /></svg>Carrusel
        </button>
        <button type="button" :class="{ on: view === 'grid' }" :aria-pressed="view === 'grid'" @click="view = 'grid'">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></svg>Ver todo
        </button>
      </div>
    </div>

    <div v-if="view === 'carousel'" class="car" @mouseenter="hover = true" @mouseleave="hover = false" @focusin="hover = true" @focusout="hover = false">
      <div ref="track" class="car-track" tabindex="0" role="region" aria-label="Carrusel de proyectos"
        @scroll.passive="onScroll" @dragstart.prevent @pointerdown="down" @pointermove="move" @pointerup="up" @pointerleave="up" @click.capture="blockClick">
        <div v-for="(p, i) in visible" :key="p.id" class="car-item" :class="{ on: i === active }">
          <ProjectCard :project="p" @preview="open = $event" />
        </div>
      </div>
      <div class="car-ctl">
        <button type="button" class="car-btn" aria-label="Anterior" @click="prev"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" /></svg></button>
        <span class="car-count"><b>{{ Math.min(active + 1, visible.length) }}</b> / {{ visible.length }}</span>
        <button type="button" class="car-btn" aria-label="Siguiente" @click="next"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg></button>
        <button type="button" class="car-btn car-play" :aria-label="playing ? 'Pausar' : 'Reproducir'" @click="playing = !playing">
          <svg v-if="playing" viewBox="0 0 24 24"><path d="M8 5v14M16 5v14" /></svg>
          <svg v-else viewBox="0 0 24 24"><path d="M7 5l12 7-12 7z" /></svg>
        </button>
      </div>
    </div>

    <div v-else class="grid">
      <ProjectCard v-for="p in visible" :key="p.id" :project="p" @preview="open = $event" />
    </div>
    <PreviewModal v-if="open" :project="open" @close="open = null" />
  </section>
</template>
