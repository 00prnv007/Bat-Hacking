
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { KeyRound, TriangleAlert, CheckCircle2, ShieldQuestion } from 'lucide-react';
import Link from 'next/link';

export default function SqlInjectionPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isHacked, setIsHacked] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate SQL injection vulnerability by checking for common patterns.
    // In a real scenario, this would be a backend check against a database.
    const injectionPattern1 = /' or '1'='1/i;
    const injectionPattern2 = /' union select/i;

    if (injectionPattern1.test(username) || injectionPattern2.test(username)) {
      setIsHacked(true);
      toast({
        title: 'Login Bypassed!',
        description: 'You have successfully exploited the SQL injection vulnerability.',
      });
    } else {
      setIsHacked(false);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid username or password.',
      });
    }
  };

  return (
    <div className="space-y-8">
      <section className="text-center">
        <ShieldQuestion className="h-24 w-24 mx-auto text-primary" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline mt-4">
          SQL Injection Playground
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
          This is a safe environment to test your SQL injection skills. No actual databases will be harmed.
        </p>
      </section>

      <div className="max-w-md mx-auto">
        <Card>
          <form onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <KeyRound />
                Vulnerable Login Portal
              </CardTitle>
              <CardDescription>
                Enter credentials to access the system. The server seems to trust user input a little too much...
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                   autoComplete="off"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>

      {isHacked && (
        <Alert variant="default" className="max-w-md mx-auto bg-green-900/20 border-green-500">
          <CheckCircle2 className="h-4 w-4 !text-green-400" />
          <AlertTitle className="text-green-400">Access Granted!</AlertTitle>
          <AlertDescription className="font-code text-lg text-white">
            FLAG{'{SQL_MASTER_INJECTOR}'}
          </AlertDescription>
        </Alert>
      )}

      <div className="max-w-md mx-auto">
        <Alert variant="destructive">
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Disclaimer</AlertTitle>
          <AlertDescription>
            This is a simulation. The form is not connected to a real database. It is designed to teach about SQL injection vulnerabilities in a safe, controlled environment.
          </AlertDescription>
        </Alert>
      </div>
      <div className="text-center">
        <Button variant="outline" asChild>
          <Link href="/challenges">Back to Challenges</Link>
        </Button>
      </div>
    </div>
  );
}
