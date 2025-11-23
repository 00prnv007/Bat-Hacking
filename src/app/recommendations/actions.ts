"use server";

import { getRecommendations } from "@/ai/flows/ai-tool-recommendations";
import { z } from "zod";

const recommendationSchema = z.object({
  skillLevel: z.string().min(1, "Skill level is required."),
  interests: z.string().min(1, "Interests are required."),
});

export type FormState = {
  message: string;
  recommendations?: {
    tools: string;
    learningPaths: string;
  };
  success: boolean;
};

export async function getRecommendationsAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = recommendationSchema.safeParse({
    skillLevel: formData.get("skillLevel"),
    interests: formData.get("interests"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid form data. Please fill out all fields.",
      success: false,
    };
  }
  
  try {
    const result = await getRecommendations(validatedFields.data);
    return {
      message: "Here are your recommendations!",
      recommendations: result,
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to get recommendations. The AI might be busy fighting crime. Please try again later.",
      success: false,
    };
  }
}
