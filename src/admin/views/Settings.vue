<script setup>
import { reactive, ref, watch } from 'vue'
import { data, saveConfig, resetConfig } from '../store'
import { quote, packages, defaultSiteConfig } from '../../data/content'
import { applySiteConfig } from '../../data/siteConfig'

// Borrador editable = valores de fábrica + lo guardado en el panel. No se toca el contenido público hasta guardar.
const clone = (o) => JSON.parse(JSON.stringify(o))
const labelOf = (list, id) => list.find((x) => x.id === id)?.label || id

function build() {
  const base = clone(defaultSiteConfig)
  const saved = data.config ? clone({ ...data.config, updatedAt: undefined }) : {}
  const merge = (list, over, keys) => list.map((it) => { const o = (over || []).find((x) => x.id === it.id) || {}; const r = { ...it }; keys.forEach((k) => { if (typeof o[k] === 'number') r[k] = o[k] }); return r })
  return {
    quote: {
      types: merge(base.quote.types, saved.quote?.types, ['price', 'weeks']),
      extras: merge(base.quote.extras, saved.quote?.extras, ['price', 'weeks']),
      complexity: merge(base.quote.complexity, saved.quote?.complexity, ['mult']),
      urgency: merge(base.quote.urgency, saved.quote?.urgency, ['mult']),
      maintenance: { price: saved.quote?.maintenance?.price ?? base.quote.maintenance.price },
      spread: saved.quote?.spread ?? base.quote.spread,
    },
    packages: base.packages.map((p) => { const o = (saved.packages || []).find((x) => x.id === p.id) || {}; return { ...p, ...Object.fromEntries(Object.entries(o).filter(([k]) => ['name', 'tag', 'text', 'items', 'quote', 'featured'].includes(k))), itemsText: (o.items || p.items).join('\n') } }),
    slots: saved.slots?.length ? [...saved.slots] : [...base.slots],
    closedWeekdays: saved.closedWeekdays ? [...saved.closedWeekdays] : [],
    blockedDates: saved.blockedDates ? [...saved.blockedDates] : [],
  }
}

const f = reactive(build())
const dirty = ref(false)
const msg = ref('')
const newSlot = ref('')
const newDate = ref('')
const wd = [[1, 'Lun'], [2, 'Mar'], [3, 'Mié'], [4, 'Jue'], [5, 'Vie'], [6, 'Sáb'], [0, 'Dom']]

// Si el panel recibe cambios de otra pestaña y no hay ediciones pendientes, se refresca el borrador.
watch(() => data.config, () => { if (!dirty.value) Object.assign(f, build()) })
watch(f, () => { dirty.value = true }, { deep: true })

const num = (v) => (Number.isFinite(+v) ? +v : 0)
function addSlot() {
  if (/^[0-2][0-9]:[0-5][0-9]$/.test(newSlot.value) && !f.slots.includes(newSlot.value)) f.slots = [...f.slots, newSlot.value].sort()
  newSlot.value = ''
}
function addDate() {
  if (/^20\d\d-\d\d-\d\d$/.test(newDate.value) && !f.blockedDates.includes(newDate.value)) f.blockedDates = [...f.blockedDates, newDate.value].sort()
  newDate.value = ''
}
const toggleWd = (d) => { f.closedWeekdays = f.closedWeekdays.includes(d) ? f.closedWeekdays.filter((x) => x !== d) : [...f.closedWeekdays, d] }

function payload() {
  const pick = (list, keys) => list.map((it) => Object.fromEntries([['id', it.id], ...keys.map((k) => [k, num(it[k])])]))
  return {
    quote: {
      types: pick(f.quote.types, ['price', 'weeks']), extras: pick(f.quote.extras, ['price', 'weeks']),
      complexity: pick(f.quote.complexity, ['mult']), urgency: pick(f.quote.urgency, ['mult']),
      maintenance: { price: num(f.quote.maintenance.price) }, spread: Math.min(0.5, Math.max(0, num(f.quote.spread))),
    },
    packages: f.packages.map((p) => ({
      id: p.id, name: p.name.trim().slice(0, 60), tag: p.tag.trim().slice(0, 30), text: p.text.trim().slice(0, 200), quote: p.quote, featured: !!p.featured,
      items: p.itemsText.split('\n').map((x) => x.trim()).filter(Boolean).slice(0, 8),
    })),
    slots: f.slots, closedWeekdays: f.closedWeekdays, blockedDates: f.blockedDates,
  }
}

async function save() {
  msg.value = ''
  if (!f.slots.length) { msg.value = 'Deja al menos un horario disponible.'; return }
  if (f.packages.some((p) => !p.name.trim() || !p.text.trim())) { msg.value = 'Cada paquete necesita nombre y descripción.'; return }
  const cfg = payload()
  if (await saveConfig(cfg)) { dirty.value = false; msg.value = 'Guardado ✓ La página ya usa estos valores.' }
}
async function reset() {
  if (!confirm('¿Restaurar los precios, paquetes y horarios de fábrica? Se pierden tus cambios.')) return
  if (await resetConfig()) { Object.assign(f, build()); dirty.value = false; msg.value = 'Restaurado a los valores de fábrica.' }
}
void applySiteConfig; void quote; void packages
</script>

