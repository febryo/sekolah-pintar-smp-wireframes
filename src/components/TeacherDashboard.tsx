
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

const TeacherDashboard = () => {
  // Mock data for demonstration
  const todayClasses = [
    { time: "08:00 - 09:30", subject: "Matematika", grade: "7A", room: "R-101" },
    { time: "10:00 - 11:30", subject: "Matematika", grade: "8B", room: "R-103" },
    { time: "13:00 - 14:30", subject: "Matematika", grade: "9C", room: "R-105" },
  ];

  const pendingAttendance = [
    { date: "21 Mei 2023", subject: "Matematika", grade: "7A" },
  ];

  const recentMessages = [
    { from: "Kepala Sekolah", message: "Mohon menghadiri rapat guru besok.", time: "1 jam yang lalu" },
    { from: "Admin Sekolah", message: "Jadwal ujian tengah semester telah diperbarui.", time: "3 jam yang lalu" },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold mb-1">Selamat Datang, Bu Guru</h1>
        <p className="text-muted-foreground">Ringkasan aktivitas hari ini</p>
      </div>

      <Card className="bg-white">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">Jadwal Mengajar Hari Ini</CardTitle>
            <div className="online-indicator">Online</div>
          </div>
        </CardHeader>
        <CardContent>
          {todayClasses.map((cls, i) => (
            <div key={i} className={`p-3 mb-2 ${i === 0 ? 'bg-sis-light-blue rounded-lg' : 'border-b'}`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{cls.subject} - Kelas {cls.grade}</p>
                  <p className="text-sm text-muted-foreground">Ruang {cls.room}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{cls.time}</p>
                  {i === 0 && (
                    <span className="text-xs text-sis-blue font-medium">Sedang Berlangsung</span>
                  )}
                </div>
              </div>
              {i === 0 && (
                <div className="mt-3 flex gap-2">
                  <Button size="sm" className="bg-sis-blue hover:bg-blue-700">Absensi</Button>
                  <Button size="sm" variant="outline">Detail Kelas</Button>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">Absensi Tertunda</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingAttendance.length === 0 ? (
              <p className="text-muted-foreground py-4">Tidak ada absensi tertunda</p>
            ) : (
              <div className="space-y-3">
                {pendingAttendance.map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.subject} - Kelas {item.grade}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                    <Button size="sm" className="bg-sis-blue hover:bg-blue-700">Isi Absensi</Button>
                  </div>
                ))}
                <div className="offline-indicator mt-2">
                  Data disimpan secara lokal dan akan disinkronkan saat online
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">Pesan Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {recentMessages.map((msg, i) => (
                <div key={i} className="py-3">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{msg.from}</p>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className="text-sm mt-1">{msg.message}</p>
                </div>
              ))}
            </div>
            <Button variant="link" className="w-full text-sis-blue mt-2 py-0">
              Lihat Semua Pesan
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="bg-sis-light-blue rounded-lg p-4">
        <h3 className="font-medium mb-2">Pengumuman Sekolah</h3>
        <div className="bg-white rounded p-3">
          <p className="font-medium">Rapat Guru</p>
          <p className="text-sm">Akan dilaksanakan rapat guru pada hari Jumat, 26 Mei 2023 pukul 14:00 WIB di Ruang Rapat Utama.</p>
          <p className="text-xs text-muted-foreground mt-2">Diposting 2 jam yang lalu</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
