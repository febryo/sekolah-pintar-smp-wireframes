
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import TambahSiswa from './TambahSiswa';

const StudentManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('list');
  const { toast } = useToast();
  
  // Form state for student registration
  const [studentForm, setStudentForm] = useState({
    name: '',
    birthDate: '',
    grade: '',
    parentName: '',
    contact: '',
    address: '',
    religion: '',
    gender: ''
  });
  
  // Mock data for demonstration
  const [students, setStudents] = useState([
    { id: 1, name: "Andi Pratama", grade: "7A", status: "Aktif", contact: "081234567890" },
    { id: 2, name: "Budi Santoso", grade: "8B", status: "Aktif", contact: "081234567891" },
    { id: 3, name: "Citra Dewi", grade: "9C", status: "Aktif", contact: "081234567892" },
    { id: 4, name: "Dian Permata", grade: "7A", status: "Aktif", contact: "081234567893" },
    { id: 5, name: "Erik Kurniawan", grade: "8B", status: "Aktif", contact: "081234567894" },
  ]);

  // Mock data for pending registrations
  const [pendingRegistrations, setPendingRegistrations] = useState([
    { id: 101, name: "Fajar Nugraha", age: "13", status: "Menunggu", parentName: "Hadi Nugraha", contact: "081234567895", registrationDate: "22 Mei 2023" },
    { id: 102, name: "Gita Indah", age: "12", status: "Menunggu", parentName: "Budi Indah", contact: "081234567896", registrationDate: "20 Mei 2023" },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setStudentForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterStudent = () => {
    // Validate form
    if (!studentForm.name || !studentForm.birthDate || !studentForm.parentName || !studentForm.contact) {
      toast({
        title: "Error",
        description: "Mohon lengkapi informasi siswa yang wajib diisi",
        variant: "destructive"
      });
      return;
    }

    // Add new registration
    const newRegistration = {
      id: Date.now(),
      name: studentForm.name,
      age: calculateAge(studentForm.birthDate).toString(),
      parentName: studentForm.parentName,
      contact: studentForm.contact,
      status: "Menunggu",
      registrationDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setPendingRegistrations([newRegistration, ...pendingRegistrations]);
    setOpenRegisterDialog(false);
    
    // Reset form
    setStudentForm({
      name: '',
      birthDate: '',
      grade: '',
      parentName: '',
      contact: '',
      address: '',
      religion: '',
      gender: ''
    });
    
    toast({
      title: "Pendaftaran Berhasil",
      description: `Data pendaftaran untuk ${newRegistration.name} telah disimpan`
    });
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const approveRegistration = (id) => {
    // Find the registration
    const registration = pendingRegistrations.find(reg => reg.id === id);
    if (!registration) return;
    
    // Add to students
    const newStudent = {
      id: students.length + 1,
      name: registration.name,
      grade: "7A", // Default grade
      status: "Aktif",
      contact: registration.contact
    };
    
    setStudents([...students, newStudent]);
    
    // Remove from pending
    setPendingRegistrations(pendingRegistrations.filter(reg => reg.id !== id));
    
    toast({
      title: "Pendaftaran Disetujui",
      description: `${registration.name} telah ditambahkan sebagai siswa`
    });
  };

  const rejectRegistration = (id) => {
    setPendingRegistrations(pendingRegistrations.filter(reg => reg.id !== id));
    
    toast({
      title: "Pendaftaran Ditolak",
      description: `Pendaftaran telah ditolak dan dihapus dari sistem`
    });
  };

  const handleAddStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">Siswa</h1>
          <p className="text-muted-foreground">Kelola data siswa di sekolah</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={openRegisterDialog} onOpenChange={setOpenRegisterDialog}>
            <DialogTrigger asChild>
              <Button className="bg-sis-blue hover:bg-blue-700">+ Daftar Siswa Baru</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Pendaftaran Siswa Baru</DialogTitle>
                <DialogDescription>Isi formulir berikut untuk mendaftarkan siswa baru</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input
                      id="name"
                      name="name"
                      value={studentForm.name}
                      onChange={handleInputChange}
                      placeholder="Nama lengkap siswa"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Tanggal Lahir</Label>
                    <Input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      value={studentForm.birthDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Jenis Kelamin</Label>
                    <Select
                      name="gender"
                      value={studentForm.gender}
                      onValueChange={(value) => handleSelectChange('gender', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis kelamin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                        <SelectItem value="Perempuan">Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="religion">Agama</Label>
                    <Select
                      name="religion"
                      value={studentForm.religion}
                      onValueChange={(value) => handleSelectChange('religion', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih agama" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Islam">Islam</SelectItem>
                        <SelectItem value="Kristen">Kristen</SelectItem>
                        <SelectItem value="Katolik">Katolik</SelectItem>
                        <SelectItem value="Hindu">Hindu</SelectItem>
                        <SelectItem value="Buddha">Buddha</SelectItem>
                        <SelectItem value="Konghucu">Konghucu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Alamat</Label>
                  <Input
                    id="address"
                    name="address"
                    value={studentForm.address}
                    onChange={handleInputChange}
                    placeholder="Alamat lengkap"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Nama Orang Tua/Wali</Label>
                    <Input
                      id="parentName"
                      name="parentName"
                      value={studentForm.parentName}
                      onChange={handleInputChange}
                      placeholder="Nama orang tua/wali"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Kontak</Label>
                    <Input
                      id="contact"
                      name="contact"
                      value={studentForm.contact}
                      onChange={handleInputChange}
                      placeholder="Nomor telepon"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenRegisterDialog(false)}>
                  Batal
                </Button>
                <Button className="bg-sis-blue hover:bg-blue-700" onClick={handleRegisterStudent}>
                  Daftarkan Siswa
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <TambahSiswa onAddStudent={handleAddStudent} />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Daftar Siswa</TabsTrigger>
          <TabsTrigger value="registrations">
            Pendaftaran Baru
            {pendingRegistrations.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {pendingRegistrations.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
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
                <div className="text-sm">Menampilkan 1-{students.length} dari {students.length} siswa</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Sebelumnya</Button>
                  <Button variant="outline" size="sm">Selanjutnya</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="registrations" className="space-y-4">
          {pendingRegistrations.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Tidak ada pendaftaran siswa baru yang menunggu persetujuan</p>
              </CardContent>
            </Card>
          ) : (
            pendingRegistrations.map((registration) => (
              <Card key={registration.id} className="bg-white">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-lg">{registration.name}</p>
                        <span className="text-sm text-muted-foreground">{registration.age} tahun</span>
                      </div>
                      <p className="text-sm mb-1">Wali: {registration.parentName}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">Kontak: {registration.contact}</p>
                        <p className="text-xs text-muted-foreground">Terdaftar: {registration.registrationDate}</p>
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end">
                      <span className="status-badge status-due mb-2">
                        {registration.status}
                      </span>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-sis-blue hover:bg-blue-700" 
                          onClick={() => approveRegistration(registration.id)}
                        >
                          Terima
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-red-500"
                          onClick={() => rejectRegistration(registration.id)}
                        >
                          Tolak
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentManagement;
