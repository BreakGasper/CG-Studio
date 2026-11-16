<script setup>
import { ref, computed } from 'vue'

const props = defineProps({ to: { type: Number, required: true }, suffix: { type: String, default: '' } })
const n = ref(0)
const text = computed(() => n.value + (n.value === props.to ? props.suffix : ''))

function start() {
  const timer = setInterval(() => {
    n.value = Math.min(props.to, n.value + Math.max(1, Math.floor(props.to / 40)))
    if (n.value >= props.to) clearInterval(timer)
  }, 30)
}
</script>

<template>
  <b v-in-view="start">{{ text }}</b>
</template>
