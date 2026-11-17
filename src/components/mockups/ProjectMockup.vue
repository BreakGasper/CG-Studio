<script setup>
import { computed } from 'vue'
import PhoneFrame from './PhoneFrame.vue'
import BrowserFrame from './BrowserFrame.vue'
import ScreenShop from './ScreenShop.vue'
import ScreenList from './ScreenList.vue'
import ScreenAuth from './ScreenAuth.vue'
import ScreenFingerprint from './ScreenFingerprint.vue'
import ScreenLocation from './ScreenLocation.vue'
import ScreenReviews from './ScreenReviews.vue'
import ScreenInvite from './ScreenInvite.vue'
import ScreenDashboard from './ScreenDashboard.vue'
import ScreenStore from './ScreenStore.vue'
import ScreenCode from './ScreenCode.vue'
import ScreenImage from './ScreenImage.vue'

const props = defineProps({ project: { type: Object, required: true } })
const m = computed(() => props.project.mock)
const screens = {
  shop: ScreenShop, list: ScreenList, auth: ScreenAuth, fingerprint: ScreenFingerprint,
  location: ScreenLocation, reviews: ScreenReviews, invite: ScreenInvite,
  dashboard: ScreenDashboard, store: ScreenStore, code: ScreenCode, image: ScreenImage,
}
const screen = computed(() => screens[m.value.layout])
const url = computed(() => props.project.id.replace(/-/g, '') + '.app')
</script>

<template>
  <svg class="mock" viewBox="0 0 320 240" role="img" :aria-label="`Mockup de ${project.name}`">
    <defs>
      <linearGradient :id="`bg-${project.id}`" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" :stop-color="m.c1" stop-opacity=".55" />
        <stop offset="1" :stop-color="m.c2" stop-opacity=".9" />
      </linearGradient>
    </defs>
    <rect width="320" height="240" :fill="`url(#bg-${project.id})`" />
    <circle cx="290" cy="30" r="60" fill="#fff" opacity=".06" />
    <circle cx="20" cy="220" r="70" fill="#000" opacity=".1" />
    <PhoneFrame v-if="m.device === 'phone'" :id="project.id"><component :is="screen" :m="m" /></PhoneFrame>
    <BrowserFrame v-else :id="project.id" :dark="m.layout === 'code'" :url="m.layout === 'code' ? 'github.com/BreakGasper' : url"><component :is="screen" :m="m" /></BrowserFrame>
  </svg>
</template>
