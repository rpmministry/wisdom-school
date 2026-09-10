# ANALISIS INTEGRAL — Wisdom School
Fecha: 2026-09-09 · Estado del repo: rama `main`, HEAD `6a072e6`, árbol de trabajo SUCIO (12 archivos modificados + 4 nuevos sin commitear). Basado en lectura directa de todos los archivos fuente (no se confió únicamente en el contexto de Code2Prompt; el contexto fue corregido por el código real: ej. el README describe un `vercel.json` que NO existe).

---

## 1. RESUMEN GENERAL

Wisdom School es un colegio virtual privado para dos estudiantes reales — Avril (12 años, 8.º EGB Superior, mundo Snoopy/Peanuts) y Gael (8 años, 4.º EGB Elemental, mundo Mario) — con perfiles demo (karen, mauricio) y registro libre. Es una SPA React 19 + Vite + TypeScript con un backend Express monolítico (`server.ts`) que sirve API + estáticos. No hay router: la navegación es state-driven (`activeTab` en SchoolContext). La IA tutora es socrática y funciona con una cascada de reintentos. Todo el estado del estudiante (cuenta, progreso, respuestas de actividades) vive en `localStorage`; los datos curriculares son archivos TS estáticos (~1,4 MB de datos generados). El proyecto coexiste con residuos de una era Next.js anterior (`next-env.d.ts`, `.next/`, `src/app/`) y de un intento de despliegue Vercel (`vercel.json` referenciado pero ausente).

**Estado de salud:** la app compila (`tsc --noEmit` pasa) y corre, pero contiene 2 bugs críticos latentes (crash de React por orden de hooks; bypass de autenticación), una decisión de arquitectura insegura (llaves API expuestas en el bundle del navegador) y varias funcionalidades completas pero CONECTADAS A NADA (portafolio WorksView, endpoints server de IA, aprendizaje por etapas).

## 2. ARQUITECTURA

Flujo técnico actual (dos mundos que casi no se hablan):

```
Navegador
 src/main.tsx → App.tsx (ErrorBoundary → SchoolProvider → MainContent)
   UI por activeTab (sin router): LandingView | StudentDashboard | SubjectsView |
     DailyClassView | ProgressView | ScheduleView | ActivitiesView
   ┌─ SchoolContext: estado + persistencia localStorage (claves wisdom_*_v2026)
   ├─ aiService / ttsService: fetch DIRECTO a Gemini, OpenRouter y Google TTS
   │    con claves VITE_* embebidas en el bundle  ⚠️
   └─ Solo 2 llamadas al backend: POST /api/send-pin, POST /api/students/upload-avatar
Servidor (server.ts, Express)
   Serve static public/ + students/ + (dev: Vite middleware) (prod/Vercel: dist/)
   Implementa sus PROPIAS casacadas de IA: /api/profesor, /api/ai/teacher-chat,
   /api/ai/analyze-work  ← NADIE las llama desde src/  ⚠️ código muerto
   /api/health (solo diagnóstico)
```

Puntos estructurales:
- **Frontend:** React + Vite (rolout de la plantilla AI Studio "react-example"), Tailwind v4 vía plugin `@tailwindcss/vite` (con un `tailwind.config.ts` de estilo v3 — conviven ambos sistemas), `motion` está en package.json pero la UI usa animaciones CSS de Tailwind; `lucide-react` para íconos.
- **Backend:** Express 4 + `@google/genai` + `nodemailer`. "Dev" = `tsx server.ts` monta Vite como middleware sobre :3000, puerto fijo, HMR externo 24678. "Prod" local = `vite build` + `esbuild` → `dist/server.cjs`.
- **Vercel (teórico):** `server.ts` se comporta como handler serverless cuando existe `process.env.VERCEL` (fallback estático de dist/index.html para cualquier ruta). PERO el README invoca `vercel.json` y el archivo no existe; además el cliente no usa estas rutas de todas formas.

## 3. ESTRUCTURA DEL PROYECTO

