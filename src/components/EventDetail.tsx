
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit, Trash, Calendar as CalendarIcon, Clock, MapPin, Users, Flag, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { SchoolEvent } from './SchoolEvents';

interface EventDetailProps {
  event: SchoolEvent;
  onBack: () => void;
  onSave: (event: SchoolEvent) => void;
  onDelete: () => void;
}

const EventDetail = ({ event, onBack, onSave, onDelete }: EventDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    date: event.date,
    startTime: event.startTime,
    endTime: event.endTime,
    type: event.type,
    location: event.location,
    participants: event.participants.join(', '),
    priority: event.priority,
    status: event.status
  });

  const handleSave = () => {
    const updatedEvent: SchoolEvent = {
      ...event,
      title: formData.title,
      description: formData.description,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      type: formData.type,
      location: formData.location,
      participants: formData.participants.split(',').map(p => p.trim()).filter(p => p),
      priority: formData.priority,
      status: formData.status
    };

    onSave(updatedEvent);
    setIsEditing(false);
  };

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
      low: 'text-green-600',
      medium: 'text-yellow-600',
      high: 'text-red-600'
    };
    return colors[priority as keyof typeof colors] || '';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      scheduled: 'text-blue-600',
      ongoing: 'text-orange-600',
      completed: 'text-green-600',
      cancelled: 'text-gray-600'
    };
    return colors[status as keyof typeof colors] || '';
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Detail Acara</h1>
            <p className="text-muted-foreground">
              {isEditing ? 'Edit informasi acara' : 'Lihat detail acara'}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          {!isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="destructive" onClick={onDelete}>
                <Trash className="mr-2 h-4 w-4" />
                Hapus
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Batal
              </Button>
              <Button onClick={handleSave}>
                Simpan
              </Button>
            </>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Acara</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Judul Acara</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tanggal</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? format(formData.date, "dd/MM/yyyy") : "Pilih tanggal"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => setFormData({ ...formData, date: date || new Date() })}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Lokasi</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Waktu Mulai</label>
                  <Input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Waktu Selesai</label>
                  <Input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Jenis Acara</label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as SchoolEvent['type'] })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Akademik</SelectItem>
                      <SelectItem value="extracurricular">Ekstrakurikuler</SelectItem>
                      <SelectItem value="holiday">Libur</SelectItem>
                      <SelectItem value="meeting">Rapat</SelectItem>
                      <SelectItem value="other">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Prioritas</label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value as SchoolEvent['priority'] })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Rendah</SelectItem>
                      <SelectItem value="medium">Sedang</SelectItem>
                      <SelectItem value="high">Tinggi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as SchoolEvent['status'] })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Terjadwal</SelectItem>
                      <SelectItem value="ongoing">Berlangsung</SelectItem>
                      <SelectItem value="completed">Selesai</SelectItem>
                      <SelectItem value="cancelled">Dibatalkan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Peserta</label>
                <Input
                  value={formData.participants}
                  onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                  placeholder="Pisahkan dengan koma"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                <p className="text-gray-600">{event.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Tanggal</p>
                      <p className="text-sm text-gray-600">
                        {event.date.toLocaleDateString('id-ID', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Waktu</p>
                      <p className="text-sm text-gray-600">
                        {event.startTime} - {event.endTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Lokasi</p>
                      <p className="text-sm text-gray-600">{event.location || '-'}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Flag className={`h-5 w-5 ${getPriorityColor(event.priority)}`} />
                    <div>
                      <p className="font-medium">Prioritas</p>
                      <p className={`text-sm font-medium ${getPriorityColor(event.priority)}`}>
                        {event.priority === 'low' ? 'Rendah' : 
                         event.priority === 'medium' ? 'Sedang' : 'Tinggi'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <CheckCircle className={`h-5 w-5 ${getStatusColor(event.status)}`} />
                    <div>
                      <p className="font-medium">Status</p>
                      <p className={`text-sm font-medium ${getStatusColor(event.status)}`}>
                        {event.status === 'scheduled' ? 'Terjadwal' :
                         event.status === 'ongoing' ? 'Berlangsung' :
                         event.status === 'completed' ? 'Selesai' : 'Dibatalkan'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium">Jenis Acara</p>
                    <p className="text-sm text-gray-600">{getTypeLabel(event.type)}</p>
                  </div>
                </div>
              </div>

              {event.participants.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="h-5 w-5 text-gray-500" />
                    <p className="font-medium">Peserta</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {event.participants.map((participant, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                      >
                        {participant}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetail;
