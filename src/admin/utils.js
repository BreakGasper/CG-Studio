// Utilidades del panel: fechas, etapas de seguimiento y exportación a Excel (CSV).
const pad = (n) => String(n).padStart(2, '0')
export const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const todayIso = () => iso(new Date())
export const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x }

export const fmtDate = (d) => (d ? new Date(d + 'T12:00').toLocaleDateString('es', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : '')
export const when = (ts) => (ts?.toDate ? ts.toDate().toLocaleString('es', { dateStyle: 'medium', timeStyle: 'short' }) : '')
export const money = (n) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n || 0)
export const isMail = (s) => /\S+@\S+\.\S+/.test(s || '')
export const waLink = (s, text = '') => `https://wa.me/${String(s).replace(/\D/g, '')}${text ? '?text=' + encodeURIComponent(text) : ''}`

// Etapas de seguimiento por tipo de registro: [id, etiqueta]
export const STAGES = {
  citas: [['nueva', 'Nueva'], ['confirmada', 'Confirmada'], ['realizada', 'Realizada'], ['cancelada', 'Cancelada'], ['archivada', 'Archivada']],
  cotizaciones: [['nueva', 'Nueva'], ['contactada', 'Contactada'], ['propuesta', 'Propuesta enviada'], ['ganada', 'Ganada'], ['perdida', 'Perdida'], ['archivada', 'Archivada']],
  contactos: [['nueva', 'Nueva'], ['contactada', 'Respondido'], ['archivada', 'Archivada']],
}
// Compatibilidad con registros anteriores (estatus "atendida")
export const stageOf = (kind, row) => (row.status === 'atendida' ? (kind === 'citas' ? 'realizada' : 'contactada') : row.status || 'nueva')
export const stageLabel = (kind, row) => (STAGES[kind].find(([id]) => id === stageOf(kind, row)) || [0, stageOf(kind, row)])[1]

export const KIND_LABEL = { citas: 'Citas', cotizaciones: 'Cotizaciones', contactos: 'Mensajes' }

// ---- CSV (se abre directo en Excel) ----
const cell = (v) => `"${String(v ?? '').replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`
export function toCSV(rows, cols) {
  return [cols.map((c) => cell(c.label)).join(','), ...rows.map((r) => cols.map((c) => cell(c.get(r))).join(','))].join('\r\n')
}
export function download(filename, text) {
  const url = URL.createObjectURL(new Blob(['﻿' + text], { type: 'text/csv;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
export const CSV_COLS = {
  citas: [
    { label: 'Fecha', get: (r) => r.date }, { label: 'Hora', get: (r) => r.time }, { label: 'Nombre', get: (r) => r.name },
    { label: 'Contacto', get: (r) => r.contact }, { label: 'Tema', get: (r) => r.topic }, { label: 'Notas del cliente', get: (r) => r.notes },
    { label: 'Etapa', get: (r) => stageLabel('citas', r) }, { label: 'Notas internas', get: (r) => r.notas }, { label: 'Recibida', get: (r) => when(r.createdAt) },
  ],
  cotizaciones: [
    { label: 'Recibida', get: (r) => when(r.createdAt) }, { label: 'Nombre', get: (r) => r.name }, { label: 'Contacto', get: (r) => r.contact },
    { label: 'Tipo', get: (r) => r.type }, { label: 'Extras', get: (r) => (r.extras || []).join(' / ') }, { label: 'Complejidad', get: (r) => r.complexity },
    { label: 'Urgencia', get: (r) => r.urgency }, { label: 'Mantenimiento', get: (r) => (r.maint ? 'Sí' : 'No') },
    { label: 'Mínimo MXN', get: (r) => r.min }, { label: 'Máximo MXN', get: (r) => r.max }, { label: 'Semanas', get: (r) => r.weeks },
    { label: 'Etapa', get: (r) => stageLabel('cotizaciones', r) }, { label: 'Notas internas', get: (r) => r.notas },
  ],
  contactos: [
    { label: 'Recibido', get: (r) => when(r.createdAt) }, { label: 'Nombre', get: (r) => r.name }, { label: 'Correo', get: (r) => r.email },
    { label: 'Teléfono', get: (r) => r.phone }, { label: 'Asunto', get: (r) => r.subject }, { label: 'Mensaje', get: (r) => r.message },
    { label: 'Etapa', get: (r) => stageLabel('contactos', r) }, { label: 'Notas internas', get: (r) => r.notas },
  ],
}
