<script setup>
import { onMounted } from 'vue'
import { loadTheme } from './composables/useUi'
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
import MascotSection from './components/MascotSection.vue'
import WorkSection from './components/WorkSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import TechSection from './components/TechSection.vue'
import MethodSection from './components/MethodSection.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import BookingSection from './components/BookingSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'

onMounted(loadTheme)
</script>

<template>
  <SvgSprite />
  <OverlayMenu />
  <SideCard />
  <DockNav />
  <MascotWidget />
  <main>
    <TopBar />
    <HeroSection />
    <ClientsStrip />
    <AboutSection />
    <MissionVision />
    <MascotSection />
    <WorkSection />
    <ServicesSection />
    <TechSection />
    <MethodSection />
    <TestimonialsSection />
    <BookingSection />
    <ContactSection />
    <SiteFooter />
  </main>
</template>
