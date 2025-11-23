'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ShieldCheck, Bug, WifiOff, KeyRound, Shuffle, Database, Code, ShieldQuestion, HelpCircle } from "lucide-react";
import { BatIcon } from "@/components/icons/BatIcon";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type AnswerStatus = 'correct' | 'incorrect' | 'neutral';
type AnswerStatuses = {
  q1: AnswerStatus;
  q2: AnswerStatus;
  q3: AnswerStatus;
};

export default function Home() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [answerStatuses, setAnswerStatuses] = useState<AnswerStatuses>({
    q1: 'neutral',
    q2: 'neutral',
    q3: 'neutral',
  });

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleQuizSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const answers = {
      q1: formData.get('q1') as string,
      q2: formData.get('q2') as string,
      q3: formData.get('q3') as string,
    };

    const correctAnswers = {
      q1: "cybersecurity",
      q2: "phishing",
      q3: "FLAG{iambatman}",
    };
    
    const newStatuses: AnswerStatuses = {
      q1: answers.q1.toLowerCase().trim() === correctAnswers.q1.toLowerCase() ? 'correct' : 'incorrect',
      q2: answers.q2.toLowerCase().trim() === correctAnswers.q2.toLowerCase() ? 'correct' : 'incorrect',
      q3: answers.q3.toLowerCase().trim() === correctAnswers.q3.toLowerCase() ? 'correct' : 'incorrect',
    };

    setAnswerStatuses(newStatuses);

    if (
      newStatuses.q1 === 'correct' &&
      newStatuses.q2 === 'correct' &&
      newStatuses.q3 === 'correct'
    ) {
      toast({
        title: "Correct!",
        description: "You've answered all questions correctly. Well done, operative.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect.",
        description: "One or more answers are wrong. Keep investigating.",
      });
    }
  };

  const getStatusClass = (status: AnswerStatus) => {
    if (status === 'correct') {
      return 'border-green-500 bg-green-900/20 focus-visible:ring-green-500';
    }
    if (status === 'incorrect') {
      return 'border-destructive bg-red-900/20 focus-visible:ring-destructive';
    }
    return '';
  }


  const threats = [
    {
      icon: <Bug className="h-8 w-8 text-primary" />,
      title: "Malware",
      description: "Malicious software like viruses, ransomware, and spyware designed to damage or disable computer systems.",
    },
    {
      icon: <KeyRound className="h-8 w-8 text-primary" />,
      title: "Phishing",
      description: "Fraudulent attempts, usually made through email, to steal sensitive information like passwords and credit card numbers.",
    },
    {
      icon: <WifiOff className="h-8 w-8 text-primary" />,
      title: "Denial-of-Service (DoS) Attacks",
      description: "Overwhelming a system's resources to make it unavailable to its intended users.",
    },
    {
      icon: <Shuffle className="h-8 w-8 text-primary" />,
      title: "Man-in-the-Middle (MitM)",
      description: "An attacker secretly intercepts and alters communications between two parties who believe they are directly communicating with each other.",
    },
    {
      icon: <Database className="h-8 w-8 text-primary" />,
      title: "SQL Injection",
      description: "A malicious SQL query is inserted into an application's input, allowing an attacker to control the application's database.",
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "Cross-Site Scripting (XSS)",
      description: "Injecting malicious scripts into trusted websites, which then execute on a victim's browser, stealing data or performing actions.",
    },
  ];

  const protectiveMeasures = [
    "Use strong, unique passwords for different accounts and enable two-factor authentication (2FA).",
    "Keep your software and operating systems updated to patch security vulnerabilities.",
    "Be cautious of suspicious emails, links, and attachments.",
    "Use a firewall and reputable antivirus software.",
    "Regularly back up your important data to a separate location."
  ];

  const quizQuestions = [
    {
      id: "q1",
      question: "What is the practice of protecting computer systems from digital attacks called?",
      status: answerStatuses.q1,
    },
    {
      id: "q2",
      question: "What is a fraudulent attempt, usually via email, to steal sensitive information called?",
      status: answerStatuses.q2,
    },
    {
      id: "q3",
      question: "find the flag",
      hint: "who are you",
      status: answerStatuses.q3,
    },
  ];

  if (isUserLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <section className="text-center">
        <div className="mb-4">
          <BatIcon className="h-24 w-24 mx-auto text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-white">
          Introduction to Cybersecurity
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
          In the digital shadows of Gotham, knowledge is your first line of defense. Understand the basics to protect yourself from digital threats.
        </p>
      </section>

      <section>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">What is Cybersecurity?</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-lg">
              Cybersecurity is the practice of protecting computer systems, networks, and data from digital attacks, damage, or unauthorized access. Think of it as being a digital sentinel, guarding the vast expanse of Gotham's cyberspace. It's not just about technology; it's about people, processes, and policies working together to create a secure environment.
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Why is it Important?</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-lg">
              In our hyper-connected world, everything from our personal identity to critical city infrastructure is online. A breach can lead to identity theft, financial loss, or even chaos in the city's operations. Strong cybersecurity ensures privacy, protects our digital assets, and maintains the stability of the digital world we rely on every day.
            </CardDescription>
          </CardContent>
        </Card>
      </section>
      
      <section>
        <h2 className="text-3xl font-bold font-headline mb-6 text-center">Common Threats in the Shadows</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {threats.map((threat) => (
            <Card key={threat.title} className="text-center bg-card/50 backdrop-blur-sm">
              <CardHeader className="items-center">
                {threat.icon}
                <CardTitle className="mt-4 font-headline">{threat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{threat.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

       <section>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Basic Protective Measures</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {protectiveMeasures.map((measure, index) => (
                <div key={index} className="flex items-start gap-4">
                    <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">{measure}</p>
                </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-4">
              <ShieldQuestion className="h-8 w-8 text-primary" />
              <CardTitle className="font-headline text-3xl">Test Your Knowledge</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <TooltipProvider>
              <form className="space-y-6" onSubmit={handleQuizSubmit}>
                {quizQuestions.map((q) => (
                  <div key={q.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={q.id}>{q.question}</Label>
                      {q.hint && (
                        <Tooltip>
                          <TooltipTrigger type="button" onClick={e => e.preventDefault()}>
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{q.hint}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                    <Input
                      id={q.id}
                      name={q.id}
                      placeholder={q.id === 'q3' ? 'FLAG{*********' : 'Your answer...'}
                      className={cn(getStatusClass(q.status))}
                    />
                  </div>
                ))}
                <Button type="submit" className="w-full">Submit Answers</Button>
              </form>
            </TooltipProvider>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