```
wisdom-school/wisdom-school/
├── server.ts                  # Express: statics, upload avatares, email PIN, 3 APIs IA (muertas)
├── src/
│   ├── main.tsx / App.tsx     # arranque + switch de vistas por activeTab
│   ├── index.css              # Tailwind v4 @import + fuentes + scrollbar (99 líneas)
│   ├── context/SchoolContext.tsx  # ★ cerebro: auth, estado, persistencia, navegación
│   ├── types/index.ts         # modelos de dominio (Student, Subject, DailyClass, LearningPath…)
│   ├── components/
│   │   ├── landing/  auth/  dashboard/  layout/  common/   # marketing, login, espacio, marcos, avatares/mundo
│   │   ├── classes/  activities/  subjects/  schedule/  progress/  teacher/  # núcleo pedagógico
│   │   └── works/    WorksView.tsx          # ☠ HUÉRFANO: importado por nadie
│   ├── data/                  # mockData.ts + 43 DailyClasses (23 Avril/20 Gael) + 492 micro-ítems curriculares (8 archivos) + pedagogicalContent.ts
│   ├── services/              # aiService.ts (Gemini/OpenRouter directo), ttsService.ts (Google TTS)
│   ├── utils/                 # guideGenerator, consolidatedGuideGenerator (guías HTML imprimibles), studentRegistration, youtube
│   ├── hooks/                 # useHardwareBackButton (popstate)
│   └── app/                   # ⚠️ RESIDUO NEXT.JS (ver §12)
├── scripts/final-data-update.cjs   # ☠ generador obsoleto de learningPaths (IDs no coinciden con datos actuales)
├── resumen_proyecto.txt       # notas de la replanificación +4 días (Sept 7)
├── wisdom-school-context.md   # volcado Code2Prompt (referencia; contiene errores vs código real)
├── tsconfig/tailwind/vite configs · package.json ("react-example")
├── .env (VITE_* + claves) · .env.local (claves servidor) · .gitignore
└── residuos: next-env.d.ts ★trackeado, .next/, tsconfig.tsbuildinfo ★trackeado, bun.lock Y package-lock.json ambos trackeados, dist/, public/*.png duplicados
```

## 4. FLUJO DE LA APLICACIÓN

1. `main.tsx` monta `App` → `SchoolProvider` carga al instante `localStorage wisdom_*_v2026` (estudiantes, subjects, clases, submissions, avatares, auth) sobre las bases de `mockData.ts`. **Efecto secundario en import:** "DESTRUCTOR DE MEMORIA FANTASMA" (`mockData.ts:15-23`): si `app_reset_version !== 'inicio_de_clases_07_sept_2026'` ejecuta `localStorage.clear()` + `location.reload()` (una sola vez por navegador).
2. `activeTab='home'` → `LandingView`: presentación + "Probar profesor IA" (widget que ya dispara iaService real), botón "Iniciar Sesión" y registro, y accesos demo a karen/maurício.
3. Login (modal): email/identificador + contraseña → `loginStudent`. En éxito: `POST /api/send-pin` (e-mail del PIN a los padres), transición a tab `space` (Dashboard del estudiante).
4. Sidebar/MobileBottomNav aparecen una vez autenticado. El día mostrado (`selectedDayOfWeek`) arranca en Lunes (7 Sept) y auto-avanza al día escolar actual tras el 7/9 con `getCurrentSchoolDay()`.
5. `space`: banner del mundo (Snoopy/Mario), devocional del día, selector de día, proyecto integrador vigente, materias con progreso, clases de hoy; "Preguntar al tutor" abre `AITeacherDrawer` (drawer global).
6. `classes` (DailyClassView) es el corazón: sub-pestañas contenido → laboratorio (iframe PhET + ClassVideoPlayer) → taller de actividades → tarea/evidencia, encabezadas por LessonTimeline. El contenido usa los objetos `learningPath` ya presentes en los datos vía InteractiveLessonView (⚠️ solo muestra la etapa activa; no hay botón que avance porque `handleNextStage` no está cableado). Cada pestaña puede abrir el chat del profesor (`ClassTeacherChat`).
7. `activities`: mismas actividades con checkboxes + `ActivityDetailModal` (libreta digital + foto de evidencia → localStorage). "Ver clase completa" salta a `classes`.
8. `schedule`, `subjects`, `progress`: lecturas derivadas de contextos + arrays de horarios. `Evidencia/Portafolio` (WorksView) ⚠️ NO EXISTE en la navegación.

## 5. FUNCIONALIDADES EXISTENTES

