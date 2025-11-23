'use server';

/**
 * @fileOverview AI-powered tool and learning path recommendations for ethical hackers.
 *
 * - getRecommendations - A function that provides AI-driven recommendations.
 * - RecommendationsInput - The input type for the getRecommendations function.
 * - RecommendationsOutput - The return type for the getRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendationsInputSchema = z.object({
  skillLevel: z
    .string()
    .describe('The user\'s skill level (e.g., beginner, intermediate, advanced).'),
  interests: z
    .string()
    .describe('The user\'s interests in ethical hacking (e.g., web security, network security, cryptography).'),
});
export type RecommendationsInput = z.infer<typeof RecommendationsInputSchema>;

const RecommendationsOutputSchema = z.object({
  tools: z
    .string()
    .describe('A list of recommended ethical hacking tools based on the user\'s skill level and interests.'),
  learningPaths:
    z.string().describe('Recommended learning paths for the user to follow.'),
});
export type RecommendationsOutput = z.infer<typeof RecommendationsOutputSchema>;

export async function getRecommendations(
  input: RecommendationsInput
): Promise<RecommendationsOutput> {
  return recommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendationsPrompt',
  input: {schema: RecommendationsInputSchema},
  output: {schema: RecommendationsOutputSchema},
  prompt: `You are an AI assistant that provides recommendations for ethical hacking tools and learning paths.

  Based on the user's skill level and interests, suggest relevant tools and learning paths.

  Skill Level: {{{skillLevel}}}
  Interests: {{{interests}}}

  Tools:
  Learning Paths: `,
});

const recommendationsFlow = ai.defineFlow(
  {
    name: 'recommendationsFlow',
    inputSchema: RecommendationsInputSchema,
    outputSchema: RecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
