<script setup>
defineProps({ m: Object })
</script>

<template>
  <g font-family="Inter,sans-serif">
    <defs><linearGradient id="inv-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff0f7" /><stop offset="1" stop-color="#ffd9ec" /></linearGradient></defs>
    <rect width="180" height="332" fill="url(#inv-g)" />
    <path d="M0 60 L90 120 L180 60 V30 H0Z" fill="#fff" stroke="#f3b6d4" stroke-width="1.2" /><path d="M0 60 L90 120 L180 60" fill="none" stroke="#f3b6d4" stroke-width="1.2" />
    <circle cx="90" cy="112" r="16" :fill="m.c1" /><path d="M90 121 c-8 -6 -10 -10 -10 -14 a5 5 0 0 1 10 -2 a5 5 0 0 1 10 2 c0 4 -2 8 -10 14z" fill="#fff" />
    <text x="90" y="170" font-size="17" font-weight="700" text-anchor="middle" fill="#9d174d" font-family="Space Grotesk,Inter,sans-serif">{{ m.title }}</text>
    <text x="90" y="186" font-size="8.5" text-anchor="middle" fill="#be5a8c">{{ m.sub }}</text>
    <g v-for="(c, i) in m.count" :key="c.k">
      <rect :x="12 + i * 40" y="206" width="36" height="42" rx="8" fill="#fff" />
      <text :x="30 + i * 40" y="230" font-size="14" font-weight="700" text-anchor="middle" :fill="m.c1">{{ c.v }}</text>
      <text :x="30 + i * 40" y="242" font-size="6.5" text-anchor="middle" fill="#94a3b8">{{ c.k }}</text>
    </g>
    <rect x="18" y="270" width="144" height="32" rx="16" :fill="m.c1" /><text x="90" y="290" font-size="9.5" font-weight="700" text-anchor="middle" fill="#fff">{{ m.cta }}</text>
  </g>
</template>
