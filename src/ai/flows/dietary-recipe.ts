// src/ai/flows/dietary-recipe.ts
'use server';

/**
 * @fileOverview AI agent that generates recipes based on dietary restrictions.
 *
 * - generateDietaryRecipe - A function that generates a recipe based on dietary restrictions and available ingredients.
 * - DietaryRecipeInput - The input type for the generateDietaryRecipe function.
 * - DietaryRecipeOutput - The return type for the generateDietaryRecipe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DietaryRecipeInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients available to the user.'),
  dietaryRestrictions: z
    .string()
    .describe(
      'The dietary restrictions or preferences specified by the user (e.g., keto, vegetarian, gluten-free).'
    ),
});
export type DietaryRecipeInput = z.infer<typeof DietaryRecipeInputSchema>;

const DietaryRecipeOutputSchema = z.object({
  recipeName: z.string().describe('The name of the generated recipe.'),
  ingredients: z.string().describe('A list of ingredients required for the recipe.'),
  instructions: z.string().describe('Step-by-step instructions for preparing the recipe.'),
  nutritionInfo: z.string().describe('Nutritional information for the recipe.'),
  swapTips: z.string().describe('Tips for ingredient substitutions or variations.'),
});
export type DietaryRecipeOutput = z.infer<typeof DietaryRecipeOutputSchema>;

export async function generateDietaryRecipe(
  input: DietaryRecipeInput
): Promise<DietaryRecipeOutput> {
  return generateDietaryRecipeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dietaryRecipePrompt',
  input: {schema: DietaryRecipeInputSchema},
  output: {schema: DietaryRecipeOutputSchema},
  prompt: `You are a personal chef who specializes in creating recipes based on dietary restrictions and available ingredients.

  Given the following ingredients and dietary restrictions, generate a complete recipe, including:
  - Recipe Name
  - Ingredients
  - Instructions
  - Nutrition Information
  - Ingredient Swap Tips

  Ingredients: {{{ingredients}}}
  Dietary Restrictions: {{{dietaryRestrictions}}}
  Remember to incorporate the dietary restrictions into the generated recipe.
  `,
});

const generateDietaryRecipeFlow = ai.defineFlow(
  {
    name: 'generateDietaryRecipeFlow',
    inputSchema: DietaryRecipeInputSchema,
    outputSchema: DietaryRecipeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
