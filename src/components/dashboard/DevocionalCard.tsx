import React, { useState, useEffect } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { getDevotionalPool, studentDevotionalSeed } from '../../data/devotionals';
import { BookOpen, Heart, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export const DevocionalCard: React.FC = () => {
  const { currentStudent, schoolWeek, selectedDayOfWeek, schoolWeekIndex } = useSchool();
  const [offset, setOffset] = useState(0);

  // El día escolar seleccionado (el mismo que muestran las clases) define la fecha del devocional.
  const dayIndexInWeek = Math.max(0, schoolWeek.findIndex((info) => info.day === selectedDayOfWeek));
  const selectedDayInfo = schoolWeek[dayIndexInWeek];

  // La edad decide el repertorio; la fecha + una semilla por estudiante deciden el devocional del día.
  // Con un día escolar distinto cambia la selección, por lo que nunca se repite el mismo dos días seguidos.
  const pool = getDevotionalPool(currentStudent.age);
  const seed = studentDevotionalSeed(currentStudent.id);
  const schoolDayNumber = schoolWeekIndex * 5 + dayIndexInWeek;
  const baseIndex = ((schoolDayNumber + seed) % pool.length + pool.length) % pool.length;
  const currentIndex = ((baseIndex + offset) % pool.length + pool.length) % pool.length;
  const currentDevocional = pool[currentIndex];

  // Al cambiar de estudiante o de día escolar, volvemos al devocional que corresponde a ese día.
  useEffect(() => { setOffset(0); }, [currentStudent.id, selectedDayOfWeek]);

  const goNext = () => setOffset((prev) => prev + 1);
  const goPrev = () => setOffset((prev) => prev - 1);

  const isAvril = currentStudent.id === 'avril' || currentStudent.id === 'karen';
  const dateLabel = selectedDayInfo
    ? `${selectedDayOfWeek}, ${selectedDayInfo.dateLabelLong}`
    : selectedDayOfWeek;

  return (
    <div className={`relative overflow-hidden rounded-3xl border shadow-2xl transition-all ${
      isAvril
        ? 'bg-gradient-to-br from-amber-950/60 via-slate-900 to-amber-900/40 border-amber-500/40 shadow-amber-950/30'
        : 'bg-gradient-to-br from-red-950/60 via-slate-900 to-red-900/40 border-red-500/40 shadow-red-950/30'
    }`}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-rule=%22nonzero%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 36v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 6V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-5" />
      
      <div className="relative p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl bg-gradient-to-br ${isAvril ? 'from-amber-500 to-amber-600' : 'from-red-500 to-red-600'} shadow-lg`}>
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Devocional Diario</p>
              <p className="text-sm font-bold text-white">{dateLabel}</p>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${isAvril ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-red-500/20 text-red-300 border-red-500/30'}`}>
            {currentDevocional.tema}
          </span>
        </div>

        <div className="pt-2 border-t border-white/10">
          <div className="flex items-start gap-3">
            <span className={`text-2xl font-bold ${isAvril ? 'text-amber-400' : 'text-red-400'} shrink-0 mt-1`}>"</span>
            <div className="flex-1 min-w-0">
              <p className="text-slate-100 leading-relaxed text-sm sm:text-base italic">"{currentDevocional.versiculo.texto}"</p>
              <p className="text-xs text-slate-400 mt-2 text-right font-medium">— {currentDevocional.versiculo.referencia} ({currentDevocional.versiculo.version})</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <div className={`p-4 rounded-2xl border ${isAvril ? 'bg-amber-500/10 border-amber-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl shrink-0 ${isAvril ? 'bg-amber-500/20' : 'bg-red-500/20'}`}>
                <Sparkles className={`w-5 h-5 ${isAvril ? 'text-amber-400' : 'text-red-400'}`} />
              </div>
              <div className="flex-1">
                <p className={`text-xs font-bold uppercase tracking-wider ${isAvril ? 'text-amber-300' : 'text-red-300'}`}>Enseñanza para hoy</p>
                <p className="text-slate-200 text-sm mt-1 leading-relaxed">{currentDevocional.ensenanza}</p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border bg-slate-900/50 ${isAvril ? 'border-amber-500/30' : 'border-red-500/30'}`}>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl shrink-0 ${isAvril ? 'bg-amber-500/20' : 'bg-red-500/20'}`}>
                <Heart className={`w-5 h-5 ${isAvril ? 'text-amber-400' : 'text-red-400'}`} />
              </div>
              <div className="flex-1">
                <p className={`text-xs font-bold uppercase tracking-wider ${isAvril ? 'text-amber-300' : 'text-red-300'}`}>Oración para iniciar el día</p>
                <p className="text-slate-200 text-sm mt-1 leading-relaxed italic">"{currentDevocional.oracion}"</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-4 border-t border-white/10">
          <button
            onClick={goPrev}
            className={`p-2 rounded-xl transition-all hover:scale-105 ${isAvril ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30' : 'bg-red-500/20 text-red-300 hover:bg-red-500/30'}`}
            aria-label="Devocional anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-[11px] font-semibold text-slate-400 tabular-nums">
            Devocional {currentIndex + 1} de {pool.length}
          </span>
          <button
            onClick={goNext}
            className={`p-2 rounded-xl transition-all hover:scale-105 ${isAvril ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30' : 'bg-red-500/20 text-red-300 hover:bg-red-500/30'}`}
            aria-label="Siguiente devocional"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
