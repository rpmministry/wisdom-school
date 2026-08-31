import React from 'react';
import { StudentId } from '../../types';
import { StudentAvatar } from './StudentAvatar';

interface CharacterInfo {
  id: string;
  name: string;
  role: string;
  quote: string;
  color: string;
  image?: string;
  iconSvg: React.ReactNode;
}

export const SNOOPY_CHARACTERS: CharacterInfo[] = [
  {
    id: 'snoopy',
    name: 'Snoopy',
    role: 'Escritor de Historias',
    quote: '"Nunca dejes de explorar la historia de tu propia mente."',
    color: 'from-amber-500 to-yellow-600',
    image: '/Snoopy.png',
    iconSvg: (
      <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="46" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3" />
        {/* Snoopy Head (white beagle) */}
        <ellipse cx="50" cy="46" rx="20" ry="16" fill="#ffffff" stroke="#1e293b" strokeWidth="3.5" />
        <ellipse cx="62" cy="50" rx="12" ry="10" fill="#ffffff" stroke="#1e293b" strokeWidth="3.5" />
        <ellipse cx="71" cy="47" rx="4" ry="3" fill="#1e293b" /> {/* Nose */}
        <path d="M33 38 C27 42 26 56 34 58 Z" fill="#1e293b" /> {/* Floppy ear */}
        <ellipse cx="52" cy="43" rx="2" ry="3" fill="#1e293b" /> {/* Eye */}
        <path d="M56 54 Q62 58 66 53" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" /> {/* Smile */}
        <path d="M38 60 C48 64 56 64 62 60" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" fill="none" /> {/* Red collar */}
        {/* Woodstock bird sitting on head */}
        <circle cx="48" cy="24" r="5" fill="#facc15" />
        <polygon points="53,24 58,25 53,27" fill="#eab308" />
      </svg>
    ),
  },
  {
    id: 'woodstock',
    name: 'Woodstock',
    role: 'Asistente de Apuntes',
    quote: '"¡Chirp chirp! Las mejores ideas empiezan con pequeñas notas."',
    color: 'from-yellow-400 to-amber-500',
    image: '/Woodstock 3d.png',
    iconSvg: (
      <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="46" fill="#fef9c3" stroke="#eab308" strokeWidth="3" />
        <ellipse cx="48" cy="45" rx="14" ry="18" fill="#facc15" stroke="#854d0e" strokeWidth="3" />
        <polygon points="62,45 74,48 62,52" fill="#eab308" stroke="#854d0e" strokeWidth="2" />
        <circle cx="45" cy="40" r="2.5" fill="#1e293b" />
        <path d="M42 27 C42 22 46 22 46 27 C48 22 52 22 52 27" stroke="#854d0e" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'charlie_brown',
    name: 'Charlie Brown',
    role: 'Filósofo del Esfuerzo',
    quote: '"Si trabajas duro y perseveras, todo cobra sentido."',
    color: 'from-amber-600 to-amber-800',
    image: '/Charlie Brown 3d.png',
    iconSvg: (
      <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="46" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
        <rect x="20" y="55" width="60" height="30" fill="#f59e0b" rx="4" />
        <path d="M22 70 L32 60 L42 70 L52 60 L62 70 L72 60 L78 70" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="50" cy="38" r="18" fill="#fde68a" stroke="#1e293b" strokeWidth="3" />
        <circle cx="43" cy="36" r="2" fill="#1e293b" />
        <circle cx="57" cy="36" r="2" fill="#1e293b" />
        <path d="M44 46 Q50 50 56 46" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'lucy',
    name: 'Lucy van Pelt',
    role: 'Consejera Socrática',
    quote: '"Haz la pregunta correcta y la respuesta aparecerá sola."',
    color: 'from-blue-500 to-indigo-600',
    image: '/Lucy van pelt.png',
    iconSvg: (
      <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="46" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
        <circle cx="50" cy="42" r="16" fill="#fde68a" stroke="#1e293b" strokeWidth="3" />
        <path d="M32 35 C32 20 68 20 68 35 C68 26 32 26 32 35 Z" fill="#1e293b" />
        <circle cx="44" cy="40" r="2" fill="#1e293b" />
        <circle cx="56" cy="40" r="2" fill="#1e293b" />
        <path d="M42 48 Q50 52 58 48" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
];

export const MARIO_CHARACTERS: CharacterInfo[] = [
  {
    id: 'mario',
    name: 'Super Mario',
    role: 'Líder de la Misión',
    quote: '"¡Let\'s-a go! Cada problema es un nivel listo para superar."',
    color: 'from-red-600 to-red-800',
    image: '/mario-3d.png',
    iconSvg: (
      <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="46" fill="#fee2e2" stroke="#ef4444" strokeWidth="3" />
        <path d="M22 45 C22 25 78 25 78 45 L82 50 L18 50 Z" fill="#dc2626" stroke="#b91c1c" strokeWidth="2" />
        <circle cx="50" cy="38" r="10" fill="#ffffff" stroke="#dc2626" strokeWidth="2" />
        <text x="50" y="42" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="bold" fontFamily="sans-serif">M</text>
        <circle cx="50" cy="58" r="16" fill="#fca5a5" />
        <path d="M30 62 C35 55 65 55 70 62 C65 68 35 68 30 62 Z" fill="#451a03" />
      </svg>
    ),
  },
  {
    id: 'luigi',
    name: 'Luigi',
    role: 'Especialista Estratégico',
    quote: '"¡Pensar bien el camino hace que cualquier obstáculo sea fácil!"',
    color: 'from-emerald-600 to-green-800',
    image: '/luigi-3d.png',
    iconSvg: (
      <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="46" fill="#dcfce7" stroke="#22c55e" strokeWidth="3" />
        <path d="M22 45 C22 25 78 25 78 45 L82 50 L18 50 Z" fill="#16a34a" stroke="#15803d" strokeWidth="2" />
        <circle cx="50" cy="38" r="10" fill="#ffffff" stroke="#16a34a" strokeWidth="2" />
        <text x="50" y="42" textAnchor="middle" fill="#16a34a" fontSize="11" fontWeight="bold" fontFamily="sans-serif">L</text>
        <circle cx="50" cy="58" r="16" fill="#fca5a5" />
        <path d="M30 62 C35 55 65 55 70 62 C65 68 35 68 30 62 Z" fill="#451a03" />
      </svg>
    ),
  },
  {
    id: 'yoshi',
    name: 'Yoshi',
    role: 'Guía de Narración',
    quote: '"¡Yoshi! Narra tu respuesta y gana +10 monedas de sabiduría."',
    color: 'from-green-500 to-emerald-600',
    image: '/yoshi-3d.png',
    iconSvg: (
      <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="46" fill="#dcfce7" stroke="#10b981" strokeWidth="3" />
        <ellipse cx="48" cy="45" rx="20" ry="18" fill="#22c55e" />
        <ellipse cx="62" cy="48" rx="12" ry="10" fill="#ffffff" />
        <ellipse cx="40" cy="32" rx="8" ry="12" fill="#ffffff" stroke="#15803d" strokeWidth="2" />
        <circle cx="41" cy="32" r="3" fill="#15803d" />
      </svg>
    ),
  },
  {
    id: 'toad',
    name: 'Toad',
    role: 'Asistente del Reino',
    quote: '"¡Todo está preparado para comenzar la aventura del día!"',
    color: 'from-blue-500 to-red-600',
    image: '/toad-3d.png',
    iconSvg: (
      <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="46" fill="#fce7f3" stroke="#ec4899" strokeWidth="3" />
        <path d="M35 30 L42 20 L50 28 L58 20 L65 30 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
        <circle cx="50" cy="50" r="18" fill="#fde68a" />
        <circle cx="43" cy="48" r="2.5" fill="#2563eb" />
        <circle cx="57" cy="48" r="2.5" fill="#2563eb" />
      </svg>
    ),
  },
];

interface WorldHeaderBannerProps {
  studentId: StudentId;
  studentName: string;
}

export const WorldHeaderBanner: React.FC<WorldHeaderBannerProps> = ({
  studentId,
  studentName,
}) => {
  const isAvril = studentId === 'avril';

  if (isAvril) {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900/40 border-2 border-amber-500/40 p-5 sm:p-6 shadow-2xl space-y-5">
        {/* Peanuts Zigzag Ribbon Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-amber-500 flex justify-between overflow-hidden opacity-80">
          <div className="w-full h-full bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:6px_6px]" />
        </div>

        {/* Top Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-4">
            <StudentAvatar
              studentId={studentId}
              name={studentName}
              size="lg"
              editable={true}
            />
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-black uppercase tracking-wider">
                <span>🐶 MUNDO DE SNOOPY & PEANUTS</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <span>¡Bienvenida, <span className="text-amber-300">{studentName}</span>!</span>
                <img src="/Snoopy.png" alt="Snoopy 3D" className="w-8 h-8 object-contain inline-block drop-shadow-lg animate-pulse" />
              </h2>
              <p className="text-xs text-slate-200 max-w-md font-medium leading-normal flex items-center gap-1.5">
                <span>Montessori & Charlotte Mason con Snoopy y su máquina de escribir.</span>
              </p>
            </div>
          </div>

          {/* Snoopy Portrait Graphic Card */}
          <div className="p-3 rounded-2xl bg-amber-900/40 border border-amber-500/40 flex items-center gap-3 shrink-0 shadow-lg max-w-xs">
            <div className="relative w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
              <img src="/Snoopy-Typing-on-Vintage-Typewriter-PNG.png" alt="Snoopy Máquina de Escribir" className="w-12 h-12 object-contain drop-shadow-xl hover:scale-110 transition-transform duration-200" />
            </div>
            <div className="space-y-0.5 text-left">
              <div className="flex items-center gap-1">
                <h4 className="text-xs font-bold text-amber-300">"Querida Avril..."</h4>
                <img src="/Woodstock 3d.png" alt="Woodstock 3D" className="w-4 h-4 object-contain inline-block" />
              </div>
              <p className="text-[10px] text-slate-200 leading-tight">
                Revisa tu libreta de evidencias y narra tus ideas.
              </p>
            </div>
          </div>
        </div>

        {/* Character Gallery Row for Avril */}
        <div className="pt-3 border-t border-amber-500/20 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {SNOOPY_CHARACTERS.map((char) => (
            <div key={char.id} className="p-2 rounded-xl bg-slate-900/80 border border-amber-500/25 flex items-center gap-2.5 overflow-hidden">
              <div className="shrink-0">
                {char.image ? (
                  <img
                    src={char.image}
                    alt={char.name}
                    className="w-10 h-10 object-contain drop-shadow-md"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.nextElementSibling) {
                        (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                      }
                    }}
                  />
                ) : null}
                <div style={{ display: char.image ? 'none' : 'block' }}>
                  {char.iconSvg}
                </div>
              </div>
              <div className="min-w-0">
                <h5 className="text-xs font-extrabold text-amber-300 truncate">{char.name}</h5>
                <p className="text-[10px] text-slate-300 font-medium truncate">{char.role}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    );
  }

  // Super Mario Bros World for Gael
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-950 via-slate-900 to-red-900/40 border-2 border-red-500/40 p-5 sm:p-6 shadow-2xl space-y-5">
      {/* Mario Bricks Ribbon Header */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-red-600 flex justify-between overflow-hidden opacity-90">
        <div className="w-full h-full bg-[radial-gradient(#fef08a_1px,transparent_1px)] [background-size:8px_8px]" />
      </div>

      {/* Top Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-4">
          <StudentAvatar
            studentId={studentId}
            name={studentName}
            size="lg"
            editable={true}
          />
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-[11px] font-black uppercase tracking-wider">
              <span>🍄 SUPER MARIO BROS KINGDOM</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>¡Mamma Mia, <span className="text-red-400">{studentName}</span>!</span>
              <img src="/mario-3d.png" alt="Mario 3D" className="w-8 h-8 object-contain inline-block drop-shadow-lg" />
            </h2>
            <p className="text-xs text-slate-200 max-w-md font-medium leading-normal flex items-center gap-2">
              <span>Abre las Cajas [?] (Montessori) y narra a Yoshi tu misión.</span>
            </p>
          </div>
        </div>

        {/* Mario Question Box Card */}
        <div className="p-3 rounded-2xl bg-red-900/40 border border-red-500/40 flex items-center gap-3 shrink-0 shadow-lg max-w-xs">
          <div className="relative w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
            <img src="/Box-3d.png" alt="Box 3D" className="w-12 h-12 object-contain drop-shadow-xl" />
          </div>
          <div className="space-y-0.5 text-left">
            <div className="flex items-center gap-1">
              <h4 className="text-xs font-bold text-red-300">Misión Especial 1-1</h4>
              <img src="/star-3d.png" alt="Star" className="w-3.5 h-3.5 object-contain" />
            </div>
            <p className="text-[10px] text-slate-200 leading-tight">
              Resuelve el taller práctico y gana +10 monedas.
            </p>
          </div>
        </div>
      </div>

      {/* Character Gallery Row for Gael */}
      <div className="pt-3 border-t border-red-500/20 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {MARIO_CHARACTERS.map((char) => (
          <div key={char.id} className="p-2 rounded-xl bg-slate-900/80 border border-red-500/25 flex items-center gap-2.5 overflow-hidden">
            <div className="shrink-0 flex items-center justify-center">
              {char.image ? (
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-10 h-10 object-contain drop-shadow-md hover:scale-110 transition-transform duration-200"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent && parent.children[1]) {
                      (parent.children[1] as HTMLElement).style.display = 'block';
                    }
                  }}
                />
              ) : null}
              <div style={{ display: char.image ? 'none' : 'block' }}>
                {char.iconSvg}
              </div>
            </div>
            <div className="min-w-0">
              <h5 className="text-xs font-extrabold text-red-300 truncate">{char.name}</h5>
              <p className="text-[10px] text-slate-300 font-medium truncate">{char.role}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
