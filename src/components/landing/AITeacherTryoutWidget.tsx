import React, { useState } from 'react';
import { askAITeacher } from '../../services/aiService';
import { Bot, Send, Sparkles, User, RefreshCw, MessageSquare, AlertCircle } from 'lucide-react';

export const AITeacherTryoutWidget: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [providerInfo, setProviderInfo] = useState<string | null>(null);
  const [chatLog, setChatLog] = useState<Array<{ role: 'user' | 'model'; text: string }>>([
    {
      role: 'model',
      text: '¡Hola! Soy tu Profesor Virtual de Wisdom School. ¿Qué duda o tema te gustaría explorar hoy? Recuerda que no te daré el resultado servido, ¡sino que descubriremos juntos cómo llegar a la respuesta!',
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || loading) return;

    const userText = question.trim();
    setQuestion('');
    setLoading(true);

    const updatedLog = [...chatLog, { role: 'user' as const, text: userText }];
    setChatLog(updatedLog);

    try {
      const history = updatedLog.map((m) => ({
        role: m.role,
        content: m.text,
      }));

      const reply = await askAITeacher({
        message: userText,
        subject: { id: 'demografia', name: 'Ciencias e Indagación', category: 'Ciencias' } as any,
        teacher: { name: 'Profesor Socrático', specialty: 'Ciencias e Historia', personality: 'Empático y Didáctico' } as any,
        student: { name: 'Estudiante Visitante', age: 12 } as any,
        dailyClass: { id: 'demo-class', title: 'Indagación y Pensamiento Crítico General', topic: 'Demostración Interactiva' } as any,
        conversationHistory: history,
      });

      setChatLog((prev) => [...prev, { role: 'model', text: reply }]);
    } catch (err: any) {
      setChatLog((prev) => [
        ...prev,
        {
          role: 'model',
          text: 'Disculpa, estoy organizando mis apuntes. ¿Podrías repetirme tu pregunta en unos segundos?',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Demostración en Vivo: Profesor IA Socrático</h3>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                Motor IA Activo
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Prueba una pregunta de Matemáticas, Ciencias o Historia. El profesor te guiará socráticamente.
            </p>
          </div>
        </div>
      </div>

      {/* Chat messages box */}
      <div className="h-64 overflow-y-auto space-y-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs">
        {chatLog.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-2.5 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'model' && (
              <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div
              className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-medium animate-pulse py-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>El profesor está formulando su orientación socrática...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Escribe una pregunta (ej. ¿Por qué flotan los barcos o cómo resuelvo una ecuación?)..."
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs transition-colors flex items-center gap-2"
        >
          <span>Preguntar</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
