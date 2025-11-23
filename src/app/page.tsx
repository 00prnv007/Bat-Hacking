import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldCheck, Bug, WifiOff, KeyRound } from "lucide-react";

export default function Home() {
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
  ];

  const protectiveMeasures = [
    "Use strong, unique passwords for different accounts and enable two-factor authentication (2FA).",
    "Keep your software and operating systems updated to patch security vulnerabilities.",
    "Be cautious of suspicious emails, links, and attachments.",
    "Use a firewall and reputable antivirus software.",
    "Regularly back up your important data to a separate location."
  ];

  return (
    <div className="space-y-16">
      <section className="text-center">
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
    </div>
  );
}
