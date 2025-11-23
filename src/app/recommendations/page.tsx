import RecommendationsForm from './RecommendationsForm';

export default function RecommendationsPage() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
          AI Tool Recommendations
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
          Like Batman's utility belt, every hacker needs the right tools. Tell our AI your skills and interests to get a personalized set of recommendations.
        </p>
      </section>

      <section className="max-w-2xl mx-auto">
        <RecommendationsForm />
      </section>
    </div>
  );
}