**Completas y vivas:** landing con widget demo de IA · registro de estudiante nuevo (3 pasos, credenciales generadas, clonado de plantilla curricular Avril/Gael según edad) · login por email/password/PIN con bypass crítico · sesión persistente por navegador + demo no persistible · e-mail de PIN (server Gmail, credenciales EMAIL_USER/EMAIL_PASS: ausentes localmente) · dashboard por estudiante con tema Snoopy/Mario · devocional diario (4 entradas hardcodeadas) · vista de clase diaria con flujo de 4 fases, recursos curados, video-player con slides narrados · chat IA con voz (Google TTS con fallback Web Speech) · actividades con libreta digital y evidencia fotográfica · horarios por día con recreo · progreso con cálculo de % · guías didácticas imprimibles individuales y consolidadas (substituyen rickrolls/placeholders con recursos PhET reales) · drawer global Tutor IA · botón back por popstate · ErrorBoundary · subida de avatar real → server + /students.

**Parcialmente implementadas:** aprendizaje gamificado (etapas 4-4-7 pero incomunicadas, sin avance ni pausas socráticas ni criterios en pantalla, solo en las guías PDF-Html); "semana de repaso" (Sept 01-04) → flag en la UI y fechas viejas en un selector pero borradas del dato; cronograma del período 1 en Datos con las 3 fechas trimestrales correctas y las micro-fechas sin aplicar; reset de contraseña vía PIN (context ya `resetPasswordWithPin()` implementada pero nunca consumida); autenticación de Google (botón y SDK presentes pero la verificación del token de ID es solo en cliente, sin backend, y no hay UI real de cuenta); modo multiusuario/karen/mauricio pero sin datos.

**Sin cableado / obsoletas aparentes:** portafolio de evidencias con análisis IA por IA (`WorksView` + `/api/ai/analyze-work` server + stub `analyzeWork()` en cliente — tres mitades que no llegan a comunicarse); endpoints server `/api/ai/teacher-chat`, `/api/profesor`, `/api/health` (vivos pero sin llamador); `ClassTeacherChatCompact`; `pending_socratic_prompt` (consumido, jamás escrito); `customAvatars` (sí se persiste pero casi nunca se aplica en vistas); script `scripts/final-data-update.cjs` generador obsoleto.

**Inexistentes pero insinuadas en UI/texto:** "Recordarme" (no existe), olvida-contraseña, cambio de usuario rápido, exámenes/calificaciones reales, backend de cuentas (todo localStorage — la "autenticación" es local, ver §11 CRÍTICO-1).

## 6. COMPONENTES Y RELACIONES

- `App.tsx` → Navbar · Sidebar (desktop) · MobileBottomNav (móvil) · switch por `activeTab` · modales de auth/registro. No renderiza WorksView.
- `SchoolContext` → consumido por 25+ componentes. Campos más usados: `currentStudent/studentSubjects/todayClasses/selectedDayOfWeek/active{Class,Subject}`, `setActiveTab` (guard de auth), `toggleActivityCompletion/completeClass`, `openTeacherDrawerWithContext`, `loginStudent/registerNewStudent`, `submissions/addSubmission` (solo WorksView huérfano los usa).
- `LandingView` → SchoolLogo, CurriculumLevelsSection (5 niveles estáticos), AITeacherTryoutWidget (`askAITeacher` real), NewStudentModal (montado DOS veces, líneas 360 y 394 — bug §11 MEDIO-12).
- `StudentLoginModal` → StudentAvatar/SchoolLogo/Google GSI + `/api/send-pin`. Prop `onOpenRegister` jamás invocado (registro solo desde landing).
- `StudentDashboard` → WorldHeaderBanner (común, según id avril|karen/gael), DevocionalCard (sin contexto), StudentAvatar, mini-timelapse, grid de materias.
- `DailyClassView` → LessonTimeline (pintar=visitar), InteractiveLessonView (learningPath), ClassTeacherChat (chat), ClassVideoPlayer (slides + tabs, iframe PhET, fallback YouTube buscar), ActivityDetailModal, descargas de guías (guideGenerator / consolidatedGuideGenerator + pedagogicalContent).
- `AITeacherDrawer` (overlay global) ≈ clon ~90% de ClassTeacherChat + voz automática + handshake `pending_socratic_prompt`; el tercer clon es AITeacherTryoutWidget. Tríplica el riesgo de divergencia (strings de error idénticos a server.ts: "SISTEMA DE EMERGENCIA" / "estoy organizando mis apuntes").
- `SubjectsView` → set subject+clase y salta a tabs. `ScheduleView` → slots hardcodeados por id. `ProgressView` → KPIs + barras (streak=18 literal). `ActivitiesView` → mismo modal.
- `common/`: ErrorBoundary (clase), SchoolLogo (SVG), StudentAvatar (7-steps de fallback → StudentPhotoModal editable), WorldCharacters (roster Peanuts/Mario + banner).

