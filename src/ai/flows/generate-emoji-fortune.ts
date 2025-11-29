'use server';

/**
 * @fileOverview Generates a personalized, poetic fortune based on the selected emojis.
 *
 * - generateEmojiFortune - A function that generates the fortune.
 * - GenerateEmojiFortuneInput - The input type for the generateEmojiFortune function.
 * - GenerateEmojiFortuneOutput - The return type for the generateEmojiFortune function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEmojiFortuneInputSchema = z.object({
  emojis: z
    .array(z.string())
    .min(1)
    .max(3)
    .describe('An array of 1 to 3 emojis selected by the user.'),
});
export type GenerateEmojiFortuneInput = z.infer<typeof GenerateEmojiFortuneInputSchema>;

const GenerateEmojiFortuneOutputSchema = z.object({
  fortune: z.string().describe('The personalized, poetic fortune generated based on the emojis.'),
});
export type GenerateEmojiFortuneOutput = z.infer<typeof GenerateEmojiFortuneOutputSchema>;

export async function generateEmojiFortune(input: GenerateEmojiFortuneInput): Promise<GenerateEmojiFortuneOutput> {
  return generateEmojiFortuneFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEmojiFortunePrompt',
  input: {schema: GenerateEmojiFortuneInputSchema},
  output: {schema: GenerateEmojiFortuneOutputSchema},
  prompt: `You are a mystical fortune teller. Generate a personalized, poetic fortune based on the following emojis:

Emojis: {{#each emojis}}{{{this}}} {{/each}}

Fortune:`,
});

const generateEmojiFortuneFlow = ai.defineFlow(
  {
    name: 'generateEmojiFortuneFlow',
    inputSchema: GenerateEmojiFortuneInputSchema,
    outputSchema: GenerateEmojiFortuneOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
