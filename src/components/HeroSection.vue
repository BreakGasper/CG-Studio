<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const stage = ref(null)
const mx = ref(0)
const my = ref(0)

// Parallax ligero: los elementos flotantes reaccionan al cursor.
function onMove(e) {
  const r = stage.value.getBoundingClientRect()
  mx.value = (e.clientX - r.left) / r.width - 0.5
  my.value = (e.clientY - r.top) / r.height - 0.5
}
const depth = (k) => ({ transform: `translate(${mx.value * k}px, ${my.value * k}px)` })

onMounted(() => window.addEventListener('mousemove', onMove))
onBeforeUnmount(() => window.removeEventListener('mousemove', onMove))
</script>

<template>
  <section id="top" class="wrap hero">
    <div class="copy stack">
      <div class="mono eyebrow">Digital Engineering · Software a medida</div>
      <h1 class="disp title">Transformamos ideas en <span class="hl">soluciones digitales.</span></h1>
      <p class="lead mute">CG STUDIO diseña y desarrolla sistemas empresariales, aplicaciones, APIs y automatizaciones que resuelven problemas reales de tu operación.</p>
      <div class="row actions">
        <a href="#portfolio" class="btn">Ver proyectos</a>
        <a href="#contacto" class="btn ghost">Contactar</a>
      </div>
      <div class="row tags">
        <span class="mono tag">Plataformas</span><span class="mono tag">APIs</span>
        <span class="mono tag">IA</span><span class="mono tag">Automatización</span>
      </div>
    </div>

    <div ref="stage" class="stage" aria-hidden="true">
      <div class="blob"></div>
      <div class="blob shine"></div>
      <div class="layer" :style="depth(30)">
        <div class="code fl1">
          <div class="dots"><i style="background:#f0456f"></i><i style="background:#d9a441"></i><i style="background:#19c79f"></i></div>
          <pre class="mono">const sistema = await studio
  .diseñar(idea)
  .construir()
  .escalar();
// 200 OK · en producción</pre>
        </div>
      </div>
      <div class="layer" :style="depth(-24)">
        <div class="phone fl2" style="--r:-6deg">
          <span class="b1"></span><span class="b2"></span><span class="b3"></span><span class="b3"></span><span class="b3"></span>
        </div>
      </div>
      <div class="layer" :style="depth(46)">
        <div class="cube fl3" style="--r:18deg"><span class="disp">API</span></div>
      </div>
      <div class="layer" :style="depth(-40)"><div class="ring fl2"></div></div>
      <div class="chipf fl1 mono">IA · Automatización</div>
    </div>
  </section>
</template>

<style scoped>
.hero { display: flex; flex-wrap: wrap; align-items: center; gap: 48px; padding-block: 40px 100px; }
.copy { flex: 1 1 520px; min-width: 0; gap: 30px; }
.eyebrow { font-size: 13px; color: var(--accent); font-weight: 700; }
.title { font-size: clamp(46px, 7.4vw, 104px); line-height: 0.95; font-weight: 800; letter-spacing: -0.025em; text-wrap: balance; }
.hl { color: var(--accent); }
.lead { max-width: 520px; font-size: 20px; }
.actions { gap: 16px; }
.tags { gap: 10px; padding-top: 10px; }
.tag { font-size: 11px; border: 1px solid var(--line); padding: 7px 14px; border-radius: 999px; color: var(--mute); }

.stage { flex: 1 1 420px; min-width: 0; max-width: 560px; width: 100%; aspect-ratio: 1; position: relative; margin: 0 auto; }
.layer { position: absolute; inset: 0; transition: transform 0.25s ease-out; pointer-events: none; }
.blob { position: absolute; inset: 6% 4% 8% 8%; border-radius: 46% 54% 42% 58% / 52% 44% 56% 48%; background: linear-gradient(140deg, var(--accent), var(--accent2)); opacity: 0.92; }
.blob.shine { background: radial-gradient(circle at 30% 20%, rgba(255,255,255,.35), transparent 55%); opacity: 1; }
.code { position: absolute; left: 0; top: 18%; width: 66%; background: #0b0d14; border: 1px solid var(--line); border-radius: 20px; box-shadow: 0 30px 60px rgba(0,0,0,.45); overflow: hidden; }
.dots { display: flex; gap: 7px; padding: 14px 16px; background: #141725; }
.dots i { width: 10px; height: 10px; border-radius: 50%; }
.code pre { margin: 0; padding: 18px 20px; font-size: 12px; line-height: 1.9; letter-spacing: 0; text-transform: none; color: #c9ccda; white-space: pre-wrap; }
.phone { position: absolute; right: 2%; bottom: 4%; width: 30%; aspect-ratio: 9/17; background: #0b0d14; border: 3px solid #2c3148; border-radius: 28px; box-shadow: 0 30px 60px rgba(0,0,0,.45); padding: 12px; display: flex; flex-direction: column; gap: 8px; }
.phone span { display: block; border-radius: 9px; background: var(--panel); }
.phone .b1 { height: 14%; background: var(--accent); }
.phone .b2 { height: 30%; background: var(--panel2); }
.phone .b3 { height: 10%; }
.cube { position: absolute; right: 6%; top: 4%; width: 22%; aspect-ratio: 1; border-radius: 26%; background: linear-gradient(145deg, #f4f0e8, #c9c4b8); box-shadow: inset -10px -12px 0 rgba(16,18,27,.18), 0 24px 40px rgba(0,0,0,.35); display: flex; align-items: center; justify-content: center; }
.cube span { font-weight: 800; font-size: clamp(20px, 3.4vw, 40px); color: #10121b; letter-spacing: -0.02em; }
.ring { position: absolute; left: 10%; bottom: 2%; width: 20%; aspect-ratio: 1; border-radius: 50%; border: 14px solid #f4f0e8; box-shadow: 0 20px 40px rgba(0,0,0,.35); }
.chipf { position: absolute; left: 44%; top: 2%; background: #f4f0e8; color: #10121b; font-size: 11px; font-weight: 700; padding: 9px 16px; border-radius: 999px; box-shadow: 0 16px 30px rgba(0,0,0,.3); }
</style>
