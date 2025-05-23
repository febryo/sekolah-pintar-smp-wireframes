
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Attendance = () => {
  const [selectedClass, setSelectedClass] = useState("7A");
  const [date, setDate] = useState<Date>(new Date());
  
  // Mock data for demonstration
  const classes = [
    { value: "7A", label: "Kelas 7A - Matematika" },
    { value: "8B", label: "Kelas 8B - Matematika" },
    { value: "9C", label: "Kelas 9C - Matematika" }
  ];
  
  const students = [
    { id: 1, name: "Andi Pratama", status: "present" },
    { id: 2, name: "Budi Santoso", status: "absent" },
    { id: 3, name: "Citra Dewi", status: "present" },
    { id: 4, name: "Dian Permata", status: "sick" },
    { id: 5, name: "Erik Kurniawan", status: "present" },
    { id: 6, name: "Fani Wijaya", status: "late" },
    { id: 7, name: "Gunawan Setiadi", status: "present" },
    { id: 8, name: "Hani Purwanto", status: "present" },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold mb-1">Absensi Kelas</h1>
        <p className="text-muted-foreground">Kelola kehadiran siswa setiap pertemuan</p>
      </div>

      <Card className="bg-white">
        <CardHeader className="pb-2 space-y-2">
          <div>
            <CardTitle className="text-sm font-medium mb-1">Pilih Kelas</CardTitle>
            <Select 
              value={selectedClass}
              onValueChange={setSelectedClass}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Kelas" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls.value} value={cls.value}>{cls.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <CardTitle className="text-sm font-medium mb-1">Pilih Tanggal</CardTitle>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "dd MMMM yyyy") : "Pilih tanggal"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <div className="grid grid-cols-12 bg-gray-50 p-3 text-sm font-medium text-muted-foreground">
              <div className="col-span-6">Nama Siswa</div>
              <div className="col-span-6">Status Kehadiran</div>
            </div>

            {students.map((student) => (
              <div key={student.id} className="grid grid-cols-12 p-3 border-t">
                <div className="col-span-6 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <p className="font-medium">{student.name}</p>
                </div>
                <div className="col-span-6">
                  <Select defaultValue={student.status}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="present">Hadir</SelectItem>
                      <SelectItem value="absent">Tidak Hadir</SelectItem>
                      <SelectItem value="sick">Sakit</SelectItem>
                      <SelectItem value="permission">Izin</SelectItem>
                      <SelectItem value="late">Terlambat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="outline">Batal</Button>
            <Button className="bg-sis-blue hover:bg-blue-700">
              Simpan Absensi
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Attendance;
