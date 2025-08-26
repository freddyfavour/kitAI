
# Kit: AI Recipe Generator

## Overview

Kit is an intelligent kitchen assistant application designed to help users discover new recipes based on the ingredients they have on hand, their dietary preferences, and their desired cooking vibe. Leveraging the power of generative AI, Kit provides personalized recipe suggestions, complete with ingredients, step-by-step instructions, nutritional information, and even ingredient swap tips.

## Features
-   **AI-Powered Recipe Generation**: Enter your available ingredients, and Kit will generate a creative recipe for you.
-   **Dietary Customization**: Specify dietary restrictions (e.g., keto, vegetarian, gluten-free), and Kit will tailor recipes accordingly.
-   **Cooking Vibe Matching**: Tell Kit if you're looking for a "fancy dinner," "quick lunch," or "comfort food," and it will match the recipe style.
-   **Detailed Recipe Information**: Each recipe includes:
    -   Recipe Name
    -   List of Ingredients (with quantities)
    -   Step-by-step cooking instructions
    -   Estimated Nutritional Information
    -   Helpful Ingredient Swap Tips
-   **User-Friendly Interface**: Built with modern UI components for an intuitive and pleasant user experience.
-   **Responsive Design**: Access Kit on various devices, from desktops to mobile phones.

## Tech Stack

Kit is built with a modern, robust technology stack:

-   **Frontend**:
    -   **Next.js**: A React framework for building server-rendered and statically generated web applications.
    -   **React**: A JavaScript library for building user interfaces.
    -   **TypeScript**: For static typing and improved code quality.
    -   **ShadCN UI**: A collection of beautifully designed, accessible UI components.
    -   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
-   **Backend/AI**:
    -   **Genkit (by Google)**: An open-source framework for building AI-powered applications, used here to interact with Large Language Models (LLMs) for recipe generation.
    -   **Google AI Models**: Utilizes Google's generative AI models (e.g., Gemini) via Genkit.
-   **Development & Tooling**:
    -   **Node.js & npm**: JavaScript runtime and package manager.
    -   **Zod**: For schema declaration and validation.
    -   **React Hook Form**: For managing form state and validation.

## Getting Started

### Prerequisites

-   Node.js (version 18.x or higher recommended)
-   npm (usually comes with Node.js)
-   A Google AI API Key (for Genkit to access generative models). You'll need to set this up in your environment. Create a `.env` file in the root of the project and add your API key:
    ```
    GOOGLE_API_KEY=YOUR_API_KEY_HERE
    ```

### Installation

1.  **Clone the repository (if applicable) or ensure you have the project files.**
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Application

Kit requires two processes to run concurrently: the Next.js development server for the frontend and the Genkit development server for the AI flows.

1.  **Start the Genkit development server:**
    Open a terminal and run:
    ```bash
    npm run genkit:dev
    ```
    This will start the Genkit server, typically on `http://localhost:3400/`. You can monitor AI flow invocations and inspect their details here.

2.  **Start the Next.js development server:**
    Open another terminal and run:
    ```bash
    npm run dev
    ```
    This will start the Next.js application, usually on `http://localhost:9002/` (as configured in `package.json`).

3.  **Open your browser:**
    Navigate to `http://localhost:9002/` to use the Kit AI Recipe Generator.

## Project Structure

-   `src/app/`: Contains the Next.js pages and layout components.
    -   `page.tsx`: The main homepage of the application.
    -   `layout.tsx`: The root layout for the application.
    -   `globals.css`: Global styles and Tailwind CSS theme configuration.
-   `src/components/`: Reusable React components.
    -   `ui/`: ShadCN UI components.
    -   `RecipeDisplay.tsx`: Component for displaying the generated recipe.
-   `src/ai/`: Contains all AI-related code using Genkit.
    -   `genkit.ts`: Genkit initialization and configuration.
    -   `flows/`: Directory for Genkit flows.
        -   `generate-recipe.ts`: The core flow for generating recipes.
        -   `dietary-recipe.ts`: (If used) Flow for recipes with specific dietary needs.
        -   `recipe-refinement.ts`: (If used) Flow for refining existing recipes.
    -   `dev.ts`: Entry point for the Genkit development server.
-   `src/hooks/`: Custom React hooks (e.g., `useToast.ts`, `use-mobile.ts`).
-   `src/lib/`: Utility functions (e.g., `utils.ts` for `cn`).
-   `public/`: Static assets.
-   `package.json`: Lists project dependencies and scripts.
-   `tailwind.config.ts`: Tailwind CSS configuration.
-   `next.config.ts`: Next.js configuration.
-   `tsconfig.json`: TypeScript configuration.

## How It Works

1.  The user enters available ingredients, optional dietary restrictions, and a cooking vibe into the form on the homepage (`src/app/page.tsx`).
2.  On submission, the `generateRecipe` client-side function calls the server-side Genkit flow defined in `src/ai/flows/generate-recipe.ts`.
3.  The `generateRecipeFlow` uses a prompt (defined with `ai.definePrompt`) to instruct the AI model (e.g., Gemini) to generate a recipe based on the user's input.
4.  The AI model processes the request and returns a structured JSON object containing the recipe name, ingredients, instructions, nutrition info, and swap tips, as defined by the `GenerateRecipeOutputSchema`.
5.  The result is sent back to the frontend, where it's displayed using the `RecipeDisplay.tsx` component.
6.  Toast notifications provide feedback to the user on success or failure.

## Contributing

Contributions are welcome! If you have ideas for improvements or find any bugs, please feel free to open an issue or submit a pull request.

---

Happy Cooking with Kit!
