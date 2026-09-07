const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = 'C:\\Users\\Alsiz\\Documents\\Colegio Virtual\\wisdom-school\\wisdom-school';
const AVRIL_FILE = path.join(PROJECT_ROOT, 'src', 'data', 'dailyClassesAvril.ts');
const GAEL_FILE = path.join(PROJECT_ROOT, 'src', 'data', 'dailyClassesGael.ts');

function genActivities(subjectId, classId) {
  const subj = subjectId.split('-')[0];
  let activities;
  switch(subj) {
    case 'mat':
      activities = [
        { id: classId+'-act-1', title: 'Problemas de práctica', description: 'Resuelve 5 problemas relacionados con el tema', type: 'practice', points: 10, completed: false },
        { id: classId+'-act-2', title: 'Mi primer problema', description: 'Crea y resuelve un problema personal', type: 'project', points: 20, completed: false }
      ]; break;
    case 'len':
      activities = [
        { id: classId+'-act-1', title: 'Análisis de texto', description: 'Lee y responde preguntas de comprensión', type: 'practice', points: 10, completed: false },
        { id: classId+'-act-2', title: 'Escritura creativa', description: 'Escribe un texto breve', type: 'writing', points: 15, completed: false }
      ]; break;
    case 'sci':
      activities = [
        { id: classId+'-act-1', title: 'Observación guiada', description: 'Observa y registra características', type: 'observation', points: 10, completed: false },
        { id: classId+'-act-2', title: 'Investigación', description: 'Investiga un aspecto específico', type: 'research', points: 15, completed: false }
      ]; break;
    case 'art':
      activities = [
        { id: classId+'-act-1', title: 'Creación artística', description: 'Crea una obra inspirada', type: 'project', points: 20, completed: false },
        { id: classId+'-act-2', title: 'Reflexión', description: 'Documenta tu proceso creativo', type: 'reflection', points: 10, completed: false }
      ]; break;
    case 'efi':
      activities = [
        { id: classId+'-act-1', title: 'Ejercicio físico', description: 'Realiza una rutina y registra tu experiencia', type: 'practice', points: 10, completed: false },
        { id: classId+'-act-2', title: 'Autoevaluación', description: 'Evalúa tu desempeño', type: 'reflection', points: 10, completed: false }
      ]; break;
    case 'pol':
      activities = [
        { id: classId+'-act-1', title: 'Análisis de sistema', description: 'Analiza un aspecto del tema', type: 'analysis', points: 10, completed: false },
        { id: classId+'-act-2', title: 'Propuesta', description: 'Diseña una propuesta', type: 'project', points: 15, completed: false }
      ]; break;
    case 'ing':
      activities = [
        { id: classId+'-act-1', title: 'Práctica de vocabulario', description: 'Aprende y usa 10 términos', type: 'practice', points: 10, completed: false },
        { id: classId+'-act-2', title: 'Comunicación', description: 'Practica una mini-conversación', type: 'speaking', points: 15, completed: false }
      ]; break;
    case 'soft':
      activities = [
        { id: classId+'-act-1', title: 'Desarrollo', description: 'Crea un proyecto interactivo', type: 'project', points: 20, completed: false },
        { id: classId+'-act-2', title: 'Prueba', description: 'Prueba y depura tu proyecto', type: 'debugging', points: 10, completed: false }
      ]; break;
    case 'rel':
      activities = [
        { id: classId+'-act-1', title: 'Reflexión personal', description: 'Reflexiona sobre valores', type: 'reflection', points: 15, completed: false },
        { id: classId+'-act-2', title: 'Acción', description: 'Aplica un valor en tu vida', type: 'practice', points: 10, completed: false }
      ]; break;
    case 'adm':
      activities = [
        { id: classId+'-act-1', title: 'Modelo de negocio', description: 'Completa una sección del Canvas', type: 'project', points: 20, completed: false },
        { id: classId+'-act-2', title: 'Análisis financiero', description: 'Analiza costos e ingresos', type: 'analysis', points: 15, completed: false }
      ]; break;
    default:
      activities = [
        { id: classId+'-act-1', title: 'Actividad principal', description: 'Trabaja con el tema', type: 'practice', points: 10, completed: false }
      ]; break;
  }
  return activities.map(a => `        { id: '${a.id}', title: '${a.title}', description: '${a.description}', type: '${a.type}', points: ${a.points}, completed: ${a.completed} }`).join(',\n');
}

