<template>
  <section class="perla">
    <div class="wrap section row">
      <div class="stack copy" v-reveal>
        <div class="mono lbl">Desarrollo personalizado</div>
        <h2 class="h2">De una necesidad a un sistema que se usa todos los días.</h2>
        <p>Escuchamos cómo trabaja tu equipo, modelamos el proceso y construimos una herramienta a tu medida: tableros, paneles administrativos, portales y apps conectadas entre sí.</p>
      </div>
      <div class="vis" aria-hidden="true">
        <div class="win">
          <div class="dots"><i style="background:#f0456f"></i><i style="background:#d9a441"></i><i style="background:#19c79f"></i></div>
          <div class="k"><i></i><i class="a"></i><i></i></div>
          <div class="b"><i style="height:40%"></i><i class="a" style="height:70%"></i><i style="height:55%"></i><i class="c" style="height:92%"></i><i style="height:48%"></i></div>
        </div>
        <div class="list fl2">
          <div class="mono t">Pedidos activos</div>
          <div class="li"><span>Orden #1042</span><b class="ok">Enviado</b></div>
          <div class="li"><span>Orden #1043</span><b class="wait">Pendiente</b></div>
          <div class="li"><span>Orden #1044</span><b class="ok">Enviado</b></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.perla { background: #f4f0e8; color: #10121b; }
.row { align-items: center; gap: 56px; }
.copy { flex: 1 1 440px; min-width: 0; gap: 24px; }
.lbl { font-size: 13px; font-weight: 700; }
.copy .h2 { font-size: clamp(38px, 5.6vw, 72px); }
.copy p { font-size: 19px; color: #3a3f55; max-width: 520px; }
.vis { flex: 1 1 440px; min-width: 0; position: relative; min-height: 420px; }
.win { position: absolute; left: 0; top: 0; width: 78%; background: #10121b; border-radius: 24px; padding: 18px; box-shadow: 0 30px 60px rgba(16,18,27,.28); }
.dots { display: flex; gap: 7px; margin-bottom: 14px; }
.dots i { width: 10px; height: 10px; border-radius: 50%; }
.k { display: flex; gap: 10px; margin-bottom: 12px; }
.k i { flex: 1; height: 50px; border-radius: 10px; background: var(--panel2); }
.b { display: flex; align-items: flex-end; gap: 7px; height: 110px; }
.b i { flex: 1; background: var(--panel2); border-radius: 5px 5px 0 0; }
.a { background: var(--accent) !important; }
.c { background: var(--accent2) !important; }
.list { position: absolute; right: 0; bottom: 0; width: 58%; background: #fff; border: 1px solid #d9d4c8; border-radius: 24px; padding: 20px; box-shadow: 0 30px 60px rgba(16,18,27,.18); display: flex; flex-direction: column; gap: 10px; }
.t { font-size: 10px; color: #3a3f55; font-weight: 700; }
.li { display: flex; justify-content: space-between; font-size: 14px; border-bottom: 1px solid #e5e0d4; padding-bottom: 8px; }
.li:last-child { border: 0; padding: 0; }
.ok { color: #0b7f78; }
.wait { color: #8a6500; }
</style>
