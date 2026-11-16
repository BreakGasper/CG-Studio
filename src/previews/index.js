// Previews en vivo: id del proyecto → URL de la app publicada (se muestra en un iframe).
export const previews = {
  crustore: { url: 'https://mrapp-b8d1e.web.app/', label: 'Crustore' },
}

export const hasPreview = (id) => id in previews
