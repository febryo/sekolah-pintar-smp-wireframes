
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Edit, Trash2, Clock, Plus } from "lucide-react";
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';

const AnnouncementManagement = () => {
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState([
    { 
      id: 1, 
      title: "Rapat Guru", 
      content: "Akan dilaksanakan rapat guru pada hari Jumat, 26 Mei 2023 pukul 14:00 WIB di Ruang Rapat Utama.",
      createdAt: new Date('2023-05-20T10:00:00') 
    },
    { 
      id: 2, 
      title: "Ujian Tengah Semester", 
      content: "Jadwal Ujian Tengah Semester telah dipublikasikan. Silakan cek di papan pengumuman atau hubungi wali kelas.",
      createdAt: new Date('2023-05-15T09:30:00')
    }
  ]);

  const [scheduledAnnouncements, setScheduledAnnouncements] = useState([
    {
      id: 1,
      title: "Libur Semester",
      content: "Libur semester akan dimulai pada tanggal yang telah ditentukan.",
      scheduledDate: new Date('2023-06-15T10:00:00'),
      isActive: true
    }
  ]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    content: ''
  });

  const [scheduleFormData, setScheduleFormData] = useState({
    id: null,
    title: '',
    content: '',
    scheduledDate: '',
    scheduledTime: ''
  });

  const [isScheduling, setIsScheduling] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleScheduleInputChange = (e) => {
    const { name, value } = e.target;
    setScheduleFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ id: null, title: '', content: '' });
    setIsEditing(false);
  };

  const resetScheduleForm = () => {
    setScheduleFormData({ id: null, title: '', content: '', scheduledDate: '', scheduledTime: '' });
    setIsScheduling(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      toast({
        title: "Error",
        description: "Judul dan isi pengumuman harus diisi.",
        variant: "destructive"
      });
      return;
    }

    if (isEditing && formData.id) {
      setAnnouncements(announcements.map(item => 
        item.id === formData.id ? 
        { ...item, title: formData.title, content: formData.content } : 
        item
      ));
      toast({
        title: "Berhasil",
        description: "Pengumuman berhasil diperbarui"
      });
    } else {
      const newAnnouncement = {
        id: Date.now(),
        title: formData.title,
        content: formData.content,
        createdAt: new Date()
      };
      setAnnouncements([newAnnouncement, ...announcements]);
      toast({
        title: "Berhasil",
        description: "Pengumuman baru berhasil ditambahkan"
      });
    }

    resetForm();
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    
    if (!scheduleFormData.title || !scheduleFormData.content || !scheduleFormData.scheduledDate || !scheduleFormData.scheduledTime) {
      toast({
        title: "Error",
        description: "Semua field harus diisi untuk penjadwalan.",
        variant: "destructive"
      });
      return;
    }

    const scheduledDateTime = new Date(`${scheduleFormData.scheduledDate}T${scheduleFormData.scheduledTime}`);

    if (isScheduling && scheduleFormData.id) {
      setScheduledAnnouncements(scheduledAnnouncements.map(item => 
        item.id === scheduleFormData.id ? 
        { 
          ...item, 
          title: scheduleFormData.title, 
          content: scheduleFormData.content, 
          scheduledDate: scheduledDateTime 
        } : 
        item
      ));
      toast({
        title: "Berhasil",
        description: "Jadwal pengumuman berhasil diperbarui"
      });
    } else {
      const newScheduledAnnouncement = {
        id: Date.now(),
        title: scheduleFormData.title,
        content: scheduleFormData.content,
        scheduledDate: scheduledDateTime,
        isActive: true
      };
      setScheduledAnnouncements([newScheduledAnnouncement, ...scheduledAnnouncements]);
      toast({
        title: "Berhasil",
        description: "Pengumuman berhasil dijadwalkan"
      });
    }

    resetScheduleForm();
  };

  const editAnnouncement = (announcement) => {
    setFormData({
      id: announcement.id,
      title: announcement.title,
      content: announcement.content
    });
    setIsEditing(true);
  };

  const editScheduledAnnouncement = (announcement) => {
    const date = format(new Date(announcement.scheduledDate), 'yyyy-MM-dd');
    const time = format(new Date(announcement.scheduledDate), 'HH:mm');
    
    setScheduleFormData({
      id: announcement.id,
      title: announcement.title,
      content: announcement.content,
      scheduledDate: date,
      scheduledTime: time
    });
    setIsScheduling(true);
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(item => item.id !== id));
    toast({
      title: "Berhasil",
      description: "Pengumuman berhasil dihapus"
    });
  };

  const deleteScheduledAnnouncement = (id) => {
    setScheduledAnnouncements(scheduledAnnouncements.filter(item => item.id !== id));
    toast({
      title: "Berhasil",
      description: "Jadwal pengumuman berhasil dihapus"
    });
  };

  const toggleScheduleStatus = (id) => {
    setScheduledAnnouncements(scheduledAnnouncements.map(item => 
      item.id === id ? { ...item, isActive: !item.isActive } : item
    ));
    toast({
      title: "Berhasil",
      description: "Status jadwal berhasil diubah"
    });
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">Manajemen Pengumuman</h1>
          <p className="text-muted-foreground">Tambah, edit, kelola, dan jadwalkan pengumuman sekolah</p>
        </div>
      </div>

      <Tabs defaultValue="announcements" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="announcements">Pengumuman Aktif</TabsTrigger>
          <TabsTrigger value="scheduled">Jadwal Pengumuman</TabsTrigger>
        </TabsList>

        <TabsContent value="announcements" className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>{isEditing ? 'Edit Pengumuman' : 'Tambah Pengumuman Baru'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">Judul Pengumuman</label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Masukkan judul pengumuman"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium mb-1">Isi Pengumuman</label>
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Masukkan isi pengumuman"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={5}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="bg-sis-blue hover:bg-blue-700">
                    {isEditing ? 'Update Pengumuman' : 'Tambah Pengumuman'}
                  </Button>
                  {isEditing && (
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Batal
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-lg font-semibold mb-3">Daftar Pengumuman</h2>
            {announcements.length === 0 ? (
              <Card className="bg-white">
                <CardContent className="py-6 text-center">
                  <p className="text-muted-foreground">Belum ada pengumuman</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <Card key={announcement.id} className="bg-white">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">{announcement.title}</h3>
                          <p className="text-sm">{announcement.content}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{format(new Date(announcement.createdAt), 'dd MMM yyyy HH:mm')}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => editAnnouncement(announcement)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => deleteAnnouncement(announcement.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>{isScheduling ? 'Edit Jadwal Pengumuman' : 'Jadwalkan Pengumuman Baru'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleScheduleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="schedule-title" className="block text-sm font-medium mb-1">Judul Pengumuman</label>
                  <Input
                    id="schedule-title"
                    name="title"
                    placeholder="Masukkan judul pengumuman"
                    value={scheduleFormData.title}
                    onChange={handleScheduleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="schedule-content" className="block text-sm font-medium mb-1">Isi Pengumuman</label>
                  <Textarea
                    id="schedule-content"
                    name="content"
                    placeholder="Masukkan isi pengumuman"
                    value={scheduleFormData.content}
                    onChange={handleScheduleInputChange}
                    rows={5}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="scheduled-date" className="block text-sm font-medium mb-1">Tanggal</label>
                    <Input
                      id="scheduled-date"
                      name="scheduledDate"
                      type="date"
                      value={scheduleFormData.scheduledDate}
                      onChange={handleScheduleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="scheduled-time" className="block text-sm font-medium mb-1">Waktu</label>
                    <Input
                      id="scheduled-time"
                      name="scheduledTime"
                      type="time"
                      value={scheduleFormData.scheduledTime}
                      onChange={handleScheduleInputChange}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="bg-sis-blue hover:bg-blue-700">
                    <Clock className="h-4 w-4 mr-2" />
                    {isScheduling ? 'Update Jadwal' : 'Jadwalkan Pengumuman'}
                  </Button>
                  {isScheduling && (
                    <Button type="button" variant="outline" onClick={resetScheduleForm}>
                      Batal
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-lg font-semibold mb-3">Pengumuman Terjadwal</h2>
            {scheduledAnnouncements.length === 0 ? (
              <Card className="bg-white">
                <CardContent className="py-6 text-center">
                  <p className="text-muted-foreground">Belum ada pengumuman terjadwal</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {scheduledAnnouncements.map((announcement) => (
                  <Card key={announcement.id} className="bg-white">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{announcement.title}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              announcement.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {announcement.isActive ? 'Aktif' : 'Nonaktif'}
                            </span>
                          </div>
                          <p className="text-sm">{announcement.content}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Terjadwal: {format(new Date(announcement.scheduledDate), 'dd MMM yyyy HH:mm')}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => toggleScheduleStatus(announcement.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => editScheduledAnnouncement(announcement)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => deleteScheduledAnnouncement(announcement.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnnouncementManagement;
