import React, { useEffect, useRef, useState } from 'react';
import { DailyClass, MicroLesson, Student, Subject } from '../../types';
import { requestLessonBite, requestReExplanation } from '../../services/aiService';
import { getWorldDecor, getWorldTheme } from '../../utils/studentTheme';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  FlaskConical,
  HelpCircle,
  Lightbulb,
  Loader2,
  RotateCcw,
  Sparkles,
  XCircle,
} from 'lucide-react';

interface MicroLessonPlayerProps {
  dailyClass: DailyClass;
  subject: Subject;
  student: Student;
  onGoToLab: () => void;
  onStepsResolved?: (steps: { title: string; text: string }[]) => void;
}

type BiteState = { status: 'loading' } | { status: 'failed' } | { status: 'ready'; lesson: MicroLesson };
type AiHelp = { status: 'idle' | 'loading' | 'ready' | 'failed'; text: string | null };

const MICRO_TOTAL = 3;
const OPTION_LETTERS = ['A', 'B', 'C'];

// Contenido de relleno instantáneo (y definitivo si la IA no responde): el learningPath ya escrito de la clase.
const fallbackLesson = (dailyClass: DailyClass, i: number): MicroLesson => {
  const stage = (dailyClass.learningPath || [])[i];
  const cc = stage?.coreConcept;
  return {
    id: `micro-${dailyClass.id}-L${i + 1}-fb`,
    title: stage?.title ? stage.title.replace(/^Paso\s*\d+\s*[:\-—]\s*/i, '') : `Lo esencial de ${dailyClass.theme} (${i + 1})`,
    theory: [cc?.summary, cc?.detailedExplanation].filter(Boolean).join(' ') || `Hoy descubrimos una pieza clave de "${dailyClass.theme}". Avanza y pregúntale a tu profesor lo que no quede claro.`,
    analogy: cc?.visualAnalogy,
    example: Array.isArray(cc?.keyTakeaways) ? cc.keyTakeaways.slice(0, 2).join(' · ') : undefined,
    quiz: null,
  };
};

