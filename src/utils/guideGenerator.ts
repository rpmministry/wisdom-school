import { DailyClass, Subject } from '../types';

/**
 * Generates an official, printable educational worksheet (Guía de Trabajo)
 * formatted according to Ministry of Education / Wisdom School standards.
 */
export function generateClassGuideHTML(
  currentClass: DailyClass,
  subject?: Subject,
  studentName: string = 'Estudiante',
  studentGrade: string = 'Educación General Básica'
): string {
  const dateStr = currentClass.date || new Date().toLocaleDateString('es-EC');
  const subjectName = subject?.name || 'Materia General';
  const teacherName = subject?.teacher?.name || 'Docente Asignado';
  const title = currentClass.theme || 'Guía de Trabajo Diaria';

  const activitiesList = currentClass.activities || [];
  const socraticQuestions = currentClass.socraticQuestions || [];
  const timeBreakdown = currentClass.timeBreakdown || [];

  const isAvril = currentClass.studentId === 'avril' || currentClass.studentId === 'karen' || studentName.toLowerCase().includes('avril') || studentName.toLowerCase().includes('karen');
  const isGael = currentClass.studentId === 'gael' || studentName.toLowerCase().includes('gael');

  const themeBannerHTML = isAvril
    ? `
    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fffbe2 100%); border: 2px solid #f59e0b; border-radius: 10px; padding: 12px 16px; margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: bold; color: #b45309; font-size: 13px;">🐶 MUNDO DE SNOOPY & PEANUTS • GUÍA DIDÁCTICA</span>
        <span style="font-size: 10px; background-color: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 12px; font-weight: bold; border: 1px solid #fde68a;">Método Montessori & Charlotte Mason</span>
      </div>
      <p style="font-size: 11.5px; color: #78350f; margin: 6px 0 0 0; line-height: 1.4;">
        <em>"Como dice Charlie Brown: Cada lección es una historia viva por descubrir y narrar con tus propias palabras."</em> — Snoopy en su máquina de escribir te guía paso a paso.
      </p>
    </div>
    `
    : isGael
    ? `
    <div style="background: linear-gradient(135deg, #fee2e2 0%, #fef2f2 100%); border: 2px solid #ef4444; border-radius: 10px; padding: 12px 16px; margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: bold; color: #b91c1c; font-size: 13px;">🍄 SUPER MARIO BROS KINGDOM • MISIÓN DE CLASE</span>
        <span style="font-size: 10px; background-color: #fef2f2; color: #991b1b; padding: 2px 8px; border-radius: 12px; font-weight: bold; border: 1px solid #fecaca;">🪙 +10 Monedas de Aprendizaje</span>
      </div>
      <p style="font-size: 11.5px; color: #7f1d1d; margin: 6px 0 0 0; line-height: 1.4;">
        <em>"¡Mamma Mia! Abre las Cajas de Interrogación [?] (Montessori) y narra tu misión a Yoshi (Charlotte Mason) para tocar la bandera de meta 🏁."</em>
      </p>
    </div>
    `
    : '';

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${currentClass.guideTitle || `Guia_${subjectName}_${currentClass.theme}`}</title>
  <style>
    @page {
      size: letter;
      margin: 1.8cm;
    }
    body {
      font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
      color: #1e293b;
      background-color: #ffffff;
      line-height: 1.6;
      margin: 0;
      padding: 20px;
    }
    .header-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
      border: 2px solid #334155;
    }
    .header-table td {
      border: 1px solid #64748b;
      padding: 8px 12px;
      font-size: 12px;
    }
    .logo-cell {
      width: 22%;
      text-align: center;
      background-color: #f8fafc;
      font-weight: bold;
      color: #1e3a8a;
    }
    .title-cell {
      width: 58%;
      text-align: center;
      background-color: #f1f5f9;
    }
    .title-cell h1 {
      margin: 0;
      font-size: 14px;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .title-cell h2 {
      margin: 4px 0 0 0;
      font-size: 11.5px;
      color: #475569;
      font-weight: normal;
    }
    .meta-cell {
      width: 20%;
      font-size: 10px;
      line-height: 1.4;
      background-color: #f8fafc;
    }
    .info-box {
      background-color: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 16px;
      font-size: 12px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .info-item {
      display: flex;
      gap: 6px;
    }
    .info-label {
      font-weight: bold;
      color: #334155;
    }
    .section-title {
      font-size: 13px;
      font-weight: bold;
      color: #1e3a8a;
      background-color: #e0e7ff;
      padding: 6px 12px;
      border-left: 4px solid #3b82f6;
      border-radius: 0 6px 6px 0;
      margin-top: 20px;
      margin-bottom: 12px;
      text-transform: uppercase;
    }
    .objective-box {
      background-color: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 8px;
      padding: 12px 16px;
      font-size: 12px;
      color: #166534;
      margin-bottom: 16px;
    }
    .step-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 16px;
    }
    .step-card {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 10px;
      background-color: #f8fafc;
      font-size: 11px;
    }
    .step-card-title {
      font-weight: bold;
      color: #1e3a8a;
      margin-bottom: 4px;
    }
    .reading-box {
      background-color: #fafafa;
      border: 1px dashed #cbd5e1;
      border-radius: 8px;
      padding: 14px;
      font-size: 12px;
      white-space: pre-line;
      line-height: 1.7;
      margin-bottom: 16px;
    }
    .breakdown-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
      font-size: 11px;
    }
    .breakdown-table th {
      background-color: #1e293b;
      color: #ffffff;
      padding: 6px 10px;
      text-align: left;
    }
    .breakdown-table td {
      border: 1px solid #cbd5e1;
      padding: 6px 10px;
    }
    .socratic-card {
      background-color: #eef2ff;
      border-left: 3px solid #6366f1;
      padding: 10px 14px;
      margin-bottom: 10px;
      border-radius: 0 6px 6px 0;
      font-size: 12px;
    }
    .handwriting-lines {
      border-bottom: 1px solid #cbd5e1;
      height: 24px;
      margin-top: 8px;
    }
    .activity-card {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 12px;
      background-color: #ffffff;
    }
    .activity-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: bold;
      font-size: 12px;
      color: #0f172a;
      margin-bottom: 6px;
    }
    .activity-badge {
      background-color: #dbeafe;
      color: #1e40af;
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 12px;
      font-weight: bold;
    }
    .homework-box {
      background-color: #fffbeb;
      border: 1px solid #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 14px;
      border-radius: 6px;
      font-size: 12px;
      color: #78350f;
    }
    .signatures-table {
      width: 100%;
      margin-top: 35px;
      border-collapse: collapse;
    }
    .signatures-table td {
      width: 50%;
      text-align: center;
      vertical-align: bottom;
      padding-top: 45px;
      font-size: 11px;
      color: #475569;
    }
    .signature-line {
      border-top: 1px solid #64748b;
      width: 70%;
      margin: 0 auto 6px auto;
    }
    .print-btn-bar {
      text-align: right;
      margin-bottom: 15px;
    }
    .btn-print {
      background-color: #2563eb;
      color: white;
      border: none;
      padding: 8px 18px;
      font-size: 13px;
      font-weight: bold;
      border-radius: 6px;
      cursor: pointer;
    }
    @media print {
      .print-btn-bar { display: none; }
      body { padding: 0; background-color: #fff; }
    }
  </style>
</head>
<body>

  <div class="print-btn-bar">
    <button class="btn-print" onclick="window.print()">🖨️ Imprimir / Guardar como PDF</button>
  </div>

  <!-- Header Table -->
  <table class="header-table">
    <tr>
      <td class="logo-cell">
        🎓 WISDOM SCHOOL<br>
        <span style="font-size: 9px; color: #64748b;">Ecuador 2026-2027</span>
      </td>
      <td class="title-cell">
        <h1>GUÍA DIDÁCTICA Y TALLER PRÁCTICO DE CLASE</h1>
        <h2>Enfoque Montessori y Charlotte Mason • Homologación Ministerio de Educación</h2>
      </td>
      <td class="meta-cell">
        <strong>Código:</strong> WIS-${subject?.code || 'GEN'}-2026<br>
        <strong>Emisión:</strong> ${dateStr}<br>
        <strong>Estado:</strong> Oficial
      </td>
    </tr>
  </table>

  ${themeBannerHTML}

  <!-- Info Box -->
  <div class="info-box">
    <div class="info-item"><span class="info-label">Estudiante:</span> <span>${studentName}</span></div>
    <div class="info-item"><span class="info-label">Nivel Educativo:</span> <span>${studentGrade}</span></div>
    <div class="info-item"><span class="info-label">Materia:</span> <span>${subjectName}</span></div>
    <div class="info-item"><span class="info-label">Docente Asignado:</span> <span>${teacherName}</span></div>
    <div class="info-item"><span class="info-label">Unidad Temática:</span> <span>${currentClass.unit || 'Unidad Curricular'}</span></div>
    <div class="info-item"><span class="info-label">Horario / Duración:</span> <span>${currentClass.scheduleTime || 'Sesión de Clase'}</span></div>
  </div>

  <!-- Objective -->
  <div class="objective-box">
    <strong>🎯 OBJETIVO DE APRENDIZAJE:</strong><br>
    ${currentClass.objective}
  </div>

  <!-- Montessori & Charlotte Mason 4-Step Route -->
  <div class="step-grid">
    <div class="step-card">
      <div class="step-card-title">1. Observación Concreta (Charlotte Mason)</div>
      Observa la idea en la vida real. Relaciónala con tu entorno cotidiano y lecturas vivas.
    </div>
    <div class="step-card">
      <div class="step-card-title">2. Descubrimiento Tactil (Montessori)</div>
      Manipula objetos, dibuja esquemas en tu cuaderno o prueba los simuladores.
    </div>
    <div class="step-card">
      <div class="step-card-title">3. Círculo de Narración</div>
      Expresa con tus propias palabras lo que aprendiste ante un familiar o el Profesor IA.
    </div>
    <div class="step-card">
      <div class="step-card-title">4. Misión Práctica y Evidencia</div>
      Desarrolla las actividades en tu libreta para consolidar tu maestría.
    </div>
  </div>

  <!-- Section 1: Intro -->
  <div class="section-title">I. INTRODUCCIÓN Y PASO A PASO EXPLICATIVO</div>
  <div style="font-size: 12px; margin-bottom: 12px; text-align: justify; line-height: 1.6;">
    ${currentClass.introduction || `Bienvenido a la lección de ${subjectName} sobre "${currentClass.theme}".`}
  </div>

  ${
    timeBreakdown.length > 0
      ? `
  <table class="breakdown-table">
    <thead>
      <tr>
        <th style="width: 25%;">Momento Pedagógico</th>
        <th style="width: 15%;">Tiempo</th>
        <th>Descripción del Trabajo</th>
      </tr>
    </thead>
    <tbody>
      ${timeBreakdown
        .map(
          (tb) => `
        <tr>
          <td><strong>${tb.phase}</strong></td>
          <td>${tb.minutes} min</td>
          <td>${tb.description}</td>
        </tr>
      `
        )
        .join('')}
    </tbody>
  </table>
  `
      : ''
  }

  <!-- Section 2: Core Content -->
  <div class="section-title">II. LECTURA Y DESARROLLO CONCEPTUAL DE LA LECCIÓN</div>
  <div class="reading-box">
${currentClass.reading || 'Revisa la lectura guiada disponible en la plataforma digital.'}
  </div>

  <!-- Section 3: Socratic Questions -->
  <div class="section-title">III. PREGUNTAS SOCRÁTICAS Y RAZONAMIENTO CRÍTICO</div>
  <p style="font-size: 11px; color: #475569; margin-bottom: 10px;">
    Responde en tu cuaderno o en los espacios asignados a continuación argumentando tu respuesta:
  </p>
  ${
    socraticQuestions.length > 0
      ? socraticQuestions
          .map(
            (q, idx) => `
    <div class="socratic-card">
      <strong>Pregunta ${idx + 1}:</strong> "${q}"
      <div class="handwriting-lines"></div>
      <div class="handwriting-lines"></div>
    </div>
  `
          )
          .join('')
      : `
    <div class="socratic-card">
      <strong>Pregunta de Reflexión:</strong> "${currentClass.reflectionPrompt || '¿Cómo aplicas este concepto en tu vida cotidiana?'}"
      <div class="handwriting-lines"></div>
      <div class="handwriting-lines"></div>
    </div>
  `
  }

  <!-- Section 4: Practical Activities -->
  <div class="section-title">IV. TALLER DE ACTIVIDADES Y RETOS PRÁCTICOS</div>
  ${
    activitiesList.length > 0
      ? activitiesList
          .map(
            (act, idx) => `
    <div class="activity-card">
      <div class="activity-header">
        <span>☐ Actividad ${idx + 1}: ${act.title}</span>
        <span class="activity-badge">+${act.points} pts</span>
      </div>
      <p style="font-size: 11.5px; color: #334155; margin: 4px 0 8px 0;">${act.description}</p>
      <div style="border: 1px dashed #cbd5e1; height: 50px; background-color: #fafafa; border-radius: 4px; padding: 6px; font-size: 10px; color: #94a3b8;">
        [Espacio para resolución, fórmulas, esquemas o redacción del estudiante]
      </div>
    </div>
  `
          )
          .join('')
      : `
    <div class="activity-card">
      <div class="activity-header">
        <span>☐ Taller en Libreta de Evidencias</span>
        <span class="activity-badge">Práctica Guiada</span>
      </div>
      <p style="font-size: 11.5px; color: #334155;">Desarrolla en tu cuaderno la guía de ejercicios prácticos asignada.</p>
    </div>
  `
  }

  <!-- Section 5: Homework -->
  <div class="section-title">V. TAREA DEL DÍA Y EVIDENCIA PARA EVALUACIÓN</div>
  <div class="homework-box">
    <strong>📌 CONSIGNA DE TAREA:</strong><br>
    ${currentClass.homeworkTask || 'Completa los ejercicios de tu libreta y toma una fotografía clara para subirla a la plataforma.'}
  </div>

  <!-- Signatures -->
  <table class="signatures-table">
    <tr>
      <td>
        <div class="signature-line"></div>
        Firma del Estudiante (${studentName})
      </td>
      <td>
        <div class="signature-line"></div>
        Firma del Representante / Tutor
      </td>
    </tr>
  </table>

</body>
</html>`;
}

/**
 * Downloads the guide HTML document directly or opens it in a new printable window.
 */
export function downloadClassGuide(
  currentClass: DailyClass,
  subject?: Subject,
  studentName: string = 'Estudiante',
  studentGrade: string = 'Educación General Básica'
): void {
  const htmlContent = generateClassGuideHTML(currentClass, subject, studentName, studentGrade);
  
  // Format clean file name
  let rawTitle = currentClass.guideTitle || `Guia_${subject?.code || 'Clase'}_${currentClass.theme}.html`;
  if (rawTitle.endsWith('.pdf')) {
    rawTitle = rawTitle.replace(/\.pdf$/i, '.html');
  } else if (!rawTitle.endsWith('.html')) {
    rawTitle += '.html';
  }

  // Create Blob and trigger download
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = rawTitle;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  // Also open print window preview automatically if popup allowed
  try {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
    }
  } catch (err) {
    console.log('Pop-up auto-preview blocked or non-interactive mode', err);
  }
}
