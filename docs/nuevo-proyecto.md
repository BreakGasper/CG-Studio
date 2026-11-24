# Cómo iniciar un proyecto nuevo en la nube (igual que CG-Studio)

Guía para repetir esta configuración en otro repositorio: GitHub + Claude Code en la nube + Firebase
(Hosting, Firestore y Authentication) con despliegue automático **sin llaves de cuenta de servicio**.

Reemplaza los valores entre corchetes o en mayúsculas (`TU_PROYECTO_ID`, `TuUsuario/tu-repo`, etc.).

---

## 1. Prompt inicial (pégalo en la primera sesión del repositorio nuevo)

```text
Vamos a trabajar este repositorio [OWNER/REPO] en la nube, igual que mi proyecto CG-Studio.

Contexto de configuración (ya preparado por mí):
- Hosting en Firebase Hosting, proyecto [PROJECT_ID], sitio [SITE_ID o el mismo PROJECT_ID].
- Despliegue automático con GitHub Actions al unir a la rama main, SIN llaves de cuenta de servicio: usa
  Workload Identity Federation. Las variables del repositorio GCP_WIF_PROVIDER y GCP_SERVICE_ACCOUNT ya están creadas.
- Base de datos: Firestore (plan gratuito Spark), con reglas en firestore.rules (los visitantes solo crean
  registros válidos; solo [MI_CORREO] verificado puede leer, editar o borrar). Panel privado en /admin con Google.
- Stack: Vue 3 + JavaScript + Vite. Idioma de la interfaz: español.

Cómo quiero que trabajes:
1. Desarrolla en la rama que te asigne el entorno, haz commits pequeños y, cuando te pida "publícalo", abre un pull
   request a main, únelo y confirma que el despliegue de GitHub Actions terminó bien. No abras PR sin que te lo pida.
2. Antes de decir que algo funciona, pruébalo: compila (npm run build), prueba en el navegador con Playwright
   (escritorio y celular 390 px) y revisa capturas. Dime con honestidad lo que NO pudiste probar.
3. Firestore: prueba las reglas con el emulador (firebase emulators:exec --only firestore) antes de publicarlas.
4. Nunca pongas secretos, llaves ni datos personales en el código. La configuración web de Firebase sí es pública.
5. Si algo depende de una acción mía (consola de Firebase, Cloud Shell, variables de GitHub), dímelo paso a paso.

Primera tarea: revisa el repositorio, dime qué falta de esta configuración (firebase.json, .firebaserc,
firestore.rules, .github/workflows/firebase-hosting.yml, vite.config.js) y créalo siguiendo el mismo esquema.
```

---

## 2. Configuración de una sola vez (la haces tú)

### A. En Firebase y Google Cloud

1. Crea el proyecto en la consola de Firebase, o usa uno existente. Anota el **ID** y el **número** del proyecto.
2. Activa **Hosting**, **Firestore Database** (modo producción) y **Authentication → Google**.
3. Registra una **app web** (Configuración del proyecto → Tus apps). De ahí copias `firebaseConfig` para
   `src/firebase/config.js`.
4. Si la app web quedó vinculada a otro sitio de Hosting, no importa: el `firebaseConfig` va en el código, no se lee
   de `/__/firebase/init.json`.
5. Authentication → Configuración → **Dominios autorizados**: debe estar el dominio de tu sitio (`*.web.app`).

### B. Permisos para GitHub, sin llaves (Cloud Shell: https://shell.cloud.google.com)

Define tus datos:

```bash
PROJECT_ID=tu-proyecto-id; REPO=TuUsuario/tu-repo; PROJECT_NUM=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)'); gcloud config set project $PROJECT_ID
```

Activa los servicios y crea el pool y el proveedor (si el pool `github` ya existe en ese proyecto, salta el pool):

```bash
gcloud services enable iamcredentials.googleapis.com sts.googleapis.com iam.googleapis.com firebasehosting.googleapis.com
```

```bash
gcloud iam workload-identity-pools create github --location=global --display-name="GitHub"
```

```bash
gcloud iam workload-identity-pools providers create-oidc github-provider --location=global --workload-identity-pool=github --issuer-uri="https://token.actions.githubusercontent.com" --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" --attribute-condition="assertion.repository=='$REPO'"
```

Crea la cuenta que publica y dale sus roles:

```bash
gcloud iam service-accounts create github-deployer --display-name="GitHub deployer"
```

```bash
for R in roles/firebasehosting.admin roles/serviceusage.serviceUsageConsumer roles/firebaserules.admin roles/datastore.viewer; do gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:github-deployer@$PROJECT_ID.iam.gserviceaccount.com" --role="$R"; done
```

