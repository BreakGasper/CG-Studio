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

// Misión y visión (texto propuesto: ajústalo a tu estilo).
export const missionVision = [
  {
    id: 'mision',
    label: 'Misión',
    text: 'Crear software, plataformas y soluciones de inteligencia artificial confiables y escalables que ayuden a las empresas a automatizar su operación y crecer, con un equipo técnico bien liderado, buenas prácticas y entregas a tiempo.',
  },
  {
    id: 'vision',
    label: 'Visión',
    text: 'Ser un estudio de ingeniería digital de referencia en Latinoamérica, reconocido por la calidad de su código, la innovación con IA y la confianza de sus clientes a largo plazo.',
  },
]

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
  { n: '04', title: 'Liderazgo técnico', items: ['Gestión de equipos de programadores', 'Mantenimiento de servidores', 'Publicaciones y despliegues'], text: 'Un líder técnico que guía al equipo, cuida la operación y entrega a tiempo.' },
]

// Tecnologías y herramientas (tomadas del CV).
export const techGroups = [
  {
    title: 'Desarrollo móvil',
    items: ['Android Studio (Java, Kotlin)', 'Flutter (Dart)', 'Firebase (Auth, Firestore, Storage, FCM, Crashlytics)', 'SQLite / SQL Server / Room', 'SharedPreferences', 'MVVM · MVC · Clean Architecture', 'Retrofit · Dio · HTTP · APIs REST', 'JSON · XML · Material Design', 'Navigation Component', 'Coroutines · Hilt · Dagger · WorkManager', 'Google Maps SDK'],
  },
  {
    title: 'Desarrollo web',
    items: ['HTML5 · CSS3', 'JavaScript · TypeScript', 'Vue 3 (Composition API, Pinia, Vue Router, Vite)', 'Vuetify · PrimeVue · Axios · Bootstrap', 'PHP', 'MySQL / SQL Server', 'APIs REST y AWS', 'JWT Authentication', 'Formularios reactivos y validaciones', 'Diseño responsive · Arquitectura SPA'],
  },
  {
    title: 'Inteligencia artificial',
    items: ['Modelos de lenguaje (LLMs)', 'Ingeniería de prompts', 'Agentes de IA y uso de herramientas', 'Chatbots y asistentes virtuales', 'Integración de APIs de IA', 'RAG: IA con datos propios', 'Automatización de flujos con IA (n8n)', 'MCP y conexión con sistemas', 'Programación asistida por IA', 'Buenas prácticas y seguridad de datos'],
  },
  {
    title: 'SAP ABAP',
    items: ['Desarrollo en SAP ABAP', 'ABAP orientado a objetos', 'OData Services', 'SmartForms', 'CDS Views', 'SAP Gateway', 'Integración SAP Fiori', 'ALV Grid y ALV Reports', 'Reportes clásicos', 'Functions y Forms', 'BAPI'],
  },
  {
    title: 'SQL Server',
    items: ['SQL Server Management Studio', 'Stored Procedures', 'Views', 'Functions', 'Optimización de consultas', 'Diseño de bases de datos relacionales'],
  },
  {
    title: 'AWS',
    items: ['AWS S3', 'AWS Lambda', 'AWS API Gateway'],
  },
  {
    title: 'Liderazgo técnico',
    items: [
      'Gestión y coordinación de programadores',
      'Asignación de tareas y planeación de sprints',
      'Revisión de código (code review)',
      'Mentoría y capacitación del equipo',
      'Estimación de tiempos y alcance',
      'Definición de arquitectura y estándares',
      'Mantenimiento y monitoreo de servidores',
      'Publicaciones en Google Play y App Store',
      'Despliegues a producción y control de versiones',
      'Respaldos, seguridad y control de accesos',
      'Atención de incidentes y soporte',
      'Documentación técnica',
      'Comunicación con clientes y áreas de negocio',
    ],
  },
  {
    title: 'Otras herramientas',
    items: ['Postman', 'Visual Studio Code', 'Git', 'GitLab', 'Apache', 'Microsoft Office', 'Photoshop', 'Depuración y optimización de código'],
  },
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
