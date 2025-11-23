import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { challenges } from "@/lib/placeholder-data";
import { Shield, ShieldHalf, ShieldCheck } from "lucide-react";

export default function ChallengesPage() {
  const getDifficultyIcon = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    switch (difficulty) {
      case 'Easy':
        return <ShieldCheck className="h-5 w-5 text-green-400" />;
      case 'Medium':
        return <ShieldHalf className="h-5 w-5 text-yellow-400" />;
      case 'Hard':
        return <Shield className="h-5 w-5 text-red-400" />;
    }
  };

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
          Interactive Challenges
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
          Test your skills against these challenges. Each one is a step towards becoming a digital sentinel of Gotham.
        </p>
      </section>

      <section className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {challenges.map((challenge) => (
            <AccordionItem value={challenge.id} key={challenge.id}>
              <AccordionTrigger className="text-lg font-headline hover:no-underline">
                <div className="flex items-center gap-4">
                  {getDifficultyIcon(challenge.difficulty)}
                  <span>{challenge.title}</span>
                  <Badge variant={
                    challenge.difficulty === 'Easy' ? 'secondary' :
                    challenge.difficulty === 'Medium' ? 'default' : 'destructive'
                  }>{challenge.difficulty}</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 px-2">
                <p className="text-muted-foreground">{challenge.description}</p>
                <div>
                  <h4 className="font-bold mb-2">Hint:</h4>
                  <p className="font-code text-sm bg-muted p-3 rounded-md">{challenge.hint}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
