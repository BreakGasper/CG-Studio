<script setup>
// Logo de Crustore (carrito con chispa) con los destellos de la paleta "Crustore".
defineProps({ size: { type: [Number, String], default: 28 }, dark: { type: Boolean, default: true } })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
    <g fill="none" :stroke="dark ? '#fff' : '#1f2430'" stroke-width="12" stroke-linecap="round">
      <path d="M78.5 41.4 A28 28 0 1 0 78.5 77.6" />
      <path d="M78.5 41.4 L92 32" />
    </g>
    <circle cx="48" cy="104" r="7" :fill="dark ? '#fff' : '#1f2430'" />
    <circle cx="72" cy="104" r="7" :fill="dark ? '#fff' : '#1f2430'" />
    <path d="M60 49 Q60 60 71 60 Q60 60 60 71 Q60 60 49 60 Q60 60 60 49 Z" fill="#ff2e97" />
    <path d="M98 6 Q98 14 106 14 Q98 14 98 22 Q98 14 90 14 Q98 14 98 6 Z" :fill="dark ? '#00e5ff' : '#00a9c2'" />
    <path d="M20 16 Q20 22 26 22 Q20 22 20 28 Q20 22 14 22 Q20 22 20 16 Z" :fill="dark ? '#ffc233' : '#f5a300'" />
    <circle cx="104" cy="54" r="4.5" :fill="dark ? '#a78bfa' : '#7c4dff'" />
    <circle cx="36" cy="10" r="3.5" :fill="dark ? '#00e5ff' : '#00a9c2'" />
  </svg>
</template>
