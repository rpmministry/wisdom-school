import React, { useState } from 'react';
import { SchoolProvider, useSchool } from './context/SchoolContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LandingView } from './components/landing/LandingView';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { SubjectsView } from './components/subjects/SubjectsView';
import { DailyClassView } from './components/classes/DailyClassView';
import { WorksView } from './components/works/WorksView';
import { ProgressView } from './components/progress/ProgressView';
import { ScheduleView } from './components/schedule/ScheduleView';
import { ActivitiesView } from './components/activities/ActivitiesView';
import { AITeacherDrawer } from './components/teacher/AITeacherDrawer';
import { StudentLoginModal } from './components/auth/StudentLoginModal';
import { NewStudentModal } from './components/landing/NewStudentModal';
import {
  Home,
  User,
  BookMarked,
  PlayCircle,
  FileCheck2,
  TrendingUp,
  CalendarDays,
  ListTodo,
} from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentStudent,
    isAuthModalOpen,
    targetLoginStudentId,
    closeAuthModal,
  } = useSchool();

  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <LandingView />;
      case 'space':
        return <StudentDashboard />;
      case 'subjects':
        return <SubjectsView />;
      case 'classes':
        return <DailyClassView />;
      case 'works':
        return <WorksView />;
      case 'progress':
        return <ProgressView />;
      case 'schedule':
        return <ScheduleView />;
      case 'activities':
        return <ActivitiesView />;
      default:
        return <LandingView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar (Hidden on landing if desired, or persistent) */}
        {activeTab !== 'home' && <Sidebar />}

        {/* Main Content Area */}
        <main className="flex-1 px-0 pt-0 pb-24 md:pb-8 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Socratic AI Teacher Interactive Drawer */}
      <AITeacherDrawer />

      {/* Student Authentication Modal */}
      <StudentLoginModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        targetStudentId={targetLoginStudentId}
        onOpenRegister={() => setRegisterModalOpen(true)}
      />

      {/* New Student Registration Modal */}
      <NewStudentModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      />

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-3 py-2 flex items-center justify-around">
        {[
          { id: 'home', label: 'Inicio', icon: Home },
          { id: 'space', label: 'Espacio', icon: User },
          { id: 'subjects', label: 'Materias', icon: BookMarked },
          { id: 'classes', label: 'Clases', icon: PlayCircle },
          { id: 'works', label: 'Trabajos', icon: FileCheck2 },
          { id: 'progress', label: 'Progreso', icon: TrendingUp },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
                isActive
                  ? currentStudent.id === 'avril'
                    ? 'text-indigo-400 font-bold'
                    : 'text-amber-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <SchoolProvider>
        <MainContent />
      </SchoolProvider>
    </ErrorBoundary>
  );
}
