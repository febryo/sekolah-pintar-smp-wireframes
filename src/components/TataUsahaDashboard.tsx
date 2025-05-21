
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";

const TataUsahaDashboard = () => {
  const { toast } = useToast();

  const quickActions = [
    { 
      id: 'register-student', 
      title: 'Pendaftaran Siswa Baru', 
      icon: <FileText className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-700',
      route: 'students'
    },
    { 
      id: 'student-data', 
      title: 'Data Siswa', 
      icon: <Users className="h-5 w-5" />,
      color: 'bg-indigo-100 text-indigo-700',
      route: 'students'
    },
    { 
      id: 'billing-invoice', 
      title: 'Tagihan & Pembayaran', 
      icon: <Receipt className="h-5 w-5" />,
      color: 'bg-green-100 text-green-700',
      route: 'billing'
    }
  ];

  const handleAction = (route: string) => {
    // This will be handled by the parent component via the onNavigate prop
    toast({
      title: "Navigasi",
      description: `Mengarahkan ke halaman ${route}`,
    });
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold mb-1">Selamat Datang, Tata Usaha!</h1>
        <p className="text-muted-foreground">Kelola pendaftaran siswa dan keuangan sekolah</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Akses Cepat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Button 
                key={action.id}
                variant="ghost" 
                className="h-24 flex flex-col items-center justify-center gap-2 border" 
                onClick={() => handleAction(action.route)}
              >
                <div className={`p-2 rounded-full ${action.color}`}>
                  {action.icon}
                </div>
                <span>{action.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Siswa Baru Bulan Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-sm text-muted-foreground">Meningkat 20% dari bulan lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Tagihan Terbayar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Rp 45.750.000</div>
            <p className="text-sm text-muted-foreground">90% dari total tagihan bulan ini</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Tagihan Jatuh Tempo Minggu Ini</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <div>
                <p className="font-medium">Andi Pratama - 7A</p>
                <p className="text-sm text-muted-foreground">SPP Mei 2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium">Rp 750.000</p>
                <p className="text-sm text-red-500">Jatuh tempo 25 Mei</p>
              </div>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <div>
                <p className="font-medium">Budi Santoso - 8B</p>
                <p className="text-sm text-muted-foreground">SPP Mei 2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium">Rp 750.000</p>
                <p className="text-sm text-red-500">Jatuh tempo 28 Mei</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Citra Dewi - 9C</p>
                <p className="text-sm text-muted-foreground">SPP Mei 2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium">Rp 750.000</p>
                <p className="text-sm text-red-500">Jatuh tempo 30 Mei</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TataUsahaDashboard;