## 7. APIs Y SERVICIOS

**Backend (server.ts) — implementado y MAYORMENTE sin consumo:**
- `POST /api/send-pin` (nodemailer Gmail; usa EMAIL_USER/EMAIL_PASS que NINGÚN archivo env local define → siempre 500 local, atrapado por .catch silencioso en UI) ✔ con llamador.
- `POST /api/students/upload-avatar` base64 → write a public/students + dist ✔ con llamador. `GET /api/students/avatars-status` ⚠️ sin llamador. `GET /students/:filename` fuzzy resolver, estáticos public/ y /students/.
- `POST /api/profesor` (legacy) y `POST /api/ai/teacher-chat` — Motor de Resiliencia en Cascada (deadline 8s, OpenRouter free → Gemini 3.7/3.6/3.5 con reintentos, fallback pedagógico + 503). ⚠️ Sin llamador en src. Dependen de GEMINI_API_KEY/OPENROUTER_API_KEY… en `.env.local`, que `dotenv.config()` (lee solo `.env`) no carga: localmente el servidor corre sin claves.
- `POST /api/ai/analyze-work` — Gemini multimodal JSON con 3 niveles de fallback estático (funcionaría). ⚠️ Sin llamador.
- Fallback estático Vercel-only en `app.get('*')`.

**Cliente → terceros (aiService/ttsService):** Gemini REST `v1beta/….6-flash` directo con `?key=VITE_GEMINI_API_KEY` (+ reintentos 2/4/6s y timeout 15s) → fallback lista dinámica/estática de modelos free de OpenRouter → modo "demo" canned para 3 temas. TTS: Google Text-to-Speech REST con voz por género del docente (Neural2-A/B) + cache en memoria + fallback `speechSynthesis` es-EC. Google Identity: SDK GSI + validación CLIENTE con tokeninfo (insegura, §11 CRÍTICO-3).

## 8. DATOS Y ESTADO

- **Datos base (estáticos):** `mockData.ts: STUDENTS_DATA (4), RAW_AVRIL_SUBJECTS (11), RAW_GAEL_SUBJECTS (9)` con macro/units de los 8 archivos de curriculum inyectados; `generateScheduleEntries()` → SCHEDULE_DATA (50) desde los slots; `DAILY_CLASSES_DATA` = 43 clases; `INITIAL_SUBMISSIONS = []`.
- **Persistencia (localStorage):** `wisdom_students_v2026` (no demos), `wisdom_auth_v2026`, `wisdom_current_v2026`, `wisdom_subjects/schedules/classes_v2026` (merge: base oficial + overrides de completion), `wisdom_submissions_v2026`, `wisdom_avatars_v2026`, `wisdom_activity_response_<id>` (+`_img` base64!) y `app_reset_version` (llave del Destructor).
- **Escritura:** registro de alumno (todo clonado + auto-login), toggle actividad/completeClass, changePassword, avatar custom, respuestas de actividades. El estado de completado es copia de data (no se persiste respuesta por materia real; las clases regeneradas por registro nunca llegan a tener learningPath).
- **Inconsistencias de forma:** campos del tipo nunca poblados (videoUrl, timeBreakdown, DigitalResource multiple, SocraticPause/evidenceCriteria sin consumidor UI), y un campo usado en runtime (`status`) no pertenece a la interfaz DailyClass. `DAYS_CONFIG` duplicado en 4 componentes con 2 versiones contradictorias (01–04 vs 07–11).
- **Vida del dato curricular:** 492 microítems cuyo `classId` solo coincide con 35 clases (457 dangling), 22/43 con ids duplicados, verifiedAt 2026-09-01 en los 43.

## 9. SISTEMA EDUCATIVO

**Estudiantes:** Avril (11 materias, indigo/violeta… aunque los componentes hardcodean Snoopy/amber por id) y Gael (9 materias, Mario). Demo karen(12)/mauricio(8) sin materias/clases/horario (su dashboard depende solo de copias de tema). El nivel del plan del Ministerio es correcto para Sept-7: T1 07 Sep - 24 Nov, etc.

**Materias y clases:** cada materia define teacher-IA con su propia identidad (nombre/especialidad/personalidad), macro (3 trimestres Overview con clases 26/28/26) y unidades T1 (micro con tema/pregunta/dinámica/recurso). Las 43 DailyClass de la semana 1 son ricas en contenido (learningPath 4 etapas, 2 recursos, 3 actividades, pausas, criterios) pero con placeholders sistémicos de la generación masiva (50 rickrolls, 86 PDFs inexistentes), mitigados solo en la guía consolidada vía `pedagogicalContent.obtenerContextoTema/corregirUrlRecurso`.

