# CG-Studio — instrucciones para Claude

Sitio Vue 3 + Vite desplegado en Firebase Hosting (proyecto `cg-studio-1d248`). Guía de despliegue y panel en `README.md` y `docs/nuevo-proyecto.md`.

## Modo ahorro de tokens (agentes `reader` y `token-coach` en `.claude/agents`)

- Respuestas cortas y directas. Sin resúmenes repetidos ni explicar lo obvio.
- Lee solo lo necesario: busca con Grep/Glob y lee rangos de líneas, no archivos enteros ni logs completos.
- Delega exploración amplia o lectura de muchos archivos al agente `reader` (Haiku) y trae solo la conclusión.
- No lances subagentes ni workflows para tareas que puedes hacer en 1-3 llamadas.
- No vuelvas a leer un archivo que acabas de editar ni repitas búsquedas ya hechas.
- Si la tarea cambia de tema, sugiere `/clear`; si la sesión es muy larga, sugiere `/compact`.
- Si la tarea es simple y el modelo actual es Opus, sugiere una vez `/model sonnet`.
