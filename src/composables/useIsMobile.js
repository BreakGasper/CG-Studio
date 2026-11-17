import { ref, onMounted, onBeforeUnmount } from 'vue'
import { MOBILE_QUERY } from './useUi'

// true cuando la pantalla es de celular/tableta (el mismo punto de quiebre del diseño).
export function useIsMobile() {
  const mobile = ref(typeof matchMedia !== 'undefined' && matchMedia(MOBILE_QUERY).matches)
  let mq
  const on = (e) => { mobile.value = e.matches }
  onMounted(() => { mq = matchMedia(MOBILE_QUERY); mobile.value = mq.matches; mq.addEventListener('change', on) })
  onBeforeUnmount(() => mq?.removeEventListener('change', on))
  return mobile
}
