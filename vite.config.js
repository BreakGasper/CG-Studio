import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      // Los previews son custom elements (Shadow DOM): Vue no debe tratarlos como componentes.
      template: { compilerOptions: { isCustomElement: (tag) => tag.endsWith('-preview') } },
    }),
  ],
  build: { outDir: 'dist' },
})
