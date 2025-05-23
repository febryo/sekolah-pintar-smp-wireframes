
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Eye, Edit, Trash } from "lucide-react";
import TambahSiswa from './TambahSiswa';
import StudentDetail from './StudentDetail';

const StudentManagement = () => {
  const [view, setView] = useState<'list' | 'add' | 'detail'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Mock student data
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Andi Pratama",
      nisn: "1001520001",
      class: "7A", 
      gender: "L",
      birthDate: "2010-05-15",
      address: "Jl. Merdeka No. 123, Jakarta Selatan",
      parentName: "Budi Pratama",
      parentPhone: "08123456789",
      joinDate: "2022-07-18"
    },
    {
      id: 2,
      name: "Budi Santoso",
      nisn: "1001520002",
      class: "7A",
      gender: "L",
      birthDate: "2010-03-20",
      address: "Jl. Kemerdekaan No. 45, Jakarta Pusat",
      parentName: "Agus Santoso",
      parentPhone: "08234567890",
      joinDate: "2022-07-18"
    },
    {
      id: 3,
      name: "Citra Dewi",
      nisn: "1001520003",
      class: "8B",
      gender: "P",
      birthDate: "2009-12-10",
      address: "Jl. Pahlawan No. 67, Jakarta Timur",
      parentName: "Dedi Wijaya",
      parentPhone: "08345678901",
      joinDate: "2021-07-19"
    },
    {
      id: 4,
      name: "Dina Fitriani",
      nisn: "1001520004",
      class: "9A",
      gender: "P",
      birthDate: "2008-08-28",
      address: "Jl. Sudirman No. 89, Jakarta Selatan",
      parentName: "Eko Fitriani",
      parentPhone: "08456789012",
      joinDate: "2020-07-20"
    },
  ]);

  const handleAddStudent = (newStudent) => {
    const id = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    setStudents([...students, { ...newStudent, id }]);
    setView('list');
  };

  const handleSaveStudent = (updatedStudent) => {
    setStudents(students.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    ));
    setSelectedStudent(updatedStudent);
  };

  const handleDeleteStudent = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus siswa ini?')) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setView('detail');
  };

  const filteredStudents = students.filter(student => {
    const matchesQuery = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.nisn.includes(searchQuery);
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    return matchesQuery && matchesClass;
  });

  if (view === 'add') {
    return <TambahSiswa onSave={handleAddStudent} onCancel={() => setView('list')} />;
  }

  if (view === 'detail' && selectedStudent) {
    return (
      <StudentDetail
        student={selectedStudent}
        onBack={() => setView('list')}
        onSave={handleSaveStudent}
      />
    );
  }

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Daftar Siswa</h1>
          <p className="text-muted-foreground">Kelola data siswa sekolah</p>
        </div>
        <Button onClick={() => setView('add')} className="md:w-auto w-full">
          <Plus className="mr-2 h-4 w-4" />
          Tambah Siswa
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari nama atau NISN..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={selectedClass}
          onValueChange={setSelectedClass}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih Kelas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kelas</SelectItem>
            <SelectItem value="7A">Kelas 7A</SelectItem>
            <SelectItem value="7B">Kelas 7B</SelectItem>
            <SelectItem value="8A">Kelas 8A</SelectItem>
            <SelectItem value="8B">Kelas 8B</SelectItem>
            <SelectItem value="9A">Kelas 9A</SelectItem>
            <SelectItem value="9B">Kelas 9B</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-3 font-medium">Nama</th>
                <th className="px-4 py-3 font-medium">NISN</th>
                <th className="px-4 py-3 font-medium">Kelas</th>
                <th className="px-4 py-3 font-medium">Gender</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-3 text-center">Tidak ada data siswa</td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{student.name}</td>
                    <td className="px-4 py-3">{student.nisn}</td>
                    <td className="px-4 py-3">{student.class}</td>
                    <td className="px-4 py-3">{student.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewDetails(student)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;
