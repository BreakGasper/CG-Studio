<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { previews } from '../previews'

const props = defineProps({ project: { type: Object, required: true } })
const emit = defineEmits(['close'])

const entry = computed(() => previews[props.project.id])
const host = computed(() => new URL(entry.value.url).host)
const mode = ref('phone')
const loaded = ref(false)
const closeBtn = ref(null)

const onKey = (e) => { if (e.key === 'Escape') emit('close') }
onMounted(() => {
  window.addEventListener('keydown', onKey)
  document.documentElement.classList.add('pv-lock')
  closeBtn.value?.focus()
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.documentElement.classList.remove('pv-lock')
})
</script>

<template>
  <Teleport to="body">
    <div class="pv-back" @click.self="emit('close')">
      <div class="pv-win" :class="{ phone: mode === 'phone' }" role="dialog" aria-modal="true" :aria-label="`Preview de ${project.name}`">
        <div class="pv-bar">
          <span class="pv-dots"><i></i><i></i><i></i></span>
          <span class="pv-url">{{ host }}</span>
          <span class="pv-modes" role="group" aria-label="Tamaño">
            <button type="button" :class="{ on: mode === 'phone' }" @click="mode = 'phone'">Móvil</button>
            <button type="button" :class="{ on: mode === 'desktop' }" @click="mode = 'desktop'">Escritorio</button>
          </span>
          <a class="pv-open" :href="entry.url" target="_blank" rel="noopener noreferrer">Abrir ↗</a>
          <button ref="closeBtn" class="pv-x" type="button" aria-label="Cerrar preview" @click="emit('close')">✕</button>
        </div>
        <div class="pv-body">
          <div v-if="!loaded" class="pv-load">Cargando {{ entry.label }}…</div>
          <iframe :src="entry.url" :title="`Preview de ${project.name}`" allow="clipboard-write; geolocation" referrerpolicy="no-referrer" @load="loaded = true"></iframe>
        </div>
      </div>
    </div>
  </Teleport>
</template>
