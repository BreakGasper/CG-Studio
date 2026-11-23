<script setup>
import { ref, computed } from 'vue'
import { data, eff, reschedule } from '../store'
import { fmtDate, todayIso } from '../utils'

const props = defineProps({ row: { type: Object, required: true } })
const emit = defineEmits(['close'])

const date = ref(props.row.date)
const time = ref('')
const busy = ref(false)
const msg = ref('')

const closed = computed(() => eff.value.blockedDates.includes(date.value) || eff.value.closedWeekdays.includes(new Date(date.value + 'T12:00').getDay()))
// Horarios ocupados ese día (por otras citas o bloqueados), sin contar el de la propia cita
const taken = computed(() => new Set(data.horarios.filter((h) => h.date === date.value && !(h.date === props.row.date && h.time === props.row.time)).map((h) => h.time)))

async function save() {
  if (!date.value || !time.value) { msg.value = 'Elige una fecha y un horario.'; return }
  busy.value = true
  const ok = await reschedule(props.row, date.value, time.value)
  busy.value = false
  if (ok) emit('close')
}
</script>

<template>
  <div class="modal" role="dialog" aria-label="Reagendar cita" @click.self="emit('close')">
    <div class="sheet">
      <h3>Reagendar cita</h3>
      <p class="muted">{{ row.name }} · actualmente {{ fmtDate(row.date) }} a las {{ row.time }}</p>
      <label class="dt">Nueva fecha <input v-model="date" class="in" type="date" :min="todayIso()" @change="time = ''" /></label>
      <p v-if="closed" class="err">Ese día está cerrado (día sin citas o fecha bloqueada).</p>
      <div class="slots">
        <button v-for="s in eff.slots" :key="s" type="button" class="slot" :class="{ on: time === s }"
          :disabled="closed || taken.has(s)" @click="time = s">{{ s }}</button>
      </div>
      <p v-if="msg" class="err">{{ msg }}</p>
      <div class="acts">
        <button @click="emit('close')">Cancelar</button>
        <button class="go sm" :disabled="busy" @click="save">{{ busy ? 'Guardando…' : 'Reagendar' }}</button>
      </div>
    </div>
  </div>
</template>
