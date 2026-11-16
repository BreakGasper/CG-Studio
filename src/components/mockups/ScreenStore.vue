<script setup>
defineProps({ m: Object })
</script>

<template>
  <g font-family="Inter,sans-serif">
    <rect width="400" height="262" fill="#fff" />
    <rect width="400" height="34" fill="#f1f5f9" />
    <text x="16" y="22" font-size="12" font-weight="800" :fill="m.c1">{{ m.title }}</text>
    <text v-for="(n, i) in m.nav" :key="n" :x="130 + i * 54" y="21" font-size="8" fill="#475569">{{ n }}</text>
    <circle cx="378" cy="17" r="9" :fill="m.c1" opacity=".2" />
    <rect x="14" y="44" width="372" height="84" rx="12" :fill="m.c1" />
    <circle cx="340" cy="66" r="64" fill="#fff" opacity=".1" /><circle cx="300" cy="120" r="40" :fill="m.c2" opacity=".5" />
    <text x="30" y="82" font-size="15" font-weight="800" fill="#fff">{{ m.hero }}</text>
    <rect x="30" y="94" width="68" height="20" rx="10" fill="#fff" /><text x="64" y="108" font-size="8.5" font-weight="700" text-anchor="middle" :fill="m.c1">{{ m.cta }}</text>
    <g v-for="(it, i) in m.items" :key="it.name">
      <rect :x="14 + i * 94" y="140" width="88" height="106" rx="10" fill="#f8fafc" stroke="#e2e8f0" />
      <rect :x="14 + i * 94" y="140" width="88" height="56" rx="10" :fill="i % 2 ? m.c2 : m.c1" opacity=".8" />
      <text :x="22 + i * 94" y="214" font-size="8.5" font-weight="600" fill="#0f172a">{{ it.name }}</text>
      <text :x="22 + i * 94" y="230" font-size="9" font-weight="700" :fill="m.c1">{{ it.price }}</text>
    </g>
  </g>
</template>
