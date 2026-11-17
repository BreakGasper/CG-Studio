// Previews: id del proyecto → { host, views[] }. Cada vista se muestra en un iframe.
// Las demos locales (/demos/…) son copias con datos ficticios; Crustore usa la app publicada.
const base = import.meta.env.BASE_URL

export const previews = {
  crustore: {
    host: 'mrapp-b8d1e.web.app',
    views: [{ id: 'app', label: 'App', url: 'https://mrapp-b8d1e.web.app/', mode: 'phone' }],
  },
  invitacion: {
    host: 'miinvitacion.demo',
    views: [
      { id: 'invitacion', label: 'Invitación', url: `${base}demos/mi-invitacion/index.html?p=demo`, mode: 'phone' },
      { id: 'panel', label: 'Panel de los novios', url: `${base}demos/mi-invitacion/panel.html`, mode: 'desktop' },
    ],
  },
}

// Daily Express: demo autónoma con usuarios y datos ficticios (sin conexión a ningún servicio).
previews.dailyexpress = {
  host: 'dailyexpress.demo',
  views: [{ id: 'demo', label: 'Demo', url: `${base}demos/daily-express/index.html`, mode: 'desktop' }],
}

export const hasPreview = (id) => id in previews
