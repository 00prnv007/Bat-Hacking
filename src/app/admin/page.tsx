'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useCollection, useMemoFirebase } from '@/firebase';
import { Loader2, ShieldCheck, Users, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFirestore, useAuth } from '@/firebase/provider';
import { collection, doc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';


function AddUserForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const { user: adminUser } = useUser();

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || !firestore || !adminUser?.email) return;
    setLoading(true);

    const adminEmail = adminUser.email;
    const adminPassword = 'batman123'; // This should be handled more securely in a real app

    try {
      // 1. Create the new user account. Note: This signs out the admin.
      const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = newUserCredential.user;

      // 2. Create the user document in Firestore.
      const userDocRef = doc(firestore, 'users', newUser.uid);
      // We use setDoc directly here and await it to ensure the doc is created
      // before we proceed. The non-blocking call is less critical here as
      // the admin re-authentication is the main flow control.
      await setDocumentNonBlocking(userDocRef, {
        id: newUser.uid,
        username: username,
        email: newUser.email,
        createdAt: serverTimestamp(),
      }, { merge: true });

      toast({
        title: 'User Created',
        description: `Successfully created user ${username}.`,
      });

      // Clear form
      setUsername('');
      setEmail('');
      setPassword('');

    } catch (error: any) {
      console.error('Error creating user:', error);
      toast({
        variant: 'destructive',
        title: 'Creation Failed',
        description: error.message || 'Could not create user.',
      });
    } finally {
      // 3. IMPORTANT: Sign the admin back in to restore their session.
      try {
        await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
      } catch (reauthError) {
        console.error('Failed to re-authenticate admin:', reauthError);
        toast({
          variant: 'destructive',
          title: 'Admin Re-login Failed',
          description: 'Please log in again manually.',
        });
        // If re-auth fails, the user is likely logged in as the new user.
        // Force a redirect to the login page to resolve the state.
        router.push('/login');
      }
      setLoading(false);
    }
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus />
          Add New Operative
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleAddUser}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-username">Username</Label>
            <Input
              id="new-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="e.g. catwoman"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-email">Email</Label>
            <Input
              id="new-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="agent@gotham.net"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Password</Label>
            <Input
              id="new-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Min. 6 characters"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <Loader2 className="animate-spin" /> : 'Create User'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}


export default function AdminPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();
  const isAdmin = user?.email === 'admin@gotham.net';

  const usersCollection = useMemoFirebase(
    () => (firestore && isAdmin ? collection(firestore, 'users') : null),
    [firestore, isAdmin]
  );
  const { data: users, isLoading: usersLoading } = useCollection(usersCollection);

  useEffect(() => {
    if (!isUserLoading && !user) {
        router.push('/login');
    } else if (!isUserLoading && user && user.email !== 'admin@gotham.net') {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Users className="h-6 w-6" />
              <CardTitle>Registered Operatives</CardTitle>
            </CardHeader>
            <CardContent>
              {usersLoading && (!users || users.length === 0) ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>User ID</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users && users.length > 0 ? (
                        users.map((op) => (
                          <TableRow key={op.id}>
                            <TableCell className="font-medium">{op.username}</TableCell>
                            <TableCell>{op.email}</TableCell>
                            <TableCell className="font-code text-xs">{op.id}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center">
                            No operatives have registered yet.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <AddUserForm />
        </div>
      </div>
    </div>
  );
}
