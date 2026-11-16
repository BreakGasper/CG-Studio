<script setup>
defineProps({ m: Object })
</script>

<template>
  <g font-family="Inter,sans-serif">
    <rect width="180" height="332" fill="#fff" />
    <rect y="0" width="180" height="150" :fill="m.c1" />
    <circle cx="150" cy="40" r="60" fill="#fff" opacity=".08" /><circle cx="20" cy="140" r="46" fill="#fff" opacity=".08" />
    <circle cx="90" cy="72" r="26" fill="#fff" /><text x="90" y="81" font-size="24" font-weight="800" text-anchor="middle" :fill="m.c1">{{ m.initial }}</text>
    <text x="90" y="124" font-size="13" font-weight="700" text-anchor="middle" fill="#fff">{{ m.title }}</text>
    <g v-for="(f, i) in m.fields" :key="f">
      <rect x="18" :y="170 + i * 40" width="144" height="30" rx="8" fill="#f1f5f9" />
      <text x="28" :y="189 + i * 40" font-size="8.5" fill="#94a3b8">{{ f }}</text>
    </g>
    <rect x="18" y="258" width="144" height="32" rx="16" :fill="m.c2" />
    <text x="90" y="278" font-size="10" font-weight="700" text-anchor="middle" fill="#fff">{{ m.cta }}</text>
    <text x="90" y="310" font-size="8.5" text-anchor="middle" :fill="m.c1">{{ m.link }}</text>
  </g>
</template>
