/* ================================================================
   DATOS DE LA INVITACIÓN
   Todo el texto de la página sale de aquí. Cambia solo los valores
   entre comillas. Para ocultar una sección pon  activo: false
   ================================================================ */
window.INVITACION = {
  // Firebase (desactivado en la demostración).
  firebase: {},

  novios: {
    nombre1: 'Daniel',
    nombre2: 'Valeria',
  },

  titulo: 'Nuestra Boda',

  // Fecha y hora de inicio (la cuenta regresiva apunta aquí).
  // fecha: AAAA-MM-DD   hora: HH:MM (24 h)   zona: -06:00 = Jalisco
  evento: {
    fecha: '2027-06-19',
    hora: '16:00',
    zonaHoraria: '-06:00',
  },

  // Canción de fondo: Virlán García - MMXX's (solo instrumental, sin voz, volumen -5 dB)
  musica: {
    activo: true,
    archivo: '',
  },

  portada: {
    foto: 'img/portada.jpg', // foto en el cuadrito (polaroid) junto al sobre
    blancoYNegro: true,
    // Texto arriba de la cuenta regresiva
    leyenda: 'Tenemos el honor de invitarte a nuestra boda',
    cita: 'Así que ya no son dos, sino una sola carne.\nPor lo tanto, lo que Dios ha unido, que no lo separe nadie.',
    referencia: 'Mateo 19:6',
  },

  // Invitación general (enlace sin ?p=): cualquiera confirma escribiendo su nombre
  general: {
    activo: false, // confirmación solo por familia (enlace personal)
    maxPersonas: 6, // máximo de personas por respuesta
  },

  pase: {
    activo: true,
    titulo: 'Estás cordialmente invitado',
  },

  historia: {
    activo: true,
    foto: 'img/historia-puente.jpg', // a color, con marco vintage: los novios de la mano en el puente
    cita: 'Entre tantos caminos en el mundo,\nel mejor siempre fue encontrarnos.',
    texto: '',
  },

  padres: {
    activo: true,
    titulo: 'Con la bendición de nuestros padres',
    grupos: [
      { etiqueta: 'Padres de la novia', nombres: ['Ricardo Soto Vega', '&', 'Elena Campos Luna'] },
      { etiqueta: 'Padres del novio', nombres: ['Laura Ríos Medina', '&', 'Jorge Aguilar Ortiz'] },
    ],
  },

  padrinos: {
    activo: true,
    titulo: 'Padrinos de velación',
    grupos: [
      { etiqueta: '', nombres: ['Patricia Herrera Cruz', '&', 'Sergio Navarro Ibarra'] },
    ],
  },

  frase: 'Acompáñanos a dar\nel "Sí" y luego\na celebrar nuestro amor',

  // ilustracion: 'iglesia' | 'recepcion' | 'civil'
  eventos: [
    {
      activo: true,
      titulo: 'Ceremonia religiosa',
      ilustracion: 'iglesia',
      hora: '16:00',
      lugar: 'Parroquia San José',
      direccion: 'Calle Ejemplo 123, Centro,\nCiudad Ejemplo, Jal.',
      mapa: '#',
    },
    {
      activo: true,
      titulo: 'Recepción',
      ilustracion: 'recepcion',
      hora: '18:30',
      lugar: 'Salón Jardín Aurora',
      direccion: 'Referencia: Carretera a Ejemplo km 5.\nCiudad Ejemplo, Jal.',
      mapa: '#',
    },
  ],

  // icono: iglesia | camara | arco | mesa | copas | baile | musica | luna
  itinerario: {
    activo: true,
    titulo: 'Itinerario',
    items: [
      { hora: '4:00 PM', texto: 'Ceremonia', icono: 'iglesia' },
      { texto: 'Fotos', icono: 'camara' },
      { hora: '6:30 PM', texto: 'Recepción', icono: 'arco' },
      { texto: 'Cena y\nbanquete', icono: 'mesa' },
      { texto: 'Fotos', icono: 'camara' },
      { texto: 'Brindis', icono: 'copas' },
      { texto: 'Baile\nVals', icono: 'baile' },
      { texto: 'Música', icono: 'musica' },
      { texto: 'Fin de la\ncelebración', icono: 'luna' },
    ],
  },

  vestimenta: {
    activo: true,
    titulo: 'Código de vestimenta',
    tipo: 'Casual / formal',
    descripcion: '',
    coloresTitulo: 'Colorimetría sugerida:',
    colores: [
      { nombre: 'Chocolate', color: '#4b2a1f' },
      { nombre: 'Café moka', color: '#7b4a32' },
      { nombre: 'Terracota', color: '#a6452a' },
      { nombre: 'Naranja quemado', color: '#c0621f' },
      { nombre: 'Mostaza', color: '#c99a2e' },
      { nombre: 'Rosa', color: '#c9577a' },
      { nombre: 'Vino', color: '#7a1f2e' },
      { nombre: 'Ciruela', color: '#5b2352' },
      { nombre: 'Azul marino', color: '#1d2f4f' },
      { nombre: 'Azul petróleo', color: '#0e5a5f' },
      { nombre: 'Verde esmeralda', color: '#1e5b3c' },
      { nombre: 'Verde olivo', color: '#7f9152' },
      { nombre: 'Gris oxford', color: '#55585e' },
      { nombre: 'Negro', color: '#1b1b1b' },
    ],
    nota: 'Color blanco, beige y crema son exclusivos para la novia',
  },

  // PENDIENTE: fotos
  galeria: {
    activo: true,
    titulo: 'Nuestros momentos',
    fotos: ['img/galeria-cargada-2.jpg', 'img/galeria-atardecer-3.jpg', 'img/galeria-baile.jpg'],
  },

  regalos: {
    activo: true,
    titulo: 'Mesa de regalos',
    texto: 'Tu presencia es nuestro mejor regalo.\nSi deseas obsequiarnos algo para nuestro nuevo hogar,\nelige un regalo en cualquiera de nuestras mesas:',
    pasos: 'Elige el regalo, cómpralo en línea y llega directo a nosotros.',
    mesas: [
      {
        tienda: 'Amazon',
        logo: 'img/logo-amazon.png',
        detalle: 'Lista de bodas de Daniel & Valeria',
        url: '#',
      },
      {
        tienda: 'Liverpool',
        logo: 'img/logo-liverpool.png',
        detalle: 'Número de evento: 00000000',
        url: '#',
      },
    ],
    transferencia: {
      activo: false,
      banco: '',
      titular: '',
      clabe: '',
    },
    sobres: 'Si lo prefieres, también puedes darnos\ntu obsequio el día de la boda.',
  },

  // Hoteles cercanos, separados por lugar
  hoteles: {
    activo: true,
    titulo: 'Hoteles cercanos',
    texto: 'Si vienes de fuera, estas son algunas opciones\npara hospedarte cerca de la celebración.',
    grupos: [
      {
        lugar: 'Zona Norte',
        items: [
          { nombre: 'Hotel Ejemplo Norte', mapa: '#' },
          { nombre: 'Hotel Ejemplo Plaza', mapa: '#' },
          { nombre: 'Hotel Ejemplo Casa', mapa: '#' },
        ],
      },
      {
        lugar: 'Zona Centro',
        items: [
          { nombre: 'Hotel Ejemplo Centro', mapa: '#' },
          { nombre: 'Hospedaje Ejemplo', mapa: '#' },
          { nombre: 'Hotel Ejemplo Posada', mapa: '#' },
        ],
      },
    ],
  },

  // PENDIENTE
  instagram: {
    activo: false,
    hashtag: '',
    foto: 'img/foto-ejemplo.svg',
    texto: '¡Súmate a la fiesta!\nComparte tus recuerdos\nde ese día usando nuestro Hashtag',
  },

  // PENDIENTE
  video: {
    activo: false,
    titulo: 'Nuestra Historia',
    url: '',
    foto: 'img/foto-ejemplo.svg',
  },

  fotoFinal: {
    activo: true,
    foto: 'img/foto-final.jpg', // foto vertical de los novios frente a la capilla
  },

  confirmacion: {
    titulo: 'Confirmar Asistencia',
    texto: 'Celebrar nuestro amor es\nun sueño hecho realidad y\nnos encantaría contar contigo.',
    fechaLimite: '2027-05-30', // 20 días antes de la boda
    // URL de Google Apps Script (ver LEEME.md). Vacío = modo prueba.
    // true = cada confirmación llega a Netlify (Forms) y te avisa por correo.
    netlifyForms: false,
    // Google Sheets (se activa cuando la hoja tenga la pestaña "Invitados" con datos):
    // https://script.google.com/macros/s/AKfycbwc8JB-o3cKrVBtHjQFdVtvhy0-Zpl4g822rKfv-7f7DMnG8YctjnIexT2y31aC9QvMDw/exec
    googleScriptUrl: '',
  },

  contacto: {
    activo: true,
    titulo: 'Contacto',
    texto: 'Para cualquier duda sobre\nhorarios, ubicación o accesos,\nescríbenos por WhatsApp.',
    whatsapp: '520000000000',
    etiqueta: 'WhatsApp',
    mensaje: 'Hola, tengo una duda sobre la boda de Daniel y Valeria',
  },

  pie: {
    foto: 'img/pie-manos-2.jpg', // manos con el anillo (horizontal) con máscara negra para el texto
    frase: '¡Te esperamos!',
  },
};