**Actividades/evaluación:** tipos de 11 tipos reflejados con etiquetas divergentes en 3 sitios; puntos 15-25-30; completado → marca la clase; NO hay calificación: el modelo de "evaluación por evidencias" existe solo a medias — la evidencia (WorksView + analyze-work) vive desconectada.

**Progreso:** % = max(clases completadas, micro-completados, submissions>0) / totalClasses(35) con display forzado a 0 en semana de repaso; streak fijo 18.

**Profesor IA:** doble sistema (§7), con promps socráticos diferenciados por materia (reglas para inglés), auto-seguimiento cada 90s (riesgo de spam de API), voz TTS y método director de clase (5 pasos, aiService) + chat libre.

**Devocional/día escolar:** DevocionalCard hardcodea 4 textos para Sept 08-11 con fallback `getDay()%4` desalineado; el horario real vive en SLOTS hardcodeados por id.

## 10. DISEÑO Y UI/UX

Dark (slate-950) + indigo para Avril/superior; red/amber + estilo Peanuts; red/… Mario para Gael; gradientes glass (`.bg-slate-800/80 border-slate-700`), cards `rounded-3xl`, chips/estados de color por tema. Tipografías Plus Jakarta Sans/Outfit, tipografía mono en datos. Tailwind v4 con `tailwind.config.ts` (fade/scale-in) → algunas clases usadas que no existen en Tailwind (w-4.5, justify-right, animate-in de shadcn en StudentPhotoModal). `motion` instalado y apenas usado. Responsive con switch Sidebar/md → MobileBottomNav, 7 tabs apretados en móvil. Estudiantes son las mismas imágenes PNG/SVG duplicadas 2-3 veces en public (Snoopy.png/snoopy-3d.png/"Snoopy 3d.png") con rutas con espacios en filenames.

## 11. PROBLEMAS DETECTADOS

**CRÍTICOS**
1. **Bypass de autenticación** — `SchoolContext.tsx:276`: el OR final `(cleanId === found.pinCode || cleanId === found.id)` hace que ingresar como identifier "avril"/"AVR-2026" con CUALQUIER contraseña autentique. Además, con `.env.local` residuo de los orphans `src/app/*/page.tsx` se auto-escriben `wisdom_auth/current` sin credencial (§12). Todo el modelo es client-side.
2. **Violación de hooks Rules-of-Hooks → crash** — `ActivityDetailModal.tsx:41`: `if (!isOpen...) return null` ANTES de 6 useState + useEffect; ambos padres lo montan permanentemente cerrado → al abrirlo React lanza "Rendered more hooks…"; el ErrorBoundary lo disfraza ("discrepancia temporal"), así que probablemente un usuario ya ve pantallas vacías al abrir actividades y nadie lo reporta.
3. **Claves API expuestas al cliente** — `aiService.ts:139-140,200-211` y `ttsService.ts` (VITE_GOOGLE_TTS_API_KEY en URL, ni siquiera declarado en vite-env.d.ts): VITE_* va inline en el bundle JS público; en producción Google/OpenRouter serían robables. El propio README prohíbe VITE_ para secretos mientras que el código hace lo contrario (y la casacada server-side existe pero no se usa).
4. **Destructión masiva/inesperada de datos** — `mockData.ts:15-23`: `localStorage.clear()` + `reload()` borra cuentas registradas, progreso, respuestas y fotos base64 en el primer arranque (y cualquier otra app del mismo origin), sin avisar.

