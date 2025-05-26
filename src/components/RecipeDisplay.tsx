"use client";

import type { GenerateRecipeOutput } from "@/ai/flows/generate-recipe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Lightbulb, ListChecks, ChefHat, Apple, Info } from "lucide-react";
import * as React from "react"; // Import React

interface RecipeDisplayProps {
  recipe: GenerateRecipeOutput;
}

// Helper function to process a single line for bold markdown
const formatLineWithBold = (line: string, keyPrefix: string): React.ReactNode[] => {
  const parts = line.split('**');
  const elements: React.ReactNode[] = [];
  parts.forEach((part, index) => {
    if (index % 2 === 1 && part.length > 0) { // Text between **
      elements.push(<strong key={`${keyPrefix}-strong-${index}`}>{part}</strong>);
    } else {
      elements.push(part);
    }
  });
  return elements;
};

// Main function to render text with newlines and bold markdown
const renderFormattedText = (text: string, sectionKey: string): React.ReactNode => {
  if (!text) return null;

  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, lineIndex) => {
        const trimmedLine = line.trim();
        
        if (trimmedLine.length > 0) {
          return (
            <React.Fragment key={`${sectionKey}-line-${lineIndex}`}>
              {formatLineWithBold(trimmedLine, `${sectionKey}-line-${lineIndex}`)}
              {lineIndex < lines.length - 1 && <br />} 
            </React.Fragment>
          );
        } else if (line.length === 0 && lineIndex < lines.length - 1) { 
          // This preserves completely empty lines by rendering a <br />
          return <br key={`${sectionKey}-line-${lineIndex}-br`} />;
        }
        // Lines that were whitespace-only (and not empty) and are now empty after trim, 
        // or the last empty/whitespace line, will render nothing.
        return null;
      })}
    </>
  );
};

export function RecipeDisplay({ recipe }: RecipeDisplayProps) {
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
          <div className="text-foreground/90">
            {renderFormattedText(recipe.ingredients, 'ingredients')}
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-primary">
            <ListChecks size={20} />
            Instructions
          </h3>
          <div className="text-foreground/90">
            {renderFormattedText(recipe.instructions, 'instructions')}
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-primary">
            <Info size={20} />
            Nutrition Info
          </h3>
          <div className="text-foreground/90">
            {renderFormattedText(recipe.nutritionInfo, 'nutritionInfo')}
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-primary">
            <Lightbulb size={20} />
            Swap Tips
          </h3>
          <div className="text-foreground/90">
            {renderFormattedText(recipe.swapTips, 'swapTips')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
