
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const ClassSchedule = () => {
  const [selectedDay, setSelectedDay] = useState("monday");
  const [selectedClass, setSelectedClass] = useState("7A");
  
  // Mock data for demonstration
  const days = [
    { value: "monday", label: "Senin" },
    { value: "tuesday", label: "Selasa" },
    { value: "wednesday", label: "Rabu" },
    { value: "thursday", label: "Kamis" },
    { value: "friday", label: "Jumat" },
  ];
  
  const classes = [
    { value: "7A", label: "Kelas 7A" },
    { value: "7B", label: "Kelas 7B" },
    { value: "8A", label: "Kelas 8A" },
    { value: "8B", label: "Kelas 8B" },
    { value: "9A", label: "Kelas 9A" },
    { value: "9B", label: "Kelas 9B" },
  ];
  
  const scheduleItems = [
    { time: "07:30 - 09:00", subject: "Matematika", teacher: "Ibu Sinta", room: "R-101" },
    { time: "09:15 - 10:45", subject: "IPA", teacher: "Bapak Dimas", room: "Lab IPA" },
    { time: "11:00 - 12:30", subject: "Bahasa Indonesia", teacher: "Ibu Ratna", room: "R-101" },
    { time: "13:15 - 14:45", subject: "IPS", teacher: "Bapak Andi", room: "R-101" },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">Jadwal Pelajaran</h1>
          <p className="text-muted-foreground">Kelola jadwal pelajaran setiap kelas</p>
        </div>
      </div>

      <Card className="bg-white">
        <CardHeader className="pb-2 flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="w-full sm:w-1/2">
            <CardTitle className="text-sm font-medium mb-1">Pilih Hari</CardTitle>
            <div className="hidden md:flex flex-wrap gap-2">
              {days.map((day) => (
                <Button 
                  key={day.value}
                  variant={selectedDay === day.value ? "default" : "outline"}
                  className={selectedDay === day.value ? "bg-sis-blue hover:bg-blue-700" : ""}
                  onClick={() => setSelectedDay(day.value)}
                >
                  {day.label}
                </Button>
              ))}
            </div>
            <div className="md:hidden">
              <Select 
                value={selectedDay}
                onValueChange={setSelectedDay}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Hari" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((day) => (
                    <SelectItem key={day.value} value={day.value}>{day.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="w-full sm:w-1/2">
            <CardTitle className="text-sm font-medium mb-1">Pilih Kelas</CardTitle>
            <Select 
              value={selectedClass}
              onValueChange={setSelectedClass}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Kelas" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls.value} value={cls.value}>{cls.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Jadwal {selectedClass} - {days.find(d => d.value === selectedDay)?.label}</h3>
            <Button variant="outline">Edit Jadwal</Button>
          </div>
          
          <div className="space-y-3">
            {scheduleItems.map((item, index) => (
              <div key={index} className="p-3 border rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <div className="font-medium min-w-[140px]">{item.time}</div>
                  <div>
                    <p className="font-medium">{item.subject}</p>
                    <p className="text-sm text-muted-foreground">{item.teacher}</p>
                  </div>
                </div>
                <div className="text-sm bg-gray-100 px-2 py-1 rounded">
                  Ruang {item.room}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Button 
              variant="outline" 
              className="text-sis-blue border-sis-blue hover:bg-sis-light-blue hover:text-sis-blue"
            >
              + Tambah Jadwal Baru
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassSchedule;