**ALTOS**
5. Intervalo duplicado `AITeacherDrawer.tsx:130-151` vs `174-195`: comparten ref → fuga de timer e posible doble auto-send del prompt socrático a 90s (API burn).
6. `handleNextStage` nunca es llamado (InteractiveLessonView:263) → imposible avanzar las etapas; `socraticPauses`/`evidenceCriteria`/`guidingQuestion`/`minResponseLength` no se muestran en pantalla; `ClassVideoPlayer.onActivitySelect` prop muerto → el camino gamificado prometido no funciona.
7. `WorksView` huérfano + stub `analyzeWork()` (aiService.ts:313-315) + endpoint server real (`/api/ai/analyze-work`) → la evaluación de evidencias no funciona por ningún camino; si se activara, submissions quedarían stuck 'analyzing' (no hay timeout catch en WorksView).
8. IDs DailyClass duplicados: class-mat-avril-02 (líneas 2118 y 3597 — temas distintos), class-mat-gael-02, class-sci-gael-01 → el merge del contexto `find` por id colapsa/altera ambas copias al completar actividades; keys React duplicadas.
9. 457/492 `classId` del microcurriculum inexistentes + prefijos eca-/pe- vs art-/efi- → el puente materia→clase está roto estructuralmente; SCHEDULE_DATA.classId (`class-avril-mat-1`) nunca matchea.
10. README documenta `vercel.json` inexistente; y GEMINI/EMAIL_* no están donde server.ts/dotenv los busca (`.env.local` ≠ `.env`) → el backend IA funciona solo en Vercel, pero sin vercel.json, y el e-mail PIN (EMAIL_USER/PASS) no existe en local → el flujo de PIN está caído hoy.
11. Validación Google SSI solo cliente (tokeninfo) en dos componentes — se puede fabricar sesión local.
12. Auto-envío de mensajes IA a los 30/90s en chat y drawer sin acción del estudiante (gasto de cotas).

**MEDIOS**
13. DAYS_CONFIG rancio en ActivitiesView (1-4 Sep con punto verde en "01") + tooltip en Dashboard "Primer Día (1 Sep)" vs Sept 7 en todo lo demás; `isReviewWeek` calculado a nivel de módulo (SubjectsView:13) o por render (Dashboard) con semantics distintos; flags `isRepaso:false` en ScheduleView; studentRegistration genera Sept 1.
14. Karen con tema Snoopy pero tabla de horario y banner Mario/Genéricos; estudiantes registrados usan slots/horarios de Gael.
15. Devocional con fallback `getDay()%4` que muestra contenido etiquetado de otro día + solo Sept 8-11 (caduco al día 12).
16. `resetPasswordWithPin()` nunca usado; no hay UI de olvide mi clave.
17. `onOpenRegister` del modal nunca invocado; "Contacta a la administración" como call-to-action muerto en StudentLoginModal:22/29.
18. ErrorBoundary purga teclas v10-v11 legadas (no _v2026) → "Restablecer datos locales" no hace nada.
19. `wisdom_activity_response_<activityId>` sin studentId → compartido entre siblings; y la foto se guarda antes de "Guardar".
20. 50 rickrolls + 86 PDFs falsos en datos (los ve el estudiante en cards/salvavidas, solo encauzados por el generador).
21. `useHardwareBackButton`: la comparación del pushState siempre true → basura histórica (Back no funciona limpio).
22. LandingView renderiza NewStudentModal dos veces.
23. StudentPhotoModal: tabs karen/mauricio sin presets → `PRESET_PHOTOS[id][0]` throws al abrir "editar foto" en demo.

**BAJOS**: sinfín de imports/variables muertas (DailyClassView 5, StudentDashboard 5…); THEORETICAL_CONTENT con basura "精密"; strings de tipo divergentes; scheduleTime de materias vs slots no cuadra para varias; `status` no tipado; totalClasses=35 vs 1-4 reales; labels quiz/Evaluación divergentes en 3 mapeos; w-4.5 inválidas; dynamic Tailwind string (customRingColor) que JIT no ve; audio stop() en todos los efectos del drawer.

## 12. CÓDIGO HEREDADO O SOSPECHOSO (no borrar sin confirmar)

1. **Era Next.js (`npm run dev` → next)**: `next-env.d.ts` (trackeado; referencias `.next/dev/types/...`), `.next/` en disco, `'use client'` en `src/app/avril|gael/page.tsx` (Vite nunca enruta /avril), `src/app/api/profesor/.env.local` (carpeta api Next con solo un env raso), y el commit 465b9e1 "Fix 404 error on Gael space… on mobile/tablet" que los creó como parche 404 → al no existir router real, son hoy auto-auth-inofensivo (¡o peligroso si algo los sirve!) y huérfanos.
2. **Era Vercel:** README menciona vercel.json (ausente) + el bloque VERCEL en server.ts que sí existe — posible config perdida (verificar git log del archivo antes de tocarlo).
3. **Era AI-Studio:** `metadata.json` con `requestFramePermissions`/`MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API`, package.json name "react-example", prompt Gemini con `User-Agent: 'aistudio-build'`.
4. **Script generador obsoleto** `scripts/final-data-update.cjs`: sus ids (`-lp-1`,`-res-001`,`verifiedAt 09-07`) no coinciden con los datos actuales (`-stage-1`,`-dig-1`, `09-01`) → se generó y luego mutó a mano; reejecutarlo corrompería.
5. **localStorage legacy** referenciado solo por ErrorBoundary (`*_v10–v11`): antes había scheme de versionado de datos por fechas de release; hoy muerto.
6. **Residuos de la semana de repaso Sept 01-03:** el `resumen_proyecto.txt` documenta el plan "REPASO" y las clases originales Sept1-7; la decisión implementada fue borrar esas clases. `ActivitiesView.DAYS_CONFIG` quedó sin actualizar (evidencia).
7. **Dual package managers:** package-lock.json y bun.lock ambos trackeados; y el optDep `@rollup/rollup-linux-x64-gnu` pinneado con comentario Vercel.
8. `tsconfig.tsbuildinfo` trackeado (artefacto, no ignorado) y `wisdom-school-context.md`/`.kilo/` locales.
9. `SCHEDULE_DATA` (50 entradas) nunca referenciado por ScheduleView (usa SLOTS directamente) — posible heredado de refactor.

