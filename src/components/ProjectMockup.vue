<script setup>
defineProps({ tipo: { type: String, required: true } })
</script>

<template>
  <div class="mock" :class="tipo" aria-hidden="true">
    <template v-if="tipo === 'dashboard'">
      <div class="inner">
        <div class="kpis"><i></i><i></i><i class="a"></i></div>
        <div class="bars"><i style="height:35%"></i><i style="height:55%"></i><i style="height:42%"></i><i class="a" style="height:78%"></i><i style="height:62%"></i><i class="a" style="height:90%"></i></div>
      </div>
    </template>
    <template v-else-if="tipo === 'phone'">
      <div class="ph"><i class="b"></i><i></i><i></i><i></i></div>
    </template>
    <template v-else-if="tipo === 'api'">
      <pre class="mono"><span class="a">POST</span> /v1/pedidos
<span class="g">→</span> 201 Created
<span class="a">GET</span>  /v1/stock/sku-204
<span class="g">→</span> 200 OK · 38 ms</pre>
    </template>
    <template v-else-if="tipo === 'flow'">
      <div class="flow"><i class="sq"></i><b></b><i class="ci"></i><b></b><i class="sq a"></i></div>
    </template>
    <template v-else-if="tipo === 'table'">
      <div class="tbl"><i class="a" style="width:40%"></i><i></i><i></i><i style="width:70%"></i><i></i></div>
    </template>
    <template v-else>
      <div class="cal"><i v-for="n in 14" :key="n" :class="{ a: n === 6 || n === 10 }"></i></div>
    </template>
  </div>
</template>

<style scoped>
.mock { border-radius: 22px; min-height: 176px; padding: 18px; overflow: hidden; position: relative; }
.dashboard { background: linear-gradient(150deg, var(--accent2), var(--accent)); min-height: 300px; padding: 22px; display: flex; }
.inner { flex: 1; background: #10121b; border-radius: 16px; padding: 16px; display: flex; flex-direction: column; gap: 14px; }
.kpis { display: flex; gap: 10px; }
.kpis i { flex: 1; height: 44px; border-radius: 10px; background: var(--panel2); }
.bars { flex: 1; display: flex; align-items: flex-end; gap: 8px; min-height: 110px; }
.bars i { flex: 1; background: var(--panel2); border-radius: 6px 6px 0 0; }
.a { background: var(--accent) !important; }
.phone { background: var(--accent); min-height: 220px; }
.ph { position: absolute; left: 50%; top: 26px; transform: translateX(-50%) rotate(8deg); width: 130px; height: 230px; background: #0b0d14; border: 3px solid #2c3148; border-radius: 24px; padding: 10px; display: flex; flex-direction: column; gap: 7px; }
.ph i { height: 12%; border-radius: 6px; background: var(--panel2); }
.ph i.b { height: 18%; background: var(--accent2); }
.api { background: #0b0d14; border: 1px solid var(--line); }
.api pre { margin: 0; font-size: 12px; line-height: 1.8; letter-spacing: 0; text-transform: none; color: #c9ccda; white-space: pre-wrap; }
.api .g { color: var(--gold); }
.api .a { background: none !important; color: var(--accent); }
.flow { display: flex; align-items: center; gap: 8px; height: 100%; min-height: 140px; }
.flow { }
.flow b { flex: 1; height: 4px; background: #f4f0e8; opacity: 0.7; }
.flow i { width: 56px; height: 56px; background: #f4f0e8; border-radius: 16px; }
.flow i.ci { background: #10121b; border-radius: 50%; }
.flow i.a { background: var(--accent) !important; }
.flow-wrap { }
.mock.flow { background: var(--accent2); }
.table, .mock.table { background: var(--panel2); }
.tbl { display: flex; flex-direction: column; gap: 9px; }
.tbl i { height: 20px; border-radius: 7px; background: #0b0d14; }
.calendar { background: var(--panel2); }
.cal { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; }
.cal i { aspect-ratio: 1; border-radius: 8px; background: #0b0d14; }
</style>
