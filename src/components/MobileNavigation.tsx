
import React from 'react';
import { Calendar, Clock, User, Users, Bell, Receipt, CalendarDays, BookOpen, UserCheck, Map } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavigationProps {
  activeItem: string;
  role: string;
  onNavigate: (item: string) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ activeItem, role, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', label: 'Beranda', icon: <Clock className="h-6 w-6" /> },
    { id: 'schedule', label: 'Jadwal', icon: <Calendar className="h-6 w-6" />, hideFor: ['tata-usaha'] },
    { id: 'students', label: 'Siswa', icon: <Users className="h-6 w-6" />, hideFor: ['teacher'] },
    { id: 'attendance', label: 'Absensi', icon: <User className="h-6 w-6" />, hideFor: ['tata-usaha'] },
    { id: 'billing', label: 'Tagihan', icon: <Receipt className="h-6 w-6" />, showFor: ['admin', 'tata-usaha'] },
    { id: 'announcements', label: 'Pengumuman', icon: <Bell className="h-6 w-6" />, hideFor: ['teacher', 'tata-usaha'] },
    { id: 'events', label: 'Acara', icon: <CalendarDays className="h-6 w-6" /> },
    { id: 'master-teacher', label: 'Guru', icon: <UserCheck className="h-6 w-6" />, showFor: ['admin'] },
    { id: 'master-subject', label: 'Mapel', icon: <BookOpen className="h-6 w-6" />, showFor: ['admin'] },
    { id: 'teacher-subject-mapping', label: 'Pemetaan', icon: <Map className="h-6 w-6" />, showFor: ['admin'] },
  ];

  // Filter items based on role
  const filteredItems = navItems.filter(item => {
    if (item.showFor && item.showFor.includes(role)) return true;
    if (item.hideFor && item.hideFor.includes(role)) return false;
    if (item.showFor && !item.showFor.includes(role)) return false;
    return true;
  });

  // For mobile, let's limit to 5 items max to avoid overcrowding
  const limitedItems = filteredItems.slice(0, 5);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center px-2 md:hidden">
      {limitedItems.map((item) => (
        <button
          key={item.id}
          className={cn(
            "nav-item w-full h-full",
            activeItem === item.id && "active"
          )}
          onClick={() => onNavigate(item.id)}
        >
          <div>{item.icon}</div>
          <span className="mt-1">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MobileNavigation;
