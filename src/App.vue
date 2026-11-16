<script setup>
import TheNav from './components/TheNav.vue'
import HeroSection from './components/HeroSection.vue'
import PortfolioSection from './components/PortfolioSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import CustomSection from './components/CustomSection.vue'
import MethodSection from './components/MethodSection.vue'
import BenefitsSection from './components/BenefitsSection.vue'
import ContactSection from './components/ContactSection.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <TheNav />
  <main>
    <HeroSection />
    <PortfolioSection />
    <ServicesSection />
    <CustomSection />
    <MethodSection />
    <BenefitsSection />
    <ContactSection />
  </main>
  <TheFooter />
</template>
