<script setup>
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { previews } from '../previews'

const props = defineProps({ project: { type: Object, required: true } })
const emit = defineEmits(['close'])

const entry = computed(() => previews[props.project.id])
const viewId = ref(entry.value.views[0].id)
const view = computed(() => entry.value.views.find((v) => v.id === viewId.value))
const mode = ref(view.value.mode)
const loaded = ref(false)
const closeBtn = ref(null)

watch(viewId, () => { mode.value = view.value.mode; loaded.value = false })

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
          <span class="pv-url">{{ entry.host }}</span>
          <span v-if="entry.views.length > 1" class="pv-modes" role="tablist" aria-label="Vista">
            <button v-for="v in entry.views" :key="v.id" type="button" role="tab" :aria-selected="v.id === viewId" :class="{ on: v.id === viewId }" @click="viewId = v.id">{{ v.label }}</button>
          </span>
          <span class="pv-modes" role="group" aria-label="Tamaño">
            <button type="button" :class="{ on: mode === 'phone' }" @click="mode = 'phone'">Móvil</button>
            <button type="button" :class="{ on: mode === 'desktop' }" @click="mode = 'desktop'">Escritorio</button>
          </span>
          <a class="pv-open" :href="view.url" target="_blank" rel="noopener noreferrer">Abrir ↗</a>
          <button ref="closeBtn" class="pv-x" type="button" aria-label="Cerrar preview" @click="emit('close')">✕</button>
        </div>
        <div class="pv-body">
          <div v-if="!loaded" class="pv-load">Cargando…</div>
          <iframe style="position:absolute;inset:0;width:100%;height:100%;border:0;background:#fff" :key="view.url" :src="view.url" :title="`Preview de ${project.name}: ${view.label}`" allow="clipboard-write" @load="loaded = true"></iframe>
        </div>
      </div>
    </div>
  </Teleport>
</template>
