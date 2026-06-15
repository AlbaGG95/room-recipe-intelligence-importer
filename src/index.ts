import { transformMeal } from "./application/transformMeal.js";
import { searchMealsByName } from "./infrastructure/mealDbClient.js";
import { readRecipeSearchTerms } from "./utils/readRecipeSearchTerms.js";

const inputFilePath = process.argv[2] ?? "recipes.txt";

try {
  const recipeSearchTerms = await readRecipeSearchTerms(inputFilePath);

  console.log(
    `Loaded ${recipeSearchTerms.length} recipe search term(s) from ${inputFilePath}.`,
  );
  console.log("");
  console.log("Searching TheMealDB:");

  for (const recipeSearchTerm of recipeSearchTerms) {
    const meals = await searchMealsByName(recipeSearchTerm);
    const recipes = meals.map((meal) => transformMeal(meal));

    const firstRecipe = recipes[0];
    const firstRecipeSummary =
      firstRecipe === undefined
        ? ""
        : ` First: ${firstRecipe.name} (${firstRecipe.ingredients.length} ingredient(s))`;

    console.log(
      `- ${recipeSearchTerm}: ${meals.length} meal(s) found, ${recipes.length} recipe(s) transformed.${firstRecipeSummary}`,
    );
  }
} catch (error) {
  const message = error instanceof Error ? error.message : "Unknown error";

  console.error("Recipe search failed.");
  console.error(message);
  process.exit(1);
}
