import React, { useState, useEffect, useRef } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { askAITeacher, ChatMessage, renderMarkdownToHtml } from '../../services/aiService';
import {
  Bot,
  X,
  Send,
  Sparkles,
  HelpCircle,
  Lightbulb,
  CornerDownLeft,
  Loader2,
  RefreshCw,
  BookOpen,
  ShieldAlert,
} from 'lucide-react';

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
      badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    };

    if (currentStudent?.id === 'avril') {
      return {
        ...base,
        accent: '#7c9cff',
        secondary: '#facc15',
        softBg: '#f6f3ff',
        softPanel: '#eef4ff',
        chip: '#fff8d6',
        textStrong: '#1f2937',
        textMuted: '#4b5563',
        aura: '#c7d2fe',
        glow: 'rgba(124, 156, 255, 0.35)',
        label: 'Peanuts',
      };
    }

    if (currentStudent?.id === 'gael') {
      return {
        ...base,
        accent: '#e11d48',
        secondary: '#fbbf24',
        softBg: '#fffaf0',
        softPanel: '#fff1f2',
        chip: '#fef3c7',
        textStrong: '#111827',
        textMuted: '#374151',
        aura: '#f9a8d4',
        glow: 'rgba(225, 29, 72, 0.30)',
        label: 'Super Mario Bros',
      };
    }

    return {
      ...base,
      softBg: '#0f172a',
      softPanel: '#111827',
      chip: '#1f2937',
      textStrong: '#f8fafc',
      textMuted: '#cbd5e1',
      aura: base.accent || '#6366f1',
      glow: 'rgba(99, 102, 241, 0.22)',
      label: 'Original',
    };
  })();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize teacher greeting when subject or student changes
  useEffect(() => {
    if (teacher && subject) {
      const greeting: ChatMessage = {
        id: `msg-${Date.now()}`,
        role: 'model',
        content: `¡Hola ${currentStudent.name}! Soy ${teacher.name}, tu tutor de ${subject.name}. Hoy estamos enfocados en "${dailyClass?.theme || 'la lección del día'}". Recuerda que mi meta es guiarte con preguntas para que descubras el conocimiento. ¿Por dónde te gustaría comenzar a razonar?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([greeting]);
    }
  }, [teacher?.id, currentStudent.id, subject?.id, dailyClass?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputValue.trim();
    if (!textToSend || isLoading || !teacher || !subject || !dailyClass) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    if (!customText) setInputValue('');
    setIsLoading(true);

    try {
      const conversationHistory = newHistory.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const reply = await askAITeacher({
        student: currentStudent,
        teacher,
        subject,
        dailyClass,
        conversationHistory,
        message: textToSend,
      });

      const modelMessage: ChatMessage = {
        id: `msg-model-${Date.now()}`,
        role: 'model',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        role: 'model',
        content: 'Disculpa, tuve un momento de reflexión. ¿Podrías replantearme tu pregunta sobre la clase?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isTeacherDrawerOpen || !teacher || !subject) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg border-l shadow-2xl flex flex-col h-full animate-slide-left"
        style={{
          background: 'linear-gradient(180deg, rgba(15,23,42,0.98), rgba(15,23,42,0.94))',
          borderColor: `${studentTheme.accent}55`,
          boxShadow: `0 0 0 1px ${studentTheme.accent}33`,
        }}
      >
        
        {/* Drawer Header */}
        <div
          className="p-4 sm:p-5 border-b flex items-center justify-between"
          style={{
            background: `linear-gradient(135deg, ${studentTheme.accent}22, rgba(15,23,42,0.92) 60%, rgba(2,6,23,0.96))`,
            borderColor: `${studentTheme.accent}44`,
          }}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={teacher.avatar}
                alt={teacher.name}
                className="w-12 h-12 rounded-2xl object-cover ring-2 shadow"
                style={{ boxShadow: `0 0 0 2px ${studentTheme.accent}55` }}
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900" title="Activo" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">{teacher.name}</h3>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                  style={{
                    background: `${studentTheme.accent}22`,
                    borderColor: `${studentTheme.accent}66`,
                    color: '#f8fafc',
                  }}
                >
                  Tutor IA
                </span>
              </div>
              <div
                className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wide"
                style={{
                  background: studentTheme.chip,
                  borderColor: `${studentTheme.accent}55`,
                  color: studentTheme.textStrong,
                }}
              >
                {studentTheme.label}
              </div>
              <p className="text-xs font-medium" style={{ color: studentTheme.accent }}>{subject.name}</p>
              <p className="text-[11px] text-slate-400 truncate max-w-xs">{dailyClass?.theme}</p>
            </div>
          </div>

          <button
            onClick={() => setIsTeacherDrawerOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Cerrar panel de tutoría"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Academic Context Badge */}
        <div
          className="px-4 py-2 border-b flex items-center justify-between text-xs"
          style={{
            background: `${studentTheme.accent}10`,
            borderColor: `${studentTheme.accent}22`,
            color: '#dbeafe',
          }}
        >
          <div className="flex items-center gap-1.5 truncate">
            <BookOpen className="w-3.5 h-3.5 shrink-0" style={{ color: studentTheme.accent }} />
            <span className="truncate">Contexto: {dailyClass?.theme}</span>
          </div>
          <span className="text-[10px] uppercase font-bold shrink-0 ml-2" style={{ color: '#fbbf24' }}>
            Método Socrático
          </span>
        </div>

        {/* Messages Chat Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <img
                    src={teacher.avatar}
                    alt={teacher.name}
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-slate-700 shrink-0 mt-1"
                  />
                )}
                
                <div
                  className="max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-md"
                  style={
                    isUser
                      ? {
                          background: `linear-gradient(135deg, ${studentTheme.accent}, ${studentTheme.accent}cc)`,
                          color: '#fff',
                          borderBottomRightRadius: 0,
                        }
                      : {
                          background: 'rgba(15, 23, 42, 0.9)',
                          border: `1px solid ${studentTheme.accent}44`,
                          color: '#e2e8f0',
                          borderBottomLeftRadius: 0,
                        }
                  }
                >
                  {isUser ? (
                    <div className="whitespace-pre-line">{msg.content}</div>
                  ) : (
                    <div
                      className="markdown-body"
                      dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(msg.content) }}
                    />
                  )}
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      isUser ? 'text-indigo-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-center text-slate-400 text-xs">
              <img
                src={teacher.avatar}
                alt={teacher.name}
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-slate-700 animate-pulse"
              />
              <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                <span>{teacher.name} está formulando una pregunta socrática...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Socratic Quick Prompts Pills */}
        <div
          className="p-2.5 border-t overflow-x-auto flex items-center gap-1.5 scrollbar-none"
          style={{
            background: `linear-gradient(180deg, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.96))`,
            borderColor: `${studentTheme.accent}22`,
          }}
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase shrink-0 pl-1">
            Pistas:
          </span>
          {[
            '¿Me das una pista para empezar?',
            '¿Qué paso debo razonar primero?',
            '¿Por qué ocurre esto en la práctica?',
            '¿Puedes darme un ejemplo cotidiano?',
          ].map((promptText, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(promptText)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-lg border whitespace-nowrap transition-all disabled:opacity-50 text-[11px]"
              style={{
                background: `${studentTheme.accent}12`,
                borderColor: `${studentTheme.accent}44`,
                color: '#dbeafe',
              }}
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              id="input-teacher-chat"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Pregúntale a ${teacher.name} sobre ${dailyClass?.theme}...`}
              disabled={isLoading}
              className="flex-1 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors border"
              style={{
                background: 'rgba(15, 23, 42, 0.9)',
                borderColor: `${studentTheme.accent}55`,
                boxShadow: `0 0 0 1px ${studentTheme.accent}22 inset`,
              }}
            />
            <button
              id="btn-send-teacher-chat"
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 rounded-xl disabled:opacity-50 text-white transition-all shadow-md"
              style={{
                background: `linear-gradient(135deg, ${studentTheme.accent}, ${studentTheme.accent}dd)`,
                boxShadow: `0 8px 18px ${studentTheme.accent}33`,
              }}
              title="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400 px-1">
            <span>🛡️ Limitado al contexto de la clase actual</span>
            <span>💡 Prioriza el razonamiento guiado</span>
          </div>
        </div>

      </div>
    </div>
  );
};
