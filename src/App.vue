<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { loadTheme, goToSection, isMobileMode } from './composables/useUi'
import { applySiteConfig, applyCachedSiteConfig, SITE_KEY } from './data/siteConfig'
import { loadSiteConfig } from './firebase/store'
import { countVisit, startAnalytics } from './firebase/track'
import CookieNotice from './components/CookieNotice.vue'
import MobileTabs from './components/MobileTabs.vue'
import SvgSprite from './components/SvgSprite.vue'
import OverlayMenu from './components/OverlayMenu.vue'
import SideCard from './components/SideCard.vue'
import DockNav from './components/DockNav.vue'
import MascotWidget from './components/MascotWidget.vue'
import TopBar from './components/TopBar.vue'
import HeroSection from './components/HeroSection.vue'
import ClientsStrip from './components/ClientsStrip.vue'
import AboutSection from './components/AboutSection.vue'
import MissionVision from './components/MissionVision.vue'
import WorkSection from './components/WorkSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import PackagesSection from './components/PackagesSection.vue'
import TechSection from './components/TechSection.vue'
import MethodSection from './components/MethodSection.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import FaqSection from './components/FaqSection.vue'
import BookingSection from './components/BookingSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'

// En móvil, los enlaces internos (#sección) cambian primero a la pestaña que contiene la sección.
function onLink(e) {
  const a = e.target.closest?.('a[href^="#"]')
  if (!a || !isMobileMode()) return
  const id = a.getAttribute('href').slice(1)
  if (!id || !document.getElementById(id)) return
  e.preventDefault()
  goToSection(id)
}
// Precios, paquetes y horarios editables desde el panel: se aplica primero la última copia guardada (sin parpadeo)
// y luego la versión actual de Firestore.
applyCachedSiteConfig()
const idle = (fn) => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 2500 }) : setTimeout(fn, 600))
onMounted(() => {
  idle(() => { countVisit(); startAnalytics() })
  idle(async () => {
    const cfg = await loadSiteConfig()
    if (!cfg) return
    applySiteConfig(cfg)
    try { localStorage.setItem(SITE_KEY, JSON.stringify(cfg)) } catch { /* sin almacenamiento */ }
  })
  loadTheme()
  document.addEventListener('click', onLink)
  if (location.hash.length > 1 && isMobileMode()) goToSection(location.hash.slice(1))
})
onBeforeUnmount(() => document.removeEventListener('click', onLink))
</script>

<template>
  <SvgSprite />
  <OverlayMenu />
  <SideCard />
  <DockNav />
  <MascotWidget />
  <MobileTabs />
  <CookieNotice />
  <main>
    <TopBar />
    <div data-pane="inicio"><HeroSection /></div>
    <div data-pane="inicio"><ClientsStrip /></div>
    <div data-pane="empresa"><AboutSection /></div>
    <div data-pane="empresa"><MissionVision /></div>
    <div data-pane="inicio"><WorkSection /></div>
    <div data-pane="empresa"><ServicesSection /></div>
    <div data-pane="empresa"><ExperienceSection /></div>
    <div data-pane="cotiza"><PackagesSection /></div>
    <div data-pane="empresa"><TechSection /></div>
    <div data-pane="empresa"><MethodSection /></div>
    <div data-pane="empresa"><TestimonialsSection /></div>
    <div data-pane="empresa"><FaqSection /></div>
    <div data-pane="cotiza"><BookingSection /></div>
    <div data-pane="contacto"><ContactSection /></div>
    <SiteFooter />
  </main>
</template>
