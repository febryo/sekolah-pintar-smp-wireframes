
import React from 'react';
import { Calendar, Clock, MessageSquare, User, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavigationProps {
  activeItem: string;
  role: string;
  onNavigate: (item: string) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ activeItem, role, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', label: 'Beranda', icon: <Clock className="h-6 w-6" /> },
    { id: 'schedule', label: 'Jadwal', icon: <Calendar className="h-6 w-6" /> },
    { id: 'students', label: 'Siswa', icon: <Users className="h-6 w-6" />, adminOnly: true },
    { id: 'attendance', label: 'Absensi', icon: <User className="h-6 w-6" /> },
    { id: 'messages', label: 'Pesan', icon: <MessageSquare className="h-6 w-6" /> },
  ];

  const filteredItems = role === 'admin' 
    ? navItems 
    : navItems.filter(item => !item.adminOnly);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center px-2 md:hidden">
      {filteredItems.map((item) => (
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
