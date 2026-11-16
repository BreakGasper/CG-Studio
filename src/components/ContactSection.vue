<script setup>
import { reactive, ref } from 'vue'
import { contacto } from '../data.js'
import { enviarContacto } from '../firebase.js'

const form = reactive({ nombre: '', correo: '', tipo: 'Sistema empresarial', mensaje: '' })
const estado = ref('idle') // idle | enviando | ok | error

async function enviar() {
  if (estado.value === 'enviando') return
  estado.value = 'enviando'
  try {
    await enviarContacto({
      nombre: form.nombre.trim(), correo: form.correo.trim(),
      tipo: form.tipo, mensaje: form.mensaje.trim()
    })
    estado.value = 'ok'
    Object.assign(form, { nombre: '', correo: '', mensaje: '' })
  } catch (e) {
    console.error(e)
    estado.value = 'error'
  }
}
</script>

<template>
  <section id="contacto" class="wrap section row" style="gap:56px">
    <div class="stack info" v-reveal>
      <div class="mono eyebrow">Contacto</div>
      <h2 class="h2 big">Hablemos de tu próximo sistema.</h2>
      <p class="mute">Cuéntanos qué necesitas resolver. Respondemos con una propuesta de ruta y una cotización.</p>
      <div class="stack" style="gap:10px;font-size:18px"><span>{{ contacto.correo }}</span><span>{{ contacto.telefono }}</span></div>
      <div class="row" style="gap:12px"><a v-for="r in contacto.redes" :key="r.nombre" :href="r.url" class="mono soc">{{ r.nombre }}</a></div>
    </div>

    <form class="form" aria-label="Solicitar cotización" @submit.prevent="enviar">
      <label for="f-nombre">Nombre<input id="f-nombre" v-model="form.nombre" type="text" required maxlength="120" autocomplete="name" placeholder="Tu nombre" /></label>
      <label for="f-correo">Correo<input id="f-correo" v-model="form.correo" type="email" required maxlength="200" autocomplete="email" placeholder="correo@empresa.com" /></label>
      <label for="f-tipo">¿Qué necesitas?
        <select id="f-tipo" v-model="form.tipo">
          <option>Sistema empresarial</option><option>Aplicación web o móvil</option>
          <option>API o integración</option><option>Automatización</option>
        </select>
      </label>
      <label for="f-msg">Cuéntanos el proyecto<textarea id="f-msg" v-model="form.mensaje" rows="4" required maxlength="4000" placeholder="Describe el problema que quieres resolver"></textarea></label>
      <button class="btn" type="submit" :disabled="estado === 'enviando'">{{ estado === 'enviando' ? 'Enviando…' : 'Solicitar cotización' }}</button>
      <p v-if="estado === 'ok'" class="msg ok" role="status">Mensaje enviado. Te responderemos pronto.</p>
      <p v-if="estado === 'error'" class="msg err" role="alert">No se pudo enviar. Revisa tu conexión e inténtalo de nuevo.</p>
    </form>
  </section>
</template>

<style scoped>
.info { flex: 1 1 420px; min-width: 0; gap: 28px; }
.big { font-size: clamp(42px, 6.4vw, 88px); line-height: 0.98; letter-spacing: -0.025em; }
.info > p { max-width: 440px; }
.soc { font-size: 12px; border: 1px solid var(--line); padding: 10px 18px; border-radius: 999px; }
.form { flex: 1 1 420px; min-width: 0; background: var(--panel); border: 1px solid var(--line); border-radius: 32px; padding: 34px; display: flex; flex-direction: column; gap: 18px; }
label { display: flex; flex-direction: column; gap: 8px; font-size: 14px; font-weight: 700; }
input, select, textarea { background: var(--bg); color: var(--ink); border: 1px solid var(--line); border-radius: 14px; padding: 15px 16px; font: inherit; font-size: 16px; font-weight: 400; }
textarea { resize: vertical; }
.btn:disabled { opacity: 0.6; cursor: wait; transform: none; box-shadow: none; }
.msg { font-size: 15px; }
.ok { color: var(--accent); }
.err { color: #ff8aa3; }
</style>
