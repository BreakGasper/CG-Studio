import { ref, onMounted, onBeforeUnmount } from 'vue'

// Devuelve el id de la sección visible, para resaltar el icono activo del dock.
export function useScrollSpy(ids) {
  const active = ref(ids[0])
  let io

  onMounted(() => {
    io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) active.value = e.target.id }),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
  })
  onBeforeUnmount(() => io?.disconnect())

  return active
}
