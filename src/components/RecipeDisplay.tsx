"use client";

import type { GenerateRecipeOutput } from "@/ai/flows/generate-recipe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Lightbulb, ListChecks, ChefHat, Apple, Info } from "lucide-react";

interface RecipeDisplayProps {
  recipe: GenerateRecipeOutput;
}

export function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  const formatText = (text: string) => {
    // Handles both \n and list-like items (- item, * item, 1. item)
    // by ensuring they are on new lines.
    // This is a simple approach; more complex markdown could be handled by a library.
    return text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n');
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl font-bold flex items-center gap-3">
          <ChefHat size={32} className="text-primary" />
          {recipe.recipeName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-primary">
            <Apple size={20} />
            Ingredients
          </h3>
          <p className="text-foreground/90 whitespace-pre-line">{formatText(recipe.ingredients)}</p>
        </div>
        <Separator />
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-primary">
            <ListChecks size={20} />
            Instructions
          </h3>
          <p className="text-foreground/90 whitespace-pre-line">{formatText(recipe.instructions)}</p>
        </div>
        <Separator />
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-primary">
            <Info size={20} />
            Nutrition Info
          </h3>
          <p className="text-foreground/90 whitespace-pre-line">{formatText(recipe.nutritionInfo)}</p>
        </div>
        <Separator />
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-primary">
            <Lightbulb size={20} />
            Swap Tips
          </h3>
          <p className="text-foreground/90 whitespace-pre-line">{formatText(recipe.swapTips)}</p>
        </div>
      </CardContent>
    </Card>
  );
}
