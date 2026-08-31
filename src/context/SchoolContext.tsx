import React, { createContext, useContext, useState, useEffect } from 'react';
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
  studentSchedule: ScheduleEntry[];
  todaySchedule: ScheduleEntry[];
  classesList: DailyClass[];
  customAvatars: Record<StudentId, string>;
  updateStudentAvatar: (studentId: StudentId, avatarUrl: string) => void;
  changePassword: (studentId: StudentId, currentPass: string, newPass: string) => { success: boolean; error?: string };
  resetPasswordWithPin: (identifier: string, pin: string, newPass: string) => { success: boolean; error?: string };
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

const getInitialDayOfWeek = (): DayOfWeekName => {
  const dayIndex = new Date().getDay();
  const map: Record<number, DayOfWeekName> = {
    1: 'Lunes',
    2: 'Martes',
    3: 'Miércoles',
    4: 'Jueves',
    5: 'Viernes',
  };
  return map[dayIndex] || 'Martes';
};

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Paso 1: persistimos la lista de estudiantes para que las credenciales y perfiles queden disponibles aunque se recargue la app.
  const [studentsList, setStudentsList] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem('wisdom_students_list_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge with STUDENTS_DATA to preserve pre-configured credentials for Avril and Gael
          return STUDENTS_DATA.map((base) => {
            const match = parsed.find((p: Student) => p.id === base.id);
            return match ? { ...base, ...match, email: base.email, pinCode: base.pinCode, password: base.password } : base;
          }).concat(parsed.filter((p: Student) => !STUDENTS_DATA.some((b) => b.id === p.id)));
        }
      }
    } catch (e) {
      console.warn('Error reading stored students list:', e);
    }
    return STUDENTS_DATA;
  });

  // Paso 2: guardamos quién ha iniciado sesión para que el sistema recuerde al alumno autenticado y muestre su espacio privado.
  const [authenticatedStudentId, setAuthenticatedStudentId] = useState<StudentId | null>(() => {
    try {
      const saved = localStorage.getItem('wisdom_auth_student_id_v2');
      if (saved && saved !== 'null') return saved;
    } catch {
      // fallback
    }
    // Default session initialized with Avril for smooth preview experience
    return 'avril';
  });

  const [currentStudentId, setCurrentStudentId] = useState<StudentId>(() => {
    return authenticatedStudentId || 'avril';
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [targetLoginStudentId, setTargetLoginStudentId] = useState<string | undefined>(undefined);

  const openAuthModal = (studentId?: string) => {
    setTargetLoginStudentId(studentId);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setTargetLoginStudentId(undefined);
  };

  // Paso 3: definimos los estados globales de navegación, calendario y sesiones del estudiante dentro del ecosistema escolar.
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<DayOfWeekName>(getInitialDayOfWeek);
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  const [activeClass, setActiveClass] = useState<DailyClass | null>(null);
  const [isTeacherDrawerOpen, setIsTeacherDrawerOpen] = useState<boolean>(false);

  // Dynamic subjects state
  const [allSubjects, setAllSubjects] = useState<Subject[]>(() => {
    try {
      const saved = localStorage.getItem('wisdom_subjects_list_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= SUBJECTS_DATA.length) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading subjects storage:', e);
    }
    return SUBJECTS_DATA;
  });

  // Dynamic schedule entries state
  const [allSchedules, setAllSchedules] = useState<ScheduleEntry[]>(() => {
    try {
      const saved = localStorage.getItem('wisdom_schedules_list_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= SCHEDULE_DATA.length) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading schedules storage:', e);
    }
    return SCHEDULE_DATA;
  });

  // Daily Classes List
  const [classesList, setClassesList] = useState<DailyClass[]>(() => {
    try {
      const saved = localStorage.getItem('wisdom_classes_v10');
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
    } catch (e) {
      console.warn('Error reading stored classes:', e);
    }
    return DAILY_CLASSES_DATA;
  });

  const [submissions, setSubmissions] = useState<StudentSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('wisdom_submissions_v9');
      return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
    } catch {
      return INITIAL_SUBMISSIONS;
    }
  });

  const [customAvatars, setCustomAvatars] = useState<Record<StudentId, string>>(() => {
    try {
      const saved = localStorage.getItem('wisdom_student_avatars_v2');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Persistence Effects
  useEffect(() => {
    try {
      localStorage.setItem('wisdom_students_list_v3', JSON.stringify(studentsList));
    } catch (e) {
      console.warn('Error writing students storage:', e);
    }
  }, [studentsList]);

  useEffect(() => {
    try {
      localStorage.setItem('wisdom_auth_student_id_v2', authenticatedStudentId || 'null');
    } catch (e) {
      console.warn('Error writing auth student storage:', e);
    }
  }, [authenticatedStudentId]);

  useEffect(() => {
    try {
      localStorage.setItem('wisdom_subjects_list_v2', JSON.stringify(allSubjects));
    } catch (e) {
      console.warn('Error writing subjects storage:', e);
    }
  }, [allSubjects]);

  useEffect(() => {
    try {
      localStorage.setItem('wisdom_schedules_list_v2', JSON.stringify(allSchedules));
    } catch (e) {
      console.warn('Error writing schedules storage:', e);
    }
  }, [allSchedules]);

  useEffect(() => {
    try {
      localStorage.setItem('wisdom_classes_v10', JSON.stringify(classesList));
    } catch (e) {
      console.warn('Error writing classes storage:', e);
    }
  }, [classesList]);

  useEffect(() => {
    try {
      localStorage.setItem('wisdom_submissions_v9', JSON.stringify(submissions));
    } catch (e) {
      console.warn('Error writing submissions storage:', e);
    }
  }, [submissions]);

  const updateStudentAvatar = (studentId: StudentId, avatarUrl: string) => {
    setCustomAvatars((prev) => {
      const updated = { ...prev, [studentId]: avatarUrl };
      try {
        localStorage.setItem('wisdom_student_avatars_v2', JSON.stringify(updated));
      } catch (e) {
        console.warn('Error writing avatar storage:', e);
      }
      return updated;
    });
  };

  // Paso 4: la autenticación valida correo, código PIN o identificador personal para entrar al espacio del estudiante.
  const loginStudent = (identifier: string, passOrPin: string) => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanSecret = passOrPin.trim().toLowerCase();

    const found = studentsList.find((s) => {
      const matchEmail = s.email?.toLowerCase() === cleanId;
      const matchPin = s.pinCode?.toLowerCase() === cleanId;
      const matchId = s.id.toLowerCase() === cleanId;
      return matchEmail || matchPin || matchId;
    });

    if (!found) {
      return { success: false, error: 'No se encontró ningún estudiante con ese correo, código o usuario.' };
    }

    const validPass = (found.password && found.password.toLowerCase() === cleanSecret);
    const validPin = (found.pinCode && found.pinCode.toLowerCase() === cleanSecret);
    const validIdAsPin = (cleanId === found.pinCode?.toLowerCase() || cleanId === found.id.toLowerCase());

    if (validPass || validPin || validIdAsPin) {
      setAuthenticatedStudentId(found.id);
      setCurrentStudentId(found.id);
      return { success: true, student: found };
    }

    return { success: false, error: 'Contraseña o código PIN incorrecto. Revisa tus credenciales.' };
  };

  // 🔑 PASSWORD MANAGEMENT
  const changePassword = (studentId: string, currentPass: string, newPass: string) => {
    const student = studentsList.find((s) => s.id === studentId);
    if (!student) return { success: false, error: 'Estudiante no encontrado.' };
    
    const validCurrent = student.password ? student.password.toLowerCase() === currentPass.toLowerCase() : false;
    const validPinAsCurrent = student.pinCode ? student.pinCode.toLowerCase() === currentPass.toLowerCase() : false;
    
    if (!validCurrent && !validPinAsCurrent) {
      return { success: false, error: 'La contraseña actual es incorrecta.' };
    }
    
    if (newPass.trim().length < 4) {
      return { success: false, error: 'La nueva contraseña debe tener al menos 4 caracteres.' };
    }

    setStudentsList((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, password: newPass.trim() } : s))
    );
    return { success: true };
  };

  const resetPasswordWithPin = (identifier: string, pin: string, newPass: string) => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPin = pin.trim().toLowerCase();

    const student = studentsList.find((s) => {
      const matchEmail = s.email?.toLowerCase() === cleanId;
      const matchId = s.id.toLowerCase() === cleanId;
      return matchEmail || matchId;
    });

    if (!student) {
      return { success: false, error: 'No se encontró ningún estudiante con ese correo o usuario.' };
    }
    
    const validPin = student.pinCode ? student.pinCode.toLowerCase() === cleanPin : false;
    if (!validPin) {
      return { success: false, error: 'El código PIN ingresado es incorrecto.' };
    }

    if (newPass.trim().length < 4) {
      return { success: false, error: 'La nueva contraseña debe tener al menos 4 caracteres.' };
    }

    setStudentsList((prev) =>
      prev.map((s) => (s.id === student.id ? { ...s, password: newPass.trim() } : s))
    );
    return { success: true };
  };

  // Paso 5: cerrar sesión limpia el acceso privado y vuelve a la vista pública del colegio.
  const logoutStudent = () => {
    setAuthenticatedStudentId(null);
    setActiveTab('home');
  };

  // Paso 6: el registro crea un nuevo estudiante, asigna materias, horarios y lo autentica automáticamente para comenzar su experiencia.
  const registerNewStudent = (input: NewStudentInput) => {
    const created = createNewStudentProfile(input);

    setStudentsList((prev) => [created.student, ...prev]);
    setAllSubjects((prev) => [...created.subjects, ...prev]);
    setClassesList((prev) => [...created.classes, ...prev]);
    setAllSchedules((prev) => [...created.schedules, ...prev]);

    // Automatically authenticate the new student!
    setAuthenticatedStudentId(created.student.id);
    setCurrentStudentId(created.student.id);

    return {
      student: created.student,
      credentials: {
        email: created.student.email || '',
        pinCode: created.student.pinCode || '',
        password: created.student.password || '',
      },
    };
  };

  // Guard Tab switching: If user tries to access private student tab without auth, show login modal!
  const handleSetActiveTab = (tab: NavigationTab) => {
    if (tab !== 'home' && !authenticatedStudentId) {
      openAuthModal(currentStudentId);
      return;
    }
    setActiveTab(tab);
  };

  const currentStudent = studentsList.find((s) => s.id === currentStudentId) || studentsList[0];

  // Dynamically calculate progress per subject based on completed daily classes and microcurriculum
  const studentSubjects: Subject[] = allSubjects.filter((sub) => sub.studentId === currentStudentId).map((sub) => {
    const subjectClasses = classesList.filter((c) => c.subjectId === sub.id && c.studentId === currentStudentId);
    const completedClasses = subjectClasses.filter((c) => c.isCompleted || (c.activities.length > 0 && c.activities.every((a) => a.completed))).length;
    const subjectSubmissions = submissions.filter((s) => s.subjectId === sub.id && s.studentId === currentStudentId);
    
    const completedMicro = sub.units?.reduce(
      (acc, u) => acc + (u.microcurriculum?.filter((m) => m.status === 'completed')?.length || 0),
      0
    ) || 0;

    const totalTarget = sub.totalClasses || 35;
    const effectiveCompleted = Math.min(totalTarget, Math.max(completedClasses, completedMicro, subjectSubmissions.length > 0 ? 1 : 0, 1));
    const calculatedPercentage = Math.round((effectiveCompleted / totalTarget) * 100);

    return {
      ...sub,
      classesCompleted: effectiveCompleted,
      progressPercentage: calculatedPercentage,
    };
  });

  const allStudentClasses = classesList.filter((cls) => cls.studentId === currentStudentId);

  const todayClasses = classesList
    .filter((cls) => cls.studentId === currentStudentId && cls.dayOfWeek === selectedDayOfWeek)
    .sort((a, b) => {
      const timeA = a.scheduleTime?.slice(0, 5) || '00:00';
      const timeB = b.scheduleTime?.slice(0, 5) || '00:00';
      return timeA.localeCompare(timeB);
    });

  const studentSchedule = allSchedules.filter((sch) => sch.studentId === currentStudentId);
  const todaySchedule = studentSchedule.filter((sch) => sch.dayOfWeek === selectedDayOfWeek);

  useEffect(() => {
    const matchingClass = todayClasses[0] || allStudentClasses.find((c) => c.dayOfWeek === selectedDayOfWeek) || allStudentClasses[0] || null;
    setActiveClass(matchingClass);
    if (matchingClass) {
      const matchSub = studentSubjects.find((s) => s.id === matchingClass.subjectId) || null;
      setActiveSubject(matchSub);
    } else {
      setActiveSubject(studentSubjects[0] || null);
    }
  }, [currentStudentId, selectedDayOfWeek]);

  const addSubmission = (subData: Omit<StudentSubmission, 'id' | 'submittedAt'>): StudentSubmission => {
    const newSub: StudentSubmission = {
      ...subData,
      id: `sub-${Date.now()}`,
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    setSubmissions((prev) => [newSub, ...prev]);
    return newSub;
  };

  const updateSubmission = (id: string, updates: Partial<StudentSubmission>) => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, ...updates } : sub))
    );
  };

  const openTeacherDrawerWithContext = (subject?: Subject, dailyClass?: DailyClass) => {
    if (subject) setActiveSubject(subject);
    if (dailyClass) setActiveClass(dailyClass);
    setIsTeacherDrawerOpen(true);
  };

  const toggleActivityCompletion = (classId: string, activityId: string) => {
    setClassesList((prev) =>
      prev.map((cls) => {
        if (cls.id !== classId) return cls;
        const updatedActivities = cls.activities.map((act) =>
          act.id === activityId ? { ...act, completed: !act.completed } : act
        );
        const allDone = updatedActivities.every((a) => a.completed);
        return {
          ...cls,
          activities: updatedActivities,
          isCompleted: allDone,
        };
      })
    );
  };

  return (
    <SchoolContext.Provider
      value={{
        studentsList,
        currentStudent,
        currentStudentId,
        setCurrentStudentId,
        authenticatedStudentId,
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
        studentSchedule,
        todaySchedule,
        classesList,
        customAvatars,
        updateStudentAvatar,
        changePassword,
        resetPasswordWithPin,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export function useSchool() {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool debe usarse dentro de un SchoolProvider');
  }
  return context;
}
