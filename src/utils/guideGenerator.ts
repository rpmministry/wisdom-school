import { DailyClass, Subject } from "../types";

// Tipos del contenido desarrollado por IA (POST /api/ai/guide-content)
export interface GuideStep { title: string; text: string }
export interface GuideAiContent {
  intro: string;
  steps: GuideStep[];        // 2-3 pasos con nombre real del contenido
  questionA: string;         // A. Expresa con tus propias palabras
  questionB: string;         // B. Pensamiento crítico (escenario + mayordomía)
  providerUsed?: string;
}

const clean = (s: string, max = 300): string => (s || "").replace(/\s+/g, " ").trim().slice(0, max).replace(/[,;:\s]+$/g, "");
const firstSentences = (s: string, n = 3): string => (s || "").split(/(?<=[.!?])\s+/).filter(Boolean).slice(0, n).join(" ");
const chunkList = <T,>(arr: T[], k: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += k) out.push(arr.slice(i, i + k));
  return out;
};

// Fallback determinista MULTIFUENTE y honesto: reúne TODOS los fragmentos reales de la clase
// (lecture, introduction, objective, actividades, socráticas, tarea, reflexión). Nunca deja un
// único paso raquítico; y si el material semilla es pobre, lo declara para que el alumno vuelva
// a la Clase Interactiva (donde la IA desarrolla el tema) en lugar de fingir desarrollo.
const collectFragments = (c: DailyClass): string[] => {
  const out: string[] = [];
  const push = (t: unknown) => { const s = clean(typeof t === "string" ? t : "", 300); if (s && s.split(" ").length >= 5 && !out.includes(s)) out.push(s); };
  push(c.reading); push(c.introduction); push(c.objective);
  (c.activities || []).slice(0, 3).forEach((a: any) => push(a?.description));
  (c.socraticQuestions || []).slice(0, 2).forEach((q) => push(q));
  push(c.homeworkTask && !String(c.homeworkTask).startsWith("Pendiente") ? c.homeworkTask : "");
  push(c.reflectionPrompt);
  (c.learningPath || []).slice(0, 2).forEach((s: any) => {
    const cc = s?.coreConcept;
    if (cc && typeof cc.summary === "string" && !/concepto central|an[aá]lisis detallado|ejecuci[oó]n pr[aá]ctica|demostraci[oó]n de maestr/i.test(cc.summary)) push(cc.summary);
  });
  return out;
};

const shortName = (s: string): string => clean((s || "").split(" ").slice(0, 6).join(" ").replace(/[.,;:\s]+$/, ""), 48);

const buildFromReading = (c: DailyClass): GuideAiContent => {
  const frags = collectFragments(c);
  const rich = frags.length >= 5;
  const intro = clean(
    (frags[0] || `Hoy trabajamos "${clean(c.theme, 60)}".`) + " " +
    (frags[1] || `Objetivo de la clase: ${clean(c.objective || "comprender el tema con orden y propósito", 220)}`) + " " +
    "Dios hizo todas las cosas con orden y propósito, y cada idea de esta clase encaja con la siguiente.",
    480
  );
  let steps: GuideStep[] = [];
  if (rich) {
    const rest = frags.slice(2);
    const groups = chunkList(rest, Math.max(1, Math.ceil(Math.min(rest.length || 1, 9) / 3))).slice(0, 3);
    steps = groups.map((g: string[], i: number) => ({ title: `Paso ${i + 1}: ${shortName(g[0] || c.theme)}…`, text: clean(g.join(" "), 280) }));
  } else {
    steps = [
      { title: `El corazón del tema: ${clean(c.theme, 56)}`, text: clean(frags.join(" ") || `Explora "${c.theme}" con tu profesor IA en la Clase Interactiva: ahí encontrarás definiciones, ejemplos y analogías completas.`, 280) },
      { title: "Lo que explorarás con tu profesor", text: clean((c.socraticQuestions || []).slice(0, 2).join("  ·  ") || `Las preguntas vivas de "${c.theme}" guían el laboratorio y el taller.`, 280) },
      { title: "Tu misión de hoy", text: clean([(c.activities && c.activities[1] && c.activities[1].description), c.homeworkTask].filter((x) => x && !String(x).startsWith("Pendiente")).join(" ") || "Sube tu evidencia del Taller Práctico y repasa el laboratorio.", 280) },
    ].filter((s) => s.text.length > 18);
  }
  while (steps.length < 3) steps.push({ title: "Para cerrar con orden", text: `Explica "${clean(c.theme, 56)}" con un ejemplo propio y úsalo hoy en tu casa: aprendemos para cuidar lo que Dios creó.` });
  return {
    intro,
    steps: steps.slice(0, 3),
    questionA: clean(rich
      ? `Expresa con tus propias palabras: ¿cómo se conectan los tres pasos de "${clean(c.theme, 60)}" y qué pasaría si saltaras el primero?`
      : `Sin mirar la guía: ¿qué entenderías hoy de "${clean(c.theme, 56)}" si tu profesor te lo pidiera con SUS palabras (las de la Clase Interactiva)?`, 320),
    questionB: clean((c.reflectionPrompt || "¿Qué parte de este tema pondrías en práctica hoy en tu casa y por qué?") + " Cierra: ¿qué reflejo de mayordomía ves aquí?", 380),
    providerUsed: rich
      ? "síntesis local del material semilla de la clase (sin IA hoy)"
      : "semilla local pobre → completa el desarrollo en la Clase Interactiva y vuelve a descargar",
  };
};