## 13. DEPENDENCIAS

Producción: `react/react-dom 19` (UI) · `express 4` (server) · `@google/genai` (solo server-side; el cliente usa fetch raw, no la librería) · `nodemailer` (PIN email) · `lucide-react` (iconos) · `motion` (instalada, casi no usada) · `dotenv` · `tailwindcss v4` vía `@tailwindcss/vite` · `vite 6` + `@vitejs/plugin-react`. Dev: typescript ~5.8, tsx (runner server), autoprefixer (vestigial v3 con v4), `@types/*`. Binarios: build (vite+esbuild bundle CJS), start (node dist/server.cjs), dev (tsx), lint (tsc --noEmit). Faltantes de seguridad: ninguna librería de auth/sanitización (renderMarkdown hace escape propio, bien), ESLint no está (lint = types only), zero tests.

## 14. MAPA DE DEPENDENCIAS (página → componentes → servicios → APIs → datos)

```
main.tsx → App → [ErrorBoundary, SchoolProvider*]
 LANDING  → LandingView → SchoolLogo, CurriculumLevels, AITeacherTryout → askAITeacher → Gemini/OpenRouter (llaves VITE)
           → NewStudentModal → registerNewStudent → studentRegistration → AVRIL/GAEL_SUBJECTS (mockData→curriculum*)
 AUTH     → StudentLoginModal → loginStudent (context) · /api/send-pin → nodemailer · GSI → tokeninfo (client)
 SPACE    → StudentDashboard → WorldCharacters, DevocionalCard(local data), StudentAvatar(→StudentPhotoModal→upload-avatar), mini Schedule
 CLASES   → DailyClassView → {LessonTimeline, InteractiveLessonView(→ttsService/play… nunca), ClassTeacherChat(→askAITeacher), ClassVideoPlayer(→ttsService), ActivityDetailModal(→localStorage)}
           → {guideGenerator, consolidatedGuideGenerator(→pedagogicalContent)}  → datos: activeClass/todayClasses (SchoolContext ← mockData ← dailyClasses* ← dailyClassesAvril/Gael)
 ACTIVIDADES→ ActivitiesView → ActivityDetailModal (mismo que clases) + openTeacherDrawerWithContext
 TUTOR    → AITeacherDrawer (global; activo desde Dashboard/Modal/listas) → askAITeacher + ttsService, localStorage pending_socratic_prompt (¿quien lo escribe? ∅)
 OTROS    → Subjects/Progress(SchoolContext), Schedule(mockData SLOTS hardcodeados), Works(∅ nadie) ← submissions/addSubmission + analyzeWork(stub) ← /api/ai/analyze-work(∅ llamador)
```

## 15. RIESGOS

