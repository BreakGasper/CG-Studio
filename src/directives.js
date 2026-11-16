// v-reveal: añade la clase "in" cuando el elemento entra en pantalla.
export const reveal = {
  mounted(el) {
    el.classList.add('reveal')
    if (!('IntersectionObserver' in window)) { el.classList.add('in'); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      })
    }, { threshold: 0.12 })
    io.observe(el)
  }
}
