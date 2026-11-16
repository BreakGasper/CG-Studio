<script setup>
// Sprite SVG: el logotipo original y la mascota (logo con dos ojos), reutilizables con <use href="#id">.
import { logoWhite, logoTeal } from '../assets/logoPaths'
</script>

<template>
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <symbol id="cg" viewBox="148 349 1114 530">
      <path fill="var(--logo)" :d="logoWhite" />
      <path fill="#14c8d8" :d="logoTeal" />
    </symbol>
    <symbol id="mc" viewBox="148 349 1114 530">
      <use href="#cg" x="148" y="349" width="1114" height="530" />
      <circle class="eye" cx="305" cy="604" r="21" />
      <circle class="eye" cx="395" cy="604" r="21" />
    </symbol>
    <symbol id="mcv" viewBox="420 40 560 1150">
      <g transform="rotate(90 700 614)">
        <use href="#cg" x="148" y="349" width="1114" height="530" />
      </g>
      <circle class="eye" cx="655" cy="300" r="21" />
      <circle class="eye" cx="745" cy="300" r="21" />
    </symbol>
  </svg>
</template>
