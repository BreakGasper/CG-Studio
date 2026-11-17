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

## Deploy desde GitHub (sin usar tu computadora y sin llaves)

El workflow `.github/workflows/firebase-hosting.yml` compila y publica en Firebase Hosting al subir
cambios a `main`, o a mano desde **Actions → Deploy a Firebase Hosting → Run workflow** (eliges la rama).

Usa **Workload Identity Federation**, así que no se crea ninguna llave JSON (útil cuando la organización
bloquea la creación de llaves de cuentas de servicio). Configuración única, en Google Cloud Shell
(https://shell.cloud.google.com) con tu cuenta:

```bash
PROJECT_ID=cg-studio-1d248
REPO=BreakGasper/CG-Studio
gcloud config set project $PROJECT_ID
PROJECT_NUM=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')

gcloud services enable iamcredentials.googleapis.com sts.googleapis.com firebasehosting.googleapis.com

gcloud iam workload-identity-pools create github --location=global --display-name="GitHub"
gcloud iam workload-identity-pools providers create-oidc github-provider \
  --location=global --workload-identity-pool=github \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
  --attribute-condition="assertion.repository=='$REPO'"

gcloud iam service-accounts create github-deployer --display-name="GitHub deployer"
SA=github-deployer@$PROJECT_ID.iam.gserviceaccount.com
gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:$SA" --role="roles/firebasehosting.admin"
gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:$SA" --role="roles/serviceusage.serviceUsageConsumer"
gcloud iam service-accounts add-iam-policy-binding $SA --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/$PROJECT_NUM/locations/global/workloadIdentityPools/github/attribute.repository/$REPO"

echo "GCP_WIF_PROVIDER=projects/$PROJECT_NUM/locations/global/workloadIdentityPools/github/providers/github-provider"
echo "GCP_SERVICE_ACCOUNT=$SA"
```

Luego, en GitHub → **Settings → Secrets and variables → Actions → pestaña Variables → New repository variable**,
crea `GCP_WIF_PROVIDER` y `GCP_SERVICE_ACCOUNT` con los dos valores que imprimió el último comando.

## Base de datos (Firestore) y panel de administración

Las citas, cotizaciones y mensajes de contacto se guardan en **Firestore** (plan gratuito Spark).

- **Colecciones:** `citas`, `cotizaciones`, `contactos` (solo el administrador puede leerlas) y `horarios`
  (solo fecha y hora ocupadas, sin datos personales; es lo que bloquea los horarios ya reservados).
- **Reglas de seguridad:** `firestore.rules`. Los visitantes solo pueden **crear** registros válidos;
  solo `breakgasper@gmail.com` (cuenta de Google verificada) puede leer, editar o borrar.
  Se publican con el workflow de GitHub (`deploy --only firestore:rules`).
- **Panel privado:** `/admin` (inicio de sesión con Google, en tiempo real, con aviso sonoro de nuevas
  solicitudes). Para cambiar el correo autorizado edita `ADMIN_EMAIL` en `src/admin/AdminApp.vue`
  **y** el correo en `firestore.rules`.
- **Configuración:** las claves públicas de la app web de Firebase están en `src/firebase/config.js` (no son secretas; las protegen las reglas de seguridad). En pruebas locales se pueden sustituir con `VITE_FIREBASE_CONFIG` en `.env.local`.
  Si Firebase no responde o las reglas no están publicadas, los formularios usan el correo/WhatsApp de respaldo.
- **Probar las reglas:** `npx firebase-tools emulators:exec --only firestore --project demo "<comando de pruebas>"`.

### Permisos extra para publicar las reglas desde GitHub (una sola vez, en Cloud Shell)

```bash
gcloud projects add-iam-policy-binding cg-studio-1d248 --member="serviceAccount:github-deployer@cg-studio-1d248.iam.gserviceaccount.com" --role="roles/firebaserules.admin"
gcloud projects add-iam-policy-binding cg-studio-1d248 --member="serviceAccount:github-deployer@cg-studio-1d248.iam.gserviceaccount.com" --role="roles/datastore.viewer"
```
