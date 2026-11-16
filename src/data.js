// Contenido editable del sitio. Para añadir un proyecto, agrega un objeto a `proyectos`.
export const contacto = {
  correo: '[correo@dominio]',
  telefono: '[+00 000 000 0000]',
  redes: [
    { nombre: 'LinkedIn', url: '#contacto' },
    { nombre: 'GitHub', url: '#contacto' },
    { nombre: 'Instagram', url: '#contacto' }
  ]
}

export const categorias = [
  'Todos', 'Sistemas empresariales', 'Aplicaciones web', 'Sistemas administrativos',
  'APIs e integraciones', 'Automatización de procesos', 'Aplicaciones móviles'
]

// Proyectos de ejemplo: reemplazar por los reales.
export const proyectos = [
  { id: 'gestion', categoria: 'Sistemas empresariales', nombre: 'Sistema de gestión integral', tamano: 'grande', mockup: 'dashboard',
    problema: 'Información dispersa en hojas de cálculo y decisiones tardías.',
    funciones: 'Inventario, ventas, reportes en vivo y roles de usuario.', tecnologias: ['Vue', 'Node', 'Firebase'] },
  { id: 'campo', categoria: 'Aplicaciones móviles', nombre: 'App de trabajo en campo', tamano: 'medio', mockup: 'phone',
    problema: 'Reportes en papel que llegaban un día tarde.',
    funciones: 'Registro offline, fotos y sincronización.', tecnologias: ['Flutter', 'Firestore'] },
  { id: 'hub', categoria: 'APIs e integraciones', nombre: 'Hub de integraciones', tamano: 'medio', mockup: 'api',
    problema: 'Sistemas que no se hablaban entre sí.',
    funciones: 'Endpoints REST, webhooks y monitoreo.', tecnologias: ['REST', 'Functions'] },
  { id: 'factura', categoria: 'Automatización de procesos', nombre: 'Facturación automática', tamano: 'medio', mockup: 'flow',
    problema: 'Horas de captura manual cada cierre.',
    funciones: 'Lectura de documentos con IA y emisión automática.', tecnologias: ['Python', 'IA'] },
  { id: 'panel', categoria: 'Sistemas administrativos', nombre: 'Panel de control interno', tamano: 'medio', mockup: 'table',
    problema: 'Procesos sin trazabilidad ni permisos.',
    funciones: 'Bitácora, aprobaciones y control de acceso.', tecnologias: ['Auth', 'SQL'] },
  { id: 'reservas', categoria: 'Aplicaciones web', nombre: 'Plataforma de reservas', tamano: 'medio', mockup: 'calendar',
    problema: 'Agenda manual con citas duplicadas.',
    funciones: 'Calendario, recordatorios y pagos en línea.', tecnologias: ['Vue', 'Firebase'] }
]

export const servicios = [
  { titulo: 'Software a medida', texto: 'Aplicaciones diseñadas alrededor de tu forma de trabajar, no al revés.' },
  { titulo: 'Sistemas empresariales', texto: 'Gestión, inventarios, ventas y reportes en una sola plataforma.' },
  { titulo: 'Desarrollo web', texto: 'Sitios y aplicaciones rápidas, accesibles y listas para crecer.' },
  { titulo: 'APIs e integraciones', texto: 'Conectamos tus sistemas, pagos y servicios de terceros.' },
  { titulo: 'Automatización', texto: 'Eliminamos tareas repetitivas con flujos e inteligencia artificial.' },
  { titulo: 'Consultoría tecnológica', texto: 'Definimos arquitectura, prioridades y ruta antes de escribir código.' },
  { titulo: 'Soporte y mantenimiento', texto: 'Monitoreo, mejoras y acompañamiento después del lanzamiento.' }
]

export const etapas = [
  { titulo: 'Descubrimiento y análisis', texto: 'Entendemos el negocio, los usuarios y los procesos que hay que resolver.' },
  { titulo: 'Diseño y planificación', texto: 'Prototipos, arquitectura y un plan con entregas definidas.' },
  { titulo: 'Desarrollo y pruebas', texto: 'Construcción por ciclos cortos, con revisiones y pruebas continuas.' },
  { titulo: 'Implementación y acompañamiento', texto: 'Puesta en marcha, capacitación y soporte para que el sistema no se quede solo.' }
]

export const beneficios = [
  { titulo: 'Soluciones personalizadas', texto: 'Cada sistema nace de tus procesos, sin plantillas forzadas.' },
  { titulo: 'Innovación tecnológica', texto: 'Herramientas modernas, incluida IA, aplicadas donde aportan valor.' },
  { titulo: 'Calidad y seguridad', texto: 'Pruebas, control de acceso y buenas prácticas desde el primer día.' },
  { titulo: 'Automatización', texto: 'Menos trabajo manual, menos errores, más tiempo para el negocio.' },
  { titulo: 'Escalabilidad', texto: 'Arquitectura lista para crecer en usuarios, datos y funciones.' },
  { titulo: 'Acompañamiento técnico', texto: 'Hablas con quien construye tu sistema, antes y después del lanzamiento.' }
]
