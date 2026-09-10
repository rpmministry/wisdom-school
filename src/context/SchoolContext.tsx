import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  Student,
  StudentId,
  Subject,
  DailyClass,
  StudentSubmission,
  NavigationTab,
  ScheduleEntry,
  NewStudentInput,
} from '../types';
import {
  STUDENTS_DATA,
  SUBJECTS_DATA,
  DAILY_CLASSES_DATA,
  INITIAL_SUBMISSIONS,
  SCHEDULE_DATA,
} from '../data/mockData';
import { createNewStudentProfile } from '../utils/studentRegistration';

export type DayOfWeekName = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes';

interface SchoolContextType {
  studentsList: Student[];
  currentStudent: Student;
  currentStudentId: StudentId;
  setCurrentStudentId: (id: StudentId) => void;
  authenticatedStudentId: StudentId | null;
  setAuthenticatedStudentId: (id: StudentId | null) => void;
  isAuthenticated: boolean;
  loginStudent: (identifier: string, passOrPin: string) => { success: boolean; student?: Student; error?: string };
  logoutStudent: () => void;
  registerNewStudent: (input: NewStudentInput) => { student: Student; credentials: { email: string; pinCode: string; password?: string } };
  isAuthModalOpen: boolean;
  targetLoginStudentId?: string;
  openAuthModal: (studentId?: string) => void;
  closeAuthModal: () => void;
  selectedDayOfWeek: DayOfWeekName;
  setSelectedDayOfWeek: (day: DayOfWeekName) => void;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  navigationHistory: NavigationTab[];
  navigateBack: () => void;
  navigateToHome: () => void;
  studentSubjects: Subject[];
  allSubjects: Subject[];
  activeSubject: Subject | null;
  setActiveSubject: (subject: Subject | null) => void;
  todayClasses: DailyClass[];
  allStudentClasses: DailyClass[];
  activeClass: DailyClass | null;
  setActiveClass: (cls: DailyClass | null) => void;
  submissions: StudentSubmission[];
  addSubmission: (submission: Omit<StudentSubmission, 'id' | 'submittedAt'>) => StudentSubmission;
  updateSubmission: (id: string, updates: Partial<StudentSubmission>) => void;
  isTeacherDrawerOpen: boolean;
  setIsTeacherDrawerOpen: (open: boolean) => void;
  openTeacherDrawerWithContext: (subject?: Subject, dailyClass?: DailyClass) => void;
  toggleActivityCompletion: (classId: string, activityId: string) => void;
  completeClass: (classId: string) => void;
  /** Progreso de la ruta de micro-lecciones por clase: índices superados (0..N-1). */
  microRouteProgress: Record<string, number[]>;
  markMicroCleared: (classId: string, index: number) => void;
  resetMicroRoute: (classId: string) => void;
  /** Marca temporal del último guardado real de progreso (para el indicador "Guardado"). */
  lastSavedAt: number | null;
  studentSchedule: ScheduleEntry[];
  todaySchedule: ScheduleEntry[];
  classesList: DailyClass[];
  customAvatars: Record<StudentId, string>;
  updateStudentAvatar: (studentId: StudentId, avatarUrl: string) => void;
  changePassword: (studentId: StudentId, currentPass: string, newPass: string) => { success: boolean; error?: string };
  resetPasswordWithPin: (identifier: string, pin: string, newPass: string) => { success: boolean; error?: string };
  loginAsTestStudent: (testStudentId: StudentId) => void;
  /** true cuando el perfil activo es un perfil de prueba (Karen o Mauricio). */
  isDemoMode: boolean;
  /** Controla el modal de "candado demo" al intentar completar/avanzar. */
  isDemoLockOpen: boolean;
  openDemoLock: () => void;
  closeDemoLock: () => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

const SCHOOL_START_DATE = new Date('2026-09-07T00:00:00');
const SCHOOL_START_DAY = 'Lunes'; // 7 de septiembre de 2026 es Lunes

const getInitialDayOfWeek = (): DayOfWeekName => {
  // Iniciar siempre en Lunes para el inicio de clases (7 sep 2026)
  // Si aún no ha empezado el colegio, también mostrar Lunes
  return SCHOOL_START_DAY;
};

const isBeforeSchoolStart = (): boolean => new Date() < SCHOOL_START_DATE;

const daysSinceStart = (): number => {
  const today = new Date();
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startTime = SCHOOL_START_DATE.getTime();
  return Math.ceil((todayDate.getTime() - startTime) / (1000 * 60 * 60 * 24));
};

const getCurrentSchoolDay = (): DayOfWeekName => {
  const offset = daysSinceStart();
  if (offset < 0) return SCHOOL_START_DAY; // Empezar en Lunes antes del inicio
  const schoolDays: DayOfWeekName[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  const dayIndex = (offset % 5 + 5) % 5;
  return schoolDays[dayIndex];
};

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    try {
      const demoStudentIds = ['karen', 'mauricio'];
      const authSaved = localStorage.getItem('wisdom_auth_v2026');
      const currentSaved = localStorage.getItem('wisdom_current_v2026');
      if (authSaved && demoStudentIds.includes(authSaved)) localStorage.removeItem('wisdom_auth_v2026');
      if (currentSaved && demoStudentIds.includes(currentSaved)) localStorage.removeItem('wisdom_current_v2026');
    } catch { }
  }, []);

  const [studentsList, setStudentsList] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem('wisdom_students_v2026');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return STUDENTS_DATA.map((base) => {
            const match = parsed.find((p: Student) => p.id === base.id);
            return match ? { ...base, ...match, email: base.email, pinCode: base.pinCode, password: base.password } : base;
          }).concat(parsed.filter((p: Student) => !STUDENTS_DATA.some((b) => b.id === p.id)));
        }
      }
    } catch (e) { }
    return STUDENTS_DATA;
  });

  const [authenticatedStudentId, setAuthenticatedStudentId] = useState<StudentId | null>(() => {
    try {
      const saved = localStorage.getItem('wisdom_auth_v2026');
      if (saved && saved !== 'null' && saved !== '') {
        const demoStudentIds = ['karen', 'mauricio'];
        if (!demoStudentIds.includes(saved)) return saved;
      }
    } catch { }
    return null;
  });

  const [currentStudentId, setCurrentStudentId] = useState<StudentId | null>(() => {
    try {
      const saved = localStorage.getItem('wisdom_current_v2026');
      if (saved && saved !== 'null' && saved !== '') {
        const demoStudentIds = ['karen', 'mauricio'];
        if (!demoStudentIds.includes(saved)) return saved;
      }
    } catch { }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [targetLoginStudentId, setTargetLoginStudentId] = useState<string | undefined>(undefined);

  const openAuthModal = (studentId?: string) => { setTargetLoginStudentId(studentId); setIsAuthModalOpen(true); };
  const closeAuthModal = () => { setIsAuthModalOpen(false); setTargetLoginStudentId(undefined); };

  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<DayOfWeekName>(getInitialDayOfWeek);

  // Auto-update selectedDayOfWeek to current school day (but allow manual override)
  useEffect(() => {
    if (!isBeforeSchoolStart()) {
      const currentSchoolDay = getCurrentSchoolDay();
      setSelectedDayOfWeek(currentSchoolDay);
    }
  }, []);
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [navigationHistory, setNavigationHistory] = useState<NavigationTab[]>([]);
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  const [activeClass, setActiveClass] = useState<DailyClass | null>(null);
  const [isTeacherDrawerOpen, setIsTeacherDrawerOpen] = useState<boolean>(false);
  const [isDemoLockOpen, setIsDemoLockOpen] = useState<boolean>(false);

  const openDemoLock = () => setIsDemoLockOpen(true);
  const closeDemoLock = () => setIsDemoLockOpen(false);

  const navigateBack = () => {
    setNavigationHistory((prev) => {
      if (prev.length === 0) return prev;
      const newHistory = prev.slice(0, -1);
      setActiveTab(prev[prev.length - 1]);
      return newHistory;
    });
  };

  const navigateToHome = () => { setNavigationHistory([]); setActiveTab('home'); };

  const [allSubjects, setAllSubjects] = useState<Subject[]>(() => {
    try {
      const saved = localStorage.getItem('wisdom_subjects_v2026');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= SUBJECTS_DATA.length) return parsed;
      }
    } catch (e) { }
    return SUBJECTS_DATA;
  });

  const [allSchedules, setAllSchedules] = useState<ScheduleEntry[]>(() => {
    try {
      const saved = localStorage.getItem('wisdom_schedules_v2026');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= SCHEDULE_DATA.length) return parsed;
      }
    } catch (e) { }
    return SCHEDULE_DATA;
  });

  const [classesList, setClassesList] = useState<DailyClass[]>(() => {
    try {
      const saved = localStorage.getItem('wisdom_classes_v2026');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= DAILY_CLASSES_DATA.length) {
          return DAILY_CLASSES_DATA.map((official) => {
            const match = parsed.find((p: DailyClass) => p.id === official.id);
            if (match) {
              return {
                ...official,
                isCompleted: match.isCompleted ?? official.isCompleted,
                activities: official.activities.map((act) => {
                  const savedAct = match.activities?.find((a: any) => a.id === act.id);
                  return savedAct ? { ...act, completed: savedAct.completed } : act;
                }),
              };
            }
            return official;
          }).concat(parsed.filter((p: DailyClass) => !DAILY_CLASSES_DATA.some((b) => b.id === p.id)));
        }
      }
    } catch (e) { }
    return DAILY_CLASSES_DATA;
  });

  const [submissions, setSubmissions] = useState<StudentSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('wisdom_submissions_v2026');
      return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
    } catch { return INITIAL_SUBMISSIONS; }
  });

  const [customAvatars, setCustomAvatars] = useState<Record<StudentId, string>>(() => {
    try {
      const saved = localStorage.getItem('wisdom_avatars_v2026');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  const [microRouteProgress, setMicroRouteProgress] = useState<Record<string, number[]>>(() => {
    try {
      const saved = localStorage.getItem('wisdom_micro_route_v2026');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);

  useEffect(() => { localStorage.setItem('wisdom_students_v2026', JSON.stringify(studentsList.filter(s => !s.isDemo))); }, [studentsList]);
  
  useEffect(() => {
    const student = studentsList.find((s) => s.id === authenticatedStudentId);
    if (student && !student.isDemo) localStorage.setItem('wisdom_auth_v2026', authenticatedStudentId || 'null');
    else localStorage.removeItem('wisdom_auth_v2026');
  }, [authenticatedStudentId, studentsList]);

  useEffect(() => { localStorage.setItem('wisdom_current_v2026', currentStudentId || 'null'); }, [currentStudentId]);
  
  useEffect(() => {
    if (authenticatedStudentId && currentStudentId !== authenticatedStudentId) setCurrentStudentId(authenticatedStudentId);
    else if (!authenticatedStudentId && currentStudentId) setCurrentStudentId(null);
  }, [authenticatedStudentId]);

  useEffect(() => { localStorage.setItem('wisdom_subjects_v2026', JSON.stringify(allSubjects)); }, [allSubjects]);
  useEffect(() => { localStorage.setItem('wisdom_schedules_v2026', JSON.stringify(allSchedules)); }, [allSchedules]);
  useEffect(() => { localStorage.setItem('wisdom_classes_v2026', JSON.stringify(classesList)); }, [classesList]);
  useEffect(() => { localStorage.setItem('wisdom_submissions_v2026', JSON.stringify(submissions)); }, [submissions]);
  useEffect(() => { localStorage.setItem('wisdom_micro_route_v2026', JSON.stringify(microRouteProgress)); }, [microRouteProgress]);

  // Indicador honesto de guardado: se actualiza solo con cambios REALES de progreso,
  // nunca en el montaje inicial, para no mostrar "Guardado" sin que el niño haga nada.
  const didPersistRef = useRef(false);
  useEffect(() => {
    if (!didPersistRef.current) { didPersistRef.current = true; return; }
    setLastSavedAt(Date.now());
  }, [classesList, submissions, microRouteProgress, customAvatars]);

  const markMicroCleared = (classId: string, index: number) => {
    setMicroRouteProgress((prev) => {
      const current = prev[classId] || [];
      if (current.includes(index)) return prev;
      return { ...prev, [classId]: [...current, index].sort((a, b) => a - b) };
    });
  };

  const resetMicroRoute = (classId: string) => {
    setMicroRouteProgress((prev) => ({ ...prev, [classId]: [] }));
  };

  const updateStudentAvatar = (studentId: StudentId, avatarUrl: string) => {
    setCustomAvatars((prev) => {
      const updated = { ...prev, [studentId]: avatarUrl };
      localStorage.setItem('wisdom_avatars_v2026', JSON.stringify(updated));
      return updated;
    });
  };

  const loginStudent = (identifier: string, passOrPin: string) => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanSecret = passOrPin.trim().toLowerCase();
    const found = studentsList.find((s) => s.email?.toLowerCase() === cleanId || s.pinCode?.toLowerCase() === cleanId || s.id.toLowerCase() === cleanId || s.name?.toLowerCase() === cleanId);
    if (!found) return { success: false, error: 'Estudiante no encontrado.' };
    
    if ((found.password?.toLowerCase() === cleanSecret) || (found.pinCode?.toLowerCase() === cleanSecret) || (cleanId === found.pinCode?.toLowerCase() || cleanId === found.id.toLowerCase())) {
      setAuthenticatedStudentId(found.id); setCurrentStudentId(found.id);
      return { success: true, student: found };
    }
    return { success: false, error: 'Credenciales incorrectas.' };
  };

  const changePassword = (studentId: string, currentPass: string, newPass: string) => {
    const student = studentsList.find((s) => s.id === studentId);
    if (!student) return { success: false, error: 'Estudiante no encontrado.' };
    if (!((student.password?.toLowerCase() === currentPass.toLowerCase()) || (student.pinCode?.toLowerCase() === currentPass.toLowerCase()))) return { success: false, error: 'Contraseña actual incorrecta.' };
    if (newPass.trim().length < 4) return { success: false, error: 'Debe tener al menos 4 caracteres.' };
    setStudentsList((prev) => prev.map((s) => (s.id === studentId ? { ...s, password: newPass.trim() } : s)));
    return { success: true };
  };

  const resetPasswordWithPin = (identifier: string, pin: string, newPass: string) => {
    const cleanId = identifier.trim().toLowerCase();
    const student = studentsList.find((s) => s.email?.toLowerCase() === cleanId || s.id.toLowerCase() === cleanId);
    if (!student) return { success: false, error: 'No encontrado.' };
    if (student.pinCode?.toLowerCase() !== pin.trim().toLowerCase()) return { success: false, error: 'PIN incorrecto.' };
    if (newPass.trim().length < 4) return { success: false, error: 'Debe tener al menos 4 caracteres.' };
    setStudentsList((prev) => prev.map((s) => (s.id === student.id ? { ...s, password: newPass.trim() } : s)));
    return { success: true };
  };

  const logoutStudent = () => { setAuthenticatedStudentId(null); setCurrentStudentId(null); setActiveTab('home'); };

  const loginAsTestStudent = (testStudentId: StudentId) => {
    const demoStudent = studentsList.find((s) => s.id === testStudentId && s.isDemo);
    if (!demoStudent) return;
    // Bypass de autenticación tradicional: el Modo Demo entra directo con estado global.
    setAuthenticatedStudentId(testStudentId);
    setCurrentStudentId(testStudentId);
    setNavigationHistory([]);
    setIsDemoLockOpen(false);
    setSelectedDayOfWeek('Lunes');
    setActiveTab('space');
  };

  const registerNewStudent = (input: NewStudentInput) => {
    const created = createNewStudentProfile(input);
    setStudentsList((prev) => [created.student, ...prev]);
    setAllSubjects((prev) => [...created.subjects, ...prev]);
    setClassesList((prev) => [...created.classes, ...prev]);
    setAllSchedules((prev) => [...created.schedules, ...prev]);
    setAuthenticatedStudentId(created.student.id);
    setCurrentStudentId(created.student.id);
    return { student: created.student, credentials: { email: created.student.email || '', pinCode: created.student.pinCode || '', password: created.student.password || '' } };
  };

  const handleSetActiveTab = (tab: NavigationTab) => {
    if (tab !== 'home' && !authenticatedStudentId) { 
      // FIX 1: Le decimos a TS que si es null, envíe undefined
      openAuthModal(currentStudentId || undefined); 
      return; 
    }
    setActiveTab((prevTab) => {
      if (prevTab !== tab && prevTab !== 'home') setNavigationHistory((prev) => [...prev, prevTab]);
      if (tab === 'home') setNavigationHistory([]);
      return tab;
    });
  };

  const currentStudent = studentsList.find((s) => s.id === currentStudentId) || studentsList[0];
  const isDemoMode = !!authenticatedStudentId && !!studentsList.find((s) => s.id === authenticatedStudentId)?.isDemo;

  const studentSubjects: Subject[] = allSubjects.filter((sub) => sub.studentId === currentStudentId).map((sub) => {
    const subjectClasses = classesList.filter((c) => c.subjectId === sub.id && c.studentId === currentStudentId);
    const completedClasses = subjectClasses.filter((c) => c.isCompleted || (c.activities.length > 0 && c.activities.every((a) => a.completed))).length;
    const subjectSubmissions = submissions.filter((s) => s.subjectId === sub.id && s.studentId === currentStudentId);
    
    const completedMicro = sub.units?.reduce((acc, u) => acc + (u.microcurriculum?.filter((m) => m.status === 'completed')?.length || 0), 0) || 0;
    const totalTarget = sub.totalClasses || 35;
    
    const effectiveCompleted = Math.max(completedClasses, completedMicro, subjectSubmissions.length > 0 ? 1 : 0);
    const calculatedPercentage = totalTarget > 0 ? Math.round((effectiveCompleted / totalTarget) * 100) : 0;

    return {
      ...sub,
      classesCompleted: effectiveCompleted,
      progressPercentage: calculatedPercentage,
    };
  });

  const allStudentClasses = classesList.filter((cls) => cls.studentId === currentStudentId);
  const todayClasses = allStudentClasses.filter((cls) => cls.dayOfWeek === selectedDayOfWeek).sort((a, b) => (a.scheduleTime?.slice(0, 5) || '00:00').localeCompare(b.scheduleTime?.slice(0, 5) || '00:00'));
  const studentSchedule = allSchedules.filter((sch) => sch.studentId === currentStudentId);
  const todaySchedule = studentSchedule.filter((sch) => sch.dayOfWeek === selectedDayOfWeek);

  useEffect(() => {
    const matchingClass = todayClasses[0] || allStudentClasses.find((c) => c.dayOfWeek === selectedDayOfWeek) || allStudentClasses[0] || null;
    setActiveClass(matchingClass);
    if (matchingClass) setActiveSubject(studentSubjects.find((s) => s.id === matchingClass.subjectId) || null);
    else setActiveSubject(studentSubjects[0] || null);
  }, [currentStudentId, selectedDayOfWeek]);

  const addSubmission = (subData: Omit<StudentSubmission, 'id' | 'submittedAt'>): StudentSubmission => {
    const newSub: StudentSubmission = { ...subData, id: `sub-${Date.now()}`, submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16) };
    setSubmissions((prev) => [newSub, ...prev]);
    return newSub;
  };

  const updateSubmission = (id: string, updates: Partial<StudentSubmission>) => { setSubmissions((prev) => prev.map((sub) => (sub.id === id ? { ...sub, ...updates } : sub))); };
  const openTeacherDrawerWithContext = (subject?: Subject, dailyClass?: DailyClass) => { if (subject) setActiveSubject(subject); if (dailyClass) setActiveClass(dailyClass); setIsTeacherDrawerOpen(true); };
  
  // Fuente única de verdad para la regla de "clase completada": se deriva siempre
  // de que todas las actividades estén completas, sin importar quién actualice.
  const updateClassActivities = (
    classId: string,
    update: (activity: DailyClass['activities'][number]) => DailyClass['activities'][number],
  ) => {
    setClassesList((prev) => prev.map((cls) => {
      if (cls.id !== classId) return cls;
      const updatedActivities = cls.activities.map(update);
      return { ...cls, activities: updatedActivities, isCompleted: updatedActivities.every((a) => a.completed) };
    }));
  };

  const toggleActivityCompletion = (classId: string, activityId: string) => {
    updateClassActivities(classId, (act) => act.id === activityId ? { ...act, completed: !act.completed } : act);
  };

  const completeClass = (classId: string) => {
    // Candado del Modo Demo: la clase de prueba se puede cursar completa con la IA,
    // pero no se registra avance ni se desbloquea el plan completo.
    if (currentStudent.isDemo) {
      setIsDemoLockOpen(true);
      return;
    }
    updateClassActivities(classId, (act) => ({ ...act, completed: true }));
  };

  return (
    <SchoolContext.Provider 
      value={{ 
        studentsList, 
        currentStudent, 
        // FIX 2: Si por alguna razón está vacío (null), asume al primer estudiante. ¡A TypeScript le encanta esto!
        currentStudentId: currentStudentId || studentsList[0].id, 
        setCurrentStudentId: (id: StudentId) => setCurrentStudentId(id), 
        authenticatedStudentId, 
        setAuthenticatedStudentId, 
        isAuthenticated: !!authenticatedStudentId, 
        loginStudent, 
        logoutStudent, 
        registerNewStudent, 
        isAuthModalOpen, 
        targetLoginStudentId, 
        openAuthModal, 
        closeAuthModal, 
        selectedDayOfWeek, 
        setSelectedDayOfWeek, 
        activeTab, 
        setActiveTab: handleSetActiveTab, 
        studentSubjects, 
        allSubjects, 
        activeSubject, 
        setActiveSubject, 
        todayClasses, 
        allStudentClasses, 
        activeClass, 
        setActiveClass, 
        submissions, 
        addSubmission, 
        updateSubmission, 
        isTeacherDrawerOpen, 
        setIsTeacherDrawerOpen, 
        openTeacherDrawerWithContext, 
        toggleActivityCompletion,
    completeClass,
        microRouteProgress,
        markMicroCleared,
        resetMicroRoute,
        lastSavedAt,
        studentSchedule, 
        todaySchedule, 
        classesList, 
        customAvatars, 
        updateStudentAvatar, 
        changePassword, 
        resetPasswordWithPin, 
        navigationHistory, 
        navigateBack, 
        navigateToHome, 
        loginAsTestStudent,
        isDemoMode,
        isDemoLockOpen,
        openDemoLock,
        closeDemoLock,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export function useSchool() {
  const context = useContext(SchoolContext);
  if (!context) throw new Error('useSchool debe usarse dentro de un SchoolProvider');
  return context;
}