<script setup>
defineProps({ m: Object })
const bars = [34, 58, 44, 76, 52, 88, 64, 96]
</script>

<template>
  <g font-family="Inter,sans-serif">
    <rect width="400" height="262" fill="#f4f6fa" />
    <rect width="78" height="262" :fill="m.c1" />
    <text x="14" y="26" font-size="13" font-weight="800" fill="#fff">{{ m.title }}</text>
    <g v-for="(it, i) in m.menu" :key="it">
      <rect x="8" :y="44 + i * 26" width="62" height="20" rx="6" fill="#fff" :opacity="i === 0 ? 0.25 : 0.08" />
      <text x="16" :y="58 + i * 26" font-size="8" fill="#fff">{{ it }}</text>
    </g>
    <rect x="78" width="322" height="34" fill="#fff" /><text x="92" y="21" font-size="10" font-weight="700" fill="#0f172a">Resumen</text>
    <circle cx="380" cy="17" r="9" :fill="m.c2" />
    <g v-for="(s, i) in m.stats" :key="s.k">
      <rect :x="90 + i * 104" y="46" width="98" height="52" rx="9" fill="#fff" />
      <text :x="100 + i * 104" y="64" font-size="7.5" fill="#64748b">{{ s.k }}</text>
      <text :x="100 + i * 104" y="86" font-size="18" font-weight="800" :fill="m.c1">{{ s.v }}</text>
    </g>
    <rect x="90" y="108" width="202" height="86" rx="9" fill="#fff" />
    <rect v-for="(b, i) in bars" :key="i" :x="102 + i * 23" :y="186 - b * 0.7" width="14" :height="b * 0.7" rx="3" :fill="i % 2 ? m.c2 : m.c1" opacity=".9" />
    <rect x="300" y="108" width="90" height="86" rx="9" fill="#fff" />
    <circle cx="345" cy="151" r="28" fill="none" stroke="#e2e8f0" stroke-width="9" /><circle cx="345" cy="151" r="28" fill="none" :stroke="m.c1" stroke-width="9" stroke-dasharray="110 176" transform="rotate(-90 345 151)" />
    <g v-for="(r, i) in m.rows" :key="r">
      <rect x="90" :y="204 + i * 18" width="300" height="14" rx="5" fill="#fff" />
      <circle cx="100" :cy="211 + i * 18" r="3" :fill="m.c1" /><text x="110" :y="214 + i * 18" font-size="7.5" fill="#334155">{{ r }}</text>
    </g>
  </g>
</template>
