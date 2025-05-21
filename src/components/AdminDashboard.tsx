
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  // Mock data for demonstration
  const stats = [
    { title: "Total Siswa", value: "342" },
    { title: "Total Guru", value: "24" },
    { title: "Kelas Hari Ini", value: "16" },
    { title: "Tagihan Terbuka", value: "45" }
  ];

  const upcomingClasses = [
    { time: "08:00", subject: "Matematika", grade: "7A", teacher: "Ibu Sinta" },
    { time: "09:30", subject: "IPA", grade: "8B", teacher: "Bapak Dimas" },
    { time: "11:00", subject: "Bahasa Inggris", grade: "9C", teacher: "Ibu Ratna" },
  ];

  const pendingBills = [
    { student: "Andi Pratama", grade: "7A", amount: "Rp 750.000", dueDate: "25 Mei 2023", status: "due" },
    { student: "Budi Santoso", grade: "8B", amount: "Rp 1.250.000", dueDate: "12 Mei 2023", status: "overdue" },
    { student: "Citra Dewi", grade: "9C", amount: "Rp 950.000", dueDate: "30 Mei 2023", status: "due" },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold mb-1">Selamat Datang, Admin</h1>
        <p className="text-muted-foreground">Ringkasan data sekolah hari ini</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-white">
            <CardContent className="p-4">
              <p className="text-muted-foreground text-sm">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">Jadwal Kelas Hari Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {upcomingClasses.map((cls, i) => (
                <div key={i} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{cls.subject} - Kelas {cls.grade}</p>
                    <p className="text-muted-foreground text-sm">{cls.teacher}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{cls.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">Tagihan Tertunda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {pendingBills.map((bill, i) => (
                <div key={i} className="py-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{bill.student}</p>
                      <p className="text-muted-foreground text-sm">Kelas {bill.grade}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{bill.amount}</p>
                      <span 
                        className={`status-badge ${
                          bill.status === 'paid' ? 'status-paid' : 
                          bill.status === 'due' ? 'status-due' : 'status-overdue'
                        }`}
                      >
                        {bill.status === 'paid' ? 'Lunas' : 
                         bill.status === 'due' ? 'Jatuh Tempo' : 'Terlambat'}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Jatuh tempo: {bill.dueDate}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-sis-light-blue rounded-lg p-4">
        <h3 className="font-medium mb-2">Pengumuman Terbaru</h3>
        <div className="bg-white rounded p-3">
          <p className="font-medium">Rapat Guru</p>
          <p className="text-sm">Akan dilaksanakan rapat guru pada hari Jumat, 26 Mei 2023 pukul 14:00 WIB di Ruang Rapat Utama.</p>
          <p className="text-xs text-muted-foreground mt-2">Diposting 2 jam yang lalu</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
