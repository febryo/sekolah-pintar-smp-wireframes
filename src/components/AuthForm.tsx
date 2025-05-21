
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface AuthFormProps {
  onLogin: (email: string, password: string, role: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password, role);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Masuk</CardTitle>
        <CardDescription>Sistem Informasi Sekolah</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="nama@sekolah.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Kata Sandi</Label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Masuk Sebagai</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="admin"
                  name="role"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                  className="mr-2"
                />
                <Label htmlFor="admin" className="cursor-pointer">Admin</Label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="teacher"
                  name="role"
                  value="teacher"
                  checked={role === 'teacher'}
                  onChange={() => setRole('teacher')}
                  className="mr-2"
                />
                <Label htmlFor="teacher" className="cursor-pointer">Guru</Label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="tata-usaha"
                  name="role"
                  value="tata-usaha"
                  checked={role === 'tata-usaha'}
                  onChange={() => setRole('tata-usaha')}
                  className="mr-2"
                />
                <Label htmlFor="tata-usaha" className="cursor-pointer">Tata Usaha</Label>
              </div>
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-sis-blue hover:bg-blue-700">
            Masuk
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-center text-sm text-muted-foreground w-full">
          Lupa kata sandi? Hubungi admin sekolah
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
