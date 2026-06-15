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

    console.log(`- ${recipeSearchTerm}: ${meals.length} meal(s) found`);
  }
} catch (error) {
  const message = error instanceof Error ? error.message : "Unknown error";

  console.error("Recipe search failed.");
  console.error(message);
  process.exit(1);
}
