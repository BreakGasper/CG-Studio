// Contenido del sitio. Textos de ejemplo: reemplazar por información real antes de publicar.

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
  { to: 40, suffix: '+', label: 'Proyectos entregados' },
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

export const projectFilters = [
  { id: 'all', label: 'Todos' },
  { id: 'ia', label: 'IA' },
  { id: 'web', label: 'Plataformas' },
  { id: 'api', label: 'APIs' },
]

export const projects = [
  { title: 'Agente de ventas IA', cat: 'ia', from: '#0f766e', to: '#14b8a6', desc: 'Chatbot que califica leads 24/7', tags: ['IA', 'n8n'], isNew: true },
  { title: 'Panel SaaS', cat: 'web', from: '#1e293b', to: '#475569', desc: 'Dashboard en tiempo real', tags: ['Next.js', 'Postgres'], isNew: false },
  { title: 'API de pagos', cat: 'api', from: '#4c1d95', to: '#8b5cf6', desc: 'Backend con webhooks', tags: ['Node', 'REST'], isNew: false },
  { title: 'Automatización CRM', cat: 'ia', from: '#9a3412', to: '#f97316', desc: 'Sincroniza tu CRM solo', tags: ['Automatización'], isNew: true },
  { title: 'E-commerce a medida', cat: 'web', from: '#14532d', to: '#22c55e', desc: 'Tienda con checkout propio', tags: ['Next.js', 'Stripe'], isNew: false },
  { title: 'Gateway de datos', cat: 'api', from: '#0c4a6e', to: '#0ea5e9', desc: 'Integra sistemas legados', tags: ['Python', 'GraphQL'], isNew: false },
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
