<script setup>
import { ref } from 'vue'
import { getConsent, setConsent, startAnalytics } from '../firebase/track'

const open = ref(getConsent() === null)
function answer(v) {
  setConsent(v)
  open.value = false
  if (v === 'yes') startAnalytics()
}
</script>

<template>
  <div v-if="open" class="ck" role="dialog" aria-label="Aviso de analítica">
    <p>Usamos <b>analítica de Google</b> para saber qué secciones se visitan y mejorar la página. ¿Nos ayudas aceptándola?</p>
    <div class="ck-btns">
      <button type="button" class="btn" @click="answer('no')">No, gracias</button>
      <button type="button" class="btn blue" @click="answer('yes')">Aceptar</button>
    </div>
  </div>
</template>
