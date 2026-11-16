<script setup>
defineProps({ m: Object })
</script>

<template>
  <g font-family="Inter,sans-serif">
    <rect width="180" height="332" fill="#f4f6fa" />
    <rect y="18" width="180" height="46" :fill="m.c1" />
    <text x="12" y="46" font-size="13" font-weight="700" fill="#fff">{{ m.title }}</text>
    <g v-for="(it, i) in m.items" :key="it.t">
      <rect x="10" :y="74 + i * 52" width="160" height="46" rx="10" fill="#fff" />
      <rect v-if="m.thumbs" x="16" :y="80 + i * 52" width="34" height="34" rx="8" :fill="i % 2 ? m.c2 : m.c1" opacity=".85" />
      <circle v-else-if="!m.check" cx="33" :cy="97 + i * 52" r="13" :fill="i % 2 ? m.c2 : m.c1" opacity=".85" />
      <rect v-else x="18" :y="89 + i * 52" width="16" height="16" rx="4" fill="none" :stroke="m.c1" stroke-width="1.8" />
      <path v-if="m.check && i % 2 === 0" :d="`M21 ${97 + i * 52} l4 4 l7 -8`" fill="none" :stroke="m.c1" stroke-width="2" stroke-linecap="round" />
      <text x="58" :y="94 + i * 52" font-size="9.5" font-weight="600" fill="#0f172a">{{ it.t }}</text>
      <text x="58" :y="108 + i * 52" font-size="7.5" fill="#64748b">{{ it.s }}</text>
      <path :d="`M156 ${93 + i * 52} l5 5 l-5 5`" fill="none" stroke="#cbd5e1" stroke-width="1.6" stroke-linecap="round" />
    </g>
    <circle cx="150" cy="296" r="15" :fill="m.c2" /><path d="M150 289v14M143 296h14" stroke="#fff" stroke-width="2.4" stroke-linecap="round" />
  </g>
</template>
