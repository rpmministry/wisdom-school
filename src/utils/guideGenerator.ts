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

// Fallback determinista: DESARROLLA con el texto real de la lección (reading/introduction),
// nunca con etiquetas metodológicas. Se usa si la IA no responde.
const buildFromReading = (c: DailyClass): GuideAiContent => {
  const src = clean(c.reading || c.introduction || `Hoy trabajamos "${c.theme}". ${c.objective || ""}`, 1000);
  const sentences = src.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 25);
  const intro = clean(sentences.shift() || firstSentences(src, 1), 260);
  const groups = chunkList(sentences.slice(0, 12), Math.max(1, Math.ceil(Math.min(sentences.length, 12) / 3) || 1)).slice(0, 3);
  const steps: GuideStep[] = groups.map((g, i) => {
    const text = clean(g.join(" "), 230);
    const firstWords = text.split(" ").slice(0, 6).join(" ").replace(/[.,;:].*$/, "");
    return { title: `${firstWords.charAt(0).toUpperCase()}${firstWords.slice(1)}… (Parte ${i + 1})`, text };
  });
  const act = c.activities && c.activities[0];
  if (!steps.length) steps.push({ title: `${clean(c.theme, 60)} (Idea central)`, text: firstSentences(src, 2) });
  return {
    intro,
    steps: steps.length ? steps : [{ title: clean(c.theme, 60), text: firstSentences(src, 2) }],
    questionA: clean(`¿Por qué este proceso de "${c.theme}" ocurre tal como lo leíste y no de otra manera? Respóndelo con tus palabras, como se lo explicarías a un compañero.`, 340),
    questionB: clean(
      (c.reflectionPrompt || `Imagina que algo falla en la parte ${steps.length > 1 ? "del proceso que más te costó" : "que aprendiste hoy"}. ¿Qué pasaría y cómo actuarías con responsabilidad?`) +
        " Cierra explicando qué parte de esta mayordomía refleja el carácter de Dios.",
      400
    ),
    providerUsed: act ? "fallback lectura real de la clase" : "fallback lectura real de la clase",
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

  const introText = /[.!?…]$/.test(content.intro.trim()) ? content.intro : `${content.intro}.`;

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
    <small>ECUADOR · 2026-2027 · CONFESED EVANGÉLICA</small>
  </div>

  <h1>Guía Didáctica y Taller Práctico <span style="color:#64748b">|</span> Tiempo estimado: 45 minutos</h1>
  <div class="sub">Guía del estudiante · enfoque Montessori-Charlotte Mason</div>
  <div class="tema"><strong>Tema:</strong> ${esc(theme)} — <span style="color:#475569">${esc(unit)}</span></div>
  <div class="meta">
    <span><b>Alumno:</b> ${esc(studentName)}</span>
    <span><b>Grado:</b> ${esc(studentGrade)}</span>
    <span><b>Materia:</b> ${esc(subjectName)}</span>
    <span><b>Docente asignado:</b> ${esc(teacherName)}</span>
    <span><b>Fecha:</b> ${esc(dateStr)}</span>
    ${content.providerUsed ? `<span><b>Origen contenido:</b> ${esc(content.providerUsed)}</span>` : ""}
  </div>

  ${banner}

  <h2>1. Desarrollo del Tema (Texto Base)</h2>
  <p class="intro">${esc(introText)} Dios hizo todas las cosas con orden y propósito (Génesis 1:31; Colosenses 1:16-17), y estudiar este tema es descubrir ese diseño para cuidarlo.</p>
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
  <div style="text-align:center;color:#94a3b8;font-size:9px;margin-top:14px;">Wisdom School · Guía Didáctica y Taller Práctico · ${esc(dateStr)}</div>
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
  let raw = currentClass.guideTitle || `Guia_${subject?.code || "clase"}_${currentClass.theme}.html`;
  raw = raw.replace(/\.pdf$/i, ".html");
  if (!raw.endsWith(".html")) raw += ".html";

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = raw;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  try {
    const win = window.open("", "_blank");
    if (win) { win.document.write(html); win.document.close(); }
  } catch { /* bloqueado: la descarga ya ocurrió */ }
}
