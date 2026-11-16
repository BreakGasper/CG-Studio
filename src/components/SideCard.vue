<script setup>
import { typedWords } from '../data/content'
import { useTyped } from '../composables/useTyped'

const typed = useTyped(typedWords, 'Hola, somos ')
</script>

<template>
  <aside>
    <div class="mono">
      <svg class="float" viewBox="0 0 1114 530" aria-label="Mascota de CG Studio"><use href="#mc" /></svg>
    </div>
    <div class="a-top">
      <svg class="a-logo" viewBox="0 0 1114 530" aria-hidden="true"><use href="#cg" /></svg>
      <div class="socials">
        <a href="#" aria-label="X">X</a>
        <a href="#" aria-label="LinkedIn">in</a>
        <a href="#" aria-label="GitHub">Gh</a>
      </div>
    </div>
    <div class="avail"><i class="dot"></i>Disponible para proyectos</div>
    <div class="a-bot">
      <h3><span>{{ typed }}</span><span class="caret"></span></h3>
      <p>Desarrollamos software, plataformas e inteligencia artificial para que tu negocio crezca y automatice, con sede en LATAM.</p>
      <div class="row">
        <a class="circ" href="#contact" aria-label="Contacto">↗</a>
        <a class="btn pri" href="#contact">Hablemos</a>
        <a class="btn" href="#work" style="border:0">Ver demos</a>
      </div>
    </div>
  </aside>
</template>
