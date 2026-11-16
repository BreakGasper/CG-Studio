<script setup>
import { computed } from 'vue'
const props = defineProps({ m: Object })

// Colorea de forma sencilla: comentarios, cadenas y palabras clave.
function tokens(line) {
  if (/^\s*\/\//.test(line)) return [{ t: line, c: '#6e7681' }]
  const re = /("[^"]*"|\b(?:function|const|let|return|echo|include|public|class|new|cordova|document|console)\b|[{}()[\].,;=>]+|\$\w+)/g
  const out = []
  let last = 0
  let m
  while ((m = re.exec(line))) {
    if (m.index > last) out.push({ t: line.slice(last, m.index), c: '#c9d1d9' })
    const s = m[0]
    out.push({ t: s, c: s[0] === '"' ? '#a5d6a7' : /^[{}()[\].,;=>]+$/.test(s) ? '#8b949e' : s[0] === '$' ? '#79c0ff' : '#ff7b72' })
    last = m.index + s.length
  }
  if (last < line.length) out.push({ t: line.slice(last), c: '#c9d1d9' })
  return out
}
const lines = computed(() => props.m.code.map((l) => tokens(l)))
</script>

<template>
  <g font-family="'JetBrains Mono',ui-monospace,Menlo,monospace">
    <rect width="400" height="262" fill="#0d1117" />
    <rect width="400" height="28" fill="#161b22" />
    <rect x="12" y="6" width="150" height="22" rx="5" fill="#0d1117" />
    <circle cx="24" cy="17" r="4" :fill="m.c1" /><text x="34" y="21" font-size="9" fill="#c9d1d9">{{ m.file }}</text>
    <g v-for="(l, i) in lines" :key="i">
      <text x="14" :y="52 + i * 22" font-size="9" fill="#484f58">{{ i + 1 }}</text>
      <text x="38" :y="52 + i * 22" font-size="10.5" xml:space="preserve">
        <tspan v-for="(tk, j) in l" :key="j" :fill="tk.c">{{ tk.t }}</tspan>
      </text>
    </g>
    <rect x="0" y="244" width="400" height="18" :fill="m.c1" /><text x="12" y="256" font-size="8.5" fill="#04222a" font-weight="700">main · UTF-8</text>
  </g>
</template>
