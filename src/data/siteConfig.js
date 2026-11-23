import { booking, quote, packages, syncPackagePrices } from './content'

// Aplica la configuración que el administrador guarda en Firestore (config/site) sobre los valores de fábrica.
// Solo se aceptan valores válidos; cualquier dato raro se ignora y se conserva el valor de fábrica.
const num = (v, min = 0, max = 1e6) => typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max
const str = (v, max) => (typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null)

function mergeById(list, over, fields) {
  for (const o of Array.isArray(over) ? over : []) {
    const t = list.find((x) => x.id === o?.id)
    if (!t) continue
    for (const [f, max] of fields) if (num(o[f], 0, max)) t[f] = o[f]
  }
}

export const SITE_KEY = 'cg-site-config'

export function applySiteConfig(cfg) {
  if (!cfg || typeof cfg !== 'object') return
  const q = cfg.quote || {}
  mergeById(quote.types, q.types, [['price', 1e6], ['weeks', 200]])
  mergeById(quote.extras, q.extras, [['price', 1e6], ['weeks', 200]])
  mergeById(quote.complexity, q.complexity, [['mult', 10]])
  mergeById(quote.urgency, q.urgency, [['mult', 10]])
  if (num(q.maintenance?.price, 0, 1e6)) quote.maintenance.price = q.maintenance.price
  if (num(q.spread, 0, 0.5)) quote.spread = q.spread

  if (Array.isArray(cfg.slots)) {
    const ok = cfg.slots.filter((x) => typeof x === 'string' && /^[0-2][0-9]:[0-5][0-9]$/.test(x))
    if (ok.length) booking.slots = [...new Set(ok)].sort()
  }
  if (Array.isArray(cfg.closedWeekdays)) booking.closedWeekdays = cfg.closedWeekdays.filter((d) => Number.isInteger(d) && d >= 0 && d <= 6)
  if (Array.isArray(cfg.blockedDates)) booking.blockedDates = cfg.blockedDates.filter((d) => typeof d === 'string' && /^20\d\d-\d\d-\d\d$/.test(d))

  if (Array.isArray(cfg.packages)) {
    for (const o of cfg.packages) {
      const p = packages.find((x) => x.id === o?.id)
      if (!p) continue
      const name = str(o.name, 60), tag = str(o.tag, 30), text = str(o.text, 200)
      if (name) p.name = name
      if (tag) p.tag = tag
      if (text) p.text = text
      if (Array.isArray(o.items)) {
        const items = o.items.map((i) => str(i, 90)).filter(Boolean).slice(0, 8)
        if (items.length) p.items = items
      }
      if (quote.types.some((t) => t.id === o.quote)) p.quote = o.quote
    }
    const feat = cfg.packages.find((o) => o?.featured === true && packages.some((p) => p.id === o.id))
    if (feat) packages.forEach((p) => { p.featured = p.id === feat.id })
  }
  syncPackagePrices()
}

export function applyCachedSiteConfig() {
  try { applySiteConfig(JSON.parse(localStorage.getItem(SITE_KEY))) } catch { /* sin caché */ }
}