const withSplit = (subject?: Subject): boolean => {
  const blob = `${subject?.id || ""} ${subject?.name || ""} ${subject?.description || ""}`.toLowerCase();
  return /(cienc|natur|biolog|fisica|física|quimica|química|salud|cuerpo|ecolog|astro|matem|mat-|geo|hist)/.test(blob);
};

// Composición LOCAL de la guía a partir de los pasos que la ruta interactiva ya resolvió (con sus nombres reales).
// Cero red, cero plantillas vacías: funciona incluso si todos los proveedores gratuitos caen, y garantiza
// coherencia perfecta entre lo que el niño estudió y la guía que imprime.
export function routeGuideContent(
  routeSteps: GuideStep[],
  meta: { theme: string; studentName: string; subjectName?: string; withSplit?: boolean }
): GuideAiContent | null {
  const steps = (routeSteps || [])
    .filter((s) => s && typeof s.title === "string" && s.title.trim() && typeof s.text === "string" && s.text.trim().length > 30)
    .slice(0, 3)
    .map((s) => ({ title: clean(s.title, 80), text: clean(s.text, 300) }));
  if (steps.length < 2) return null;
  // "Continuación: X" / "Repaso: X" → quedarse con X para leer natural dentro de una frase.
  const tema = clean(meta.theme.replace(/^(continuaci[oó]n|repaso|ampliaci[oó]n|conexi[oó]n)\s*[:\-–—]\s*/i, ""), 80);
  const names = steps.map((s) => `«${clean(s.title.split("(")[0], 42)}»`).join(", ");
  const ultimoNombre = clean(steps[steps.length - 1].title.split("(")[0], 42);
  const intro = clean(
    `En "${tema}" (${meta.subjectName || "tu materia"}) aprendiste una secuencia que no es casualidad: ${names}. Los primeros pasos ponen la base que te permite entender el tema; los últimos lo conectan con lo que ves cada día. Dios, en su sabiduría, puso orden y propósito en todo lo que hizo —y entender ese orden es el primer paso para cuidarlo.`,
    470
  );
  // Sirve para cualquier ruta ordenada (procesos, categorías, historia): se pregunta por EL VINCULO entre pasos, no por un mecanismo inventado.
  const questionA = clean(
    `¿Qué aporta cada paso (${names}) para que "${tema}" se entienda completo? Da un ejemplo propio de cada uno y responde: ¿qué quedaría confuso si empezaríamos la lección al revés, desde «${ultimoNombre}» hacia el principio?`,
    340
  );
  const q2 = meta.withSplit
    ? " Al cerrar, llena dos cajas: 🧪 lo que has observado o puedes comprobar, y 📖 lo que Dios enseña sobre cuidarlo (orden, mayordomía, servicio)."
    : " Cierra con una decisión concreta: \"Me comprometo a…\".";
  const questionB = clean(
    `Lleva el tema a tu vida: ¿qué pasaría con tu día a día si nunca pudieras aplicar «${ultimoNombre}»? ¿Qué parte de lo que Dios puso a tu cuidado se vería afectada, y qué harías tú para protegerlo?${q2}`,
    430
  );
  return { intro, steps, questionA, questionB, providerUsed: "compuesta desde la ruta del estudiante (local)" };
}

