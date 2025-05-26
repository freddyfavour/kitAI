"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateRecipe, type GenerateRecipeInput, type GenerateRecipeOutput } from "@/ai/flows/generate-recipe";
import { RecipeDisplay } from "@/components/RecipeDisplay";
import { ChefHat, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const recipeFormSchema = z.object({
  ingredients: z.string().min(3, { message: "Please list at least some ingredients or a dish idea." }),
  dietaryRestrictions: z.string().optional(),
  cookingVibe: z.string().optional(),
});

type RecipeFormValues = z.infer<typeof recipeFormSchema>;

export default function HomePage() {
  const [recipe, setRecipe] = useState<GenerateRecipeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
  });

  const onSubmit: SubmitHandler<RecipeFormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    // Keep previous recipe visible while loading new one for better UX, or setRecipe(null) to clear
    // setRecipe(null); 

    try {
      const result = await generateRecipe(data as GenerateRecipeInput);
      setRecipe(result);
      toast({
        title: "Recipe Generated!",
        description: `Enjoy your "${result.recipeName}".`,
      });
      // Optionally reset form fields, or leave them for easy modification
      // reset(); 
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(`Failed to generate recipe: ${errorMessage}`);
      setRecipe(null); // Clear recipe on error
      toast({
        variant: "destructive",
        title: "Error Generating Recipe",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 selection:bg-accent/50 selection:text-accent-foreground">
      <header className="mb-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <ChefHat size={48} className="text-primary" />
          <h1 className="text-5xl font-bold text-primary">Kit</h1>
        </div>
        <p className="text-xl text-foreground/80">Your AI Kitchen Assistant</p>
      </header>

      <main className="w-full max-w-2xl space-y-8">
        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Let's Cook Something Smart!</CardTitle>
            <CardDescription>
              Tell Kit what ingredients you have, your dietary goals, or a cooking vibe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="ingredients" className="text-md font-medium">
                  Ingredients / Dish Idea <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="ingredients"
                  {...register("ingredients")}
                  placeholder="e.g., chicken breast, broccoli, soy sauce OR a quick vegan pasta"
                  className={`mt-1 ${errors.ingredients ? 'border-destructive ring-destructive focus-visible:ring-destructive' : ''}`}
                  rows={3}
                />
                {errors.ingredients && (
                  <p className="text-sm text-destructive mt-1">{errors.ingredients.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="dietaryRestrictions" className="text-md font-medium">
                  Dietary Preferences (optional)
                </Label>
                <Input
                  id="dietaryRestrictions"
                  {...register("dietaryRestrictions")}
                  placeholder="e.g., keto, vegetarian, gluten-free"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="cookingVibe" className="text-md font-medium">
                  Cooking Vibe (optional)
                </Label>
                <Input
                  id="cookingVibe"
                  {...register("cookingVibe")}
                  placeholder="e.g., fancy dinner, quick lunch, comfort food"
                  className="mt-1"
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full text-lg py-6 rounded-md">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Cook Something Smart"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="shadow-md rounded-xl">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {recipe && (
          <div className="mt-12">
            <RecipeDisplay recipe={recipe} />
          </div>
        )}
      </main>
      
      <footer className="mt-16 text-center text-foreground/60">
        <p>&copy; {new Date().getFullYear()} Kit AI. Cook deliciously.</p>
      </footer>
    </div>
  );
}
