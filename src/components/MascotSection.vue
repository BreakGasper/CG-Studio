<template>
  <section id="mascot">
    <div class="eyebrow">Nuestra mascota</div>
    <h2 class="disp">Las letras CG, con vida</h2>
    <div class="mgrid">
      <div class="mcard"><svg viewBox="0 0 1114 530" aria-label="Mascota horizontal"><use href="#mc" /></svg><small>Horizontal</small></div>
      <div class="mcard v"><svg viewBox="0 0 560 1150" aria-label="Mascota vertical"><use href="#mcv" /></svg><small>Vertical</small></div>
      <div class="mtxt">
        <p>La mascota es nuestro propio logotipo: la C es la cabeza y la G sigue siendo la G. Solo se añaden dos ojos turquesa, que parpadean de vez en cuando.</p>
        <div class="msz">
          <span v-for="size in ['a', 'b', 'c']" :key="size" :class="size"><svg viewBox="0 0 560 1150"><use href="#mcv" /></svg></span>
        </div>
      </div>
    </div>
  </section>
</template>