Permite que **ese repositorio** use la cuenta, e imprime los dos valores que necesitas:

```bash
gcloud iam service-accounts add-iam-policy-binding github-deployer@$PROJECT_ID.iam.gserviceaccount.com --role="roles/iam.workloadIdentityUser" --member="principalSet://iam.googleapis.com/projects/$PROJECT_NUM/locations/global/workloadIdentityPools/github/attribute.repository/$REPO"; echo "GCP_WIF_PROVIDER=projects/$PROJECT_NUM/locations/global/workloadIdentityPools/github/providers/github-provider"; echo "GCP_SERVICE_ACCOUNT=github-deployer@$PROJECT_ID.iam.gserviceaccount.com"
```

### C. En GitHub (repositorio nuevo)

- Settings → Secrets and variables → Actions → pestaña **Variables** → **Repository variables** (no "Environment"
  ni "Secrets"): crea `GCP_WIF_PROVIDER` y `GCP_SERVICE_ACCOUNT` con los valores impresos. Cópialos **completos**,
  sin `…`.
- Conecta el repositorio a Claude: instala la app de Claude en GitHub para ese repositorio
  (https://github.com/apps/claude/installations/select_target) y, en la sesión en la nube, elige ese repositorio.

### D. Si el proyecto de Firebase ya existe y es el mismo para dos repositorios

El pool y el proveedor ya existen. Solo agrega el repositorio nuevo: actualiza la condición del proveedor, por ejemplo

```bash
gcloud iam workload-identity-pools providers update-oidc github-provider --location=global --workload-identity-pool=github --attribute-condition="assertion.repository in ['Usuario/repo-1','Usuario/repo-2']"
```

y vuelve a ejecutar el último comando de la sección B con el `REPO` nuevo (el que imprime los dos valores).

---

## 3. Archivos que lleva el repositorio

### `.github/workflows/firebase-hosting.yml`

El que dejó funcionando este proyecto. Debe existir en `main` para poder ejecutarse a mano desde la pestaña Actions.

```yaml
name: Deploy a Firebase Hosting
on:
  push:
    branches: [main]
  workflow_dispatch:
concurrency:
  group: firebase-hosting
  cancel-in-progress: true
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: ${{ vars.GCP_WIF_PROVIDER }}
          service_account: ${{ vars.GCP_SERVICE_ACCOUNT }}
          create_credentials_file: true
      - run: npx --yes firebase-tools@latest deploy --only hosting --project TU_PROYECTO_ID --non-interactive
      - run: npx --yes firebase-tools@latest deploy --only firestore:rules --project TU_PROYECTO_ID --non-interactive
```

El hosting se publica **antes** que las reglas: si faltara algún permiso de las reglas, la página igual sale.

### Otros archivos

- `firebase.json`: `"hosting": { "public": "dist" }` y `"firestore": { "rules": "firestore.rules" }`.
- `.firebaserc`: alias hacia el ID del proyecto.
- `firestore.rules`: reglas de seguridad (ver las de este repositorio como modelo).
- `vite.config.js`: si hay un panel aparte (`/admin`), una entrada `admin.html` en `rollupOptions.input`.
- `src/firebase/config.js`: el `firebaseConfig` público de la app web.

---

## 4. Si algo falla

| Si ves… | Causa y solución |
|---|---|
| `must specify exactly one of "workload_identity_provider"…` | Las variables no existen o están en Secrets/Environment. Deben estar en **Repository variables**. |
| `Invalid value for "audience"` | La variable `GCP_WIF_PROVIDER` tiene `…` en medio. Copia el valor completo. |
| `invalid_target … pool or provider … doesn't exist` | Pool o proveedor sin crear (repite la sección B) o la condición del proveedor no incluye ese repositorio. |
| `Failed to authenticate` en `firebase deploy` | Usa `create_credentials_file: true` (no `token_format: access_token`) y espera un par de minutos después de dar permisos. |
| `403` al publicar las reglas | Falta `roles/firebaserules.admin` o `roles/datastore.viewer` en `github-deployer`. |
| El workflow no aparece en "Run workflow" | Debe existir primero en la rama `main`. |
| "No se permite crear claves en esta cuenta de servicio" | Política de la organización: por eso se usa Workload Identity (no se crean llaves). |
| El formulario dice "horario reservado" o usa el correo de respaldo | Las reglas de Firestore todavía no están publicadas: la página comprueba esto y usa el correo mientras tanto. |

---

## 5. Cómo trabajamos (para repetirlo)

- Se desarrolla en una rama; al pedir "publícalo" se abre un pull request a `main`, se une y el despliegue sale solo.
- Se prueba antes de afirmar que algo funciona: `npm run build`, Playwright en escritorio y en celular (390 px),
  y las reglas de Firestore con el emulador.
- El portafolio de demos nunca lleva datos reales de empresas ni de personas: se reemplazan por datos ficticios.

---

## 6. Base de datos y panel de administración (lo que se puede reutilizar)

**Colecciones de Firestore** y quién puede qué (ver `firestore.rules`):

| Colección | Visitantes | Administrador |
|---|---|---|
| `citas`, `cotizaciones`, `contactos` | Solo crear (datos validados) | Leer, editar (etapa y notas), borrar |
| `horarios/{AAAA-MM-DD_HH:MM}` | Leer y crear; no se pueden pisar (evita doble reserva) | Todo (bloquear o liberar horarios) |
| `config/site` | Leer | Escribir (precios, paquetes, horarios, días cerrados) |
| `visitas/{AAAA-MM-DD}` | Solo sumar 1 a los totales del día | Leer y borrar |

**Archivos clave**
- `admin.html` + `src/admin/` (`AdminApp.vue` y `views/`): panel con Resumen, Citas, Calendario, Cotizaciones, Mensajes,
  Visitas y Ajustes. `vite.config.js` declara las dos páginas (`index.html` y `admin.html`).
- `src/firebase/` (`config.js`, `client.js`, `store.js`, `track.js`): configuración pública, carga bajo demanda,
  guardado de formularios, contador de visitas y consentimiento de Google Analytics.
- `src/data/siteConfig.js`: aplica la configuración editable sobre los valores de fábrica.
- `tests/firestore.rules.test.mjs`: 57 pruebas de las reglas.

**Cambiar el administrador:** edita `ADMIN_EMAIL` en `src/admin/AdminApp.vue` **y** el correo en `firestore.rules`.

### Probar con emuladores (sin tocar el proyecto real)

`firebase.json` del proyecto no trae el emulador de Auth; para pruebas usa una configuración aparte con
`emulators: { firestore: { port: 8080 }, auth: { port: 9099 } }` y la copia de `firestore.rules`, y ejecuta:

```bash
npx firebase-tools emulators:exec --only firestore,auth --project demo-test "node tu-prueba.js"
```

Para probar la interfaz, compila con variables que apunten a los emuladores (solo para ese build de prueba):

```bash
VITE_FIREBASE_CONFIG='{"projectId":"demo-test","apiKey":"fake","appId":"1:1:web:1"}' VITE_FIRESTORE_EMULATOR=127.0.0.1:8080 VITE_AUTH_EMULATOR=http://127.0.0.1:9099 npx vite build --outDir /tmp/dist-emu
```

Con `VITE_AUTH_EMULATOR`, el panel expone `window.__adminLogin()` (solo en ese build) para iniciar sesión sin Google y
recorrerlo con Playwright. La versión publicada **no** incluye ese acceso.

### Lecciones del panel

- Una consulta `orderBy(documentId(), 'desc')` pide un índice (`failed-precondition`). Usa un filtro de rango
  (`where(documentId(), '>=', fecha)`).
- Para que la página lea el panel sin llaves en el código, la configuración pública va en `src/firebase/config.js`.
- Los precios y paquetes viven como datos reactivos con valores de fábrica; la configuración guardada solo los sobrescribe
  si son válidos. "Restaurar" borra el documento `config/site`.
- Los días cerrados se aplican en la página, no en las reglas (las reglas validan formato y horarios permitidos).
- Google Analytics solo se inicia con consentimiento; el contador propio es anónimo y sin cookies.
- Reglas con datos de otras colecciones (`get`/`exists`) cuestan una lectura por operación: usarlas solo donde valga la pena.

### Prompt para pedir un panel similar

```text
Necesito un panel de administración en /admin para este sitio, con inicio de sesión de Google solo para [MI_CORREO].
Debe incluir: resumen con números y gráficas, lista de citas/cotizaciones/mensajes con búsqueda, filtros, etapas de
seguimiento, notas internas, exportar a Excel (CSV), calendario de agenda con bloqueo de horarios y una pantalla de
ajustes para editar precios, paquetes y horarios sin tocar código. Los formularios públicos guardan en Firestore con
reglas estrictas (los visitantes solo crean, solo yo leo). Prueba las reglas y el panel con los emuladores antes de
publicar y dime con honestidad qué no pudiste probar.
```
