// Directiva v-in-view="callback": ejecuta el callback una sola vez cuando el elemento entra en pantalla.
export const vInView = {
  mounted(el, binding) {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        binding.value()
        io.disconnect()
      }
    })
    io.observe(el)
    el._io = io
  },
  unmounted(el) {
    el._io?.disconnect()
  },
}
