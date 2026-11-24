// Entrada escalonada al hacer scroll (sin tocar el layout: solo opacity + translate).
// Si el navegador reduce el movimiento o no hay IntersectionObserver, no hace nada.
const ITEMS = '.svc,.step,.xp,.mv-card,.faq details,.tst blockquote,.pk,.pkg,.proj-grid .proj,.skill,.tl-item,.award'

export function setupReveal() {
  if (typeof IntersectionObserver === 'undefined' || matchMedia('(prefers-reduced-motion:reduce)').matches) return
  const root = document.documentElement
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue
      const el = e.target
      io.unobserve(el)
      el.classList.add('rv-in')
      // al terminar, se devuelven los estilos originales (hover, transiciones propias)
      setTimeout(() => { el.removeAttribute('data-rv'); el.classList.remove('rv-in'); el.style.removeProperty('--rv-d') }, 900 + (+el.dataset.rvI || 0) * 70)
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
  document.querySelectorAll('main section, [data-pane] > section').forEach((sec) => {
    sec.querySelectorAll(ITEMS).forEach((el, i) => {
      if (el.closest('.car-track')) return
      el.dataset.rv = ''
      el.dataset.rvI = Math.min(i, 5)
      el.style.setProperty('--rv-d', `${Math.min(i, 5) * 70}ms`)
      io.observe(el)
    })
  })
  root.classList.add('js-rv')
}
