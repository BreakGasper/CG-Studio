---
name: ahorro-tokens
description: Revisa la configuración y la sesión actual para reducir el consumo de tokens, usando el agente token-coach.
disable-model-invocation: true
---

1. Lanza el agente `token-coach` para auditar la configuración de Claude Code y espera su reporte.
2. Muéstrale al usuario el reporte tal cual, sin agregar texto extra.
3. Si el usuario pide aplicar alguno de los cambios, aplícalo tú (el agente no edita nada), confirmando antes los que afecten a todas sus sesiones.
