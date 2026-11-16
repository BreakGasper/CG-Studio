<script setup>
defineProps({ id: { type: String, required: true } })
</script>

<template>
  <g>
    <rect x="96" y="8" width="128" height="224" rx="17" fill="#0b1220" stroke="#31425f" stroke-width="1.5" />
    <clipPath :id="'pc-' + id"><rect x="102" y="14" width="116" height="212" rx="12" /></clipPath>
    <g :clip-path="`url(#pc-${id})`">
      <svg x="102" y="14" width="116" height="212" viewBox="0 0 180 332" preserveAspectRatio="xMidYMid slice">
        <slot />
      </svg>
    </g>
    <rect x="144" y="16" width="32" height="5" rx="2.5" fill="#0b1220" />
  </g>
</template>
