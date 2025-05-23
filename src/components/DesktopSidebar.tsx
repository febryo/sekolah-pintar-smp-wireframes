
import React from 'react';
import { Calendar, Clock, User, Users, Bell, Receipt, CalendarDays, BookOpen, UserCheck, Map } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter
} from '@/components/ui/sidebar';

interface DesktopSidebarProps {
  activeItem: string;
  role: string;
  onNavigate: (item: string) => void;
  onLogout: () => void;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ 
  activeItem, 
  role, 
  onNavigate, 
  onLogout 
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Beranda', icon: <Clock className="h-5 w-5" /> },
    { id: 'schedule', label: 'Jadwal', icon: <Calendar className="h-5 w-5" />, hideFor: ['tata-usaha'] },
    { id: 'students', label: 'Siswa', icon: <Users className="h-5 w-5" />, hideFor: ['teacher'] },
    { id: 'attendance', label: 'Absensi', icon: <User className="h-5 w-5" />, hideFor: ['tata-usaha'] },
    { id: 'billing', label: 'Tagihan', icon: <Receipt className="h-5 w-5" />, showFor: ['admin', 'tata-usaha'] },
    { id: 'announcements', label: 'Pengumuman', icon: <Bell className="h-5 w-5" />, hideFor: ['teacher', 'tata-usaha'] },
    { id: 'events', label: 'Kalender Acara', icon: <CalendarDays className="h-5 w-5" /> },
    { id: 'master-teacher', label: 'Master Guru', icon: <UserCheck className="h-5 w-5" />, showFor: ['admin'] },
    { id: 'master-subject', label: 'Master Mapel', icon: <BookOpen className="h-5 w-5" />, showFor: ['admin'] },
    { id: 'teacher-subject-mapping', label: 'Pemetaan Guru-Mapel', icon: <Map className="h-5 w-5" />, showFor: ['admin'] },
  ];

  const filteredItems = navItems.filter(item => {
    if (item.showFor && item.showFor.includes(role)) return true;
    if (item.hideFor && item.hideFor.includes(role)) return false;
    if (item.showFor && !item.showFor.includes(role)) return false;
    return true;
  });

  return (
    <div className="hidden md:block h-screen">
      <Sidebar>
        <SidebarHeader className="py-6">
          <div className="px-4 flex items-center">
            <div className="h-8 w-8 rounded-lg bg-sis-blue flex items-center justify-center text-white font-bold mr-2">
              SIS
            </div>
            <h1 className="text-lg font-bold">SMP Nusantara</h1>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <nav className="space-y-2 px-2">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium",
                  activeItem === item.id 
                    ? "bg-sis-light-blue text-sis-blue" 
                    : "hover:bg-gray-100"
                )}
                onClick={() => onNavigate(item.id)}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </SidebarContent>
        
        <SidebarFooter className="px-4 pb-6">
          <div className="pt-2 border-t">
            <div className="flex items-center mb-4 px-2 py-2">
              <div className="flex-shrink-0 h-8 w-8 bg-gray-300 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium">
                  {role === 'admin' ? 'Admin Sekolah' : 
                   role === 'teacher' ? 'Guru' : 
                   'Tata Usaha'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {role === 'admin' ? 'admin@sekolah.com' : 
                   role === 'teacher' ? 'guru@sekolah.com' : 
                   'tatausaha@sekolah.com'}
                </p>
              </div>
            </div>
            <Button 
              variant="outline"
              className="w-full justify-start text-sm" 
              onClick={onLogout}
            >
              Keluar
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};

export default DesktopSidebar;