- Cambiar `loginStudent` → toca 2 llamadas (modal + Google fallback) pero el bypass es tan obvio que cualquier parche es seguro: riesgo mayor es no tocarlo. El wipe de mockData al primer arranque tras cualquier cambio (modificando `app_reset_version`) es el mecanismo intencional de migración.
- Modificar `DailyClass.id` (para deduplicate) → rompe `wisdom_classes_v2026/wisdom_activity_response_<id>` persistidos, learningPath ids internos (`-stage-N`) esperados por InteractiveLessonView (usa índices no ids, a salvo), y classId del microcurriculum → migración de versiones de storage necesaria.
- "Activar" WorksView/analyze-work → requiere añadir 'works' al NavigationTab; el stub del client se puede borrar porque el server endpoint ya está; el riesgo real es que el endpoint de Gemini (que sí maneja base64) reciba fotos de niños: cumplir la política antes de producción.
- Cambiar aiService para apuntar a las API server-side → unifica casacadas pero expone la app a que el server necesite las keys donde las lee (hoy en `.env.local`) y a límites de timeout.
- "Limpiar" src/app pages → confirmar primero el hosting actual (si hay rewrites hacia esos archivos) antes de borrar; si algo los sirve, hoy autentican sin contraseña.
- Reescribir ActivitiesView DAYS_CONFIG sin verificar la fuente de datos → el resto de vistas (Dashboard/DailyClassView/Schedule) ya está en 07-11; esta es la única disonante, pero la migración del "repaso" puede ser intencional todavía.
- El árbol no está commiteado; un análisis de diffs previos sería prudente; el repo público podría contener secretos en el historial (no comprobado: verificar `git log --all -p` — pero `.gitignore` tiene `.env*` correctamente).

## 16. RECOMENDACIONES (priorizadas — NO implementadas)

P0 (seguridad/estabilidad inmediata):
1. Arreglar hook-order de ActivityDetailModal (mover el estado de cierre a dentro, no hacer return antes de hooks) — 5 líneas.
2. Eliminar la cláusula bypass en `loginStudent` y añadir guard de PIN de email a `isDemo` (y hacer que /api/profesor y /api/ai/* solo acepten POST desde el cliente real o quitarlas).
3. Mover las claves IA/TTS del cliente al servidor (`/api/ai/*`, que ya existe) o a un proxy; quitar `VITE_*` secretos del .env local.
4. Reemplazar `localStorage.clear()` por una migración versionada explícita (nunca clear global) y hacer `window.reload` opcional.
5. Borrar el duplo intervalo en AITeacherDrawer.

P1 (integridad pedagógica):
6. Deduplicar IDs DailyClass con prefijos correctos y plan de migración localStorage; regenerar/actualizar los classId del microcurriculum (457 colgantes) con un script validador.
7. Cablear el flujo de etapas en InteractiveLessonView (botón Siguiente + pausas + criterios) o bajar el scope del texto de marketing; reescribir el fallback del devocional al día escolar actual y poblarlo de data.
8. Unificar DaysConfig/ScheduleSlots en un único módulo de calendario escolar y borrar el Sept-1 residual; ajustar studentRegistration.
9. Conectar WorksView al NavigationTab y analizar-work (server) o eliminarlo conscientemente; agregar timeouts para no dejar 'analyzing' eterno.
10. Generar recursos videos reales por clase (sustituir 50 rickrolls, o esconder video cards si placeholder) y subir el PDF de guía a storage real.

P2: quitar demo-persistencia (loginStudent permite karen login form), Google SSI → validar server-side o quitar el botón, resetPasswordWithPin UI, onOpenRegister wiring (eliminar modal doble en Landing), ESLint+build check, probar el flujo con dev en Chrome y en móvil.

P3 (casa): confirmar hosting real, recuperar/reescribir vercel.json, elegir bun-vs-npm y eliminar un lock, decidir destino de src/app (borrar tras confirmar), documentar en README dualidad client-IA vs server-IA antes de eliminar, quitar de track tsconfig.tsbuildinfo/.next/ con .gitignore update, mover `pending_socratic_prompt` a su verdadera fuente o borrar la lectura.

## 17. CONCLUSIÓN

Wisdom School es un MVP pedagógico genuinamente rico (1.000+ horas de currícula codificada, IA socrática, voz, mundos thematizados, guías imprimibles) construido a presión sobre un scaffold de AI-Studio que migró de Next.js a Vite dejando capas muertas: el backend IA completo que nadie llama, un frontend IA que usa llaves privadas, un portafolio de evidencias desconectado, y un gamificado que no puede avanzar. Hay 2 bugs críticos latentes que pueden estar mordiendo en silencio hoy mismo — el auth-bypass (cualquiera entra como Avril) y el crash de modales por hooks (posiblemente ya disfrazado por ErrorBoundary)— más 2 de seguridad (VITE secrets expuestos y wipe masivo). La prioridad absoluta: P0 (5 arreglos quirúrgicos pequeños) sin tocar el resto; después re-conectar el mapa de datos (ids/microcurrícula), la decisión binaria del análisis de evidencias, y luego la limpieza heredada, cada una con su migración localStorage versionada.
