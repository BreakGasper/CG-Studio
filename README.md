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

## Deploy desde GitHub (sin usar tu computadora)

El workflow `.github/workflows/firebase-hosting.yml` compila y publica en Firebase Hosting
al subir cambios a `main`, o a mano desde **Actions → Deploy a Firebase Hosting → Run workflow**
(puedes elegir la rama).

Configuración (una sola vez):

1. Firebase Console → ⚙ Configuración del proyecto → **Cuentas de servicio** → *Generar nueva clave privada*
   (rol necesario: *Firebase Hosting Admin*).
2. GitHub → repo → **Settings → Secrets and variables → Actions → New repository secret**:
   nombre `FIREBASE_SERVICE_ACCOUNT`, valor = el contenido completo del JSON descargado.
3. Borra el JSON de tu computadora; no lo subas al repositorio.

Alternativa automática desde tu computadora: `firebase init hosting:github`.
