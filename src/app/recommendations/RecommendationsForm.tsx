"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getRecommendationsAction, type FormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2, BookOpen } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        "Get Recommendations"
      )}
    </Button>
  );
}

export default function RecommendationsForm() {
  const initialState: FormState = { message: "", success: false };
  const [state, formAction] = useFormState(getRecommendationsAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [skillLevel, setSkillLevel] = useState("");

  useEffect(() => {
    if (state.message && !state.success) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
    if (state.success && state.message) {
      formRef.current?.reset();
      setSkillLevel("");
    }
  }, [state, toast]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-4">
            <div>
              <Label htmlFor="skillLevel">Skill Level</Label>
              <Select name="skillLevel" required value={skillLevel} onValueChange={setSkillLevel}>
                <SelectTrigger id="skillLevel" className="w-full">
                  <SelectValue placeholder="Select your skill level..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="interests">Interests</Label>
              <Textarea
                id="interests"
                name="interests"
                placeholder="e.g., web security, network penetration testing, cryptography, reverse engineering..."
                required
                className="min-h-[100px]"
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      {state.success && state.recommendations && (
        <div className="space-y-6 animate-in fade-in-50 duration-500">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Wand2 className="h-6 w-6 text-accent" />
              <CardTitle className="font-headline">Recommended Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{state.recommendations.tools}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <BookOpen className="h-6 w-6 text-accent" />
              <CardTitle className="font-headline">Learning Paths</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{state.recommendations.learningPaths}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
