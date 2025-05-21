
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BillingInvoice = () => {
  // Mock data for demonstration
  const invoices = [
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
  ];

  const paidInvoices = invoices.filter(inv => inv.status === 'paid');
  const unpaidInvoices = invoices.filter(inv => inv.status !== 'paid');

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">Tagihan & Pembayaran</h1>
          <p className="text-muted-foreground">Kelola tagihan dan pembayaran siswa</p>
        </div>
        <Button className="bg-sis-blue hover:bg-blue-700">+ Buat Tagihan</Button>
      </div>

      <Tabs defaultValue="unpaid" className="space-y-4">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="unpaid">Belum Dibayar</TabsTrigger>
          <TabsTrigger value="paid">Sudah Dibayar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="unpaid" className="space-y-4">
          {unpaidInvoices.map((invoice) => (
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
                      <Button size="sm" className="bg-sis-blue hover:bg-blue-700">Bayar</Button>
                      <Button size="sm" variant="outline">Detail</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="paid" className="space-y-4">
          {paidInvoices.map((invoice) => (
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
                      <Button size="sm" variant="outline">Detail</Button>
                      <Button size="sm" variant="outline">Cetak</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingInvoice;