<template>
  <div class="settings">
    <p class="muted">Los cambios se aplican en la página al guardar (los visitantes los ven al recargar).</p>

    <section class="a-card">
      <h3>Cotizador · precios (USD) y plazos</h3>
      <table class="tbl">
        <thead><tr><th>Tipo de proyecto</th><th>Precio base</th><th>Semanas</th></tr></thead>
        <tbody>
          <tr v-for="t in f.quote.types" :key="t.id"><td>{{ labelOf(quote.types, t.id) }}</td>
            <td><input v-model.number="t.price" class="in num" type="number" min="0" step="50" /></td>
            <td><input v-model.number="t.weeks" class="in num" type="number" min="0" /></td></tr>
        </tbody>
      </table>
      <table class="tbl">
        <thead><tr><th>Extra</th><th>Precio</th><th>Semanas</th></tr></thead>
        <tbody>
          <tr v-for="t in f.quote.extras" :key="t.id"><td>{{ labelOf(quote.extras, t.id) }}</td>
            <td><input v-model.number="t.price" class="in num" type="number" min="0" step="50" /></td>
            <td><input v-model.number="t.weeks" class="in num" type="number" min="0" /></td></tr>
        </tbody>
      </table>
      <div class="two">
        <div>
          <h4>Complejidad (multiplicador)</h4>
          <label v-for="t in f.quote.complexity" :key="t.id" class="row">{{ labelOf(quote.complexity, t.id) }} <input v-model.number="t.mult" class="in num" type="number" min="0.5" step="0.05" /></label>
        </div>
        <div>
          <h4>Urgencia (multiplicador)</h4>
          <label v-for="t in f.quote.urgency" :key="t.id" class="row">{{ labelOf(quote.urgency, t.id) }} <input v-model.number="t.mult" class="in num" type="number" min="0.5" step="0.05" /></label>
          <label class="row">Mantenimiento mensual (USD) <input v-model.number="f.quote.maintenance.price" class="in num" type="number" min="0" step="10" /></label>
          <label class="row">Margen del rango (0–0.5) <input v-model.number="f.quote.spread" class="in num" type="number" min="0" max="0.5" step="0.05" /></label>
        </div>
      </div>
    </section>

    <section class="a-card">
      <h3>Paquetes</h3>
      <p class="muted">El precio "desde" y las semanas se toman del tipo de proyecto elegido en cada paquete.</p>
      <div v-for="p in f.packages" :key="p.id" class="pkg">
        <div class="two">
          <label>Nombre <input v-model="p.name" class="in" maxlength="60" /></label>
          <label>Etiqueta <input v-model="p.tag" class="in" maxlength="30" /></label>
        </div>
        <label>Descripción <input v-model="p.text" class="in" maxlength="200" /></label>
        <div class="two">
          <label>Precio y plazo según
            <select v-model="p.quote" class="in"><option v-for="t in f.quote.types" :key="t.id" :value="t.id">{{ labelOf(quote.types, t.id) }}</option></select>
          </label>
          <label class="chk"><input v-model="p.featured" type="checkbox" @change="f.packages.forEach((o) => { if (o !== p) o.featured = false })" /> Destacado ("Más pedido")</label>
        </div>
        <label>Qué incluye (uno por línea, máx. 8) <textarea v-model="p.itemsText" class="in" rows="5"></textarea></label>
      </div>
    </section>

    <section class="a-card">
      <h3>Agenda · horarios y días</h3>
      <h4>Horarios disponibles cada día</h4>
      <div class="chips">
        <span v-for="s in f.slots" :key="s" class="chip">{{ s }} <button aria-label="Quitar" @click="f.slots = f.slots.filter((x) => x !== s)">✕</button></span>
      </div>
      <div class="add"><input v-model="newSlot" class="in" type="time" /><button class="sm" @click="addSlot">Agregar horario</button></div>
      <h4>Días de la semana sin citas</h4>
      <div class="chips">
        <button v-for="[d, n] in wd" :key="d" class="chip tgl" :class="{ on: f.closedWeekdays.includes(d) }" @click="toggleWd(d)">{{ n }}</button>
      </div>
      <h4>Fechas no disponibles (vacaciones, feriados)</h4>
      <div class="chips">
        <span v-for="d in f.blockedDates" :key="d" class="chip">{{ d }} <button aria-label="Quitar" @click="f.blockedDates = f.blockedDates.filter((x) => x !== d)">✕</button></span>
        <span v-if="!f.blockedDates.length" class="muted">Ninguna</span>
      </div>
      <div class="add"><input v-model="newDate" class="in" type="date" /><button class="sm" @click="addDate">Agregar fecha</button></div>
    </section>

    <div class="savebar">
      <span v-if="msg" class="ok">{{ msg }}</span>
      <button @click="reset">Restaurar valores de fábrica</button>
      <button class="go" @click="save">{{ dirty ? 'Guardar cambios' : 'Guardar' }}</button>
    </div>
  </div>
</template>
