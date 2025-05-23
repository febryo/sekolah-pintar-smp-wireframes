
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { SidebarProvider } from '@/components/ui/sidebar';
import AuthForm from '@/components/AuthForm';
import AdminDashboard from '@/components/AdminDashboard';
import TeacherDashboard from '@/components/TeacherDashboard';
import TataUsahaDashboard from '@/components/TataUsahaDashboard';
import StudentManagement from '@/components/StudentManagement';
import ClassSchedule from '@/components/ClassSchedule';
import Attendance from '@/components/Attendance';
import BillingInvoice from '@/components/BillingInvoice';
import MobileNavigation from '@/components/MobileNavigation';
import DesktopSidebar from '@/components/DesktopSidebar';
import { useToast } from '@/components/ui/use-toast';
import AnnouncementManagement from '@/components/AnnouncementManagement';

const Index = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState<'admin' | 'teacher' | 'tata-usaha'>('admin');
  const [activeView, setActiveView] = useState('dashboard');
  const { toast } = useToast();

  const handleLogin = (email: string, password: string, role: string) => {
    // In a real app, this would validate credentials against a backend
    setAuthenticated(true);
    setRole(role as 'admin' | 'teacher' | 'tata-usaha');
    setActiveView('dashboard');
    
    toast({
      title: "Login berhasil",
      description: `Selamat datang, ${
        role === 'admin' ? 'Admin' : 
        role === 'teacher' ? 'Guru' : 'Tata Usaha'
      }!`,
    });
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setRole('admin');
  };

  const handleNavigate = (view: string) => {
    setActiveView(view);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return role === 'admin' ? <AdminDashboard /> : 
               role === 'teacher' ? <TeacherDashboard /> : 
               <TataUsahaDashboard />;
      case 'students':
        return <StudentManagement />;
      case 'schedule':
        return <ClassSchedule />;
      case 'attendance':
        return <Attendance />;
      case 'billing':
        return <BillingInvoice />;
      case 'announcements':
        return <AnnouncementManagement />;
      default:
        return role === 'admin' ? <AdminDashboard /> : 
               role === 'teacher' ? <TeacherDashboard /> : 
               <TataUsahaDashboard />;
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <AuthForm onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <DesktopSidebar 
          activeItem={activeView} 
          role={role} 
          onNavigate={handleNavigate} 
          onLogout={handleLogout} 
        />
        
        <div className="flex-1 overflow-auto">
          <div className="p-6 pb-24 md:pb-6 max-w-6xl mx-auto">
            {renderActiveView()}
          </div>
        </div>
        
        <MobileNavigation
          activeItem={activeView}
          role={role}
          onNavigate={handleNavigate}
        />
      </div>
    </SidebarProvider>
  );
};

export default Index;
