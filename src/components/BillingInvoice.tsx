
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Calendar, Pencil, Plus, Search, Trash2, Receipt } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from '@/components/ui/use-toast';
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const BillingInvoice = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openAutomateDialog, setOpenAutomateDialog] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState({
    student: '',
    grade: '',
    amount: '',
    dueDate: '',
    type: 'SPP Bulanan'
  });
  
  // Automation settings
  const [automationSettings, setAutomationSettings] = useState({
    enabled: false,
    day: '1',
    invoiceType: 'SPP Bulanan',
    amount: '750000',
    gracePeriod: '7',
  });
  
  // Mock data for demonstrations
  const [invoices, setInvoices] = useState([
    { 
      id: "INV-2023-001", 
      student: "Andi Pratama", 
      grade: "7A", 
      amount: "Rp 750.000", 
      dueDate: "25 Mei 2023", 
      status: "due",
      type: "SPP Mei 2023" 
    },
    { 
      id: "INV-2023-002", 
      student: "Budi Santoso", 
      grade: "8B", 
      amount: "Rp 1.250.000", 
      dueDate: "12 Mei 2023", 
      status: "overdue",
      type: "SPP Mei 2023 + Denda" 
    },
    { 
      id: "INV-2023-003", 
      student: "Citra Dewi", 
      grade: "9C", 
      amount: "Rp 950.000", 
      dueDate: "30 Mei 2023", 
      status: "due",
      type: "SPP Mei 2023" 
    },
    { 
      id: "INV-2023-004", 
      student: "Dian Permata", 
      grade: "7A", 
      amount: "Rp 750.000", 
      dueDate: "05 Mei 2023", 
      status: "paid",
      type: "SPP Mei 2023" 
    },
  ]);

  // Mock automation schedules
  const [automationSchedules, setAutomationSchedules] = useState([
    {
      id: 1,
      type: "SPP Bulanan",
      day: 1,
      amount: "Rp 750.000",
      gracePeriod: 7,
      status: "active",
      lastRun: "30 Apr 2023",
      nextRun: "01 Jun 2023"
    }
  ]);

  const students = [
    { id: 1, name: "Andi Pratama", grade: "7A" },
    { id: 2, name: "Budi Santoso", grade: "8B" },
    { id: 3, name: "Citra Dewi", grade: "9C" },
    { id: 4, name: "Dian Permata", grade: "7A" },
    { id: 5, name: "Eko Prasetyo", grade: "8B" },
  ];

  const grades = ["7A", "7B", "8A", "8B", "9A", "9B"];
  
  const invoiceTypes = [
    "SPP Bulanan",
    "Uang Gedung",
    "Seragam",
    "Kegiatan",
    "Lainnya"
  ];

  const dayOptions = Array.from({ length: 28 }, (_, i) => (i + 1).toString());

  const filteredInvoices = invoices.filter(invoice => 
    invoice.student.toLowerCase().includes(searchTerm.toLowerCase()) || 
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paidInvoices = filteredInvoices.filter(inv => inv.status === 'paid');
  const unpaidInvoices = filteredInvoices.filter(inv => inv.status !== 'paid');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAutomationInputChange = (e) => {
    const { name, value } = e.target;
    setAutomationSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setInvoiceForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAutomationSelectChange = (name, value) => {
    setAutomationSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateInvoice = () => {
    // Validate form
    if (!invoiceForm.student || !invoiceForm.grade || !invoiceForm.amount || !invoiceForm.dueDate) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua kolom tagihan",
        variant: "destructive"
      });
      return;
    }

    // Format amount to Indonesian currency
    let formattedAmount = invoiceForm.amount;
    if (!formattedAmount.startsWith('Rp')) {
      formattedAmount = `Rp ${formattedAmount}`;
    }

    // Create new invoice
    const newInvoice = {
      id: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      student: invoiceForm.student,
      grade: invoiceForm.grade,
      amount: formattedAmount,
      dueDate: invoiceForm.dueDate,
      type: invoiceForm.type,
      status: "due"
    };

    setInvoices([newInvoice, ...invoices]);
    setOpenCreateDialog(false);
    
    // Reset form
    setInvoiceForm({
      student: '',
      grade: '',
      amount: '',
      dueDate: '',
      type: 'SPP Bulanan'
    });
    
    toast({
      title: "Tagihan Berhasil Dibuat",
      description: `Tagihan untuk ${newInvoice.student} berhasil dibuat`
    });
  };

  const markAsPaid = (id) => {
    setInvoices(invoices.map(invoice => 
      invoice.id === id ? { ...invoice, status: 'paid' } : invoice
    ));
    
    toast({
      title: "Status Tagihan Diperbarui",
      description: "Tagihan telah ditandai sebagai Lunas"
    });
  };

  const deleteInvoice = (id) => {
    setInvoices(invoices.filter(invoice => invoice.id !== id));
    
    toast({
      title: "Tagihan Dihapus",
      description: "Tagihan telah dihapus dari sistem"
    });
  };

  const handleSaveAutomation = () => {
    // Validate the form
    if (!automationSettings.day || !automationSettings.invoiceType || !automationSettings.amount) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua kolom pengaturan otomatis",
        variant: "destructive"
      });
      return;
    }

    // Format the amount
    let formattedAmount = automationSettings.amount;
    if (!formattedAmount.startsWith('Rp')) {
      formattedAmount = `Rp ${formattedAmount}`;
    }

    // Create the next run date (1st of next month)
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, parseInt(automationSettings.day));
    const nextRun = nextMonth.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

    // Create an automation schedule
    const newSchedule = {
      id: automationSchedules.length + 1,
      type: automationSettings.invoiceType,
      day: parseInt(automationSettings.day),
      amount: formattedAmount,
      gracePeriod: parseInt(automationSettings.gracePeriod),
      status: automationSettings.enabled ? "active" : "inactive",
      lastRun: "-",
      nextRun: nextRun
    };

    setAutomationSchedules([...automationSchedules, newSchedule]);
    setOpenAutomateDialog(false);
    
    toast({
      title: "Jadwal Otomatis Berhasil Dibuat",
      description: `Jadwal pembuatan tagihan ${automationSettings.invoiceType} telah dibuat`
    });
  };

  const toggleAutomationStatus = (id) => {
    setAutomationSchedules(automationSchedules.map(schedule => 
      schedule.id === id ? { ...schedule, status: schedule.status === "active" ? "inactive" : "active" } : schedule
    ));
    
    toast({
      title: "Status Jadwal Diperbarui",
      description: "Status jadwal otomatis telah diperbarui"
    });
  };

  const deleteAutomation = (id) => {
    setAutomationSchedules(automationSchedules.filter(schedule => schedule.id !== id));
    
    toast({
      title: "Jadwal Otomatis Dihapus",
      description: "Jadwal pembuatan tagihan otomatis telah dihapus"
    });
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">Tagihan & Pembayaran</h1>
          <p className="text-muted-foreground">Kelola tagihan dan pembayaran siswa</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={openAutomateDialog} onOpenChange={setOpenAutomateDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Receipt className="h-4 w-4" /> Jadwal Otomatis
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Pengaturan Tagihan Otomatis</DialogTitle>
                <DialogDescription>
                  Buat jadwal otomatis untuk pembuatan tagihan bulanan
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enabled" className="text-sm font-medium">
                    Aktifkan Tagihan Otomatis
                  </Label>
                  <Switch
                    id="enabled"
                    checked={automationSettings.enabled}
                    onCheckedChange={(checked) => setAutomationSettings(prev => ({ ...prev, enabled: checked }))}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="invoiceType" className="text-sm font-medium">
                    Jenis Tagihan
                  </Label>
                  <Select 
                    name="invoiceType" 
                    value={automationSettings.invoiceType}
                    onValueChange={(value) => handleAutomationSelectChange('invoiceType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis tagihan" />
                    </SelectTrigger>
                    <SelectContent>
                      {invoiceTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="day" className="text-sm font-medium">
                    Hari Penerbitan Tagihan
                  </Label>
                  <Select
                    name="day"
                    value={automationSettings.day}
                    onValueChange={(value) => handleAutomationSelectChange('day', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tanggal" />
                    </SelectTrigger>
                    <SelectContent>
                      {dayOptions.map((day) => (
                        <SelectItem key={day} value={day}>
                          {day} (tiap bulan)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="amount" className="text-sm font-medium">
                    Jumlah Tagihan
                  </Label>
                  <Input
                    id="amount"
                    name="amount"
                    placeholder="Contoh: 750000"
                    value={automationSettings.amount}
                    onChange={handleAutomationInputChange}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="gracePeriod" className="text-sm font-medium">
                    Tenggat Waktu (dalam hari)
                  </Label>
                  <Input
                    id="gracePeriod"
                    name="gracePeriod"
                    placeholder="7"
                    value={automationSettings.gracePeriod}
                    onChange={handleAutomationInputChange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenAutomateDialog(false)}>
                  Batal
                </Button>
                <Button className="bg-sis-blue hover:bg-blue-700" onClick={handleSaveAutomation}>
                  Simpan Pengaturan
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-sis-blue hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" /> Buat Tagihan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Buat Tagihan Baru</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="student" className="text-sm font-medium">
                    Siswa
                  </label>
                  <Select 
                    name="student" 
                    value={invoiceForm.student}
                    onValueChange={(value) => handleSelectChange('student', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih siswa" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.name}>
                          {student.name} - Kelas {student.grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="grade" className="text-sm font-medium">
                    Kelas
                  </label>
                  <Select 
                    name="grade" 
                    value={invoiceForm.grade}
                    onValueChange={(value) => handleSelectChange('grade', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kelas" />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="type" className="text-sm font-medium">
                    Jenis Tagihan
                  </label>
                  <Select 
                    name="type" 
                    value={invoiceForm.type}
                    onValueChange={(value) => handleSelectChange('type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis tagihan" />
                    </SelectTrigger>
                    <SelectContent>
                      {invoiceTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="amount" className="text-sm font-medium">
                    Jumlah Tagihan
                  </label>
                  <Input
                    id="amount"
                    name="amount"
                    placeholder="Contoh: 750000"
                    value={invoiceForm.amount}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="dueDate" className="text-sm font-medium">
                    Tanggal Jatuh Tempo
                  </label>
                  <div className="flex items-center">
                    <Input
                      id="dueDate"
                      name="dueDate"
                      type="date"
                      value={invoiceForm.dueDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenCreateDialog(false)}>
                  Batal
                </Button>
                <Button className="bg-sis-blue hover:bg-blue-700" onClick={handleCreateInvoice}>
                  Buat Tagihan
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="invoices">Tagihan</TabsTrigger>
          <TabsTrigger value="automation">Jadwal Otomatis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="invoices" className="space-y-4">
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari tagihan berdasarkan nama siswa atau nomor tagihan"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="unpaid" className="space-y-4">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="unpaid">Belum Dibayar</TabsTrigger>
              <TabsTrigger value="paid">Sudah Dibayar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="unpaid" className="space-y-4">
              {unpaidInvoices.length === 0 ? (
                <Card className="bg-white">
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">Tidak ada tagihan yang belum dibayar</p>
                  </CardContent>
                </Card>
              ) : (
                unpaidInvoices.map((invoice) => (
                  <Card key={invoice.id} className="bg-white">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-lg">{invoice.student}</p>
                            <span className="text-sm text-muted-foreground">Kelas {invoice.grade}</span>
                          </div>
                          <p className="text-sm mb-1">{invoice.type}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-muted-foreground">No. {invoice.id}</p>
                            <p className="text-xs text-muted-foreground">Jatuh tempo: {invoice.dueDate}</p>
                          </div>
                        </div>
                        <div className="flex flex-col md:items-end">
                          <p className="font-medium text-lg">{invoice.amount}</p>
                          <span 
                            className={`status-badge ${
                              invoice.status === 'paid' ? 'status-paid' : 
                              invoice.status === 'due' ? 'status-due' : 'status-overdue'
                            }`}
                          >
                            {invoice.status === 'paid' ? 'Lunas' : 
                            invoice.status === 'due' ? 'Jatuh Tempo' : 'Terlambat'}
                          </span>
                          
                          <div className="flex gap-2 mt-2">
                            <Button 
                              size="sm" 
                              className="bg-sis-blue hover:bg-blue-700" 
                              onClick={() => markAsPaid(invoice.id)}
                            >
                              Tandai Lunas
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-500"
                              onClick={() => deleteInvoice(invoice.id)}
                            >
                              Hapus
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
            
            <TabsContent value="paid" className="space-y-4">
              {paidInvoices.length === 0 ? (
                <Card className="bg-white">
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">Tidak ada tagihan yang sudah dibayar</p>
                  </CardContent>
                </Card>
              ) : (
                paidInvoices.map((invoice) => (
                  <Card key={invoice.id} className="bg-white">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-lg">{invoice.student}</p>
                            <span className="text-sm text-muted-foreground">Kelas {invoice.grade}</span>
                          </div>
                          <p className="text-sm mb-1">{invoice.type}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-muted-foreground">No. {invoice.id}</p>
                            <p className="text-xs text-muted-foreground">Dibayar: {invoice.dueDate}</p>
                          </div>
                        </div>
                        <div className="flex flex-col md:items-end">
                          <p className="font-medium text-lg">{invoice.amount}</p>
                          <span className="status-badge status-paid">Lunas</span>
                          
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" variant="outline">Lihat Detail</Button>
                            <Button size="sm" variant="outline">Cetak</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        <TabsContent value="automation" className="space-y-4">
          <Card className="bg-white">
            <CardHeader className="pb-3">
              <CardTitle>Jadwal Tagihan Otomatis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Jenis Tagihan</TableHead>
                      <TableHead>Tanggal Terbit</TableHead>
                      <TableHead>Jumlah</TableHead>
                      <TableHead>Tenggat (hari)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Jadwal Berikutnya</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {automationSchedules.map((schedule) => (
                      <TableRow key={schedule.id}>
                        <TableCell>{schedule.type}</TableCell>
                        <TableCell>Setiap tanggal {schedule.day}</TableCell>
                        <TableCell>{schedule.amount}</TableCell>
                        <TableCell>{schedule.gracePeriod} hari</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            schedule.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {schedule.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                          </span>
                        </TableCell>
                        <TableCell>{schedule.nextRun}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant={schedule.status === 'active' ? 'outline' : 'default'}
                              className={schedule.status === 'active' ? '' : 'bg-sis-blue hover:bg-blue-700'}
                              onClick={() => toggleAutomationStatus(schedule.id)}
                            >
                              {schedule.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-500"
                              onClick={() => deleteAutomation(schedule.id)}
                            >
                              Hapus
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    
                    {automationSchedules.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6">
                          Tidak ada jadwal otomatis yang dikonfigurasi
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-4 flex justify-center">
                <Button
                  onClick={() => setOpenAutomateDialog(true)}
                  className="bg-sis-blue hover:bg-blue-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Jadwal Otomatis
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingInvoice;
