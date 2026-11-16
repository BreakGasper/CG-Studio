<script setup>
defineProps({ id: { type: String, required: true }, dark: Boolean, url: { type: String, default: 'ejemplo.com' } })
</script>

<template>
  <g>
    <rect x="18" y="16" width="284" height="208" rx="10" :fill="dark ? '#0d1117' : '#fff'" stroke="#31425f" stroke-width="1.5" />
    <path d="M18 26a10 10 0 0 1 10-10h264a10 10 0 0 1 10 10v12H18z" :fill="dark ? '#161b22' : '#eef2f7'" />
    <circle cx="32" cy="27" r="3" fill="#ff5d73" /><circle cx="42" cy="27" r="3" fill="#ffb347" /><circle cx="52" cy="27" r="3" fill="#19c37d" />
    <rect x="70" y="21" width="150" height="12" rx="6" :fill="dark ? '#0d1117' : '#fff'" />
    <text x="78" y="30" font-size="7" :fill="dark ? '#8b949e' : '#64748b'" font-family="Inter,sans-serif">{{ url }}</text>
    <clipPath :id="'bc-' + id"><rect x="18" y="38" width="284" height="186" rx="0" /></clipPath>
    <g :clip-path="`url(#bc-${id})`">
      <svg x="18" y="38" width="284" height="186" viewBox="0 0 400 262" preserveAspectRatio="xMidYMid slice">
        <slot />
      </svg>
    </g>
  </g>
</template>
