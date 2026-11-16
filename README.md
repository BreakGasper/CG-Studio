# CG-Studio
Desarrollo de software, ingeniería digital, plataformas, APIs, inteligencia artificial y automatización.

## Despliegue (Firebase Hosting)

El sitio estático está en `public/` y la configuración en `firebase.json` (solo Hosting).

```bash
npm i -g firebase-tools
firebase login
firebase use --add        # elige tu proyecto
firebase deploy --only hosting
```