const esc = (s: string): string => (s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function generateClassGuideHTML(
  currentClass: DailyClass,
  subject?: Subject,
  studentName: string = "Estudiante",
  studentGrade: string = "Educación General Básica",
  ai?: GuideAiContent | null
): string {
  const dateStr = currentClass.date || new Date().toLocaleDateString("es-EC");
  const now = new Date();
  const stampStr = `${now.toLocaleDateString('es-EC')} ${now.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' })}`;
  const fileStamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
  const subjectName = subject?.name || "Materia General";
  const teacherName = subject?.teacher?.name || "Docente Asignado";
  const theme = currentClass.theme;
  const unit = currentClass.unit || "Unidad Curricular";
  const docTitle = clean(currentClass.guideTitle?.replace(/\.pdf$/i, "") || `Guía Didáctica — ${theme}`, 90);
  const content: GuideAiContent = ai && ai.steps && ai.steps.length >= 2 ? ai : buildFromReading(currentClass);
  const split = withSplit(subject);

  const stepsHtml = content.steps.map((s, i) => `
    <div class="paso">
      <span class="paso-n">Paso ${i + 1}</span>
      <div class="paso-c">
        <strong>${esc(clean(s.title, 90))}</strong>
        <p>${esc(clean(s.text, 300))}</p>
      </div>
    </div>`).join("");

  const cajon = (pista?: string) => `
    <div class="caja">
      <strong style="font-size:10px;color:#1d4ed8;display:block;text-align:center;border-bottom:1px dashed #93c5fd;padding-bottom:2px;margin-bottom:6px;">✍️ CAJÓN DE ESCRITURA</strong>
      <div class="raya"></div><div class="raya"></div><div class="raya"></div><div class="raya"></div>
    </div>
    ${pista ? `<div class="pista">💡 <strong>Pista:</strong> ${pista}</div>` : ""}
    <div style="height:6px"></div>`;

  const introBase = /[.!?…]$/.test(content.intro.trim()) ? content.intro : `${content.intro}.`;
  // La frase cosmovisiva se añade SOLO si la fuente no la trajo ya (evita la duplicación "Dios… Dios…").
  const fullIntro = /Dios|Creador|G[ée]nesis|mayordom/i.test(content.intro)
    ? introBase
    : `${introBase} Dios hizo todas las cosas con orden y propósito (Génesis 1:31; Colosenses 1:16-17), y estudiar este tema es descubrir ese diseño para cuidarlo`;

  const banner = currentClass.studentId === "avril" || currentClass.studentId === "karen"
    ? `<div class="banner" style="background:#7c9cff14;border:1px solid #7c9cff55;" >🐶 Snoopy confía en tu prosa: el mundo tiene orden porque Dios lo pensó. <em>Guía Peanuts</em></div>`
    : currentClass.studentId === "gael"
    ? `<div class="banner" style="background:#e11d4814;border:1px solid #e11d4855;">🍄 ¡Power-up de conocimiento! Mario cuenta contigo para cuidar lo que Dios creó. <em>Guía Super Mario</em></div>`
    : `<div class="banner">🎓 Un aprendizaje con orden refleja al Dios que dio forma a la Tierra. <em>Guía Wisdom</em></div>`;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${esc(docTitle)}</title>
  <style>
    @page { size: letter; margin: 1.9cm 1.7cm; }
    * { box-sizing: border-box; }
    body { font-family: Georgia, 'Times New Roman', serif; color:#1f2937; line-height:1.55; margin:0 auto; padding:34px 40px; background:#fff; max-width:816px; }
    .print-btn-bar { position:fixed; top:12px; right:14px; }
    .btn-print { background:#2563eb; color:#fff; border:none; padding:8px 16px; border-radius:6px; font:700 13px 'Segoe UI',Arial; cursor:pointer; }
    .brand { display:flex; align-items:baseline; justify-content:space-between; border-bottom:3px double #1e3a8a; padding-bottom:6px; }
    .brand .ws { font-size:14px; font-weight:bold; color:#1e3a8a; }
    .brand small { font-size:9px; color:#64748b; letter-spacing:1px; }
    h1 { text-align:center; font: bold 17px/1.3 'Segoe UI',Arial,sans-serif; color:#0f172a; margin:14px 0 3px; }
    .sub { text-align:center; font:600 10.5px 'Segoe UI',Arial,sans-serif; color:#475569; margin-bottom:10px; }
    .tema { font-size:12.5px; margin:8px 0 4px; } .tema strong{ color:#1e3a8a; }
    .meta { display:flex; flex-wrap:wrap; gap:14px; font:10.5px 'Segoe UI', Arial; color:#475569; border-bottom:1px solid #cbd5e1; padding-bottom:8px; margin-bottom:12px;}
    .banner { font:11px 'Segoe UI',Arial; padding:7px 12px; border-radius:7px; margin-bottom:12px; }
    h2 { font:bold 13px 'Segoe UI',Arial; color:#fff; background:#1e3a8a; display:inline-block; padding:3px 12px; border-radius:4px; margin:14px 0 8px; }
    .intro { font-size:12.5px; margin:0 0 10px; text-align:justify; }
    .paso { display:flex; gap:10px; margin:6px 0 8px; font-size:12px; }
    .paso-n { flex:0 0 66px; font:bold 10px/1.9 'Segoe UI'; color:#1e3a8a; background:#e0e7ff; border-radius:4px; text-align:center; height:fit-content; padding:1px 4px; margin-top:2px; }
    .paso-c strong { display:block; font:700 12px 'Segoe UI'; color:#0f172a; margin-bottom:1px; }
    .paso-c p { margin:0; }
    .cons { font-size:12.5px; margin:12px 0 6px; }
    .cons em { color:#1e3a8a; }
    .caja { border:1.5px dashed #94a3b8; border-radius:6px; padding:10px 14px; margin-bottom:4px; background:#fcfdff; }
    .raya { border-bottom:1px solid #cbd5e1; height:23px; }
    .pista { font-size:10.5px; color:#475569; background:#dbeafe; border:1px solid #93c5fd; border-radius:5px; padding:5px 9px; }
    .fin { display:flex; justify-content:space-between; gap:20px; margin-top:26px; font:10px 'Segoe UI'; color:#475569; }
    .firma { flex:1; border-top:1px solid #64748b; padding-top:5px; text-align:center; }
    @media print { .print-btn-bar{display:none;} body{ padding:0; } }
  </style>
</head>
<body>
  <div class="print-btn-bar"><button class="btn-print" onclick="window.print()">🖨️ Imprimir / Guardar PDF</button></div>

  <div class="brand">
    <span class="ws">☀️ WISDOM SCHOOL</span>
    <small>ECUADOR · 2026-2027 · CONFESIÓN EVANGÉLICA</small>
  </div>
  <div style="margin:8px 0 2px;background:#065f46;color:#ecfdf5;border-radius:6px;padding:4px 10px;font:700 9.5px 'Segoe UI',Arial;text-align:center;letter-spacing:.4px;">FORMATO NUEVO v3.0 · una página por asignatura · impresa el ${esc(stampStr)}</div>

  <h1>Guía Didáctica y Taller Práctico <span style="color:#64748b">|</span> Tiempo estimado: 45 minutos</h1>
  <div class="sub">Guía del estudiante · enfoque Montessori-Charlotte Mason</div>
  <div class="tema"><strong>Tema:</strong> ${esc(theme)} — <span style="color:#475569">${esc(unit)}</span></div>
  <div class="meta">
    <span><b>Alumno:</b> ${esc(studentName)}</span>
    <span><b>Grado:</b> ${esc(studentGrade)}</span>
    <span><b>Materia:</b> ${esc(subjectName)}</span>
    <span><b>Docente asignado:</b> ${esc(teacherName)}</span>
    <span><b>Fecha:</b> ${esc(dateStr)}</span>
    <span><b>Formato:</b> v3.0 · ${esc(stampStr)}</span>
    ${content.providerUsed ? `<span><b>Origen contenido:</b> ${esc(content.providerUsed)}</span>` : ""}
  </div>

  ${banner}

  <h2>1. Desarrollo del Tema (Texto Base)</h2>
  <p class="intro">${esc(fullIntro)}</p>
  ${stepsHtml}

  <h2>2. Taller Práctico (Análisis y Síntesis)</h2>
  <div class="cons"><em>A. Expresa con tus propias palabras:</em> ${esc(content.questionA)}<br><span style="font:10.5px 'Segoe UI'; color:#64748b;">Escribe aquí tu análisis detallado basándote en la lectura:</span></div>
  ${cajon("Ordena tu idea con conectores: \"Primero…\", \"Luego… (Paso N)…\", \"por eso…\". Si dudas, vuelve al paso correspondiente del Texto Base.")}
  <div class="cons"><em>B. Pensamiento crítico:</em> ${esc(content.questionB)}<br><span style="font:10.5px 'Segoe UI'; color:#64748b;">Escribe aquí tu conclusión:</span></div>
  ${cajon(withSplit ? "Distingue: primero lo que la evidencia muestra (🧪 se observa/Comprueba) y luego lo que enseña la Biblia (📖 principio, carácter de Dios). Cierra con \"Me comprometo a…\"." : "Marca el principio bíblico que ves (📖 orden, paciencia, fidelidad, servicio) y termina con tu decisión concreta: \"Me comprometo a…\".")}

  <div class="fin">
    <div class="firma">Firma del estudiante</div>
    <div class="firma">Firma del representante / docente guía</div>
  </div>
  <div style="text-align:center;color:#94a3b8;font-size:9px;margin-top:14px;">Wisdom School · Guía Didáctica y Taller Práctico · v3.0 · ${esc(dateStr)} · generada el ${esc(stampStr)}</div>
</body>
</html>`;
}

export function downloadClassGuide(
  currentClass: DailyClass,
  subject?: Subject,
  studentName: string = "Estudiante",
  studentGrade: string = "Educación General Básica",
  ai?: GuideAiContent | null
): void {
  const html = generateClassGuideHTML(currentClass, subject, studentName, studentGrade, ai ?? null);
  // Nombre único con fecha+hora: imposible confundir la guía nueva con una descarga antigua.
  const n = new Date();
  const stamp = `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}_${String(n.getHours()).padStart(2, '0')}${String(n.getMinutes()).padStart(2, '0')}`;
  const base = `Guia_Didactica_${subject?.code || 'GEN'}_${currentClass.id || 'clase'}`;
  downloadHTML(html, `${base}_${stamp}.html`);
}

// ============================================================
// DESCARGA POR LOTES: un único PDF combinado con TODAS las guías
// didácticas del día (una página por asignatura + portada).
// Reutiliza el MISMO diseño de la guía individual extrayendo su
// <style> y su <body> generados por nosotros (contrato estable).
// Reconstruye el diseño de una guía individual extrayendo su CSS y su cuerpo.
const extractGuideParts = (html: string): { css: string; body: string } => {
  const css = html.match(/<style>([\s\S]*?)<\/style>/i)?.[1] || "";
  let body = html.split(/<body[^>]*>/i)[1]?.split(/<\/body>/i)[0] || html;
  body = body.replace(/<div class="print-btn-bar">[\s\S]*?<\/div>/i, ""); // una sola barra de impresión: en la portada
  return { css, body: body.trim() };
};

const downloadHTML = (html: string, filename: string): void => {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  try {
    const win = window.open("", "_blank");
    if (win) { win.document.write(html); win.document.close(); }
  } catch { /* bloqueado: la descarga ya ocurrió */ }
};

export interface DailyGuideBundleItem {
  currentClass: DailyClass;
  subject?: Subject;
  ai?: GuideAiContent | null;
}

// Un solo documento imprimible = un solo PDF combinado al usar Imprimir → Guardar como PDF.
export function generateDailyGuidesBundleHTML(opts: {
  studentName: string;
  studentGrade: string;
  dateStr: string;
  dayLabel?: string;
  items: DailyGuideBundleItem[];
}): string {
  const { studentName, studentGrade, dateStr, dayLabel } = opts;
  const bNow = new Date();
  const bundleStamp = `${bNow.toLocaleDateString('es-EC')} ${bNow.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' })}`;
  const items = (opts.items || []).filter((it) => it && it.currentClass);
  const parts = items.map((it) => extractGuideParts(generateClassGuideHTML(it.currentClass, it.subject, studentName, studentGrade, it.ai ?? null)));
  const css = parts[0]?.css || "";
  const printBar = `<div class="print-btn-bar"><button class="btn-print" onclick="window.print()">🖨️ Imprimir / Guardar PDF combinado</button></div>`;

  const cover = `
  <section class="cover">
    <div class="brand">
      <span class="ws">☀️ WISDOM SCHOOL</span>
      <small>ECUADOR · 2026-2027 · CONFESIÓN EVANGÉLICA</small>
    </div>
    <h1>Guías Didácticas del Día <span style="color:#64748b">|</span> PDF combinado</h1>
    <div class="sub">${items.length} asignatura${items.length === 1 ? "" : "s"} programada${items.length === 1 ? "" : "s"} en el horario escolar</div>
    <div style="margin:8px 0 2px;background:#065f46;color:#ecfdf5;border-radius:6px;padding:4px 10px;font:700 9.5px 'Segoe UI',Arial;text-align:center;letter-spacing:.4px;">FORMATO NUEVO v3.0 · paquete diario · generado el ${esc(bundleStamp)}</div>
    <div class="cover-meta">
      <span><b>Alumno:</b> ${esc(studentName)}</span>
      <span><b>Grado:</b> ${esc(studentGrade)}</span>
      <span><b>Fecha:</b> ${esc(dateStr)}</span>
      ${dayLabel ? `<span><b>Día escolar:</b> ${esc(dayLabel)}</span>` : ""}
    </div>
    <div class="cover-box">
      <strong style="font:700 12px 'Segoe UI'; color:#1e3a8a;">Contenido de este documento</strong>
      <ol class="cover-list">
        ${items.map((it) => `<li><b>${esc(it.subject?.name || "Materia")}</b> — ${esc(it.currentClass.theme)} <span style="color:#64748b">(Paso a paso + Taller A/B)</span></li>`).join("")}
      </ol>
    </div>
    <p style="font-size:11px;color:#475569;text-align:justify;">Cada asignatura ocupa su propia página al imprimir: usa <b>Imprimir / Guardar PDF combinado</b> y elige «Guardar como PDF» para obtener un único archivo con todas las guías del día, listas para trabajar y firmar.</p>
    <div class="fin">
      <div class="firma">Firma del estudiante</div>
      <div class="firma">Firma del representante / docente guía</div>
    </div>
    <div style="text-align:center;color:#94a3b8;font-size:9px;margin-top:14px;">Wisdom School · Paquete diario de guías didácticas · v3.0 · ${esc(dateStr)} · generado el ${esc(bundleStamp)}</div>
  </section>`;

  const sections = parts
    .map((p, i) => `<section class="guia${i > 0 ? " salto" : ""}" data-index="${i + 1}">${p.body}</section>`)
    .join("\n");

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Guías Didácticas del Día — ${esc(dateStr)}</title>
  <style>${css}
    .cover { page-break-after: always; }
    .cover h1 { margin-top: 10px; }
    .cover-meta { display:flex; flex-wrap:wrap; gap:14px; font:10.5px 'Segoe UI',Arial; color:#475569; border-bottom:1px solid #cbd5e1; padding-bottom:8px; margin-bottom:12px; }
    .cover-box { border:1.5px solid #cbd5e1; border-radius:8px; padding:10px 16px; margin:10px 0; }
    .cover-list { font:12px 'Segoe UI',Arial; color:#1f2937; margin:6px 0 2px 18px; padding:0; }
    .cover-list li { margin-bottom:4px; }
    section.guia.salto { page-break-before: always; }
    section.guia { page-break-inside: auto; }
  </style>
</head>
<body>
  ${printBar}
  ${cover}
  ${sections}
</body>
</html>`;
}

export function downloadDailyGuidesBundle(opts: {
  studentName: string;
  studentGrade: string;
  dateStr: string;
  dayLabel?: string;
  items: DailyGuideBundleItem[];
}): string {
  const html = generateDailyGuidesBundleHTML(opts);
  const n = new Date();
  const hhmm = `${String(n.getHours()).padStart(2, '0')}${String(n.getMinutes()).padStart(2, '0')}`;
  const safeDate = (opts.dateStr || "dia").replace(/[^\w\-]+/g, "_");
  const safeStudent = (opts.studentName || "estudiante").split(" ")[0].replace(/[^\w\-]+/g, "");
  const filename = `Guias_Didacticas_${safeDate}_${safeStudent}_${hhmm}.html`;
  downloadHTML(html, filename);
  return filename;
}
