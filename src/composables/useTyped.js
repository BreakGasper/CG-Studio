import { ref, onMounted, onBeforeUnmount } from 'vue'

// Efecto de escritura: escribe y borra cada palabra de la lista en bucle.
export function useTyped(words, prefix = '') {
  const text = ref(prefix + words[0])
  let wi = 0
  let ci = words[0].length
  let deleting = true
  let timer

  onMounted(() => {
    timer = setInterval(() => {
      if (deleting) {
        ci--
        if (ci <= 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0 }
      } else {
        ci++
        if (ci >= words[wi].length) deleting = true
      }
      text.value = prefix + words[wi].slice(0, ci)
    }, 110)
  })
  onBeforeUnmount(() => clearInterval(timer))

  return text
}
