
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Edit, Trash2 } from "lucide-react";
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
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    content: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ id: null, title: '', content: '' });
    setIsEditing(false);
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

  const editAnnouncement = (announcement) => {
    setFormData({
      id: announcement.id,
      title: announcement.title,
      content: announcement.content
    });
    setIsEditing(true);
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(item => item.id !== id));
    toast({
      title: "Berhasil",
      description: "Pengumuman berhasil dihapus"
    });
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">Manajemen Pengumuman</h1>
          <p className="text-muted-foreground">Tambah, edit, dan kelola pengumuman sekolah</p>
        </div>
      </div>

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
    </div>
  );
};

export default AnnouncementManagement;
