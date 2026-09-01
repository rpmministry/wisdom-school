import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { analyzeWork } from '../../services/aiService';
import { StudentSubmission, WorkAnalysisResult } from '../../types';
import { PageHeader } from '../layout/PageHeader';
import {
  FileCheck2,
  Upload,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  BookOpen,
  Image as ImageIcon,
  FileText,
  Loader2,
  ChevronRight,
  Eye,
  Award,
  RefreshCw,
} from 'lucide-react';

export const WorksView: React.FC = () => {
  const {
    currentStudent,
    studentSubjects,
    todayClasses,
    submissions,
    addSubmission,
    updateSubmission,
  } = useSchool();

  const [selectedSubjectId, setSelectedSubjectId] = useState(studentSubjects[0]?.id || '');
  const [workTitle, setWorkTitle] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  const [studentNotes, setStudentNotes] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [base64Data, setBase64Data] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<StudentSubmission | null>(null);

  const studentSubmissions = submissions.filter((s) => s.studentId === currentStudent.id);
  const activeSubject = studentSubjects.find((s) => s.id === selectedSubjectId) || studentSubjects[0];
  const activeClass = todayClasses.find((c) => c.subjectId === activeSubject?.id) || todayClasses[0];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        setBase64Data(result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl('https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=80');
      setBase64Data(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setPreviewUrl(result);
          setBase64Data(result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl('https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=80');
        setBase64Data(null);
      }
    }
  };

  const handleSubmitAndAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workTitle.trim() || !activeSubject || !activeClass) return;

    setIsUploading(true);

    // 1. Create the submission record
    const createdSubmission = addSubmission({
      studentId: currentStudent.id,
      subjectId: activeSubject.id,
      classId: activeClass.id,
      title: workTitle,
      description: workDescription || 'Evidencia de trabajo escolar.',
      fileName: selectedFile?.name || 'trabajo_escaneado.jpg',
      fileType: selectedFile?.type || 'image/jpeg',
      fileSize: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : '1.5 MB',
      previewUrl: previewUrl || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
      status: 'analyzing',
      studentNotes,
    });

    try {
      // 2. Call AI Analysis service
      const analysis = await analyzeWork({
        student: currentStudent,
        subject: activeSubject,
        dailyClass: activeClass,
        workTitle,
        workDescription,
        imageData: base64Data || undefined,
        mimeType: selectedFile?.type || 'image/jpeg',
        studentNotes,
      });

      // 3. Update with reviewed analysis
      updateSubmission(createdSubmission.id, {
        status: 'reviewed',
        analysis,
      });

      setSelectedSubmission({
        ...createdSubmission,
        status: 'reviewed',
        analysis,
      });

      // Reset form
      setWorkTitle('');
      setWorkDescription('');
      setStudentNotes('');
      setSelectedFile(null);
      setPreviewUrl(null);
      setBase64Data(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      
      <PageHeader title={`Portafolio de ${currentStudent.name}`} />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Upload Form Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-xl space-y-5">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-indigo-400" />
              <span>Subir Nueva Evidencia de Trabajo</span>
            </h2>

            <form onSubmit={handleSubmitAndAnalyze} className="space-y-4">
              
              {/* Subject Select */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Materia correspondiente:
                </label>
                <select
                  id="select-work-subject"
                  value={selectedSubjectId}
                  onChange={(e) => setSelectedSubjectId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  {studentSubjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name} (Tutor: {sub.teacher.name})
                    </option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Título del trabajo:
                </label>
                <input
                  id="input-work-title"
                  type="text"
                  required
                  value={workTitle}
                  onChange={(e) => setWorkTitle(e.target.value)}
                  placeholder="Ej. Ejercicios de modelado con balanzas"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Drag and Drop File Upload Area */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Archivo o Fotografía del Cuaderno:
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                    previewUrl
                      ? 'border-emerald-500/50 bg-emerald-950/10'
                      : 'border-slate-700 hover:border-indigo-500/50 bg-slate-900/60'
                  }`}
                  onClick={() => document.getElementById('file-upload-input')?.click()}
                >
                  <input
                    id="file-upload-input"
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {previewUrl ? (
                    <div className="space-y-2">
                      <img
                        src={previewUrl}
                        alt="Vista previa"
                        className="w-full h-32 object-cover rounded-xl border border-slate-700 mx-auto"
                      />
                      <p className="text-[11px] text-emerald-300 font-medium">
                        ✓ {selectedFile?.name || 'Fotografía lista para análisis'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 py-3">
                      <ImageIcon className="w-8 h-8 text-indigo-400 mx-auto" />
                      <p className="text-xs text-slate-300 font-medium">
                        Arrastra tu imagen o documento aquí, o <span className="text-indigo-400 underline">haz clic para examinar</span>
                      </p>
                      <p className="text-[10px] text-slate-500">Formatos: JPG, PNG o PDF (hasta 20MB)</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Student Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Notas o dudas para el evaluador (Opcional):
                </label>
                <textarea
                  id="textarea-work-notes"
                  rows={2}
                  value={studentNotes}
                  onChange={(e) => setStudentNotes(e.target.value)}
                  placeholder="Ej. Me costó el paso 3 al despejar con números negativos..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Submit Button */}
              <button
                id="btn-submit-work"
                type="submit"
                disabled={isUploading || !workTitle.trim()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-emerald-900/30 transition-all flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analizando con IA Pedagógica...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Entregar y Analizar con IA</span>
                  </>
                )}
              </button>

            </form>
          </div>
        </div>

        {/* Submissions List & Detailed Analysis View (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active / Detailed Analysis View */}
          {selectedSubmission ? (
            <div className="p-6 rounded-3xl bg-slate-800/90 border border-slate-700/90 shadow-2xl space-y-5 animate-fade-in">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">
                      {studentSubjects.find((s) => s.id === selectedSubmission.subjectId)?.name}
                    </span>
                    <span className="text-xs text-slate-500">• {selectedSubmission.submittedAt}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {selectedSubmission.title}
                  </h3>
                </div>

                {selectedSubmission.analysis && (
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                    {selectedSubmission.analysis.comprehensionLevel}
                  </span>
                )}
              </div>

              {/* Photo Preview Thumbnail */}
              {selectedSubmission.previewUrl && (
                <div className="rounded-2xl overflow-hidden border border-slate-700 max-h-48 bg-slate-950">
                  <img
                    src={selectedSubmission.previewUrl}
                    alt={selectedSubmission.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* AI Feedback Analysis Breakdown */}
              {selectedSubmission.analysis && (
                <div className="space-y-4 pt-2">
                  
                  {/* Summary Box */}
                  <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs sm:text-sm text-indigo-200 leading-relaxed">
                    <strong>💡 Resumen del Evaluador:</strong> {selectedSubmission.analysis.feedbackSummary}
                  </div>

                  {/* Strengths */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Aciertos y Fortalezas Detectadas</span>
                    </h4>
                    <ul className="space-y-1.5 pl-2">
                      {selectedSubmission.analysis.strengths.map((st, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{st}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Errors / Points to improve */}
                  {selectedSubmission.analysis.errors.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4" />
                        <span>Oportunidades de Mejora y Explicación</span>
                      </h4>
                      <ul className="space-y-1.5 pl-2">
                        {selectedSubmission.analysis.errors.map((er, i) => (
                          <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{er}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Guided Correction */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700/80 space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-300 block">
                      Corrección Formativa Paso a Paso:
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedSubmission.analysis.correction}
                    </p>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                      <Award className="w-4 h-4" />
                      <span>Recomendaciones para Seguir Creciendo</span>
                    </h4>
                    <ul className="space-y-1 pl-2">
                      {selectedSubmission.analysis.recommendations.map((rec, i) => (
                        <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                          <span className="text-indigo-400">→</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              )}
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-slate-800/40 border border-slate-700/40 text-center text-slate-400 space-y-2">
              <Sparkles className="w-8 h-8 text-indigo-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">Selecciona una entrega para ver su análisis</h4>
              <p className="text-xs text-slate-400">O sube un nuevo trabajo desde el panel de la izquierda.</p>
            </div>
          )}

          {/* Submissions History Feed */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>Historial de Entregas ({studentSubmissions.length})</span>
            </h3>

            {studentSubmissions.map((sub) => {
              const subSubject = studentSubjects.find((s) => s.id === sub.subjectId);
              const isSelected = selectedSubmission?.id === sub.id;
              return (
                <div
                  key={sub.id}
                  onClick={() => setSelectedSubmission(sub)}
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-4 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500 shadow-md'
                      : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-white">{sub.title}</h4>
                        <span className="text-[10px] text-slate-400">({subSubject?.name})</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{sub.submittedAt}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {sub.analysis?.comprehensionLevel || 'Analizando...'}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};
