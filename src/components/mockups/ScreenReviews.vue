<script setup>
defineProps({ m: Object })
const star = (cx, cy, r) => {
  const pts = []
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5; const rr = i % 2 ? r * 0.45 : r; pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`) }
  return 'M' + pts.join('L') + 'Z'
}
</script>

<template>
  <g font-family="Inter,sans-serif">
    <rect width="180" height="332" fill="#f4f6fa" />
    <rect y="18" width="180" height="46" :fill="m.c1" /><text x="12" y="46" font-size="13" font-weight="700" fill="#fff">{{ m.title }}</text>
    <g v-for="(it, i) in m.items" :key="it.t">
      <rect x="10" :y="74 + i * 72" width="160" height="64" rx="10" fill="#fff" />
      <circle cx="30" :cy="96 + i * 72" r="12" :fill="i % 2 ? m.c2 : m.c1" opacity=".85" />
      <text x="50" :y="94 + i * 72" font-size="9.5" font-weight="700" fill="#0f172a">{{ it.t }}</text>
      <path v-for="k in 5" :key="k" :d="star(54 + (k - 1) * 11, 104 + i * 72, 4.6)" :fill="k <= 5 - (i % 2) ? '#ffb347' : '#e2e8f0'" />
      <text x="20" :y="124 + i * 72" font-size="8" fill="#64748b">{{ it.s }}</text>
    </g>
    <rect y="296" width="180" height="36" fill="#fff" />
    <circle cx="90" cy="306" r="14" :fill="m.c2" /><path d="M90 299v14M83 306h14" stroke="#fff" stroke-width="2.2" stroke-linecap="round" />
  </g>
</template>
