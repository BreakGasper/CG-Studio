<script setup>
import { reactive, ref, computed, nextTick } from 'vue'
import { contactEmail, booking } from '../data/content'
import { openBooking } from '../composables/useUi'
import { saveContacto } from '../firebase/store'

const f = reactive({ name: '', email: '', phone: '', subject: 'Proyecto nuevo', message: '', website: '' })
const done = ref(false)
const href = ref('')

const valid = computed(() => f.name.trim() && /^\S+@\S+\.\S+$/.test(f.email) && f.message.trim().length >= 10)

// Advertencias de campos obligatorios: aparecen al intentar enviar y se quitan solas al corregirlos.
const form = ref(null)
const showErr = ref(false)
const errors = computed(() => ({
  name: f.name.trim() ? '' : 'Escribe tu nombre',
  email: !f.email.trim() ? 'Escribe tu correo' : /^\S+@\S+\.\S+$/.test(f.email.trim()) ? '' : 'Escribe un correo válido, por ejemplo nombre@correo.com',
  message: f.message.trim().length >= 10 ? '' : f.message.trim() ? 'Cuéntanos un poco más (mínimo 10 caracteres)' : 'Escribe tu mensaje',
}))
const missing = computed(() => Object.values(errors.value).filter(Boolean).length)
const bad = (k) => showErr.value && !!errors.value[k]

function body() {
  return `Nombre: ${f.name}\nCorreo: ${f.email}\nTeléfono: ${f.phone || '-'}\n\n${f.message}`
}

const sending = ref(false)
const saved = ref(false)
async function submit() {
  if (f.website || sending.value) return // f.website es un campo trampa para bots
  if (!valid.value) {
    showErr.value = true
    await nextTick()
    const el = form.value?.querySelector('.bad')
    el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    el?.focus({ preventScroll: true })
    return
  }
  sending.value = true
  const subject = `Contacto CG Studio: ${f.subject}`
  const r = await saveContacto({ name: f.name, email: f.email, phone: f.phone, subject: f.subject, message: f.message })
  saved.value = r.ok
  href.value = booking.whatsapp
    ? `https://wa.me/${booking.whatsapp}?text=${encodeURIComponent(subject + '\n\n' + body())}`
    : `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body())}`
  // Si Firebase no está disponible, se usa el correo del visitante como respaldo.
  if (!r.ok) window.open(href.value, '_blank', 'noopener')
  done.value = true
  sending.value = false
}

function reset() {
  Object.assign(f, { name: '', email: '', phone: '', message: '', website: '' })
  done.value = false
  saved.value = false
  showErr.value = false
}
</script>

<template>
  <section id="contact">
    <div class="cta-big">
      <div class="mbadge"><svg viewBox="0 0 560 1150" aria-label="Mascota CG"><use href="#mcv" /></svg></div>
      <h2 class="disp">Construyamos algo grande</h2>
      <a class="btn" :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>
      <div class="cta-acts">
        <a class="btn pri" href="#book" @click.prevent="openBooking('cita')">Agendar cita</a>
        <a class="btn" href="#book" @click.prevent="openBooking('cotiza')">Cotizar proyecto</a>
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

      <form v-if="!done" ref="form" class="bk-card cf-form" novalidate @submit.prevent="submit">
        <div class="bk-row">
          <label><span>Nombre <span class="req" title="Obligatorio">*</span></span><input v-model="f.name" required autocomplete="name" :class="{ bad: bad('name') }" :aria-invalid="bad('name')" /><small v-if="bad('name')" class="fld-err" role="alert">{{ errors.name }}</small></label>
          <label><span>Correo <span class="req" title="Obligatorio">*</span></span><input v-model="f.email" type="email" required autocomplete="email" :class="{ bad: bad('email') }" :aria-invalid="bad('email')" /><small v-if="bad('email')" class="fld-err" role="alert">{{ errors.email }}</small></label>
        </div>
        <div class="bk-row">
          <label>Teléfono (opcional)<input v-model="f.phone" type="tel" autocomplete="tel" /></label>
          <label>Asunto
            <select v-model="f.subject"><option v-for="t in booking.topics" :key="t">{{ t }}</option></select>
          </label>
        </div>
        <label><span>Mensaje <span class="req" title="Obligatorio">*</span></span><textarea v-model="f.message" rows="5" required placeholder="Cuéntanos qué necesitas…" :class="{ bad: bad('message') }" :aria-invalid="bad('message')" /><small v-if="bad('message')" class="fld-err" role="alert">{{ errors.message }}</small></label>
        <input v-model="f.website" class="cf-trap" tabindex="-1" autocomplete="off" aria-hidden="true" />
        <p v-if="showErr && missing" class="bk-err" role="alert">⚠ Faltan {{ missing }} campo{{ missing > 1 ? 's' : '' }} obligatorio{{ missing > 1 ? 's' : '' }}. Revisa los marcados en rojo.</p>
        <button class="btn pri" :disabled="sending">{{ sending ? 'Enviando…' : 'Enviar mensaje' }}</button>
        <p class="bk-note"><span class="req">*</span> Campos obligatorios. Tu mensaje llega directo a nuestro equipo y te respondemos por correo.</p>
      </form>

      <div v-else class="bk-card cf-form cf-done">
        <h3>¡Gracias, {{ f.name.split(' ')[0] }}!</h3>
        <p v-if="saved">Recibimos tu mensaje y te responderemos pronto.</p>
        <p v-else>Preparamos tu mensaje. Si no se abrió tu correo, <a :href="href" target="_blank" rel="noopener">ábrelo aquí</a> o escríbenos a {{ contactEmail }}.</p>
        <button class="btn" @click="reset">Enviar otro mensaje</button>
      </div>
    </div>
  </section>
</template>
