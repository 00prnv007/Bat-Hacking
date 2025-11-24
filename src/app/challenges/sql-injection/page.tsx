'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, ShieldOff, ShieldCheck, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function SqlInjectionPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [variant, setVariant] = useState<'default' | 'destructive'>('default');
  const [flag, setFlag] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // This is a client-side simulation. No actual database call is made.
    const simulatedQuery = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    setQuery(simulatedQuery);

    const normalizedUsername = username.toLowerCase().trim();
    // Check for classic SQL injection payloads
    const injectionPayloads = ["' or 1=1 --", "' or '1'='1", "' or '1'='1 --"];

    if (injectionPayloads.includes(normalizedUsername)) {
      setMessage('Login Successful! System bypassed.');
      setVariant('default');
      setFlag('FLAG{5QL_1NJ3C7I0N_M4573R}');
    } else {
      setMessage('Login Failed: Invalid username or password.');
      setVariant('destructive');
      setFlag('');
    }
  };

  return (
    <div className="space-y-8">
      <section className="text-center">
        <ShieldOff className="h-16 w-16 mx-auto text-primary" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline mt-4">
          SQL Injection Playground
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
          This is a simulated login form vulnerable to SQL Injection. Your mission is to bypass the authentication without knowing the password.
        </p>
        <Button asChild variant="link" className="mt-2">
            <Link href="/challenges">Back to Challenges</Link>
        </Button>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Wayne Enterprises Secure Portal</CardTitle>
              <CardDescription>Enter your credentials to access the system.</CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">Attempt Login</Button>
              </CardFooter>
            </form>
          </Card>

          <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  <CardTitle>Hint</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-sm text-muted-foreground">
                      The application might be constructing a SQL query directly from your input. Try using a common SQL comment (`--`) to truncate the query after injecting a condition that is always true. For example, a condition like <code className="font-code bg-muted p-1 rounded-sm">' or 1=1</code> might work.
                  </p>
              </CardContent>
          </Card>

        </div>
        <div className="space-y-4">
          <Card className="min-h-[150px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal />
                Simulated Backend Query
              </CardTitle>
            </CardHeader>
            <CardContent>
              {query ? (
                <code className="font-code text-sm text-amber-300 bg-black p-4 rounded-md block break-all">
                  {query}
                </code>
              ) : (
                <p className="text-muted-foreground">Submit the form to see the generated SQL query.</p>
              )}
            </CardContent>
          </Card>

          {message && (
            <Alert variant={variant}>
              {variant === 'default' ? <ShieldCheck className="h-4 w-4" /> : <ShieldOff className="h-4 w-4" />}
              <AlertTitle>{flag ? 'Success!' : 'Access Denied'}</AlertTitle>
              <AlertDescription>
                {message}
              </AlertDescription>
              {flag && (
                <div className="mt-4 bg-green-900/50 border border-green-500 text-green-300 p-3 rounded-md">
                    <p className="font-bold">FLAG Unlocked:</p>
                    <p className="font-code break-all">{flag}</p>
                </div>
              )}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
