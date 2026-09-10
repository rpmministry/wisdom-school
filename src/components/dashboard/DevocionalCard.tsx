import React, { useState, useEffect } from 'react';
import { Sun, BookOpen, Heart, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface Devocional {
  id: number;
  fecha: string;
  dia: string;
  versiculo: {
    referencia: string;
    texto: string;
    version: string;
  };
  ensenanza: string;
  oracion: string;
  tema: string;
}

const devocionales: Devocional[] = [
  {
    id: 1,
    fecha: '2026-09-08',
    dia: 'Martes',
    versiculo: {
      referencia: 'Proverbios 3:5-6',
      texto: 'Confía en el Señor de todo corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.',
      version: 'NTV',
    },
    ensenanza: 'Dios no nos pide que entendamos todo, sino que confiemos en Él. Cuando entregamos nuestros planes, estudios y preocupaciones al Señor, Él nos guía por el mejor camino, incluso cuando no vemos la ruta completa. Hoy, antes de empezar tus clases, pon tu día en sus manos.',
    oracion: 'Señor, te entrego mi día de estudio. Ayúdame a confiar en ti en cada materia, en cada reto y en cada pregunta. Endereza mis veredas y dame sabiduría para aprender con alegría. En el nombre de Jesús, amén.',
    tema: 'Confianza y Guía',
  },
  {
    id: 2,
    fecha: '2026-09-09',
    dia: 'Miércoles',
    versiculo: {
      referencia: 'Santiago 1:5',
      texto: 'Si a alguno de ustedes le falta sabiduría, pídasela a Dios, que da generosamente a todos sin reprochar, y se le concederá.',
      version: 'NTV',
    },
    ensenanza: 'La verdadera sabiduría no viene solo de los libros, sino de Dios. Cuando enfrentas una materia difícil, un problema de matemáticas complejo o un texto que no entiendes, puedes pedirle a Dios que te dé entendimiento. Él promete dársela generosamente a quien la pide con fe.',
    oracion: 'Padre celestial, hoy te pido sabiduría para cada clase. Ilumina mi mente para comprender, mi corazón para aplicar y mis manos para crear. Que tu Espíritu Santo sea mi maestro en cada lección. Amén.',
    tema: 'Sabiduría Divina',
  },
  {
    id: 3,
    fecha: '2026-09-10',
    dia: 'Jueves',
    versiculo: {
      referencia: 'Colosenses 3:23',
      texto: 'Todo lo que hagan, háganlo de todo corazón, como para el Señor y no para los hombres.',
      version: 'NTV',
    },
    ensenanza: 'Estudiar no es solo para sacar buenas notas o complacer a los padres. Cuando ponemos excelencia en cada tarea, cada lectura y cada proyecto, lo hacemos como ofrenda a Dios. El esfuerzo sincero honra al Creador que nos dio la capacidad de aprender y crecer.',
    oracion: 'Señor, que todo lo que haga hoy —leer, escribir, calcular, investigar— sea para tu gloria. Dame diligencia, paciencia y gozo en el aprendizaje. Que mi esfuerzo refleje mi amor por ti. Amén.',
    tema: 'Excelencia para Dios',
  },
  {
    id: 4,
    fecha: '2026-09-11',
    dia: 'Viernes',
    versiculo: {
      referencia: 'Isaías 40:31',
      texto: 'Pero los que confían en el Señor renovarán sus fuerzas; volarán como las águilas; correrán y no se cansarán; caminarán y no se fatigarán.',
      version: 'NTV',
    },
    ensenanza: 'El cansancio mental es real después de una semana de clases. Pero Dios promete renovar las fuerzas de quienes en Él confían. No es fuerza humana, es fuerza sobrenatural. Termina esta semana sabiendo que el mismo Dios que sostiene el universo sostiene tu mente y tu corazón.',
    oracion: 'Dios fiel, gracias por sostenerme esta semana. Renueva mis fuerzas para terminar bien. Que vuele como águila en mis estudios, que corra sin cansarme en mis proyectos, que camine sin fatiga en mi fe. Amén.',
    tema: 'Fuerza Renovada',
  },
];

export const DevocionalCard: React.FC = () => {
  const [currentDevocional, setCurrentDevocional] = useState<Devocional>(devocionales[0]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const found = devocionales.find(d => d.fecha === today);
    if (found) {
      setCurrentDevocional(found);
    } else {
      const dayIndex = new Date().getDay();
      const index = dayIndex % devocionales.length;
      setCurrentDevocional(devocionales[index]);
    }
  }, []);

  const goNext = () => {
    const currentIndex = devocionales.findIndex(d => d.id === currentDevocional.id);
    const nextIndex = (currentIndex + 1) % devocionales.length;
    setCurrentDevocional(devocionales[nextIndex]);
  };

  const goPrev = () => {
    const currentIndex = devocionales.findIndex(d => d.id === currentDevocional.id);
    const prevIndex = (currentIndex - 1 + devocionales.length) % devocionales.length;
    setCurrentDevocional(devocionales[prevIndex]);
  };

  const isAvril = typeof window !== 'undefined' && (localStorage.getItem('wisdom_current_v2026') === 'avril' || localStorage.getItem('wisdom_current_v2026') === 'karen');

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
              <p className="text-sm font-bold text-white">{currentDevocional.dia}, {currentDevocional.fecha}</p>
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
          <div className="flex items-center gap-1.5">
            {devocionales.map((d, i) => (
              <button
                key={d.id}
                onClick={() => setCurrentDevocional(d)}
                className={`w-2 h-2 rounded-full transition-all ${
                  d.id === currentDevocional.id
                    ? isAvril ? 'bg-amber-400 w-6' : 'bg-red-400 w-6'
                    : 'bg-slate-600 hover:bg-slate-400'
                }`}
                aria-label={`Ver devocional ${i + 1}`}
              />
            ))}
          </div>
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