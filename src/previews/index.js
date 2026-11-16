import { defineCustomElement } from 'vue'

// Registro de previews interactivos: id del proyecto → { tag, load }.
// Cada preview es un custom element con Shadow DOM, así sus estilos quedan aislados de los del sitio.
export const previews = {
  crustore: {
    tag: 'crustore-preview',
    load: () =>
      import('./crustore/CrustorePreview.ce.vue').then((m) => {
        if (!customElements.get('crustore-preview')) customElements.define('crustore-preview', defineCustomElement(m.default))
      }),
  },
}

export const hasPreview = (id) => id in previews
