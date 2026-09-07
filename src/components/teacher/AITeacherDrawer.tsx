import React, { useState, useEffect, useRef } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { askAITeacher, ChatMessage, renderMarkdownToHtml } from '../../services/aiService';
import { Bot, X, Send, Loader2, BookOpen, Volume2, VolumeX, Play, Pause, StopCircle } from 'lucide-react';

export const AITeacherDrawer: React.FC = () => {
  const {
    isTeacherDrawerOpen,
    setIsTeacherDrawerOpen,
    activeSubject,
    activeClass,
    currentStudent,
    studentSubjects,
    todayClasses,
  } = useSchool();

  const subject = activeSubject || studentSubjects[0];
  const dailyClass = activeClass || todayClasses[0];
  const teacher = subject?.teacher;

  const studentTheme = (() => {
    const base = currentStudent?.colorTheme || {
      accent: '#6366f1',
      primary: 'indigo',
      secondary: 'violet',
      gradient: 'from-indigo-600 via-violet-600 to-purple-600',
    };

    if (currentStudent?.id === 'avril') {
      return { ...base, accent: '#7c9cff', chip: '#fff8d6', textStrong: '#1f2937', label: 'Peanuts' };
    }
    if (currentStudent?.id === 'gael') {
      return { ...base, accent: '#e11d48', chip: '#fef3c7', textStrong: '#111827', label: 'Super Mario Bros' };
    }
    return { ...base, chip: '#1f2937', textStrong: '#f8fafc', label: 'Original' };
  })();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // --- ESTADOS PARA LA VOZ ---
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  
  // Referencia para destruir fantasmas (tiempos de espera ocultos)
  const playTimeoutRef = useRef<any>(null);

  // --- VIGILANTE ANTI-BUG DE CHROME ---
  useEffect(() => {
    const interval = setInterval(() => {
      if (speakingId && window.speechSynthesis) {
        if (!window.speechSynthesis.speaking && !window.speechSynthesis.pending && !isPaused) {
          setSpeakingId(null);
          setIsPaused(false);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [speakingId, isPaused]);

  // --- MOTOR MULTIMEDIA DE VOZ INTELIGENTE ---
  const handlePlayVoice = (text: string, messageId: string) => {
    if (!window.speechSynthesis) return;

    // Destruye cualquier orden de lectura pendiente
    if (playTimeoutRef.current) clearTimeout(playTimeoutRef.current);

    // Si tocamos reanudar
    if (speakingId === messageId && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    // Cortar totalmente para empezar limpio
    window.speechSynthesis.cancel();
    setIsPaused(false);

    // Damos un respiro de 200ms a la computadora antes de iniciar
    playTimeoutRef.current = setTimeout(() => {
      const cleanText = text.replace(/[*_#`~]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      const teacherNameLower = (teacher?.name || '').toLowerCase().trim();
      const isFemale = (teacher as any)?.gender === 'female' || 
                       teacherNameLower.endsWith('a') || 
                       teacherNameLower.includes('miss') || 
                       teacherNameLower.includes('profesora');

      const voices = window.speechSynthesis.getVoices();
      const esVoices = voices.filter(v => v.lang.startsWith('es'));
      let selectedVoice = null;

      if (esVoices.length > 0) {
        const femaleNames = ['sabina', 'helena', 'laura', 'monica', 'paulina', 'victoria', 'zira', 'lucia', 'conchita', 'mia', 'sofia', 'female', 'mujer'];
        const maleNames = ['jorge', 'diego', 'pablo', 'raul', 'carlos', 'david', 'antonio', 'juan', 'male', 'hombre'];

        selectedVoice = esVoices.find(v => {
          const vName = v.name.toLowerCase();
          return isFemale ? femaleNames.some(name => vName.includes(name)) : maleNames.some(name => vName.includes(name));
        });

        if (!selectedVoice) {
          selectedVoice = esVoices.find(v => ['es-MX', 'es-US', 'es-CO', 'es-AR'].includes(v.lang)) || esVoices[0];
        }
      }
      
      if (selectedVoice) utterance.voice = selectedVoice;
      
      utterance.pitch = isFemale ? 1.15 : 0.85; 
      utterance.rate = 1.0;

      // Eventos de estado para la UI
      utterance.onstart = () => { setSpeakingId(messageId); setIsPaused(false); };
      utterance.onend = () => { setSpeakingId(null); setIsPaused(false); };
      utterance.onerror = () => { setSpeakingId(null); setIsPaused(false); };
      utterance.onpause = () => { setIsPaused(true); };
      utterance.onresume = () => { setIsPaused(false); };

      window.speechSynthesis.speak(utterance);
    }, 200);
  };

  const handlePauseVoice = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleStopVoice = () => {
    // ESTO ES CLAVE: Aniquila los audios fantasmas en espera
    if (playTimeoutRef.current) clearTimeout(playTimeoutRef.current);
    
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      setIsPaused(false);
    }
  };

  useEffect(() => {
    if (!isTeacherDrawerOpen) handleStopVoice();
  }, [isTeacherDrawerOpen]);

  // 1. SALUDO INICIAL INTELIGENTE
  useEffect(() => {
    if (teacher && subject && isTeacherDrawerOpen && messages.length === 0) {
      
      // Si viene de un botón automático de la clase, OMITIMOS el saludo inicial para evitar conflicto de voces
      const pendingPrompt = localStorage.getItem('pending_socratic_prompt');
      if (pendingPrompt) return;

      const greetingId = `msg-${Date.now()}`;
      const greetingContent = `¡Hola ${currentStudent.name}! Soy ${teacher.name}, tu tutor de ${subject.name}. Hoy estamos enfocados en "${dailyClass?.theme || 'repasar la materia'}". ¿Por dónde te gustaría comenzar a razonar?`;
      
      const greeting: ChatMessage = {
        id: greetingId,
        role: 'model',
        content: greetingContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([greeting]);

      if (isVoiceEnabled) {
        handlePlayVoice(greetingContent, greetingId);
      }
    }
  }, [teacher?.id, currentStudent.id, subject?.id, dailyClass?.id, isTeacherDrawerOpen]);

  // 2. Auto-Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // 3. ENVÍO DE MENSAJE
  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputValue.trim();
    if (!textToSend || isLoading || !teacher || !subject) return;

    // Callamos obligatoriamente a la IA actual antes de enviarle un mensaje nuevo
    handleStopVoice();

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages); 
    setInputValue('');
    setIsLoading(true);

    try {
      const conversationHistory = updatedMessages.map((m) => ({ role: m.role, content: m.content }));
      const fallbackClass = dailyClass || { id: 'repaso-general', theme: 'Repaso General', objective: 'Repasar.' };

      const reply = await askAITeacher({
        student: currentStudent,
        teacher,
        subject,
        dailyClass: fallbackClass as any,
        conversationHistory,
        message: textToSend,
      });

      const replyId = `msg-model-${Date.now()}`;
      const modelMessage: ChatMessage = {
        id: replyId,
        role: 'model',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, modelMessage]);

      // Al generarse la respuesta final, la lee
      if (isVoiceEnabled) {
        handlePlayVoice(reply, replyId);
      }

    } catch (err: any) {
      console.error(err);
      const isSystemError = err.message?.includes('SISTEMA DE EMERGENCIA');
      const errId = `msg-err-${Date.now()}`;
      const errorMessage: ChatMessage = { 
        id: errId, 
        role: 'model', 
        content: isSystemError ? err.message : 'Disculpa, tuve un pequeño fallo de memoria temporal. ¿Podrías repetirme tu idea?', 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setMessages((prev) => [...prev, errorMessage]);
      
      if (isVoiceEnabled && !isSystemError) {
        handlePlayVoice(errorMessage.content, errId);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Referencia para progresión automática de la clase
  const lastActivityRef = useRef(Date.now());
  const classIntervalRef = useRef<any>(null);

// 4. PUENTE DE TELEPATÍA
  useEffect(() => {
    if (isTeacherDrawerOpen) {
      lastActivityRef.current = Date.now();
      const pendingPrompt = localStorage.getItem('pending_socratic_prompt');
      if (pendingPrompt) {
        localStorage.removeItem('pending_socratic_prompt');
        setTimeout(() => handleSendMessage(pendingPrompt), 300);
      }
    }
  }, [isTeacherDrawerOpen]);

  // 5. PROGRESIÓN AUTOMÁTICA: El profesor avanza la clase si hay inactividad
  useEffect(() => {
    if (!isTeacherDrawerOpen || isLoading) return;
    
    classIntervalRef.current = setInterval(() => {
      const inactiveMs = Date.now() - lastActivityRef.current;
      // Si han pasado 90 segundos sin actividad y hay mensajes (no es el saludo inicial)
      if (inactiveMs > 90000 && messages.length > 1) {
        const followUpPrompts = [
          `Profesor, ¿podrías darme otro ejemplo para entender mejor "${dailyClass?.theme || 'el tema'}"?`,
          `¿Cómo se conecta esto con lo que aprendimos antes?`,
          `¿Qué aplicaciones prácticas tiene esto en la vida real?`,
          `Profesor, ¿me puedes plantear otro reto para seguir profundizando?`,
        ];
        const randomPrompt = followUpPrompts[Math.floor(Math.random() * followUpPrompts.length)];
        handleSendMessage(randomPrompt);
        lastActivityRef.current = Date.now();
      }
    }, 30000); // Revisar cada 30 segundos
    
    return () => {
      if (classIntervalRef.current) clearInterval(classIntervalRef.current);
    };
  }, [isTeacherDrawerOpen, isLoading, messages.length, dailyClass?.theme]);

  if (!isTeacherDrawerOpen || !teacher || !subject) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden flex justify-end bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div className="w-full max-w-lg border-l shadow-2xl flex flex-col h-full bg-slate-900 transition-transform duration-300 translate-x-0"
        style={{ background: 'linear-gradient(180deg, rgba(15,23,42,0.98), rgba(15,23,42,0.94))', borderColor: `${studentTheme.accent}55` }}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b flex items-center justify-between shadow-md" style={{ background: `linear-gradient(135deg, ${studentTheme.accent}22, rgba(15,23,42,0.92) 60%, rgba(2,6,23,0.96))` }}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={teacher.avatar} alt={teacher.name} className="w-12 h-12 rounded-2xl object-cover ring-2 shadow" style={{ boxShadow: `0 0 0 2px ${studentTheme.accent}55` }} />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900" title="Activo" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">{teacher.name}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-white">Tutor IA</span>
              </div>
              <p className="text-xs font-medium mt-1" style={{ color: studentTheme.accent }}>{subject.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => { setIsVoiceEnabled(!isVoiceEnabled); if (isVoiceEnabled) handleStopVoice(); }} 
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all border shadow-sm ${isVoiceEnabled ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'}`}
              title={isVoiceEnabled ? 'Auto-lectura activada' : 'Auto-lectura desactivada'}
            >
              {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="text-xs font-bold hidden sm:inline">{isVoiceEnabled ? 'Auto-Voz: ON' : 'Auto-Voz: OFF'}</span>
            </button>
            <button onClick={() => setIsTeacherDrawerOpen(false)} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            const isActiveSpeech = speakingId === msg.id;
            const isSystemError = msg.content.includes('SISTEMA DE EMERGENCIA');

            return (
              <div key={msg.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                {!isUser && <img src={teacher.avatar} alt={teacher.name} className="w-8 h-8 rounded-lg object-cover mt-1 shadow-md" />}
                
                <div className={`flex flex-col max-w-[90%] ${isUser ? 'items-end' : 'items-start'}`}>
                  
                  {/* BURBUJA DE MENSAJE */}
                  <div
                    className="p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-lg"
                    style={isUser ? { background: `linear-gradient(135deg, ${studentTheme.accent}, ${studentTheme.accent}cc)`, color: '#fff', borderBottomRightRadius: 0 } : { background: isSystemError ? 'rgba(60, 20, 20, 0.95)' : 'rgba(15, 23, 42, 0.95)', border: `1px solid ${isActiveSpeech && !isPaused ? '#10b981' : isSystemError ? '#ef4444' : studentTheme.accent + '55'}`, color: '#e2e8f0', borderBottomLeftRadius: 0 }}
                  >
                    {isUser ? (
                      <div className="whitespace-pre-line font-medium">{msg.content}</div>
                    ) : (
                      <div className="markdown-body" dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(msg.content) }} />
                    )}
                  </div>

                  {/* CONTROLES DE VOZ DEDICADOS (Solo para la IA) */}
                  {!isUser && !isSystemError && (
                    <div className="mt-2 w-full max-w-xs p-2 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between shadow-inner">
                      <div className="flex items-center gap-2">
                        {isActiveSpeech && !isPaused ? (
                          <button 
                            onClick={handlePauseVoice}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 text-amber-950 hover:bg-amber-400 font-black text-[10px] sm:text-xs shadow-md active:scale-95 transition-all"
                          >
                            <Pause className="w-3.5 h-3.5 fill-current" /> PAUSAR
                          </button>
                        ) : (
                          <button 
                            onClick={() => handlePlayVoice(msg.content, msg.id)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500 text-emerald-950 hover:bg-emerald-400 font-black text-[10px] sm:text-xs shadow-md active:scale-95 transition-all"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" /> {isActiveSpeech && isPaused ? 'REANUDAR' : 'ESCUCHAR'}
                          </button>
                        )}

                        {isActiveSpeech && (
                          <button 
                            onClick={handleStopVoice}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-400 font-black text-[10px] sm:text-xs shadow-md active:scale-95 transition-all"
                          >
                            <StopCircle className="w-4 h-4 fill-current" /> PARAR
                          </button>
                        )}
                      </div>
                      
                      <div className="flex flex-col items-end">
                        {isActiveSpeech && !isPaused && (
                          <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider animate-pulse flex items-center gap-1">
                            <Volume2 className="w-3 h-3" /> LEYENDO
                          </span>
                        )}
                        <span className="text-[9px] text-slate-500 font-mono mt-0.5">{msg.timestamp}</span>
                      </div>
                    </div>
                  )}

                  {isUser && <span className="text-[9px] text-indigo-200/70 font-mono mt-1 pr-1">{msg.timestamp}</span>}
                </div>
              </div>
            );
          })}
          
          {isLoading && (
            <div className="flex gap-3 items-center text-slate-400 text-xs">
              <img src={teacher.avatar} alt={teacher.name} className="w-8 h-8 rounded-lg object-cover animate-pulse shadow-md" />
              <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin text-indigo-400" /><span className="font-bold tracking-wide">Analizando respuesta...</span></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Pistas rápidas */}
        <div className="p-3 border-t overflow-x-auto flex items-center gap-2 scrollbar-none bg-slate-900/90 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.3)] z-10 relative">
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider shrink-0 pl-1">Atajos:</span>
          {['¿Me das un ejemplo cotidiano?', '¿Por qué ocurre esto?', 'Ya lo entendí, siguiente paso'].map((promptText, idx) => (
            <button key={idx} onClick={() => handleSendMessage(promptText)} disabled={isLoading} className="px-3 py-1.5 rounded-lg border bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-indigo-200 whitespace-nowrap transition-colors shadow-sm">
              {promptText}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-900 z-10 relative">
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2">
            <input id="input-teacher-chat" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={`Habla con ${teacher.name}...`} disabled={isLoading} className="flex-1 rounded-xl px-4 py-3.5 text-sm bg-slate-800 text-white focus:outline-none border-2 border-slate-700 focus:border-indigo-500 transition-all font-medium shadow-inner" />
            <button type="submit" disabled={!inputValue.trim() || isLoading} className="p-3.5 rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/30 active:scale-95">
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};