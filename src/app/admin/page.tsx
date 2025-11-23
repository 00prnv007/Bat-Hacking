'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { Loader2, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If not loading and user is not present, or user is not admin, redirect
    if (!isUserLoading) {
      if (!user || user.email !== 'admin@gotham.net') {
        router.push('/');
      }
    }
  }, [user, isUserLoading, router]);

  // Show a loading state while we verify the user
  if (isUserLoading || !user || user.email !== 'admin@gotham.net') {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  // If we reach here, the user is the admin
  return (
    <div className="space-y-8">
      <section className="text-center">
        <ShieldCheck className="h-24 w-24 mx-auto text-primary" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline mt-4">
          Admin Panel
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
          Welcome, Administrator. From here you can oversee the Academy.
        </p>
      </section>

      <section className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p>All systems are operational. The shadows remain secure.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
