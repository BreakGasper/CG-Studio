<script setup>
import { packages, booking } from '../data/content'
import { openBooking } from '../composables/useUi'
const money = (n) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: booking.currency, maximumFractionDigits: 0 }).format(n)
</script>

<template>
  <section id="packages">
    <div class="eyebrow">Paquetes</div>
    <h2 class="disp">Elige cómo empezar</h2>
    <p class="lead">Tres puntos de partida claros. Todo se ajusta a tu proyecto; el precio final se confirma tras revisar el alcance.</p>
    <div class="pk-grid">
      <article v-for="p in packages" :key="p.id" class="pk" :class="{ feat: p.featured }">
        <span class="pk-tag">{{ p.tag }}</span>
        <h3>{{ p.name }}</h3>
        <p class="pk-text">{{ p.text }}</p>
        <div class="pk-price"><small>desde</small><b>{{ money(p.from) }}</b><span>≈ {{ p.weeks }} semanas</span></div>
        <ul>
          <li v-for="i in p.items" :key="i">{{ i }}</li>
        </ul>
        <a class="btn" href="#book" @click.prevent="openBooking('cotiza', p.quote)">Cotizar este paquete</a>
      </article>
    </div>
  </section>
</template>
