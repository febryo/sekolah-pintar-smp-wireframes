
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface StudentDetailProps {
  student: {
    id: number;
    name: string;
    nisn: string;
    class: string;
    gender: string;
    birthDate: string;
    address: string;
    parentName: string;
    parentPhone: string;
    joinDate: string;
    photo?: string;
  };
  onBack: () => void;
  onSave: (student: any) => void;
}

const StudentDetail: React.FC<StudentDetailProps> = ({ student, onBack, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...student });
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Validation could be added here
    if (!formData.name || !formData.nisn) {
      toast({
        title: "Error",
        description: "Nama dan NISN wajib diisi",
        variant: "destructive"
      });
      return;
    }

    onSave(formData);
    setIsEditing(false);
    toast({
      title: "Berhasil",
      description: "Data siswa berhasil diperbarui",
    });
  };

  const handleCancel = () => {
    setFormData({ ...student });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">{isEditing ? 'Edit Data Siswa' : 'Detail Siswa'}</h1>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            Edit Data
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Batal
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Simpan
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Student Photo */}
        <Card>
          <CardContent className="pt-6 flex flex-col items-center">
            <div className="w-40 h-40 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-gray-400">
              {formData.photo ? (
                <img src={formData.photo} alt={formData.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                "No Photo"
              )}
            </div>
            {isEditing && (
              <Button variant="outline" className="mt-2">
                Upload Foto
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Informasi Pribadi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Nama Lengkap</label>
                {isEditing ? (
                  <Input 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  <p>{formData.name}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">NISN</label>
                {isEditing ? (
                  <Input 
                    name="nisn" 
                    value={formData.nisn} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  <p>{formData.nisn}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Kelas</label>
                {isEditing ? (
                  <Select 
                    value={formData.class} 
                    onValueChange={handleSelectChange("class")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7A">7A</SelectItem>
                      <SelectItem value="7B">7B</SelectItem>
                      <SelectItem value="8A">8A</SelectItem>
                      <SelectItem value="8B">8B</SelectItem>
                      <SelectItem value="9A">9A</SelectItem>
                      <SelectItem value="9B">9B</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p>{formData.class}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Jenis Kelamin</label>
                {isEditing ? (
                  <Select 
                    value={formData.gender} 
                    onValueChange={handleSelectChange("gender")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L">Laki-laki</SelectItem>
                      <SelectItem value="P">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p>{formData.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Tanggal Lahir</label>
                {isEditing ? (
                  <Input 
                    type="date" 
                    name="birthDate" 
                    value={formData.birthDate} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  <p>{formData.birthDate}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Tanggal Bergabung</label>
                {isEditing ? (
                  <Input 
                    type="date" 
                    name="joinDate" 
                    value={formData.joinDate} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  <p>{formData.joinDate}</p>
                )}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Alamat</label>
              {isEditing ? (
                <Textarea 
                  name="address" 
                  value={formData.address} 
                  onChange={handleInputChange} 
                  rows={3}
                />
              ) : (
                <p>{formData.address}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Parent Information */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Informasi Orang Tua</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Nama Orang Tua</label>
                {isEditing ? (
                  <Input 
                    name="parentName" 
                    value={formData.parentName} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  <p>{formData.parentName}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">No. Telp Orang Tua</label>
                {isEditing ? (
                  <Input 
                    name="parentPhone" 
                    value={formData.parentPhone} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  <p>{formData.parentPhone}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDetail;
