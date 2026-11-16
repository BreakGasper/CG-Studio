<script setup>
defineProps({ m: Object })
</script>

<template>
  <g font-family="Inter,sans-serif">
    <rect width="180" height="332" fill="#f4f6fa" />
    <rect y="18" width="180" height="46" :fill="m.c1" />
    <text x="12" y="46" font-size="13" font-weight="700" fill="#fff">{{ m.title }}</text>
    <circle cx="152" cy="42" r="9" fill="#fff" opacity=".25" /><circle cx="160" cy="34" r="5" fill="#ff2e97" />
    <rect x="12" y="72" width="156" height="20" rx="10" fill="#fff" /><text x="24" y="86" font-size="8" fill="#94a3b8">Buscar…</text>
    <g v-for="(c, i) in m.chips || ['Todo', 'Nuevo', 'Oferta']" :key="c">
      <rect :x="12 + i * 52" y="100" width="46" height="16" rx="8" :fill="i === 0 ? m.c1 : '#e2e8f0'" />
      <text :x="12 + i * 52 + 23" y="111" font-size="7.5" text-anchor="middle" :fill="i === 0 ? '#fff' : '#475569'">{{ c }}</text>
    </g>
    <g v-for="(it, i) in m.items" :key="it.name">
      <rect :x="12 + (i % 2) * 80" :y="126 + Math.floor(i / 2) * 92" width="76" height="86" rx="9" fill="#fff" />
      <rect :x="12 + (i % 2) * 80" :y="126 + Math.floor(i / 2) * 92" width="76" height="46" rx="9" :fill="i % 2 ? m.c2 : m.c1" opacity=".85" />
      <circle :cx="50 + (i % 2) * 80" :cy="149 + Math.floor(i / 2) * 92" r="11" fill="#fff" opacity=".35" />
      <text :x="18 + (i % 2) * 80" :y="188 + Math.floor(i / 2) * 92" font-size="8" font-weight="600" fill="#0f172a">{{ it.name }}</text>
      <text :x="18 + (i % 2) * 80" :y="202 + Math.floor(i / 2) * 92" font-size="9" font-weight="700" :fill="m.c1">{{ it.price }}</text>
    </g>
    <rect y="302" width="180" height="30" fill="#fff" />
    <circle v-for="k in 4" :key="k" :cx="22 + (k - 1) * 45" cy="317" r="4" :fill="k === 1 ? m.c1 : '#cbd5e1'" />
  </g>
</template>
