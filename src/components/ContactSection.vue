<script setup>
import { reactive, ref, computed } from 'vue'
import { contactEmail, booking } from '../data/content'

const f = reactive({ name: '', email: '', phone: '', subject: 'Proyecto nuevo', message: '', website: '' })
const done = ref(false)
const href = ref('')

const valid = computed(() => f.name.trim() && /^\S+@\S+\.\S+$/.test(f.email) && f.message.trim().length >= 10)

function body() {
  return `Nombre: ${f.name}\nCorreo: ${f.email}\nTeléfono: ${f.phone || '-'}\n\n${f.message}`
}

function submit() {
  if (!valid.value || f.website) return // f.website es un campo trampa para bots
  const subject = `Contacto CG Studio: ${f.subject}`
  href.value = booking.whatsapp
    ? `https://wa.me/${booking.whatsapp}?text=${encodeURIComponent(subject + '\n\n' + body())}`
    : `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body())}`
  done.value = true
  window.open(href.value, '_blank', 'noopener')
}

function reset() {
  Object.assign(f, { name: '', email: '', phone: '', message: '', website: '' })
  done.value = false
}
</script>

<template>
  <section id="contact">
    <div class="cta-big">
      <div class="mbadge"><svg viewBox="0 0 560 1150" aria-label="Mascota CG"><use href="#mcv" /></svg></div>
      <h2 class="disp">Construyamos algo grande</h2>
      <a class="btn" :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>
      <div class="cta-acts">
        <a class="btn pri" href="#book">Agendar cita</a>
        <a class="btn" href="#book">Cotizar proyecto</a>
      </div>
    </div>

    <div class="cf">
      <div class="cf-info">
        <div class="eyebrow">Contacto</div>
        <h2 class="disp">Cuéntanos tu idea</h2>
        <p class="lead">Escríbenos y te respondemos con una propuesta. Cuanto más detalle nos des, mejor.</p>
        <ul class="cf-list">
          <li><b>Correo</b><a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a></li>
          <li><b>Atención</b><span>Toda Latinoamérica, en línea</span></li>
          <li><b>Respuesta</b><span>Normalmente en 1 día hábil</span></li>
        </ul>
      </div>

      <form v-if="!done" class="bk-card cf-form" novalidate @submit.prevent="submit">
        <div class="bk-row">
          <label>Nombre<input v-model="f.name" required autocomplete="name" /></label>
          <label>Correo<input v-model="f.email" type="email" required autocomplete="email" /></label>
        </div>
        <div class="bk-row">
          <label>Teléfono (opcional)<input v-model="f.phone" type="tel" autocomplete="tel" /></label>
          <label>Asunto
            <select v-model="f.subject"><option v-for="t in booking.topics" :key="t">{{ t }}</option></select>
          </label>
        </div>
        <label>Mensaje<textarea v-model="f.message" rows="5" required minlength="10" placeholder="Cuéntanos qué necesitas…" /></label>
        <input v-model="f.website" class="cf-trap" tabindex="-1" autocomplete="off" aria-hidden="true" />
        <button class="btn pri" :disabled="!valid">Enviar mensaje</button>
        <p class="bk-note">Al enviar se abrirá tu aplicación de correo con el mensaje listo para mandar.</p>
      </form>

      <div v-else class="bk-card cf-form cf-done">
        <h3>¡Gracias, {{ f.name.split(' ')[0] }}!</h3>
        <p>Preparamos tu mensaje. Si no se abrió tu correo, <a :href="href" target="_blank" rel="noopener">ábrelo aquí</a> o escríbenos a {{ contactEmail }}.</p>
        <button class="btn" @click="reset">Enviar otro mensaje</button>
      </div>
    </div>
  </section>
</template>
