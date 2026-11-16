<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { previews } from '../previews'

const props = defineProps({ project: { type: Object, required: true } })
const emit = defineEmits(['close'])

const entry = computed(() => previews[props.project.id])
const ready = ref(false)
const failed = ref(false)
const phone = computed(() => props.project.mock.device === 'phone')
const url = computed(() => props.project.id.replace(/-/g, '') + '.app')
const closeBtn = ref(null)

const onKey = (e) => { if (e.key === 'Escape') emit('close') }
onMounted(async () => {
  window.addEventListener('keydown', onKey)
  document.documentElement.classList.add('pv-lock')
  closeBtn.value?.focus()
  try { await entry.value.load(); ready.value = true } catch { failed.value = true }
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.documentElement.classList.remove('pv-lock')
})
</script>

<template>
  <Teleport to="body">
    <div class="pv-back" @click.self="emit('close')">
      <div class="pv-win" :class="{ phone }" role="dialog" aria-modal="true" :aria-label="`Preview de ${project.name}`">
        <div class="pv-bar">
          <span class="pv-dots"><i></i><i></i><i></i></span>
          <span class="pv-url">{{ url }}</span>
          <span class="pv-tag">Preview · datos de ejemplo</span>
          <button ref="closeBtn" class="pv-x" type="button" aria-label="Cerrar preview" @click="emit('close')">✕</button>
        </div>
        <div class="pv-body">
          <component :is="entry.tag" v-if="ready" />
          <div v-else class="pv-load">{{ failed ? 'No se pudo cargar el preview.' : 'Cargando preview…' }}</div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
