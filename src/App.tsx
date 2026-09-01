import React, { useState } from 'react';
import { SchoolProvider, useSchool } from './context/SchoolContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { PageHeader } from './components/layout/PageHeader';
import { useHardwareBackButton } from './hooks/useHardwareBackButton';
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
  useHardwareBackButton();
  
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
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {activeTab !== 'home' && <Sidebar />}

        <main className="flex-1 px-0 pt-0 pb-24 md:pb-8 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>

      <AITeacherDrawer />

      <StudentLoginModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        targetStudentId={targetLoginStudentId}
        onOpenRegister={() => setRegisterModalOpen(true)}
      />

      <NewStudentModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      />

      <MobileBottomNav />
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
