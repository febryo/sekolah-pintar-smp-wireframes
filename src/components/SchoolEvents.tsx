
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Calendar, List } from "lucide-react";
import AddEvent from './AddEvent';
import EventDetail from './EventDetail';
import EventCalendar from './EventCalendar';

export interface SchoolEvent {
  id: number;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: 'academic' | 'extracurricular' | 'holiday' | 'meeting' | 'other';
  location: string;
  participants: string[];
  priority: 'low' | 'medium' | 'high';
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
}

const SchoolEvents = () => {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<SchoolEvent | null>(null);

  // Mock events data
  const [events, setEvents] = useState<SchoolEvent[]>([
    {
      id: 1,
      title: "Rapat Guru Bulanan",
      description: "Rapat evaluasi pembelajaran bulan ini",
      date: new Date('2024-01-15'),
      startTime: "08:00",
      endTime: "10:00",
      type: "meeting",
      location: "Ruang Rapat",
      participants: ["Guru Kelas", "Kepala Sekolah"],
      priority: "high",
      status: "scheduled"
    },
    {
      id: 2,
      title: "Ujian Tengah Semester",
      description: "Ujian tengah semester untuk kelas 7-9",
      date: new Date('2024-01-20'),
      startTime: "07:30",
      endTime: "11:30",
      type: "academic",
      location: "Seluruh Kelas",
      participants: ["Siswa Kelas 7", "Siswa Kelas 8", "Siswa Kelas 9"],
      priority: "high",
      status: "scheduled"
    },
    {
      id: 3,
      title: "Hari Libur Nasional",
      description: "Hari kemerdekaan Indonesia",
      date: new Date('2024-08-17'),
      startTime: "00:00",
      endTime: "23:59",
      type: "holiday",
      location: "-",
      participants: [],
      priority: "medium",
      status: "scheduled"
    }
  ]);

  const handleAddEvent = (newEvent: Omit<SchoolEvent, 'id'>) => {
    const id = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
    setEvents([...events, { ...newEvent, id }]);
  };

  const handleSaveEvent = (updatedEvent: SchoolEvent) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    setSelectedEvent(updatedEvent);
  };

  const handleDeleteEvent = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus acara ini?')) {
      setEvents(events.filter(event => event.id !== id));
      if (selectedEvent?.id === id) {
        setView('list');
        setSelectedEvent(null);
      }
    }
  };

  const handleViewDetails = (event: SchoolEvent) => {
    setSelectedEvent(event);
    setView('detail');
  };

  const filteredEvents = events.filter(event => {
    const matchesQuery = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || event.type === selectedType;
    return matchesQuery && matchesType;
  });

  const getTypeLabel = (type: string) => {
    const labels = {
      academic: 'Akademik',
      extracurricular: 'Ekstrakurikuler',
      holiday: 'Libur',
      meeting: 'Rapat',
      other: 'Lainnya'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors] || '';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      scheduled: 'bg-blue-100 text-blue-800',
      ongoing: 'bg-orange-100 text-orange-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || '';
  };

  if (view === 'detail' && selectedEvent) {
    return (
      <EventDetail
        event={selectedEvent}
        onBack={() => setView('list')}
        onSave={handleSaveEvent}
        onDelete={() => handleDeleteEvent(selectedEvent.id)}
      />
    );
  }

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Kalender Acara Sekolah</h1>
          <p className="text-muted-foreground">Kelola jadwal dan acara sekolah</p>
        </div>
        <AddEvent onAddEvent={handleAddEvent} />
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Daftar Acara
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Kalender
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari acara..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Jenis Acara" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Jenis</SelectItem>
                <SelectItem value="academic">Akademik</SelectItem>
                <SelectItem value="extracurricular">Ekstrakurikuler</SelectItem>
                <SelectItem value="holiday">Libur</SelectItem>
                <SelectItem value="meeting">Rapat</SelectItem>
                <SelectItem value="other">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="px-4 py-3 font-medium">Acara</th>
                    <th className="px-4 py-3 font-medium">Tanggal</th>
                    <th className="px-4 py-3 font-medium">Waktu</th>
                    <th className="px-4 py-3 font-medium">Jenis</th>
                    <th className="px-4 py-3 font-medium">Prioritas</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredEvents.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-3 text-center">Tidak ada acara</td>
                    </tr>
                  ) : (
                    filteredEvents.map((event) => (
                      <tr key={event.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium">{event.title}</div>
                            <div className="text-sm text-gray-500">{event.location}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {event.date.toLocaleDateString('id-ID')}
                        </td>
                        <td className="px-4 py-3">
                          {event.startTime} - {event.endTime}
                        </td>
                        <td className="px-4 py-3">
                          {getTypeLabel(event.type)}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(event.priority)}`}>
                            {event.priority === 'low' ? 'Rendah' : 
                             event.priority === 'medium' ? 'Sedang' : 'Tinggi'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                            {event.status === 'scheduled' ? 'Terjadwal' :
                             event.status === 'ongoing' ? 'Berlangsung' :
                             event.status === 'completed' ? 'Selesai' : 'Dibatalkan'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(event)}
                          >
                            Detail
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <EventCalendar events={events} onEventClick={handleViewDetails} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SchoolEvents;
