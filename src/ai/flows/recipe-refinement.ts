'use server';
/**
 * @fileOverview Refines a recipe with ingredient swap tips and nutritional information using AI.
 *
 * - refineRecipe - A function that refines a given recipe with AI suggestions.
 * - RefineRecipeInput - The input type for the refineRecipe function.
 * - RefineRecipeOutput - The return type for the refineRecipe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineRecipeInputSchema = z.object({
  recipe: z
    .string()
    .describe("The recipe to refine, including ingredients and instructions."),
  ingredients: z.string().describe('The ingredients available to the user.'),
  dietaryPreferences: z
    .string()
    .optional()
    .describe('The dietary preferences of the user, e.g., keto, vegetarian.'),
});
export type RefineRecipeInput = z.infer<typeof RefineRecipeInputSchema>;

const RefineRecipeOutputSchema = z.object({
  refinedRecipe: z.string().describe('The refined recipe with AI suggestions.'),
  ingredientSwapTips: z
    .string()
    .describe('Tips for swapping ingredients in the recipe.'),
  nutritionalInformation: z
    .string()
    .describe('Nutritional information for the refined recipe.'),
});
export type RefineRecipeOutput = z.infer<typeof RefineRecipeOutputSchema>;

export async function refineRecipe(input: RefineRecipeInput): Promise<RefineRecipeOutput> {
  return refineRecipeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'refineRecipePrompt',
  input: {schema: RefineRecipeInputSchema},
  output: {schema: RefineRecipeOutputSchema},
  prompt: `You are an AI recipe assistant. Given the following recipe and user preferences, refine the recipe by providing ingredient swap tips and nutritional information.

Recipe:
{{{recipe}}}

Ingredients:
{{{ingredients}}}

Dietary Preferences:
{{#if dietaryPreferences}}{{{dietaryPreferences}}}{{else}}None{{/if}}

Refined Recipe:
{{refinedRecipe}}

Ingredient Swap Tips:
{{ingredientSwapTips}}

Nutritional Information:
{{nutritionalInformation}}`,
});

const refineRecipeFlow = ai.defineFlow(
  {
    name: 'refineRecipeFlow',
    inputSchema: RefineRecipeInputSchema,
    outputSchema: RefineRecipeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
