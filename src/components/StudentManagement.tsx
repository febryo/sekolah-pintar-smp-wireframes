
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from 'lucide-react';

const StudentManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for demonstration
  const students = [
    { id: 1, name: "Andi Pratama", grade: "7A", status: "Aktif", contact: "081234567890" },
    { id: 2, name: "Budi Santoso", grade: "8B", status: "Aktif", contact: "081234567891" },
    { id: 3, name: "Citra Dewi", grade: "9C", status: "Aktif", contact: "081234567892" },
    { id: 4, name: "Dian Permata", grade: "7A", status: "Aktif", contact: "081234567893" },
    { id: 5, name: "Erik Kurniawan", grade: "8B", status: "Aktif", contact: "081234567894" },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">Siswa</h1>
          <p className="text-muted-foreground">Kelola data siswa di sekolah</p>
        </div>
        <Button className="bg-sis-blue hover:bg-blue-700">+ Tambah Siswa</Button>
      </div>

      <div className="flex items-center gap-3 border rounded-lg p-2 bg-white">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Cari siswa berdasarkan nama atau kelas..."
          className="border-none shadow-none focus-visible:ring-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 p-3 text-sm font-medium text-muted-foreground">
          <div className="col-span-5">Nama</div>
          <div className="col-span-2">Kelas</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-3">Aksi</div>
        </div>

        {students.map((student) => (
          <div key={student.id} className="grid grid-cols-12 p-3 border-t">
            <div className="col-span-5 flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div>
                <p className="font-medium">{student.name}</p>
                <p className="text-xs text-muted-foreground">{student.contact}</p>
              </div>
            </div>
            <div className="col-span-2 flex items-center">{student.grade}</div>
            <div className="col-span-2 flex items-center">
              <span className="status-badge status-paid">{student.status}</span>
            </div>
            <div className="col-span-3 flex items-center gap-2">
              <Button variant="outline" size="sm">Detail</Button>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm">Menampilkan 1-5 dari 342 siswa</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Sebelumnya</Button>
              <Button variant="outline" size="sm">Selanjutnya</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentManagement;
