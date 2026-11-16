<script setup>
import { ref } from 'vue'

defineProps({ name: String, area: String, pct: Number })
const width = ref(0)
</script>

<template>
  <div class="tr">
    <div><b>{{ name }}</b><small>{{ area }}</small></div>
    <div class="bar"><i v-in-view="() => (width = pct)" :style="{ width: width + '%' }"></i></div>
    <b>{{ pct }}%</b>
  </div>
</template>
