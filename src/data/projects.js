// Proyectos reales tomados de los repositorios de GitHub (BreakGasper).
// Los repos privados no muestran enlace. Los forks no se incluyen.

// Muestra u oculta los enlaces "Ver código" / "Repositorio privado" en las tarjetas.
export const SHOW_REPO_LINKS = false

export const projectFilters = [
  { id: 'all', label: 'Todos' },
  { id: 'web', label: 'Web' },
  { id: 'android', label: 'Android' },
  { id: 'flutter', label: 'Flutter' },
  { id: 'plugin', label: 'Plugins' },
  { id: 'api', label: 'API' },
]

export const projects = [
  {
    "id": "dailyexpress",
    "name": "Daily Express",
    "cat": "web",
    "platform": "Web",
    "year": 2026,
    "visibility": "private",
    "repo": "",
    "desc": "Bitácora diaria para equipos de desarrollo: cada persona registra sus actividades y su avance, y los líderes ven tareas, equipo y proyectos en un solo lugar.",
    "tags": [
      "Vue 3",
      "Vite",
      "Web API"
    ],
    "mock": {
      "device": "browser",
      "layout": "image",
      "c1": "#0b4a8b",
      "c2": "#1e6fd0",
      "image": "img/daily-express.webp"
    }
  },
  {
    "id": "crustore",
    "name": "Crustore",
    "cat": "web",
    "platform": "Web",
    "year": 2026,
    "visibility": "public",
    "repo": "https://github.com/BreakGasper/CruSabor-app",
    "desc": "Marketplace con tienda en línea para clientes, panel para negocios que publican productos y panel de administración, con membresías y pagos.",
    "tags": [
      "Vue 3",
      "TypeScript",
      "Vite",
      "Firebase",
      "Express"
    ],
    "mock": {
      "device": "browser",
      "layout": "store",
      "c1": "#14c8d8",
      "c2": "#0ca5b0",
      "title": "Crustore",
      "nav": [
        "Tiendas",
        "Ofertas",
        "Pedidos"
      ],
      "hero": "Compra en tiendas de tu zona",
      "cta": "Explorar",
      "items": [
        {
          "name": "Pan artesanal",
          "price": "$45"
        },
        {
          "name": "Café de olla",
          "price": "$30"
        },
        {
          "name": "Tamales",
          "price": "$25"
        },
        {
          "name": "Pastel",
          "price": "$180"
        }
      ]
    }
  },
  {
    "id": "sanara",
    "name": "Sanara",
    "cat": "web",
    "platform": "Web",
    "year": 2026,
    "visibility": "private",
    "repo": null,
    "desc": "Sistema de apoyo al registro de enfermería para varias clínicas, con roles, bitácora y agenda de citas que el propio paciente puede reservar.",
    "tags": [
      "Vue 3",
      "TypeScript",
      "Pinia",
      "Firebase"
    ],
    "mock": {
      "device": "browser",
      "layout": "dashboard",
      "c1": "#19c37d",
      "c2": "#0f766e",
      "title": "Sanara",
      "menu": [
        "Pacientes",
        "Citas",
        "Bitácora",
        "Turnos"
      ],
      "stats": [
        {
          "k": "Citas hoy",
          "v": "12"
        },
        {
          "k": "Pacientes",
          "v": "148"
        },
        {
          "k": "Turnos",
          "v": "3"
        }
      ],
      "rows": [
        "Signos vitales · 08:30",
        "Cita · 09:15",
        "Entrega de turno · 14:00"
      ]
    }
  },
  {
    "id": "invitacion",
    "name": "Mi Invitación",
    "cat": "web",
    "platform": "Web",
    "year": 2026,
    "visibility": "public",
    "repo": "https://github.com/BreakGasper/MiInvitacion",
    "desc": "Invitación digital de boda con confirmación de asistencia por familia y un panel privado para organizar mesas, gastos y presupuesto.",
    "tags": [
      "HTML",
      "CSS",
      "JavaScript",
      "Firebase"
    ],
    "mock": {
      "device": "phone",
      "layout": "invite",
      "c1": "#ff2e97",
      "c2": "#9d174d",
      "title": "Nos casamos",
      "sub": "Tu invitación personal",
      "count": [
        {
          "k": "Días",
          "v": "128"
        },
        {
          "k": "Hrs",
          "v": "06"
        },
        {
          "k": "Min",
          "v": "42"
        },
        {
          "k": "Seg",
          "v": "17"
        }
      ],
      "cta": "Confirmar asistencia"
    }
  },
  {
    "id": "vent-app",
    "name": "Vent App",
    "cat": "flutter",
    "platform": "Flutter",
    "year": 2025,
    "visibility": "public",
    "repo": "https://github.com/BreakGasper/vent_app",
    "desc": "App de ventas con catálogo, carrito, favoritos y pedidos guardados en el dispositivo y en la nube.",
    "tags": [
      "Flutter",
      "Dart",
      "Firebase",
      "SQLite"
    ],
    "mock": {
      "device": "phone",
      "layout": "shop",
      "c1": "#3a6ae8",
      "c2": "#1e3a8a",
      "title": "Vent App",
      "items": [
        {
          "name": "Audífonos",
          "price": "$699"
        },
        {
          "name": "Reloj",
          "price": "$1,250"
        },
        {
          "name": "Mochila",
          "price": "$520"
        },
        {
          "name": "Cargador",
          "price": "$199"
        }
      ],
      "chips": [
        "Todo",
        "Tech",
        "Moda"
      ]
    }
  },
  {
    "id": "ubication-test",
    "name": "Ubication Test",
    "cat": "android",
    "platform": "Android",
    "year": 2025,
    "visibility": "public",
    "repo": "https://github.com/BreakGasper/Ubicationtest",
    "desc": "Seguimiento de ubicación del dispositivo y detección de redes WLAN cercanas.",
    "tags": [
      "Kotlin",
      "Java",
      "Location",
      "WLAN"
    ],
    "mock": {
      "device": "phone",
      "layout": "location",
      "c1": "#0ea5e9",
      "c2": "#0c4a6e",
      "title": "Ubicación y WLAN",
      "coords": "3 redes cercanas",
      "cta": "Actualizar"
    }
  },
  {
    "id": "sms-retriever",
    "name": "SMS Retriever Plugin",
    "cat": "plugin",
    "platform": "Plugin Cordova",
    "year": 2025,
    "visibility": "public",
    "repo": "https://github.com/BreakGasper/sms-retriever-plugin",
    "desc": "Plugin de Cordova para Android que lee el código OTP del SMS automáticamente, sin permisos extra para el usuario.",
    "tags": [
      "Cordova",
      "Java",
      "Android"
    ],
    "mock": {
      "device": "browser",
      "layout": "code",
      "c1": "#f97316",
      "c2": "#9a3412",
      "file": "SmsRetrieverPlugin.js",
      "code": [
        "// Escucha el código OTP",
        "document.addEventListener(\"deviceready\", () => {",
        "  cordova.plugins.SmsRetrieverPlugin",
        "    .startSmsListener(",
        "      (code) => console.log(\"Code:\", code),",
        "      (error) => console.log(\"Error:\", error)",
        "    )",
        "})"
      ]
    }
  },
  {
    "id": "pluginos",
    "name": "PluginOS",
    "cat": "plugin",
    "platform": "Plugin Cordova",
    "year": 2025,
    "visibility": "public",
    "repo": "https://github.com/BreakGasper/PluginOS",
    "desc": "Plugin de Cordova que muestra mensajes nativos de Android (Toast) desde JavaScript.",
    "tags": [
      "Cordova",
      "Java"
    ],
    "mock": {
      "device": "browser",
      "layout": "code",
      "c1": "#8d5fe6",
      "c2": "#4c1d95",
      "file": "pluginos.js",
      "code": [
        "function PluginOS() {}",
        "",
        "PluginOS.prototype.show = function(",
        "  message, duration, ok, fail) {",
        "  cordova.exec(ok, fail,",
        "    \"PluginOS\", \"show\",",
        "    [{ message, duration }])",
        "}"
      ]
    }
  },
  {
    "id": "wsblog",
    "name": "WS Blog",
    "cat": "api",
    "platform": "API",
    "year": 2023,
    "visibility": "public",
    "repo": "https://github.com/BreakGasper/wsBlog",
    "desc": "Servicio web REST en PHP y MySQL para publicar y consultar entradas de un blog.",
    "tags": [
      "PHP",
      "MySQL",
      "REST"
    ],
    "mock": {
      "device": "browser",
      "layout": "code",
      "c1": "#3a6ae8",
      "c2": "#1e3a8a",
      "file": "index.php",
      "code": [
        "<?php",
        "include \"conexion.php\";",
        "",
        "$sql = \"SELECT * FROM BlogProps\";",
        "$res = $conn->query($sql);",
        "echo json_encode(",
        "  $res->fetch_all(MYSQLI_ASSOC)",
        ");"
      ]
    }
  },
  {
    "id": "blog-internet",
    "name": "Blog de Internet",
    "cat": "android",
    "platform": "Android",
    "year": 2023,
    "visibility": "public",
    "repo": "https://github.com/BreakGasper/Blog_de_Internet",
    "desc": "App que consume el servicio web del blog para ver y guardar entradas con título, autor y contenido.",
    "tags": [
      "Kotlin",
      "Hilt",
      "MVVM",
      "Retrofit"
    ],
    "mock": {
      "device": "phone",
      "layout": "list",
      "c1": "#14c8d8",
      "c2": "#0c4a6e",
      "title": "Blog de Internet",
      "items": [
        {
          "t": "Primeros pasos",
          "s": "Autor · 01/11/2023"
        },
        {
          "t": "Guía de Kotlin",
          "s": "Autor · 28/10/2023"
        },
        {
          "t": "Qué es MVVM",
          "s": "Autor · 20/10/2023"
        },
        {
          "t": "Hilt en minutos",
          "s": "Autor · 12/10/2023"
        }
      ]
    }
  },
  {
    "id": "rev",
    "name": "Rev",
    "cat": "android",
    "platform": "Android",
    "year": 2023,
    "visibility": "public",
    "repo": "https://github.com/BreakGasper/Rev",
    "desc": "App de reseñas con inicio de sesión (correo, Google y Facebook), colecciones, perfil y publicación de reseñas.",
    "tags": [
      "Kotlin",
      "Firebase",
      "Fragments"
    ],
    "mock": {
      "device": "phone",
      "layout": "reviews",
      "c1": "#ff2e97",
      "c2": "#9d174d",
      "title": "Rev",
      "items": [
        {
          "t": "Café Aroma",
          "s": "Excelente servicio"
        },
        {
          "t": "Cine Norte",
          "s": "Buenas butacas"
        },
        {
          "t": "Pizzería Roma",
          "s": "Masa perfecta"
        }
      ]
    }
  },
  {
    "id": "room",
    "name": "Room Tasks",
    "cat": "android",
    "platform": "Android",
    "year": 2023,
    "visibility": "public",
    "repo": "https://github.com/BreakGasper/Room",
    "desc": "Lista de tareas con base de datos local usando Room, ViewModel e inyección de dependencias.",
    "tags": [
      "Kotlin",
      "Room",
      "Hilt",
      "MVVM"
    ],
    "mock": {
      "device": "phone",
      "layout": "list",
      "c1": "#19c37d",
      "c2": "#0f766e",
      "title": "Mis tareas",
      "check": true,
      "items": [
        {
          "t": "Comprar pan",
          "s": "Hoy"
        },
        {
          "t": "Entregar reporte",
          "s": "Mañana"
        },
        {
          "t": "Revisar correos",
          "s": "Hoy"
        },
        {
          "t": "Llamar al cliente",
          "s": "Viernes"
        }
      ]
    }
  },
  {
    "id": "tragos-kotlin",
    "name": "Tragos App Kotlin",
    "cat": "android",
    "platform": "Android",
    "year": 2022,
    "visibility": "public",
    "repo": "https://github.com/BreakGasper/TragosAppKottlin",
    "desc": "Versión en Kotlin de la app de cocteles: lista, detalle y favoritos con ViewModel.",
    "tags": [
      "Kotlin",
      "MVVM",
      "Retrofit"
    ],
    "mock": {
      "device": "phone",
      "layout": "list",
      "c1": "#ff2e97",
      "c2": "#9d174d",
      "title": "Tragos",
      "thumbs": true,
      "items": [
        {
          "t": "Piña colada",
          "s": "Ron · Coco"
        },
        {
          "t": "Cuba libre",
          "s": "Ron · Cola"
        },
        {
          "t": "Caipirinha",
          "s": "Cachaça · Lima"
        },
        {
          "t": "Mai tai",
          "s": "Ron · Naranja"
        }
      ]
    }
  },
  {
    "id": "huella",
    "name": "Huella Dactilar",
    "cat": "android",
    "platform": "Android",
    "year": 2022,
    "visibility": "private",
    "repo": null,
    "desc": "Autenticación biométrica con huella dactilar mediante BiometricPrompt.",
    "tags": [
      "Java",
      "Biometric"
    ],
    "mock": {
      "device": "phone",
      "layout": "fingerprint",
      "c1": "#14c8d8",
      "c2": "#0c4a6e",
      "title": "Verifica tu identidad",
      "cta": "Usar huella"
    }
  },
  {
    "id": "anonimus-pizza",
    "name": "Anonimus Pizza",
    "cat": "android",
    "platform": "Android",
    "year": 2022,
    "visibility": "private",
    "repo": null,
    "desc": "App de pedidos de pizza: arma tu pizza con ingredientes extra, paquetes, promociones y agenda de pedidos.",
    "tags": [
      "Java",
      "Android",
      "PHP"
    ],
    "mock": {
      "device": "phone",
      "layout": "shop",
      "c1": "#f97316",
      "c2": "#9a3412",
      "title": "Anonimus Pizza",
      "items": [
        {
          "name": "Arma tu pizza",
          "price": "$120"
        },
        {
          "name": "Paquete 2",
          "price": "$220"
        },
        {
          "name": "Extra queso",
          "price": "$25"
        },
        {
          "name": "Promo",
          "price": "$99"
        }
      ],
      "chips": [
        "Crear",
        "Paquetes",
        "Agenda"
      ]
    }
  },
  {
    "id": "gec",
    "name": "GEC · Calidad",
    "cat": "android",
    "platform": "Android",
    "year": 2022,
    "visibility": "private",
    "repo": null,
    "desc": "Gestión de estándares de calidad: bitácoras, control de temperaturas, termos, fichas técnicas y muestreos.",
    "tags": [
      "Java",
      "Android"
    ],
    "mock": {
      "device": "phone",
      "layout": "list",
      "c1": "#19c37d",
      "c2": "#0f766e",
      "title": "Control de calidad",
      "check": true,
      "items": [
        {
          "t": "Cámara 1",
          "s": "4 °C · OK"
        },
        {
          "t": "Termo 3",
          "s": "Entrada registrada"
        },
        {
          "t": "Muestreo",
          "s": "Pendiente"
        },
        {
          "t": "Ficha técnica",
          "s": "Actualizada"
        }
      ]
    }
  },
  {
    "id": "tragosapp",
    "name": "Tragos App",
    "cat": "android",
    "platform": "Android",
    "year": 2021,
    "visibility": "public",
    "repo": "https://github.com/BreakGasper/TragosApp",
    "desc": "App de cocteles con arquitectura limpia: buscador, detalle de cada trago y favoritos.",
    "tags": [
      "Kotlin",
      "Coroutines",
      "Hilt",
      "MVVM"
    ],
    "mock": {
      "device": "phone",
      "layout": "list",
      "c1": "#8d5fe6",
      "c2": "#4c1d95",
      "title": "Cocteles",
      "thumbs": true,
      "items": [
        {
          "t": "Margarita",
          "s": "Tequila · Limón"
        },
        {
          "t": "Mojito",
          "s": "Ron · Menta"
        },
        {
          "t": "Negroni",
          "s": "Ginebra · Campari"
        },
        {
          "t": "Daiquiri",
          "s": "Ron · Lima"
        }
      ]
    }
  }
]