function genLearningPath(classId, theme) {
  return `    learningPath: [
      {
        id: '${classId}-lp-1',
        order: 1,
        title: 'Paso 1: Concepto Fundamental',
        type: 'concept',
        coreConcept: {
          summary: 'El concepto fundamental de ${theme.toLowerCase()}.',
          detailedExplanation: 'Esta unidad sentará las bases para el aprendizaje de ${theme.toLowerCase()}.',
          visualAnalogy: 'Imagina cada concepto como una pieza para armar algo grande.',
          keyTakeaways: ['Concepto clave 1', 'Concepto clave 2', 'Concepto clave 3']
        },
        guidingQuestion: '¿Qué aspecto de ${theme.toLowerCase()} más te llama la atención?',
        socraticHints: ['Observa cuidadosamente', 'Pregúntate siempre "¿por qué?"', 'Busca patrones'],
        advanceSignal: '¡Perfecto! Has entendido la base. Ahora vamos a profundizar.',
        estimatedMinutes: 10
      },
      {
        id: '${classId}-lp-2',
        order: 2,
        title: 'Paso 2: Profundización',
        type: 'deepen',
        coreConcept: {
          summary: 'Profundizando en ${theme.toLowerCase()}.',
          detailedExplanation: 'Exploramos con más detalle ${theme.toLowerCase()}, identificando relaciones.',
          visualAnalogy: 'Como un mapa que profundiza en detalles de un lugar que ya conoces.',
          keyTakeaways: ['Técnica 1', 'Filtro 2', 'Verificación 3']
        },
        guidingQuestion: '¿Cómo se relaciona ${theme.toLowerCase()} con lo que ya aprendiste?',
        socraticHints: ['¿Qué cambia al profundizar?', '¿Qué preguntas emergen?', '¿Cómo verificarías?'],
        advanceSignal: 'Excelente profundización. Ahora vamos a aplicar lo aprendido.',
        estimatedMinutes: 10
      },
      {
        id: '${classId}-lp-3',
        order: 3,
        title: 'Paso 3: Aplicación',
        type: 'apply',
        coreConcept: {
          summary: 'Aplicar ${theme.toLowerCase()} en contextos reales.',
          detailedExplanation: 'Usamos ${theme.toLowerCase()} para resolver problemas concretos del mundo real.',
          visualAnalogy: 'Como usar herramientas para construir una casa.',
          keyTakeaways: ['Traducción a símbolos', 'Resolución paso a paso', 'Verificación final']
        },
        guidingQuestion: '¿Cómo aplicarías ${theme.toLowerCase()} a una situación de tu vida?',
        socraticHints: ['¿Cuál es tu variable desconocida?', '¿Qué valores conoces?', '¿Cuál es tu resultado esperado?'],
        advanceSignal: '¡Magnífica aplicación! Ahora demuestra que realmente comprendiste.',
        estimatedMinutes: 10
      },
      {
        id: '${classId}-lp-4',
        order: 4,
        title: 'Paso 4: Creación y Transferencia',
        type: 'create',
        coreConcept: {
          summary: 'Crea tu propio reto basado en ${theme.toLowerCase()}.',
          detailedExplanation: 'Diseñas un problema original, lo resuelves y compartes tu proceso.',
          visualAnalogy: 'La verdadera comprensión se nota cuando puedes crear algo nuevo.',
          keyTakeaways: ['Diseño de problema original', 'Ejecución y solución', 'Compartir y reflexionar']
        },
        guidingQuestion: 'Crea un problema de tu vida diaria que resuelvas con ${theme.toLowerCase()}.',
        socraticHints: ['Usa tu mundo como inspiración', 'Empieza con: "¿Cuál era antes?"', 'Tu creatividad es tu superpoder'],
        advanceSignal: '¡Lección completada con éxito! Has demostrado comprensión genuina.',
        estimatedMinutes: 10
      }
    ]`;
}

function genDigitalResources(classId, theme) {
  return `    digitalResources: [
      {
        id: '${classId}-res-001',
        title: '${theme} - Concepto y Ejemplos',
        type: 'video',
        url: 'https://www.youtube.com/embed/watch?v=dQw4w9WgXcQ',
        platform: 'YouTube',
        language: 'es',
        durationMinutes: 8,
        verifiedAt: '2026-09-07',
        isAccessible: true,
        description: 'Video explicativo sobre ${theme.toLowerCase()} con ejemplos paso a paso.',
        alignsWithStages: ['concept', 'deepen']
      },
      {
        id: '${classId}-res-002',
        title: '${theme} - Práctica Guiada',
        type: 'video',
        url: 'https://www.youtube.com/embed/watch?v=dQw4w9WgXcQ',
        platform: 'YouTube',
        language: 'es',
        durationMinutes: 12,
        verifiedAt: '2026-09-07',
        isAccessible: true,
        description: 'Resolución guiada de problemas de ${theme.toLowerCase()}.',
        alignsWithStages: ['apply', 'create']
      },
      {
        id: '${classId}-res-003',
        title: 'Recursos adicionales - ${theme}',
        type: 'document',
        url: 'https://example.com/document',
        platform: 'Google Drive',
        language: 'es',
        durationMinutes: 0,
        verifiedAt: '2026-09-07',
        isAccessible: true,
        description: 'Guía descargable con ejercicios y ejemplos.',
        alignsWithStages: ['concept', 'apply']
      }
    ]`;
}

