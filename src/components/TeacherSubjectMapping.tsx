
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Teacher {
  id: string;
  name: string;
  nip: string;
}

interface Subject {
  id: string;
  name: string;
  code: string;
}

interface TeacherSubjectMapping {
  id: string;
  teacherId: string;
  subjectId: string;
  teacherName: string;
  subjectName: string;
  subjectCode: string;
}

const TeacherSubjectMapping = () => {
  const [teachers] = useState<Teacher[]>([
    { id: '1', name: 'Budi Santoso', nip: '198501012010011001' },
    { id: '2', name: 'Siti Nurhaliza', nip: '198702152011012002' },
    { id: '3', name: 'Ahmad Wijaya', nip: '198803252012011003' }
  ]);

  const [subjects] = useState<Subject[]>([
    { id: '1', name: 'Matematika', code: 'MAT' },
    { id: '2', name: 'Bahasa Indonesia', code: 'BIN' },
    { id: '3', name: 'Fisika', code: 'FIS' },
    { id: '4', name: 'Kimia', code: 'KIM' },
    { id: '5', name: 'Bahasa Inggris', code: 'ENG' }
  ]);

  const [mappings, setMappings] = useState<TeacherSubjectMapping[]>([
    {
      id: '1',
      teacherId: '1',
      subjectId: '1',
      teacherName: 'Budi Santoso',
      subjectName: 'Matematika',
      subjectCode: 'MAT'
    },
    {
      id: '2',
      teacherId: '1',
      subjectId: '3',
      teacherName: 'Budi Santoso',
      subjectName: 'Fisika',
      subjectCode: 'FIS'
    },
    {
      id: '3',
      teacherId: '2',
      subjectId: '2',
      teacherName: 'Siti Nurhaliza',
      subjectName: 'Bahasa Indonesia',
      subjectCode: 'BIN'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTeacher || !selectedSubject) {
      toast({
        title: "Error",
        description: "Pilih guru dan mata pelajaran terlebih dahulu.",
        variant: "destructive"
      });
      return;
    }

    // Check if mapping already exists
    const existingMapping = mappings.find(
      mapping => mapping.teacherId === selectedTeacher && mapping.subjectId === selectedSubject
    );

    if (existingMapping) {
      toast({
        title: "Error",
        description: "Pemetaan guru dan mata pelajaran sudah ada.",
        variant: "destructive"
      });
      return;
    }

    const teacher = teachers.find(t => t.id === selectedTeacher);
    const subject = subjects.find(s => s.id === selectedSubject);

    if (teacher && subject) {
      const newMapping: TeacherSubjectMapping = {
        id: Date.now().toString(),
        teacherId: selectedTeacher,
        subjectId: selectedSubject,
        teacherName: teacher.name,
        subjectName: subject.name,
        subjectCode: subject.code
      };

      setMappings([...mappings, newMapping]);
      toast({
        title: "Berhasil",
        description: "Pemetaan guru dan mata pelajaran berhasil ditambahkan.",
      });

      setSelectedTeacher('');
      setSelectedSubject('');
      setIsDialogOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    setMappings(mappings.filter(mapping => mapping.id !== id));
    toast({
      title: "Berhasil",
      description: "Pemetaan guru dan mata pelajaran berhasil dihapus.",
    });
  };

  const openAddDialog = () => {
    setSelectedTeacher('');
    setSelectedSubject('');
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pemetaan Guru - Mata Pelajaran</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Pemetaan
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Pemetaan Guru - Mata Pelajaran</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Pilih Guru</label>
                <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih guru..." />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id}>
                        {teacher.name} - {teacher.nip}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pilih Mata Pelajaran</label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih mata pelajaran..." />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.code} - {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit">
                  Simpan
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pemetaan Guru - Mata Pelajaran</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Guru</TableHead>
                <TableHead>NIP</TableHead>
                <TableHead>Kode Mapel</TableHead>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mappings.map((mapping) => {
                const teacher = teachers.find(t => t.id === mapping.teacherId);
                return (
                  <TableRow key={mapping.id}>
                    <TableCell>{mapping.teacherName}</TableCell>
                    <TableCell>{teacher?.nip}</TableCell>
                    <TableCell>{mapping.subjectCode}</TableCell>
                    <TableCell>{mapping.subjectName}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(mapping.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherSubjectMapping;
