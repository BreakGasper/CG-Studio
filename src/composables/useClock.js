import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useClock() {
  const date = ref('')
  const time = ref('')
  let timer

  function tick() {
    const d = new Date()
    date.value = d.toLocaleDateString('es', { weekday: 'short', day: 'numeric', month: 'short' })
    time.value = d.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
  }

  onMounted(() => { tick(); timer = setInterval(tick, 30000) })
  onBeforeUnmount(() => clearInterval(timer))

  return { date, time }
}
