// The directive tells the Next.js runtime that this code should only be executed on the server side.
'use server';

/**
 * @fileOverview Generates a recipe based on a list of ingredients provided by the user.
 *
 * - generateRecipe - A function that generates a recipe based on the ingredients provided.
 * - GenerateRecipeInput - The input type for the generateRecipe function.
 * - GenerateRecipeOutput - The return type for the generateRecipe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipeInputSchema = z.object({
  ingredients: z.string().describe('A comma separated list of ingredients the user has available.'),
  dietaryRestrictions: z.string().optional().describe('Any dietary restrictions the user has, such as vegetarian, vegan, gluten-free, keto, etc.'),
  cookingVibe: z.string().optional().describe('A description of the desired cooking vibe, such as \"fancy dinner\" or \"quick lunch\".'),
});

export type GenerateRecipeInput = z.infer<typeof GenerateRecipeInputSchema>;

const GenerateRecipeOutputSchema = z.object({
  recipeName: z.string().describe('The name of the recipe.'),
  ingredients: z.string().describe('A list of ingredients needed for the recipe, with quantities.'),
  instructions: z.string().describe('Step-by-step instructions for preparing the recipe.'),
  nutritionInfo: z.string().describe('Nutritional information for the recipe, including calories, fat, protein, and carbohydrates.'),
  swapTips: z.string().describe('Tips for ingredient substitutions or variations on the recipe.'),
});

export type GenerateRecipeOutput = z.infer<typeof GenerateRecipeOutputSchema>;

export async function generateRecipe(input: GenerateRecipeInput): Promise<GenerateRecipeOutput> {
  return generateRecipeFlow(input);
}

const generateRecipePrompt = ai.definePrompt({
  name: 'generateRecipePrompt',
  input: {schema: GenerateRecipeInputSchema},
  output: {schema: GenerateRecipeOutputSchema},
  prompt: `You are a world-class chef, skilled at creating delicious recipes using a variety of ingredients and dietary constraints.

  Based on the ingredients provided, generate a complete recipe, including the recipe name, a list of ingredients with quantities, step-by-step instructions, nutritional information, and tips for ingredient substitutions.

  Ingredients: {{{ingredients}}}

  {{#if dietaryRestrictions}}
  Dietary Restrictions: {{{dietaryRestrictions}}}
  {{/if}}

  {{#if cookingVibe}}
  Cooking Vibe: {{{cookingVibe}}}
  {{/if}}
  `,
});

const generateRecipeFlow = ai.defineFlow(
  {
    name: 'generateRecipeFlow',
    inputSchema: GenerateRecipeInputSchema,
    outputSchema: GenerateRecipeOutputSchema,
  },
  async input => {
    const {output} = await generateRecipePrompt(input);
    return output!;
  }
);
