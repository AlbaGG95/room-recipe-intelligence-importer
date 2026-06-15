import { transformMeal } from "./transformMeal.js";
import { searchMealsByName } from "../infrastructure/mealDbClient.js";
import { createImportLog, saveRecipe } from "../infrastructure/recipeRepository.js";

export type ImportRecipeResult = {
  searchTerm: string;
  status: "IMPORTED" | "NOT_FOUND" | "FAILED";
  recipesImported: number;
  errorMessage: string | null;
};

export type ImportRecipesSummary = {
  searchTermsProcessed: number;
  recipesImported: number;
  searchTermsWithoutResults: number;
  failedSearchTerms: number;
  results: ImportRecipeResult[];
};

export async function importRecipes(
  recipeSearchTerms: string[],
): Promise<ImportRecipesSummary> {
  const summary: ImportRecipesSummary = {
    searchTermsProcessed: recipeSearchTerms.length,
    recipesImported: 0,
    searchTermsWithoutResults: 0,
    failedSearchTerms: 0,
    results: [],
  };

  for (const recipeSearchTerm of recipeSearchTerms) {
    try {
      const meals = await searchMealsByName(recipeSearchTerm);

      if (meals.length === 0) {
        await createImportLog({
          searchTerm: recipeSearchTerm,
          status: "NOT_FOUND",
          recipesFound: 0,
        });

        summary.searchTermsWithoutResults += 1;
        summary.results.push({
          searchTerm: recipeSearchTerm,
          status: "NOT_FOUND",
          recipesImported: 0,
          errorMessage: null,
        });
        continue;
      }

      const recipes = meals.map((meal) => transformMeal(meal));

      for (const recipe of recipes) {
        await saveRecipe(recipe);
      }

      await createImportLog({
        searchTerm: recipeSearchTerm,
        status: "IMPORTED",
        recipesFound: recipes.length,
      });

      summary.recipesImported += recipes.length;
      summary.results.push({
        searchTerm: recipeSearchTerm,
        status: "IMPORTED",
        recipesImported: recipes.length,
        errorMessage: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";

      await createImportLog({
        searchTerm: recipeSearchTerm,
        status: "FAILED",
        recipesFound: 0,
        errorMessage,
      });

      summary.failedSearchTerms += 1;
      summary.results.push({
        searchTerm: recipeSearchTerm,
        status: "FAILED",
        recipesImported: 0,
        errorMessage,
      });
    }
  }

  return summary;
}
