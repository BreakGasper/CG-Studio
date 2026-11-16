// Contenido del sitio. Textos de ejemplo: reemplazar por información real antes de publicar.
// Los proyectos reales (GitHub) viven en ./projects.js
import { projects } from './projects'

export const navItems = [
  { id: 'home', label: 'Inicio', n: '01' },
  { id: 'about', label: 'Nosotros', n: '02' },
  { id: 'work', label: 'Proyectos', n: '03' },
  { id: 'services', label: 'Servicios', n: '04' },
  { id: 'method', label: 'Método', n: '05' },
  { id: 'contact', label: 'Contacto', n: '06' },
]

export const dockItems = [
  { id: 'home', icon: '⌂', title: 'Inicio' },
  { id: 'about', icon: '◉', title: 'Nosotros' },
  { id: 'work', icon: '▣', title: 'Proyectos' },
  { id: 'services', icon: '✦', title: 'Servicios' },
  { id: 'tech', icon: '◈', title: 'Stack' },
  { id: 'method', icon: '≡', title: 'Método' },
  { id: 'contact', icon: '➤', title: 'Contacto' },
]

export const themes = [
  { id: 'dark', color: '#14c8d8' },
  { id: 'light', color: '#f2f5f8' },
  { id: 'lavender', color: '#a78bfa' },
  { id: 'ocean', color: '#22c7ea' },
]

export const typedWords = ['Developers', 'Builders de IA', 'Ingenieros', 'Automatizadores']

export const mascotMessages = [
  '¡Hola! Soy la mascota de CG Studio. ¿Te muestro nuestras demos?',
  'Automatizo lo repetitivo para que tú crees.',
  'Psst: el menú completo está arriba a la derecha.',
  '¿Tienes una idea? Hablemos.',
]

export const stats = [
  { to: 8, suffix: '+', label: 'Años de experiencia' },
  { to: projects.length, suffix: '', label: 'Proyectos en el portafolio' },
  { to: 12, suffix: '', label: 'Demos en vivo' },
]

export const clients = ['◐ Logoipsum', 'Logoipsum', '◑ Logoipsum', 'Logoipsum']

export const timeline = [
  { when: '2024 — Hoy', title: 'Plataformas con IA', text: 'Agentes, automatizaciones y APIs en producción.' },
  { when: '2021 — 2024', title: 'Producto y plataformas web', text: 'SaaS, paneles y e-commerce a medida.' },
  { when: '2018 — 2021', title: 'Ingeniería digital', text: 'Integraciones y desarrollo para empresas.' },
]

export const awards = [
  { name: 'Mejor plataforma', note: 'Ejemplo · 2025' },
  { name: 'Innovación en IA', note: 'Ejemplo · 2024' },
  { name: 'Sitio del mes', note: 'Ejemplo · 2023' },
  { name: 'Mención especial', note: 'Ejemplo · 2022' },
]

export const services = [
  { n: '01', title: 'Software y plataformas', items: ['Apps web a medida', 'SaaS y paneles', 'E-commerce'], text: 'Productos rápidos y listos para crecer.' },
  { n: '02', title: 'IA y automatización', items: ['Agentes y chatbots', 'Flujos automáticos', 'Integraciones'], text: 'Ahorra horas de trabajo repetitivo.' },
  { n: '03', title: 'APIs e ingeniería', items: ['Diseño de APIs', 'Backend escalable', 'Cloud y DevOps'], text: 'Bases sólidas para tu negocio.' },
]

export const techStack = [
  { name: 'Next.js / React', area: 'Frontend', pct: 95 },
  { name: 'Node / Python', area: 'Backend y APIs', pct: 92 },
  { name: 'LLMs y agentes', area: 'Inteligencia artificial', pct: 88 },
  { name: 'n8n', area: 'Automatización', pct: 90 },
]

export const steps = [
  { n: 1, title: 'Descubrir', text: 'Entendemos tu negocio y tus usuarios.' },
  { n: 2, title: 'Construir', text: 'Ciclos cortos con demos semanales.' },
  { n: 3, title: 'Lanzar', text: 'Despliegue, medición y soporte.' },
]

export const testimonials = [
  { quote: 'Entregaron rápido, moderno y fácil de mantener.', name: 'Daniel R.', role: 'Head of Product' },
  { quote: 'Automatizaron procesos que nos tomaban días.', name: 'Sofía L.', role: 'Co-Founder' },
  { quote: 'Calidad técnica sobresaliente de principio a fin.', name: 'Marco T.', role: 'CTO' },
]

export const contactEmail = 'hola@cgstudio.dev'