export const MicroLessonPlayer: React.FC<MicroLessonPlayerProps> = ({ dailyClass, subject, student, onGoToLab, onStepsResolved }) => {
  const theme = getWorldTheme(student);
  const world = getWorldDecor(student);
  const teacher = subject.teacher;

  const [lessonIndex, setLessonIndex] = useState(0);
  const [bites, setBites] = useState<Record<number, BiteState>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [aiHelp, setAiHelp] = useState<AiHelp>({ status: 'idle', text: null });
  const [wrongCount, setWrongCount] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [finished, setFinished] = useState(false);
  const [cleared, setCleared] = useState<number[]>([]);
  const requestingRef = useRef<Set<number>>(new Set());
  const aiCallsRef = useRef<Record<number, number>>({});

  const view = (i: number): MicroLesson => {
    const b = bites[i];
    if (b?.status === 'ready') return b.lesson;
    return fallbackLesson(dailyClass, i);
  };

  const ensureBite = async (i: number, force = false) => {
    if (i < 0 || i >= MICRO_TOTAL) return;
    if (!force && (bites[i] || requestingRef.current.has(i))) return;
    requestingRef.current.add(i);
    setBites((prev) => ({ ...prev, [i]: { status: 'loading' } }));
    const covered = Array.from({ length: i }, (__, k) => view(k)).map((l) => l.title).filter(Boolean);
    const lesson = await requestLessonBite({
      student,
      teacher,
      subject,
      dailyClass,
      index: i + 1,
      total: MICRO_TOTAL,
      covered,
    });
    requestingRef.current.delete(i);
    setBites((prev) => ({ ...prev, [i]: lesson ? { status: 'ready', lesson } : { status: 'failed' } }));
  };

  useEffect(() => {
    setBites({});
    setLessonIndex(0);
    setSelectedOption(null);
    setReviewOpen(false);
    setAiHelp({ status: 'idle', text: null });
    setWrongCount(0);
    setFinished(false);
    setCleared([]);
    requestingRef.current = new Set();
    aiCallsRef.current = {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dailyClass?.id, student?.id, subject?.id]);

  // ensureBite es idempotente: asegura la lección actual y precarga la siguiente.
  useEffect(() => {
    void ensureBite(lessonIndex);
    void ensureBite(lessonIndex + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonIndex, dailyClass?.id, bites]);

  const lesson = view(lessonIndex);

  // Expone al padre los pasos REALES que la ruta muestra (title+theory de cada bite).
  // Solo publica cuando TODAS las micro-lecciones terminaron (ready|failed): así la guía nunca
  // publica placeholders a medias ni pasos de otra clase.
  useEffect(() => {
    if (!onStepsResolved) return;
    const allSettled = Array.from({ length: MICRO_TOTAL }).every((_, i) => bites[i] && bites[i].status !== 'loading');
    if (!allSettled) return;
    const steps = Array.from({ length: MICRO_TOTAL }).map((_, i) => {
      const l = view(i);
      return { title: l.title, text: [l.theory, l.analogy, l.example].filter(Boolean).join(' ') };
    });
    onStepsResolved(steps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bites, dailyClass?.id, subject?.id]);
  const quiz = lesson.quiz;
  const answered = selectedOption !== null;
  const isCorrect = answered && !!quiz && selectedOption === quiz.correctIndex;
  const isLast = lessonIndex >= MICRO_TOTAL - 1;
  const canAdvance = !quiz || cleared.includes(lessonIndex);

  const goTo = (i: number) => {
    if (i < 0 || i >= MICRO_TOTAL) return;
    setLessonIndex(i);
    setSelectedOption(null);
    setReviewOpen(false);
    setAiHelp({ status: 'idle', text: null });
  };

  const handleAnswer = (i: number) => {
    if (selectedOption !== null || !quiz) return;
    setSelectedOption(i);
    const correctText = quiz.options[quiz.correctIndex];
    if (i === quiz.correctIndex) {
      setCelebrate(true);
      window.setTimeout(() => setCelebrate(false), 1600);
      setReviewOpen(false);
      setCleared((c) => (c.includes(lessonIndex) ? c : [...c, lessonIndex]));
      return;
    }
    // FALLÓ: explicación determinista INMEDIATA (con el contenido real de la ficha) + versión del profe en paralelo.
    setWrongCount((w) => w + 1);
    setCelebrate(false);
    setReviewOpen(true);
    if (!aiCallsRef.current[lessonIndex]) {
      aiCallsRef.current[lessonIndex] = 1;
      setAiHelp({ status: 'loading', text: null });
      requestReExplanation({
        student,
        teacher,
        subject,
        dailyClass,
        explanation: {
          theory: lesson.theory,
          analogy: lesson.analogy,
          example: lesson.example,
          question: quiz.question,
          correctAnswer: correctText,
        },
      })
        .then((text) => setAiHelp(text ? { status: 'ready', text } : { status: 'failed', text: null }))
        .catch(() => setAiHelp({ status: 'failed', text: null }));
    }
  };

  const retryQuiz = () => {
    setSelectedOption(null); // la explicación (reviewOpen) permanece visible como apoyo
  };

  const handleContinue = () => {
    if (isLast) {
      setFinished(true);
      return;
    }
    goTo(lessonIndex + 1);
  };

  const correctText = quiz ? quiz.options[quiz.correctIndex] : '';
  const correctLetter = quiz ? OPTION_LETTERS[quiz.correctIndex] : '';

  const routeCompleted = (isLast && answered && isCorrect) || finished;

  const restart = () => {
    setFinished(false);
    setReviewOpen(false);
    setSelectedOption(null);
    setAiHelp({ status: 'idle', text: null });
    setCleared([]);
    setWrongCount(0);
    setLessonIndex(0);
    aiCallsRef.current = {};
  };

  const accentBg = `linear-gradient(135deg, ${theme.accent}, ${theme.accent}cc)`;
  const bite = bites[lessonIndex];
  const quizPreparing = !!bite && bite.status !== 'ready' && !quiz;

  return (
    <div className="rounded-3xl border overflow-hidden bg-slate-900/80 shadow-2xl relative" style={{ borderColor: `${theme.accent}44` }}>
      {celebrate && (
        <div className="absolute inset-0 pointer-events-none z-20 flex justify-around items-start pt-10 select-none" aria-hidden>
          {['🎉', '⭐', '✨', '🎊', '🌟'].map((e, i) => (
            <span key={i} className="text-3xl animate-bounce" style={{ animationDelay: `${i * 90}ms`, animationDuration: '900ms' }}>{e}</span>
          ))}
        </div>
      )}

      {/* CABECERA DE LA RUTA */}
      <div className="p-4 sm:p-5 border-b" style={{ background: `linear-gradient(135deg, ${theme.accent}26, rgba(15,23,42,0.94) 60%)` }}>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-2xl shrink-0">{world.emoji}</span>
            <div className="min-w-0">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block">Ruta interactiva · {dailyClass.theme}</span>
              <h2 className="text-base sm:text-lg font-black text-white leading-tight truncate">{lesson.title}</h2>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <span className="text-xs font-black" style={{ color: theme.accent }}>{Math.min(lessonIndex + 1, MICRO_TOTAL)}/{MICRO_TOTAL}</span>
            <span className="text-[9px] uppercase font-black tracking-wider text-slate-500 block">micro-lecciones</span>
          </div>
        </div>
        <div className="flex gap-1.5 mt-3">
          {Array.from({ length: MICRO_TOTAL }).map((__, i) => (
            <div key={i} className="h-1.5 flex-1 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: cleared.includes(i) || i < lessonIndex ? '100%' : i === lessonIndex ? (answered ? '100%' : bite?.status === 'ready' ? '55%' : '25%') : '0%',
                  background: cleared.includes(i) || i < lessonIndex ? 'linear-gradient(90deg,#10b981,#34d399)' : theme.accent,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* CUERPO */}
      <div className="p-4 sm:p-6 space-y-5 min-h-[420px] flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full inline-block" style={{ background: `${theme.accent}22`, color: theme.accent, border: `1px solid ${theme.accent}55` }}>
            Lección {lessonIndex + 1} de {MICRO_TOTAL}
          </span>
          {bite?.status === 'loading' && (
            <span className="text-[10px] text-slate-500 inline-flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" /> {teacher?.name} la está puliendo con IA…</span>
          )}
        </div>

        {/* FICHA DE TEORÍA (siempre visible: es el sustento) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
          <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" style={{ color: theme.accent }} /> ¿Qué aprendemos?</span>
          <p className="text-sm sm:text-[15px] text-slate-200 leading-relaxed whitespace-pre-line">{lesson.theory}</p>
          {lesson.analogy && (
            <div className="mt-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-amber-100 leading-relaxed"><strong className="text-amber-300">Piénsalo así:</strong> {lesson.analogy}</p>
            </div>
          )}
          {lesson.example && (
            <div className="mt-2 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-indigo-300 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed"><strong className="text-indigo-300">Ejemplo:</strong> {lesson.example}</p>
            </div>
          )}
        </div>

        {/* EXPLICACIÓN AL FALLO: determinista e inmediata + versión del profe cuando llega */}
        {reviewOpen && quiz && (
          <div className="p-4 sm:p-5 rounded-2xl border space-y-3 bg-amber-950/25 border-amber-500/40">
            <h4 className="text-base font-black text-amber-200 flex items-center gap-2"><HelpCircle className="w-4 h-4" /> {teacher?.name} te lo explica (sin prisa) 💛</h4>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <p className="text-sm text-emerald-300 font-bold">✔ La respuesta correcta es <span className="underline decoration-emerald-500/40 decoration-2 underline-offset-2">«{correctText}»</span> (opción {correctLetter}).</p>
              <p className="text-xs text-slate-300 leading-relaxed"><span className="text-slate-500 font-black uppercase tracking-wider text-[9px] block mb-0.5">Lo que dice tu ficha</span>{selectedOption !== null ? lesson.theory : `${quiz.question} → «${correctText}» porque ${quiz.correctExplanation || 'así lo enseña la ficha de arriba'}. Relee la ficha, respira y vuelve a intentarlo.`}</p>
              {lesson.example && selectedOption !== null && (
                <p className="text-xs text-indigo-100 leading-relaxed"><span className="text-slate-500 font-black uppercase tracking-wider text-[9px] block mb-0.5">Con el ejemplo de la lección</span>{lesson.example}</p>
              )}
              {aiHelp.status === 'loading' && (
                <p className="text-[11px] text-slate-400 flex items-center gap-1.5"><Loader2 className="w-3 h-3 animate-spin" /> {teacher?.name} además te lo cuenta con otras palabras…</p>
              )}
              {aiHelp.status === 'ready' && aiHelp.text && (
                <div className="pt-1 border-t border-slate-800 mt-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block mb-0.5">🔁 Con otras palabras</span>
                  <p className="text-[13px] text-amber-50 leading-relaxed whitespace-pre-line">{aiHelp.text}</p>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <button
                onClick={retryQuiz}
                className="flex-1 px-4 py-3 rounded-xl text-sm font-black text-white shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 hover:brightness-110"
                style={{ background: accentBg, boxShadow: `0 8px 22px ${theme.accent}44` }}
              >
                <RotateCcw className="w-4 h-4" /> Reintentar el reto (ahora sí)
              </button>
              <button onClick={handleContinue} className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5">
                Continuar sin reintentar <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ZONA DEL RETO */}
        {quiz && !answered && (
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/70 border space-y-3.5" style={{ borderColor: `${theme.accent}44` }}>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 shrink-0" style={{ color: theme.accent }} />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{reviewOpen ? 'Reta de nuevo con lo que aprendiste' : 'Reto de comprensión'}</span>
            </div>
            <p className="text-sm sm:text-base font-bold text-white leading-snug">{quiz.question}</p>
            <div className="space-y-2.5 pt-1">
              {quiz.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full text-left p-3.5 rounded-xl border bg-slate-900/70 border-slate-700 hover:border-slate-500 text-slate-200 transition-all active:scale-[0.99] flex items-center gap-3"
                >
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 bg-slate-800 text-slate-400">{OPTION_LETTERS[i]}</span>
                  <span className="text-sm font-semibold leading-snug">{opt}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULTADO: ACIERTO */}
        {quiz && answered && isCorrect && (
          <div className={`p-4 sm:p-5 rounded-2xl border space-y-3 bg-emerald-950/40 border-emerald-500/40 ${isLast ? 'hidden' : ''}`}>
            <p className="text-3xl text-center leading-none select-none">🎉</p>
            <h4 className="text-lg font-black text-emerald-300 text-center">¡Correcto, {student.name}! {world.celebrationWord}</h4>
            {quiz.correctExplanation && <p className="text-sm text-emerald-100/90 text-center leading-relaxed">{quiz.correctExplanation}</p>}
            <button
              onClick={handleContinue}
              className="w-full py-3.5 rounded-xl text-sm font-black text-white shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 hover:brightness-110"
              style={{ background: accentBg, boxShadow: `0 10px 28px ${theme.accent}44` }}
            >
              <span>{isLast ? '¡Finalizar la ruta!' : 'Continuar al siguiente paso'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* MARCAS VISUALES tras respuesta incorrecta (el review ya explica; esto muestra por qué falló) */}
        {quiz && answered && !isCorrect && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {quiz.options.map((opt, i) => (
              <div key={i} className={`p-2.5 rounded-xl border text-[12px] leading-snug flex items-start gap-2 ${i === quiz.correctIndex ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-100' : i === selectedOption ? 'bg-rose-950/40 border-rose-500/40 text-rose-50' : 'bg-slate-900/40 border-slate-800 text-slate-500'}`}>
                {i === quiz.correctIndex ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> : i === selectedOption ? <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" /> : <span className="w-4 shrink-0" />}
                <span><strong>{OPTION_LETTERS[i]}.</strong> {opt}</span>
              </div>
            ))}
          </div>
        )}

        {quizPreparing && !answered && (
          <div className="p-4 rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 flex items-center gap-3">
            <Loader2 className="w-4 h-4 animate-spin shrink-0" style={{ color: theme.accent }} />
            <p className="text-xs text-slate-400">Relee tranquilo/a la ficha: mientras tanto {teacher?.name} está terminando tu reto de opción múltiple para esta lección…</p>
          </div>
        )}

        {bite?.status === 'failed' && !quiz && (
          <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-700/70 flex items-center justify-between gap-3 flex-wrap">
            <p className="text-[11px] text-slate-400">El reto con IA tarda por la red gratuita — usa el chat con {teacher?.name} para repasar 💬</p>
            <button onClick={() => void ensureBite(lessonIndex, true)} className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-black uppercase tracking-wider">Reintentar</button>
          </div>
        )}

        {!quiz && !reviewOpen && (
          <button
            onClick={handleContinue}
            className="w-full py-3.5 rounded-xl text-sm font-black text-white shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 hover:brightness-110"
            style={{ background: accentBg, boxShadow: `0 10px 28px ${theme.accent}44` }}
          >
            <span>Entendí, {isLast ? 'finalizar la ruta' : 'siguiente lección'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {/* NAVEGACIÓN CLARIA: retroceder / avanzar siempre visibles */}
        <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={() => goTo(lessonIndex - 1)}
            disabled={lessonIndex === 0}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 text-xs font-black flex items-center gap-1.5 transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> Volver
          </button>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: MICRO_TOTAL }).map((__, i) => (
              <span key={i} className={`w-2 h-2 rounded-full ${cleared.includes(i) ? 'bg-emerald-400' : i === lessonIndex ? 'animate-pulse' : 'bg-slate-700'}`} style={i === lessonIndex && !cleared.includes(i) ? { background: theme.accent } : undefined} title={`Lección ${i + 1}${cleared.includes(i) ? ' · superada ✔' : ''}`} />
            ))}
          </div>
          {isLast ? (
            <button
              onClick={handleContinue}
              disabled={!canAdvance && !finished}
              className="px-4 py-2.5 rounded-xl text-xs font-black text-white flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: canAdvance ? 'linear-gradient(135deg,#10b981,#34d399)' : '#334155', color: canAdvance ? '#052e16' : '#94a3b8' }}
              title={!canAdvance ? 'Primero supera el reto (o usa «Continuar sin reintentar»)' : undefined}
            >
              Finalizar ruta <CheckCircle2 className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleContinue}
              disabled={!canAdvance}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-black flex items-center gap-1.5 transition-all"
              title={!canAdvance ? 'Responde bien el reto para desbloquear' : undefined}
            >
              Avanzar <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* PANTALLA DE ÉXITO FINAL */}
      {routeCompleted && (
        <div className="border-t p-4 sm:p-6 bg-gradient-to-b from-emerald-950/30 to-slate-950/60 relative overflow-hidden" style={{ borderColor: '#10b98155' }}>
          <div className="absolute inset-x-0 top-0 flex justify-around select-none pointer-events-none text-xl opacity-80"><span>🎊</span><span>⭐</span><span>🎊</span></div>
          <div className="flex flex-col items-center text-center gap-4 pt-3">
            <div className="text-5xl animate-bounce select-none">🏆</div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Etapa completada</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">¡Lo lograste, {student.name}!</h3>
              <p className="text-sm text-slate-300 mt-2 max-w-md leading-relaxed">
                {teacher?.name} confirma que dominaste <strong className="text-white">{dailyClass.theme}</strong>: {MICRO_TOTAL} micro-lecciones con sus retos. {world.celebrationWord}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">{wrongCount === 0 ? 'Ruta perfecta: todos los retos al primer intento' : `${MICRO_TOTAL - wrongCount}/${MICRO_TOTAL} retos al primer intento`}</p>
            </div>
            <button
              onClick={onGoToLab}
              className="w-full max-w-md py-5 rounded-2xl text-white shadow-2xl transition-all active:scale-[0.97] hover:brightness-110 flex items-center justify-center gap-3 group animate-pulse"
              style={{ background: `linear-gradient(135deg, #0ea5e9, ${theme.accent})`, boxShadow: `0 16px 44px ${theme.accent}55` }}
            >
              <FlaskConical className="w-7 h-7 group-hover:rotate-12 transition-transform" />
              <span className="text-left">
                <span className="block text-base font-black leading-tight">IR AL LABORATORIO DIGITAL</span>
                <span className="block text-[10px] font-bold uppercase tracking-widest opacity-80">refuerza lo aprendido con video y simulador</span>
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={restart} className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-all">
              <RotateCcw className="w-3.5 h-3.5" /> Repasar la ruta
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
