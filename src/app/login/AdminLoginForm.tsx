'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, initiateEmailSignIn } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Shield } from 'lucide-react';

export default function AdminLoginForm() {
  const [email, setEmail] = useState('admin@gotham.net');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // We are not awaiting the result here to follow the non-blocking pattern
      initiateEmailSignIn(auth, email, password);
      toast({
        title: 'Signing in, Administrator...',
        description: "You will be redirected shortly.",
      });
      // Redirect is handled by the auth state listener in the header
      router.push('/');
    } catch (error: any) {
      console.error('Admin Login Error:', error);
      toast({
        variant: 'destructive',
        title: 'Admin Login Failed',
        description: 'Invalid credentials or an unknown error occurred.',
      });
    } finally {
      // Don't set loading to false on success, to prevent button re-enabling during redirect
      if(!auth.currentUser) {
          setLoading(false);
      }
    }
  };

  return (
    <Card className="w-full max-w-sm border-0 shadow-none">
      <form onSubmit={handleSignIn}>
        <CardHeader className="text-center">
            <CardTitle className="font-headline text-2xl">Admin Access</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email">Admin Email</Label>
            <Input
              id="admin-email"
              type="email"
              required
              value={email}
              readOnly
              className="cursor-not-allowed bg-muted"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 
              <Shield className="mr-2 h-4 w-4" />
            }
            Login as Admin
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
