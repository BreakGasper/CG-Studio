<script setup>
import { stats } from '../data/content'
import CountUp from './CountUp.vue'
</script>

<template>
  <div class="hero">
    <h1 class="disp">Construimos <span class="hl">software</span> <span class="hl o">&amp; plataformas</span> que la gente recuerda</h1>
    <div class="ribbon">
      <svg viewBox="0 0 760 360" aria-hidden="true">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0" stop-color="var(--acc)" stop-opacity="0" />
            <stop offset=".35" stop-color="var(--acc)" stop-opacity=".8" />
            <stop offset="1" stop-color="var(--acc)" />
          </linearGradient>
          <path id="circ" d="M392,150 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0" />
        </defs>
        <path d="M20,240 C140,260 230,190 330,150 L392,150 C470,150 520,120 560,150 C640,200 620,330 500,330 C400,330 360,250 420,200 C470,160 560,170 640,150 C700,135 740,120 760,110" fill="none" stroke="url(#g1)" stroke-width="64" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="392" cy="150" r="82" fill="#0a0c0a" stroke="#1d241d" />
        <g class="badge-rot"><text fill="#fff" font-size="13" font-weight="600" letter-spacing="3.4" font-family="Inter"><textPath href="#circ">DESDE 2018 · AGENCIA · PREMIADA · SOFTWARE ·</textPath></text></g>
        <g fill="none" stroke="#fff" stroke-width="1.3" opacity=".85">
          <ellipse cx="392" cy="150" rx="14" ry="34" />
          <ellipse cx="392" cy="150" rx="24" ry="34" transform="rotate(20 392 150)" />
          <ellipse cx="392" cy="150" rx="24" ry="34" transform="rotate(-20 392 150)" />
        </g>
      </svg>
    </div>
    <div class="hstats">
      <div v-for="s in stats" :key="s.label">
        <CountUp :to="s.to" :suffix="s.suffix" /><span>{{ s.label }}</span>
      </div>
    </div>
  </div>
</template>
