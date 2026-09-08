'use client';
import React, { useEffect } from 'react';
import { StudentDashboard } from '../../components/dashboard/StudentDashboard';

export default function GaelPage() {
  useEffect(() => {
    try {
      const savedCurrent = localStorage.getItem('wisdom_current_v2026');
      const savedAuth = localStorage.getItem('wisdom_auth_v2026');
      if (savedCurrent !== 'gael' || savedAuth !== 'gael') {
        localStorage.setItem('wisdom_current_v2026', 'gael');
        localStorage.setItem('wisdom_auth_v2026', 'gael');
      }
    } catch { }
  }, []);

  return <StudentDashboard />;
}