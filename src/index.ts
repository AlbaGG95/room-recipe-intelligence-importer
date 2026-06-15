import { importRecipes } from "./application/importRecipes.js";
import { prisma } from "./infrastructure/prismaClient.js";
import { readRecipeSearchTerms } from "./utils/readRecipeSearchTerms.js";

const inputFilePath = process.argv[2] ?? "recipes.txt";

try {
  const recipeSearchTerms = await readRecipeSearchTerms(inputFilePath);

  console.log(
    `Loaded ${recipeSearchTerms.length} recipe search term(s) from ${inputFilePath}.`,
  );
  console.log("");
  console.log("Importing recipes:");

  const summary = await importRecipes(recipeSearchTerms);

  for (const result of summary.results) {
    if (result.status === "IMPORTED") {
      console.log(
        `- ${result.searchTerm}: ${result.recipesImported} recipe(s) imported`,
      );
    } else if (result.status === "NOT_FOUND") {
      console.log(`- ${result.searchTerm}: no recipes found`);
    } else {
      console.log(`- ${result.searchTerm}: failed`);
    }
  }

  console.log("");
  console.log("Import completed.");
  console.log(`Search terms processed: ${summary.searchTermsProcessed}`);
  console.log(`Recipes imported: ${summary.recipesImported}`);
  console.log(
    `Search terms without results: ${summary.searchTermsWithoutResults}`,
  );
  console.log(`Failed search terms: ${summary.failedSearchTerms}`);
} catch (error) {
  const message = error instanceof Error ? error.message : "Unknown error";

  console.error("Recipe import failed.");
  console.error(message);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
