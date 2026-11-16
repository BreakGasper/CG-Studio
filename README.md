# CG-Studio
Desarrollo de software, ingeniería digital, plataformas, APIs, inteligencia artificial y automatización.

## Desarrollo (Vue 3 + Vite, JavaScript)

```bash
npm install
npm run dev        # servidor local con recarga en vivo
npm run build      # genera la carpeta dist/
npm run preview    # prueba local de lo compilado
```

Estructura: `src/components/` (secciones), `src/composables/` (lógica reutilizable), `src/data/content.js` (todos los textos), `src/assets/main.css` (estilos) y `src/assets/logoPaths.js` (logotipo original, no modificar).

## Despliegue (Firebase Hosting)

El sitio compilado se publica desde `dist/` (ver `firebase.json`, solo Hosting).

```bash
npm run deploy     # compila y ejecuta: firebase deploy --only hosting
```

Proyecto: `cg-studio-1d248` → https://cg-studio-1d248.web.app
