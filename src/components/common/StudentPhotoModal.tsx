import React, { useState, useRef } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { STUDENTS_DATA } from '../../data/mockData';
import { StudentId } from '../../types';
import {
  X,
  Upload,
  Camera,
  CheckCircle2,
  Sparkles,
  Image as ImageIcon,
  RotateCcw,
  UserCheck,
} from 'lucide-react';

interface StudentPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStudentId?: StudentId;
}

const PRESET_PHOTOS: Record<StudentId, { label: string; url: string }[]> = {
  avril: [
    {
      label: 'Fotografía Escolar Oficial (Encuadre Completo)',
      url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&crop=top&q=80',
    },
    {
      label: 'Fotografía Académica 2 (Retrato Estudio)',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&crop=top&q=80',
    },
    {
      label: 'Fotografía Estudiante 3 (Luz Natural)',
      url: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800&auto=format&fit=crop&crop=top&q=80',
    },
  ],
  gael: [
    {
      label: 'Fotografía Escolar 1 (Recomendada)',
      url: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=800&auto=format&fit=crop&crop=top&q=80',
    },
    {
      label: 'Fotografía Académica 2',
      url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&auto=format&fit=crop&crop=top&q=80',
    },
    {
      label: 'Ilustración Vectorial Oficial',
      url: '/students/gael.svg',
    },
  ],
};

export const StudentPhotoModal: React.FC<StudentPhotoModalProps> = ({
  isOpen,
  onClose,
  initialStudentId = 'avril',
}) => {
  const { customAvatars, updateStudentAvatar } = useSchool();
  const [selectedStudent, setSelectedStudent] = useState<StudentId>(initialStudentId);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const currentStudentData = STUDENTS_DATA.find((s) => s.id === selectedStudent);
  const activeAvatar =
    previewUrl ||
    customAvatars[selectedStudent] ||
    currentStudentData?.avatar ||
    PRESET_PHOTOS[selectedStudent][0].url;

  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (PNG, JPG, JPEG o WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPreviewUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleSave = async () => {
    if (!previewUrl) {
      onClose();
      return;
    }

    setIsSaving(true);
    // 1. Save in local state and LocalStorage immediately
    updateStudentAvatar(selectedStudent, previewUrl);

    // 2. If it's a base64 image, upload to server filesystem
    if (previewUrl.startsWith('data:image/')) {
      try {
        await fetch('/api/students/upload-avatar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId: selectedStudent,
            imageBase64: previewUrl,
          }),
        });
      } catch (err) {
        console.warn('Server upload notice:', err);
      }
    }

    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  const handleSelectPreset = (url: string) => {
    setPreviewUrl(url);
  };

  const handleResetToDefault = () => {
    const defaultUrl = PRESET_PHOTOS[selectedStudent][0].url;
    setPreviewUrl(defaultUrl);
    updateStudentAvatar(selectedStudent, defaultUrl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Configurar Foto de Estudiante</h3>
              <p className="text-xs text-slate-400">Sube o personaliza la foto real del alumno</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Selector Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 p-2 gap-2">
          {STUDENTS_DATA.map((student) => {
            const isSelected = selectedStudent === student.id;
            return (
              <button
                key={student.id}
                onClick={() => {
                  setSelectedStudent(student.id);
                  setPreviewUrl('');
                }}
                className={`flex-1 flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl font-medium text-sm transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span className="font-semibold">{student.name}</span>
                <span className="text-xs opacity-75">({student.age} años)</span>
                {customAvatars[student.id] && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400" title="Foto personalizada activa" />
                )}
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Preview & Dropzone */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Live Portrait Frame */}
            <div className="relative shrink-0 flex flex-col items-center">
              <div className="relative group">
                <img
                  src={activeAvatar}
                  alt={`Retrato de ${selectedStudent}`}
                  referrerPolicy="no-referrer"
                  style={{ objectPosition: selectedStudent === 'avril' ? '50% 10%' : '50% 20%' }}
                  className="w-32 h-32 rounded-2xl object-cover ring-4 ring-indigo-500/40 bg-slate-800 shadow-xl"
                />
                <div className="absolute inset-0 rounded-2xl bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="text-[11px] text-white font-medium bg-black/60 px-2 py-1 rounded-md backdrop-blur-sm">
                    Vista previa
                  </span>
                </div>
              </div>
              <span className="mt-2 text-xs font-semibold text-slate-300">
                {currentStudentData?.name}
              </span>
              <span className="text-[11px] text-slate-500">{currentStudentData?.grade}</span>
            </div>

            {/* Drag and Drop Box */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex-1 w-full border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-indigo-400 bg-indigo-500/10 scale-[1.01]'
                  : 'border-slate-700 hover:border-indigo-500/60 bg-slate-800/40 hover:bg-slate-800/80'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileProcess(e.target.files[0]);
                  }
                }}
              />
              <div className="p-3 rounded-full bg-indigo-500/10 text-indigo-400 mb-2">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-white">
                Arrastra tu foto aquí o <span className="text-indigo-400 underline">haz clic</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Admite archivos PNG, JPG, JPEG o WEBP de tu computadora
              </p>
            </div>
          </div>

          {/* Quick Presets Section */}
          <div className="space-y-2.5 pt-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Opciones de fotos de alta resolución disponibles:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {PRESET_PHOTOS[selectedStudent].map((preset, idx) => {
                const isSelected = activeAvatar === preset.url;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(preset.url)}
                    className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500/20 text-white ring-1 ring-indigo-500'
                        : 'border-slate-800 bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      referrerPolicy="no-referrer"
                      style={{ objectPosition: selectedStudent === 'avril' ? '50% 10%' : '50% 20%' }}
                      className="w-10 h-10 rounded-lg object-cover bg-slate-900 shrink-0"
                    />
                    <span className="text-xs font-medium leading-snug line-clamp-2">
                      {preset.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Or Paste Direct URL */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5" />
              O ingresa el enlace URL de la imagen:
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://ejemplo.com/foto.jpg"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => {
                  if (urlInput.trim()) {
                    setPreviewUrl(urlInput.trim());
                    setUrlInput('');
                  }
                }}
                disabled={!urlInput.trim()}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700"
              >
                Cargar
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/50">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restablecer a inicial
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-60"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 animate-bounce" />
                  ¡Foto Guardada!
                </>
              ) : isSaving ? (
                'Guardando...'
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  Guardar y Aplicar Foto
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
