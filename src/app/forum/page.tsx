import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { forumPosts } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";

export default function ForumPage() {
  return (
    <div className="space-y-8">
      <section>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter font-headline">
              Community Forum
            </h1>
            <p className="text-muted-foreground mt-2">
              Discuss, learn, and collaborate with fellow hackers.
            </p>
          </div>
          <Button>
            <MessageSquarePlus className="mr-2 h-4 w-4" />
            New Topic
          </Button>
        </div>
      </section>

      <section>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60%]">Topic</TableHead>
                <TableHead>Replies</TableHead>
                <TableHead className="text-right">Last Post</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forumPosts.map((post) => (
                <TableRow key={post.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <div className="font-medium">{post.topic}</div>
                    <div className="text-sm text-muted-foreground">by {post.author}</div>
                  </TableCell>
                  <TableCell>{post.replies}</TableCell>
                  <TableCell className="text-right">{post.lastPost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