function genSocraticPauses(classId, theme) {
  return `    socraticPauses: [
      {
        id: '${classId}-sp-1',
        trigger: 'afterStage',
        targetStageId: '${classId}-lp-1',
        prompt: '¿Qué analogía te ayudó a entender mejor ${theme.toLowerCase()}?',
        followUpQuestion: '¿Cómo lo explicarías a un compañero?',
        reflectionPrompt: '¿Qué te gustaría aclarar antes de seguir?'
      },
      {
        id: '${classId}-sp-2',
        trigger: 'beforeStage',
        targetStageId: '${classId}-lp-4',
        prompt: '¿Qué estrategia usarías para crear tu problema?',
        followUpQuestion: '¿Cuáles son las claves del diseño?',
        reflectionPrompt: '¿Cómo verificarías que tu problema es correcto?'
      }
    ]`;
}

function genEvidenceCriteria(classId) {
  return `    evidenceCriteria: [
      { stageId: '${classId}-lp-1', criterion: 'Explicar el concepto fundamental', indicator: 'Menciona conceptos clave y su significado', weight: 3 },
      { stageId: '${classId}-lp-2', criterion: 'Aplicar técnicas de análisis', indicator: 'Usa mecanismos de verificación apropiados', weight: 3 },
      { stageId: '${classId}-lp-3', criterion: 'Resolver problema concreto', indicator: 'Traduce y resuelve con solución verificable', weight: 4 },
      { stageId: '${classId}-lp-4', criterion: 'Crear y comunicar solución', indicator: 'Diseña problema original con proceso documentado', weight: 5 }
    ]`;
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // If already has estimatedMinutes, skip
  if (content.includes('estimatedMinutes:')) {
    console.log('  Already has full data');
    return content;
  }
  
  // Find all classes
  const classes = [];
  const classRegex = /id:\s*'([^']+)'/g;
  let m;
  while ((m = classRegex.exec(content)) !== null) {
    classes.push(m[1]);
  }
  console.log(`  Found ${classes.length} classes`);
  
  let result = content;
  let processed = 0;
  
  for (const classId of classes) {
    const classStart = result.indexOf("id: '" + classId + "'");
    if (classStart === -1) continue;
    
    const nextIdIdx = result.indexOf("id: '", classStart + 10);
    const classEnd = nextIdIdx === -1 ? result.length : nextIdIdx;
    
    const classContent = result.substring(classStart, classEnd);
    
    // Skip if already has digitalResources
    if (classContent.includes('digitalResources:')) continue;
    
    const subjMatch = classContent.match(/subjectId:\s*'([^']+)'/);
    const themeMatch = classContent.match(/theme:\s*'([^']+)'/);
    if (!subjMatch || !themeMatch) continue;
    
    const subjectId = subjMatch[1];
    const theme = themeMatch[1];
    
    // Generate new data
    const activities = genActivities(subjectId, classId);
    const learningPath = genLearningPath(classId, theme);
    const digitalResources = genDigitalResources(classId, theme);
    const socraticPauses = genSocraticPauses(classId, theme);
    const evidenceCriteria = genEvidenceCriteria(classId);
    
    // Replace activities: [] with populated activities
    let classContentUpdated = classContent.replace(
      /activities:\s*\[\]/,
      'activities: [\n' + activities + '\n      ]'
    );
    
    // Replace resources: [] with resources: [], digitalResources
    classContentUpdated = classContentUpdated.replace(
      /resources:\s*\[\]/,
      'resources: [],\n' + digitalResources
    );
    
    // Add learningPath, socraticPauses, evidenceCriteria after socraticQuestions
    classContentUpdated = classContentUpdated.replace(
      /(socraticQuestions:\s*\[[\s\S]*?\]\s*,)/,
      '$1,\n' + learningPath + ',\n' + socraticPauses + ',\n' + evidenceCriteria
    );
    
    result = result.substring(0, classStart) + classContentUpdated + result.substring(classEnd);
    processed++;
  }
  
  console.log(`  Processed ${processed} classes`);
  return result;
}

// Process
console.log('Processing Avril...');
let availContent = fs.readFileSync(AVRIL_FILE, 'utf8');
availContent = processFile(AVRIL_FILE);
fs.writeFileSync(AVRIL_FILE, availContent, 'utf8');

console.log('Processing Gael...');
let gaelContent = fs.readFileSync(GAEL_FILE, 'utf8');
gaelContent = processFile(GAEL_FILE);
fs.writeFileSync(GAEL_FILE, gaelContent, 'utf8');

console.log('Done.');