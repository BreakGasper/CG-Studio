// Contenido del sitio. Textos de ejemplo: reemplazar por información real antes de publicar.
// Los proyectos reales (GitHub) viven en ./projects.js
import { projects } from './projects'

export const navItems = [
  { id: 'home', label: 'Inicio', n: '01' },
  { id: 'about', label: 'Nosotros', n: '02' },
  { id: 'work', label: 'Proyectos', n: '03' },
  { id: 'services', label: 'Servicios', n: '04' },
  { id: 'method', label: 'Método', n: '05' },
  { id: 'book', label: 'Agenda y cotiza', n: '06' },
  { id: 'contact', label: 'Contacto', n: '07' },
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

export const clients = ['Supollo Comercial', 'Bar Fortin', 'Anonimus Pizzas', 'Mr Novedades', 'Lic. Monserrat Ruelas']

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
  { when: '2025 — Hoy', title: 'Líder técnico', text: 'Equipo de 8 programadores, servidores y publicaciones. Crustore, Sanara y Mi Invitación en producción.' },
  { when: '2022 — 2025', title: 'Desarrollo Android senior', text: 'Apps nativas con Kotlin, MVVM y Clean Architecture, publicadas en Google Play. Anonimus Pizza y GEC · Calidad.' },
  { when: '2020 — 2022', title: 'Calidad e inventarios', text: 'Sistema de gestión de calidad con Firebase e inventarios con SQLite.' },
  { when: '2018 — 2019', title: 'Primeros proyectos', text: 'Punto de venta en Android con módulos de ventas, productos y reportes.' },
]

