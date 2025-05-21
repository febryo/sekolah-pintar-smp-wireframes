
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Messages = () => {
  const [activeContact, setActiveContact] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  
  // Mock data for demonstration
  const contacts = [
    { id: 1, name: "Kepala Sekolah", lastMessage: "Mohon menghadiri rapat guru besok.", time: "1 jam yang lalu", unread: true },
    { id: 2, name: "Admin Sekolah", lastMessage: "Jadwal ujian tengah semester telah diperbarui.", time: "3 jam yang lalu", unread: false },
    { id: 3, name: "Wali Kelas 7A", lastMessage: "Baik, terima kasih informasinya.", time: "5 jam yang lalu", unread: false },
  ];
  
  const conversation = [
    { id: 1, sender: "Kepala Sekolah", message: "Selamat pagi, mohon menghadiri rapat guru besok pukul 10.00 WIB di Ruang Rapat Utama.", time: "10:30", isSelf: false },
    { id: 2, sender: "Anda", message: "Selamat pagi, Pak. Baik, saya akan hadir tepat waktu.", time: "10:45", isSelf: true },
    { id: 3, sender: "Kepala Sekolah", message: "Terima kasih. Mohon juga mempersiapkan laporan perkembangan kelas yang Anda ampu.", time: "11:15", isSelf: false },
    { id: 4, sender: "Anda", message: "Siap, Pak. Laporan akan saya siapkan.", time: "11:20", isSelf: true },
  ];
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message
    setNewMessage('');
  };

  return (
    <div className="pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold mb-1">Pesan</h1>
        <p className="text-muted-foreground">Komunikasi antar staf sekolah</p>
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
        {/* Contact List */}
        <Card className="bg-white md:col-span-1">
          <div className="p-3 border-b">
            <Input 
              placeholder="Cari kontak..."
              className="w-full"
            />
          </div>
          <div className="overflow-y-auto h-[calc(100%-56px)]">
            {contacts.map(contact => (
              <div 
                key={contact.id}
                className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${activeContact === contact.id ? 'bg-sis-light-blue' : ''}`}
                onClick={() => setActiveContact(contact.id)}
              >
                <div className="flex justify-between">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                    <div className="overflow-hidden">
                      <p className="font-medium truncate">{contact.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{contact.time}</span>
                    {contact.unread && (
                      <span className="mt-1 w-2 h-2 bg-sis-blue rounded-full"></span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Conversation */}
        <Card className="bg-white md:col-span-2 flex flex-col">
          {activeContact ? (
            <>
              <div className="p-3 border-b flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <p className="font-medium">{contacts.find(c => c.id === activeContact)?.name}</p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversation.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.isSelf ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${msg.isSelf ? 'bg-sis-blue text-white' : 'bg-gray-100'} rounded-lg p-3`}>
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs mt-1 text-right opacity-70">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2">
                <Input 
                  placeholder="Tulis pesan..."
                  className="flex-1"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button type="submit" className="bg-sis-blue hover:bg-blue-700">Kirim</Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Pilih kontak untuk memulai percakapan
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Messages;
