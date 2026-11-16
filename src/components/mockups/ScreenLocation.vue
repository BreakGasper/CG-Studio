<script setup>
defineProps({ m: Object })
</script>

<template>
  <g font-family="Inter,sans-serif">
    <rect width="180" height="332" fill="#e6efe9" />
    <g fill="#fff"><rect x="-10" y="90" width="200" height="10" transform="rotate(-8 90 95)" /><rect x="70" y="0" width="10" height="260" transform="rotate(10 75 130)" /><rect x="-10" y="190" width="200" height="8" /></g>
    <g :fill="m.c1" opacity=".18"><rect x="14" y="40" width="42" height="34" rx="4" /><rect x="110" y="52" width="48" height="40" rx="4" /><rect x="100" y="150" width="56" height="30" rx="4" /><rect x="18" y="120" width="38" height="44" rx="4" /></g>
    <circle cx="90" cy="142" r="36" :fill="m.c1" opacity=".2" /><circle cx="90" cy="142" r="6" fill="#fff" :stroke="m.c1" stroke-width="3" />
    <path d="M90 108 c-12 0 -18 9 -18 17 c0 12 18 28 18 28 c0 0 18 -16 18 -28 c0 -8 -6 -17 -18 -17z" :fill="m.c2" /><circle cx="90" cy="125" r="6" fill="#fff" />
    <rect y="22" width="180" height="0" fill="none" />
    <rect x="8" y="222" width="164" height="102" rx="14" fill="#fff" />
    <text x="20" y="244" font-size="11" font-weight="700" fill="#0f172a">{{ m.title }}</text>
    <text x="20" y="260" font-size="8.5" fill="#64748b">{{ m.coords }}</text>
    <rect x="20" y="272" width="140" height="6" rx="3" fill="#e2e8f0" /><rect x="20" y="272" width="92" height="6" rx="3" :fill="m.c1" />
    <rect x="20" y="288" width="140" height="26" rx="13" :fill="m.c2" /><text x="90" y="305" font-size="9.5" font-weight="700" text-anchor="middle" fill="#fff">{{ m.cta }}</text>
  </g>
</template>