export const awards = [
  { name: 'Ingeniería en Sistemas Computacionales', note: '2017 — 2022' },
  { name: 'Inspector de Calidad (certificado)', note: '2020' },
  { name: `${projects.length} proyectos desplegados`, note: 'Hasta hoy' },
  { name: '8 programadores al mando', note: 'Desde 2025' },
  { name: 'Más de 6 años de experiencia', note: 'Desde 2018' },
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

export const contactEmail = 'breakgasper@gmail.com'

// ---- Agenda y cotizador ------------------------------------------------
// Precios y plazos de EJEMPLO: ajústalos a tus tarifas reales.
export const booking = {
  currency: 'USD',
  whatsapp: '', // ej. '5215512345678' (código de país + número). Vacío = solo correo.
  slots: ['09:00', '10:00', '11:00', '12:00', '13:00', '16:00', '17:00', '18:00'],
  topics: ['Proyecto nuevo', 'Cotización', 'Asesoría técnica', 'Soporte / mantenimiento', 'Inteligencia artificial'],
}

export const quote = {
  types: [
    { id: 'web', label: 'Sitio web', price: 800, weeks: 2 },
    { id: 'app', label: 'App móvil', price: 2500, weeks: 6 },
    { id: 'platform', label: 'Plataforma / sistema web', price: 3500, weeks: 8 },
    { id: 'api', label: 'API / backend', price: 1500, weeks: 3 },
    { id: 'ai', label: 'IA y automatización', price: 1800, weeks: 4 },
  ],
  extras: [
    { id: 'admin', label: 'Panel de administración', price: 600, weeks: 1 },
    { id: 'design', label: 'Diseño UI/UX', price: 500, weeks: 1 },
    { id: 'pay', label: 'Pagos en línea', price: 400, weeks: 1 },
    { id: 'agents', label: 'Agentes / integración IA', price: 900, weeks: 2 },
    { id: 'deploy', label: 'Hosting y despliegue', price: 200, weeks: 0 },
  ],
  complexity: [
    { id: 'low', label: 'Básica', mult: 1 },
    { id: 'mid', label: 'Media', mult: 1.4 },
    { id: 'high', label: 'Alta', mult: 2 },
  ],
  urgency: [
    { id: 'normal', label: 'Normal', mult: 1 },
    { id: 'fast', label: 'Prioritaria', mult: 1.25 },
  ],
  maintenance: { label: 'Mantenimiento mensual', price: 150 },
  spread: 0.15, // rango ± sobre el estimado
}

// Preguntas frecuentes (texto propuesto: ajusta plazos y condiciones a tu forma de trabajar).
export const faqs = [
  { q: '¿Cuánto cuesta un proyecto?', a: 'Depende del alcance. Un sitio web puede empezar desde unos cientos de dólares y una app o plataforma desde unos miles. Usa el cotizador de esta página para obtener un rango en minutos; la cifra final se confirma tras revisar el alcance.' },
  { q: '¿Cuánto tarda en estar listo?', a: 'Un sitio web suele tomar de 2 a 3 semanas, una API o automatización de 3 a 4, y una app móvil o plataforma de 6 a 8. Los plazos cambian según la complejidad y qué tan rápido recibamos contenido y aprobaciones.' },
  { q: '¿Qué tecnologías usan?', a: 'Android (Kotlin/Java), Flutter, Vue 3, Firebase, AWS, SQL Server, SAP ABAP e inteligencia artificial. Elegimos la herramienta que mejor resuelve tu caso, no la que esté de moda.' },
  { q: '¿Pueden integrar inteligencia artificial en mi negocio?', a: 'Sí. Creamos agentes, automatizaciones y asistentes conectados a tus sistemas para ahorrar tareas repetitivas, siempre empezando por un caso pequeño y medible.' },
  { q: '¿Publican la app y se encargan del hosting?', a: 'Sí. Nos encargamos de la publicación en Google Play, el despliegue web y la configuración de servidores, y podemos darle mantenimiento mensual después del lanzamiento.' },
  { q: '¿Cómo trabajan y cómo me mantienen informado?', a: 'Dividimos el proyecto en entregas cortas, con una cita inicial para definir el alcance y avances que puedes probar. Tienes un líder técnico como punto de contacto.' },
  { q: '¿Puedo ver ejemplos de su trabajo?', a: 'Sí, en la sección de proyectos. Algunos tienen vista previa en vivo; los marcados como privados pertenecen a clientes y no se muestran públicamente.' },
  { q: '¿Cómo empiezo?', a: 'Agenda una cita en esta página o escríbenos por correo. Platicamos tu idea y te enviamos una propuesta.' },
]

// Paquetes: los precios "desde" salen del cotizador (valores de ejemplo, ajústalos).
const priceOf = (id) => quote.types.find((t) => t.id === id)
export const packages = [
  {
    id: 'web', name: 'Sitio web', tag: 'Para empezar', from: priceOf('web').price, weeks: priceOf('web').weeks,
    text: 'Presencia profesional, rápida y lista para crecer.',
    items: ['Diseño responsive a medida', 'Hasta 5 secciones', 'Formulario de contacto', 'Hosting y despliegue', 'SEO básico'],
  },
  {
    id: 'app', name: 'App móvil', tag: 'Más pedido', from: priceOf('app').price, weeks: priceOf('app').weeks, featured: true,
    text: 'Aplicación Android o Flutter publicada en Google Play.',
    items: ['Android (Kotlin) o Flutter', 'Firebase y APIs REST', 'Diseño UI/UX', 'Publicación en Google Play', 'Mantenimiento opcional'],
  },
  {
    id: 'ai', name: 'Plataforma con IA', tag: 'A la medida', from: priceOf('platform').price, weeks: priceOf('platform').weeks,
    text: 'Sistema web con panel, automatización y agentes de IA.',
    items: ['Panel de administración', 'APIs y base de datos', 'Agentes y automatizaciones con IA', 'Pagos en línea', 'Líder técnico dedicado'],
  },
]

// Áreas de experiencia (texto propuesto a partir de tus proyectos: ajústalo).
export const experience = [
  { id: 'health', title: 'Salud', text: 'Registro de pacientes, citas y seguimiento para clínicas y personal de enfermería.', tags: ['Expedientes', 'Citas', 'Reportes'], icon: 'M12 21s-7-4.5-9.3-9A5.2 5.2 0 0 1 12 6a5.2 5.2 0 0 1 9.3 6c-2.3 4.5-9.3 9-9.3 9zM12 9v6M9 12h6' },
  { id: 'commerce', title: 'Comercio y punto de venta', text: 'Tiendas en línea, marketplaces y puntos de venta con ventas, productos y reportes.', tags: ['Punto de venta', 'Catálogo', 'Reportes'], icon: 'M3 4h2l2.4 11h10.2L20 7H6M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM17 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z' },
  { id: 'inventory', title: 'Inventarios', text: 'Control de existencias, entradas y salidas, y almacén, también sin conexión.', tags: ['Existencias', 'SQLite', 'Offline'], icon: 'M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8' },
  { id: 'credit', title: 'Cobranza y créditos', text: 'Herramientas para dar seguimiento a créditos, pagos y cartera de clientes.', tags: ['Cartera', 'Pagos', 'Recordatorios'], icon: 'M3 6h18v12H3zM3 10h18M7 15h3' },
  { id: 'cards', title: 'Pagos con tarjeta', text: 'Cobros en línea y en la app con pasarelas de pago, conciliación y comprobantes.', tags: ['Pasarelas', 'Cobros', 'Seguridad'], icon: 'M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zM2 10h20M6 15h4' },
  { id: 'quality', title: 'Calidad y operación', text: 'Sistemas de gestión de calidad, inspecciones y procesos internos con evidencia.', tags: ['Inspecciones', 'Firebase', 'Auditoría'], icon: 'M9 12l2 2 4-4M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z' },
  { id: 'food', title: 'Restaurantes y pedidos', text: 'Menús, pedidos y atención para restaurantes, bares y negocios de comida.', tags: ['Pedidos', 'Menú', 'Móvil'], icon: 'M6 3v8a2 2 0 0 0 2 2v8M10 3v6M6 7h4M17 3c-2 2-2 6 0 8v10' },
  { id: 'events', title: 'Eventos e invitaciones', text: 'Invitaciones digitales con confirmación de asistencia y panel para organizar mesas y gastos.', tags: ['RSVP', 'Panel', 'Presupuesto'], icon: 'M3 7h18v13H3zM3 7l9 7 9-7M12 3v4' },
]

// Panel lateral: mensaje según la sección visible y datos que rotan.
export const sectionSays = {
  home: '¡Bienvenido! Soy la mascota de CG Studio.',
  about: 'Esta es nuestra trayectoria.',
  mission: 'Esto es lo que nos mueve.',
  work: 'Mira nuestros proyectos. ¡Prueba los Preview!',
  services: 'Esto es lo que hacemos.',
  experience: 'Hemos desarrollado en muchos sectores.',
  packages: 'Elige cómo empezar.',
  tech: 'Estas son nuestras herramientas.',
  method: 'Así trabajamos, paso a paso.',
  faq: '¿Dudas? Aquí las resolvemos.',
  book: 'Agenda tu cita o cotiza aquí.',
  contact: '¡Hablemos de tu proyecto!',
}

export const sideFacts = [
  { n: '8', l: 'programadores al mando' },
  { n: String(projects.length), l: 'proyectos desplegados' },
  { n: '6+', l: 'años de experiencia' },
  { n: 'IA', l: 'Android · Flutter · Vue · SAP' },
]
