import { BatIcon } from '@/components/icons/BatIcon';
import LoginForm from './LoginForm';
import AdminLoginForm from './AdminLoginForm';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-center">
        <BatIcon className="h-16 w-16 mx-auto text-primary" />
        <h1 className="text-3xl font-bold font-headline mt-4">Welcome Back</h1>
        <p className="text-muted-foreground mt-2">
          Enter the shadows to continue your training.
        </p>
      </div>
      <Tabs defaultValue="operative" className="w-full max-w-sm">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="operative">Operative Login</TabsTrigger>
          <TabsTrigger value="admin">Admin Login</TabsTrigger>
        </TabsList>
        <TabsContent value="operative">
          <LoginForm />
        </TabsContent>
        <TabsContent value="admin">
          <AdminLoginForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
