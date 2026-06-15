import { readRecipeSearchTerms } from "./utils/readRecipeSearchTerms.js";

const inputFilePath = process.argv[2] ?? "recipes.txt";

try {
  const recipeSearchTerms = await readRecipeSearchTerms(inputFilePath);

  console.log(
    `Loaded ${recipeSearchTerms.length} recipe search term(s) from ${inputFilePath}:`,
  );

  for (const recipeSearchTerm of recipeSearchTerms) {
    console.log(`- ${recipeSearchTerm}`);
  }
} catch (error) {
  const message = error instanceof Error ? error.message : "Unknown error";

  console.error(`Failed to read recipe search terms from ${inputFilePath}.`);
  console.error(message);
  process.exit(1);
}
