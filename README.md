# Wisdom School

Plataforma educativa virtual construida con React, Vite, TypeScript, Express y servicios de inteligencia artificial. La aplicación ofrece espacios privados para los estudiantes, clases, actividades, trabajos y tutoría IA con orientación socrática.

## Arquitectura

- `src/`: aplicación React y experiencia visual del estudiante.
- `src/context/SchoolContext.tsx`: estado global, autenticación local, estudiante activo y navegación.
- `src/services/aiService.ts`: comunicación del frontend con las rutas de IA y conversión segura de Markdown a HTML.
- `server.ts`: backend Express, archivos públicos, rutas de estudiantes y orquestación de proveedores IA.
- `public/students/`: imágenes públicas de los estudiantes.
- `dist/`: resultado generado para producción. No se versiona.

## Ejecución local

Requisitos: Node.js instalado.

```powershell
npm install
npm run dev
```

La aplicación local utiliza `http://localhost:3000`. Las claves se leen desde `.env`, que está excluido de Git.

Para validar una compilación de producción:

```powershell
npm run lint
npm run build
```

## Variables de entorno

Usa `.env.example` como plantilla. Nunca publiques valores reales de claves ni uses variables con prefijo `VITE_` para secretos.

```dotenv
GEMINI_API_KEY=
OPENROUTER_API_KEY=
APP_URL=http://localhost:3000
```

En Vercel, crea las variables en **Settings > Environment Variables** para el entorno **Production**:

- `GEMINI_API_KEY`: clave privada de Google Gemini.
- `OPENROUTER_API_KEY`: clave privada de OpenRouter.
- `APP_URL`: URL `.vercel.app` de esta aplicación, sin `/api`.

Vercel establece `NODE_ENV=production` automáticamente. Después de modificar variables, es necesario crear un nuevo deploy.

## Flujo de la tutoría IA

1. `AITeacherDrawer` recoge el estudiante, materia, clase y mensaje.
2. `askAITeacher` envía el contexto a `POST /api/ai/teacher-chat`.
3. El backend intenta `openrouter/free` con un límite corto de tiempo.
4. Si OpenRouter no responde, se prueban Gemini `gemini-3.7-flash` y `gemini-3.6-flash`.
5. Si todos los proveedores fallan, se devuelve un mensaje pedagógico de contingencia y el endpoint responde `503`.

El backend conserva las claves exclusivamente en `process.env` y no expone sus valores en respuestas ni logs.

## Rutas principales

- `GET /api/health`: confirma que el backend está activo y muestra únicamente si cada proveedor está configurado.
- `POST /api/ai/teacher-chat`: tutoría IA contextual de las clases.
- `POST /api/ai/analyze-work`: análisis formativo de trabajos.
- `POST /api/profesor`: compatibilidad con el endpoint de profesor anterior.
- `GET /api/students/avatars-status`: estado de los avatares disponibles.
- `POST /api/students/upload-avatar`: guarda un avatar enviado por el estudiante.

Para comprobar el despliegue:

```text
https://tu-proyecto.vercel.app/api/health
```

La respuesta debe incluir `geminiConfigured: true` y `openRouterConfigured: true` cuando ambas variables estén configuradas.

## Vercel

`vercel.json` configura el frontend estático desde `dist` y ejecuta `server.ts` para las rutas API y de estudiantes. El servidor carga Vite únicamente durante el desarrollo local y no ejecuta `app.listen()` en Vercel. También existe un fallback para servir `dist/index.html` si la función recibe la ruta principal.

`package.json` declara el binario Linux de Rollup para evitar el error `@rollup/rollup-linux-x64-gnu` durante la instalación en Vercel.

## Diagnóstico de errores

- Si `/api/health` responde `false`, falta una variable en Vercel o se configuró en otro entorno.
- Si el chat devuelve el mensaje de contingencia, revisa los logs de la función después de una solicitud.
- Las advertencias `deprecated` o `allow-scripts` durante `npm install` no equivalen por sí solas a un fallo de despliegue.
- Después de cambiar código o variables, ejecuta un nuevo **Redeploy**.

## Historial técnico

- Se separó el frontend público de las rutas serverless.
- Se añadió el fallback estático para la página principal.
- Se evitó cargar Vite/Rollup dentro del runtime de Vercel.
- Se corrigió la dependencia nativa Linux de Rollup.
- Se añadió una cascada de proveedores con límites de tiempo.
- Se actualizaron los modelos auxiliares a Gemini 3.7 Flash y Gemini 3.6 Flash.
- Se añadió un health check que no revela secretos.
- Se mantuvo `.env` fuera del repositorio y se retiraron las claves expuestas del entorno local.
