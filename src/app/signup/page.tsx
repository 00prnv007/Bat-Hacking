import { BatIcon } from '@/components/icons/BatIcon';
import SignUpForm from './SignUpForm';

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-center">
        <BatIcon className="h-16 w-16 mx-auto text-primary" />
        <h1 className="text-3xl font-bold font-headline mt-4">Join the Academy</h1>
        <p className="text-muted-foreground mt-2">
          Create your operative profile to begin.
        </p>
      </div>
      <SignUpForm />
    </div>
  );
}
