<script setup>
defineProps({ m: Object })
</script>

<template>
  <g font-family="Inter,sans-serif">
    <rect width="180" height="332" fill="#0b1220" />
    <circle cx="90" cy="130" r="74" :fill="m.c1" opacity=".12" /><circle cx="90" cy="130" r="56" :fill="m.c1" opacity=".16" />
    <g fill="none" :stroke="m.c1" stroke-width="3.2" stroke-linecap="round">
      <path d="M62 150 q0 -40 28 -40 q28 0 28 40" /><path d="M72 166 q-6 -30 0 -44 q8 -18 18 -18 q22 0 22 28 q0 22 -6 38" />
      <path d="M82 176 q-8 -34 2 -50 q4 -6 10 -6 q12 2 12 20 q0 20 -6 34" /><path d="M92 178 q-2 -24 0 -34" /><path d="M54 140 q4 -50 36 -50 q34 0 36 46" />
    </g>
    <text x="90" y="236" font-size="12" font-weight="700" text-anchor="middle" fill="#fff">{{ m.title }}</text>
    <text x="90" y="252" font-size="8" text-anchor="middle" fill="#94a3b8">Coloca tu dedo en el sensor</text>
    <rect x="30" y="278" width="120" height="30" rx="15" :fill="m.c1" />
    <text x="90" y="297" font-size="10" font-weight="700" text-anchor="middle" fill="#04222a">{{ m.cta }}</text>
  </g>
</template>
