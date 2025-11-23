import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { articles } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export default function Home() {
  const imageMap = new Map(PlaceHolderImages.map(img => [img.id, img]));

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline bg-clip-text text-transparent bg-gradient-to-r from-accent to-white">
          Welcome to Bat-Hacking Christmas
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
          Your silent guardian in the world of ethical hacking. Explore tutorials, take on challenges, and sharpen your skills this festive season.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold font-headline mb-6">Festive Content</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => {
            const image = imageMap.get(article.imageId);
            return (
              <Card key={article.id} className="flex flex-col overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out bg-card/50 backdrop-blur-sm">
                
                  {image && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-t-lg"
                        data-ai-hint={image.imageHint}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <Badge variant="outline" className="w-fit bg-primary/80 text-primary-foreground border-accent">{article.category}</Badge>
                    <CardTitle className="mt-2 font-headline">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{article.description}</CardDescription>
                  </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
