import React, { useState, useEffect, useRef } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { askAITeacher, ChatMessage, renderMarkdownToHtml } from '../../services/aiService';
import { Bot, X, Send, Loader2, Volume2, VolumeX, Play, Pause, StopCircle } from 'lucide-react';

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
    const base = currentStudent?.colorTheme || { accent: '#6366f1', primary: 'indigo', secondary: 'violet', gradient: 'from-indigo-600 via-violet-600 to-purple-600' };
    if (currentStudent?.id === 'avril') return { ...base, accent: '#7c9cff', chip: '#fff8d6', textStrong: '#1f2937', label: 'Peanuts' };
    if (currentStudent?.id === 'gael') return { ...base, accent: '#e11d48', chip: '#fef3c7', textStrong: '#111827', label: 'Super Mario Bros' };
    return { ...base, chip: '#1f2937', textStrong: '#f8fafc', label: 'Original' };
  })();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // --- ESTADOS PARA GOOGLE CLOUD TTS ---
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [audioCache, setAudioCache] = useState<Record<string, string>>({});
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [isFetchingAudio, setIsFetchingAudio] = useState(false);
  
  const playTimeoutRef = useRef<any>(null);

  // --- MOTOR GOOGLE NEURAL2 TTS ---
  const handlePlayVoice = async (text: string, messageId: string) => {
    if (speakingId === messageId && isPaused && currentAudio) {
      currentAudio.play();
      setIsPaused(false);
      return;
    }

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    setIsPaused(false);
    let audioUrl = audioCache[messageId];

    if (!audioUrl) {
      setIsFetchingAudio(true);
      setSpeakingId(messageId); 

      try {
        // AQUÍ LEE TU LLAVE SECRETA DEL ARCHIVO .env
        const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_TTS_API_KEY;
        
        if (!GOOGLE_API_KEY) {
          console.error("FALTA LA CLAVE DE GOOGLE TTS EN EL ARCHIVO .env");
          setIsFetchingAudio(false);
          setSpeakingId(null);
          return;
        }

        const teacherNameLower = (teacher?.name || '').toLowerCase().trim();
        const isFemale = teacherNameLower.endsWith('a') || teacherNameLower.includes('miss') || teacherNameLower.includes('profesora') || teacherNameLower.includes('sophia') || teacherNameLower.includes('carla') || teacherNameLower.includes('clara') || teacherNameLower.includes('lucia') || teacherNameLower.includes('maya') || teacherNameLower.includes('emma') || teacherNameLower.includes('pincelita');
        
        // Voces Neural2 HD de Google
        const voiceName = isFemale ? 'es-US-Neural2-A' : 'es-US-Neural2-B';
        const cleanText = text.replace(/[*_#`~]/g, '');

        const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { text: cleanText },
            voice: { languageCode: 'es-US', name: voiceName },
            audioConfig: { audioEncoding: 'MP3', speakingRate: 1.05, pitch: isFemale ? 1.0 : -2.0 }
          })
        });

        const data = await response.json();
        
        if (data.audioContent) {
          audioUrl = "data:audio/mp3;base64," + data.audioContent;
          setAudioCache(prev => ({ ...prev, [messageId]: audioUrl }));
        } else {
          console.error("Error en Google TTS:", data);
          setSpeakingId(null);
          setIsFetchingAudio(false);
          return;
        }
      } catch (error) {
        console.error("Error de red con Google TTS:", error);
        setSpeakingId(null);
        setIsFetchingAudio(false);
        return;
      }
      setIsFetchingAudio(false);
    }

    // Reproducir audio
    const audio = new Audio(audioUrl);
    audio.onended = () => { setSpeakingId(null); setIsPaused(false); };
    audio.onpause = () => { setIsPaused(true); };
    audio.onplay = () => { setSpeakingId(messageId); setIsPaused(false); };
    
    setCurrentAudio(audio);
    
    try {
      await audio.play();
    } catch (e) {
      console.warn("Autoplay bloqueado.", e);
      setIsPaused(true);
    }
  };

  const handlePauseVoice = () => {
    if (currentAudio) currentAudio.pause();
  };

  const handleStopVoice = () => {
    if (playTimeoutRef.current) clearTimeout(playTimeoutRef.current);
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    setSpeakingId(null);
    setIsPaused(false);
  };

  useEffect(() => {
    if (!isTeacherDrawerOpen) handleStopVoice();
  }, [isTeacherDrawerOpen]);

  useEffect(() => {
    if (teacher && subject && isTeacherDrawerOpen && messages.length === 0) {
      const pendingPrompt = localStorage.getItem('pending_socratic_prompt');
      if (pendingPrompt) return;

      const greetingId = `msg-${Date.now()}`;
      const greetingContent = `¡Hola ${currentStudent.name}! Soy ${teacher.name}, tu tutor de ${subject.name}. Hoy estamos enfocados en "${dailyClass?.theme || 'repasar la materia'}". ¿Por dónde te gustaría comenzar a razonar?`;
      
      const greeting: ChatMessage = { id: greetingId, role: 'model', content: greetingContent, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages([greeting]);

      if (isVoiceEnabled) {
        playTimeoutRef.current = setTimeout(() => handlePlayVoice(greetingContent, greetingId), 800);
      }
    }
  }, [teacher?.id, currentStudent.id, subject?.id, dailyClass?.id, isTeacherDrawerOpen]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isLoading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputValue.trim();
    if (!textToSend || isLoading || !teacher || !subject) return;

    handleStopVoice();

    const userMessage: ChatMessage = { id: `msg-${Date.now()}`, role: 'user', content: textToSend, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages); 
    setInputValue('');
    setIsLoading(true);

    try {
      const fallbackClass = dailyClass || { id: 'repaso-general', theme: 'Repaso General', objective: 'Repasar.' };
      const reply = await askAITeacher({
        student: currentStudent, teacher, subject, dailyClass: fallbackClass as any,
        conversationHistory: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        message: textToSend,
      });

      const replyId = `msg-model-${Date.now()}`;
      const modelMessage: ChatMessage = { id: replyId, role: 'model', content: reply, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };

      setMessages((prev) => [...prev, modelMessage]);

      if (isVoiceEnabled) {
        playTimeoutRef.current = setTimeout(() => handlePlayVoice(reply, replyId), 500);
      }
    } catch (err: any) {
      console.error(err);
      const isSystemError = err.message?.includes('SISTEMA DE EMERGENCIA');
      const errId = `msg-err-${Date.now()}`;
      const errorMessage: ChatMessage = { id: errId, role: 'model', content: isSystemError ? err.message : 'Disculpa, tuve un pequeño fallo de memoria temporal. ¿Podrías repetirme tu idea?', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages((prev) => [...prev, errorMessage]);
      
      if (isVoiceEnabled && !isSystemError) {
        playTimeoutRef.current = setTimeout(() => handlePlayVoice(errorMessage.content, errId), 500);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isTeacherDrawerOpen) {
      const pendingPrompt = localStorage.getItem('pending_socratic_prompt');
      if (pendingPrompt) {
        localStorage.removeItem('pending_socratic_prompt');
        setTimeout(() => handleSendMessage(pendingPrompt), 300);
      }
    }
  }, [isTeacherDrawerOpen]);

  if (!isTeacherDrawerOpen || !teacher || !subject) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden flex justify-end bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div className="w-full max-w-lg border-l shadow-2xl flex flex-col h-full bg-slate-900 transition-transform duration-300 translate-x-0" style={{ background: 'linear-gradient(180deg, rgba(15,23,42,0.98), rgba(15,23,42,0.94))', borderColor: `${studentTheme.accent}55` }}>
        
        <div className="p-4 sm:p-5 border-b flex items-center justify-between shadow-md" style={{ background: `linear-gradient(135deg, ${studentTheme.accent}22, rgba(15,23,42,0.92) 60%, rgba(2,6,23,0.96))` }}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={teacher.avatar} alt={teacher.name} className="w-12 h-12 rounded-2xl object-cover ring-2 shadow" style={{ boxShadow: `0 0 0 2px ${studentTheme.accent}55` }} />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900" title="Activo" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">{teacher.name}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Voz Cloud HD</span>
              </div>
              <p className="text-xs font-medium mt-1" style={{ color: studentTheme.accent }}>{subject.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={() => { setIsVoiceEnabled(!isVoiceEnabled); if (isVoiceEnabled) handleStopVoice(); }} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all border shadow-sm ${isVoiceEnabled ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
              {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="text-xs font-bold hidden sm:inline">{isVoiceEnabled ? 'Auto-Voz: ON' : 'Auto-Voz: OFF'}</span>
            </button>
            <button onClick={() => setIsTeacherDrawerOpen(false)} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"><X className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            const isActiveSpeech = speakingId === msg.id;
            const isSystemError = msg.content.includes('SISTEMA DE EMERGENCIA');

            return (
              <div key={msg.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                {!isUser && <img src={teacher.avatar} alt={teacher.name} className="w-8 h-8 rounded-lg object-cover mt-1 shadow-md" />}
                
                <div className={`flex flex-col max-w-[90%] ${isUser ? 'items-end' : 'items-start'}`}>
                  
                  <div className="p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-lg" style={isUser ? { background: `linear-gradient(135deg, ${studentTheme.accent}, ${studentTheme.accent}cc)`, color: '#fff', borderBottomRightRadius: 0 } : { background: isSystemError ? 'rgba(60, 20, 20, 0.95)' : 'rgba(15, 23, 42, 0.95)', border: `1px solid ${isActiveSpeech && !isPaused ? '#10b981' : isSystemError ? '#ef4444' : studentTheme.accent + '55'}`, color: '#e2e8f0', borderBottomLeftRadius: 0 }}>
                    {isUser ? <div className="whitespace-pre-line font-medium">{msg.content}</div> : <div className="markdown-body" dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(msg.content) }} />}
                  </div>

                  {!isUser && !isSystemError && (
                    <div className="mt-2 w-full max-w-xs p-2 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between shadow-inner">
                      <div className="flex items-center gap-2">
                        {isActiveSpeech && !isPaused ? (
                          <button onClick={handlePauseVoice} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 text-amber-950 hover:bg-amber-400 font-black text-[10px] sm:text-xs shadow-md active:scale-95 transition-all">
                            <Pause className="w-3.5 h-3.5 fill-current" /> PAUSAR
                          </button>
                        ) : (
                          <button onClick={() => handlePlayVoice(msg.content, msg.id)} disabled={isFetchingAudio && speakingId === msg.id} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500 text-emerald-950 hover:bg-emerald-400 font-black text-[10px] sm:text-xs shadow-md active:scale-95 transition-all disabled:opacity-50">
                            {isFetchingAudio && speakingId === msg.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />} 
                            {isFetchingAudio && speakingId === msg.id ? 'CARGANDO...' : (isActiveSpeech && isPaused ? 'REANUDAR' : 'ESCUCHAR')}
                          </button>
                        )}
                        {isActiveSpeech && (
                          <button onClick={handleStopVoice} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-400 font-black text-[10px] sm:text-xs shadow-md active:scale-95 transition-all">
                            <StopCircle className="w-4 h-4 fill-current" /> PARAR
                          </button>
                        )}
                      </div>
                      <div className="flex flex-col items-end">
                        {isActiveSpeech && !isPaused && !isFetchingAudio && <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider animate-pulse flex items-center gap-1"><Volume2 className="w-3 h-3" /> LEYENDO</span>}
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

        <div className="p-3 border-t overflow-x-auto flex items-center gap-2 scrollbar-none bg-slate-900/90 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.3)] z-10 relative">
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider shrink-0 pl-1">Atajos:</span>
          {['¿Me das un ejemplo cotidiano?', '¿Por qué ocurre esto?', 'Ya lo entendí, siguiente paso'].map((promptText, idx) => (
            <button key={idx} onClick={() => handleSendMessage(promptText)} disabled={isLoading} className="px-3 py-1.5 rounded-lg border bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-indigo-200 whitespace-nowrap transition-colors shadow-sm">{promptText}</button>
          ))}
        </div>

        <div className="p-4 bg-slate-900 z-10 relative">
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2">
            <input id="input-teacher-chat" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={`Habla con ${teacher.name}...`} disabled={isLoading} className="flex-1 rounded-xl px-4 py-3.5 text-sm bg-slate-800 text-white focus:outline-none border-2 border-slate-700 focus:border-indigo-500 transition-all font-medium shadow-inner" />
            <button type="submit" disabled={!inputValue.trim() || isLoading} className="p-3.5 rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/30 active:scale-95"><Send className="w-5 h-5" /></button>
          </form>
        </div>
      </div>
    </div>
  );
};