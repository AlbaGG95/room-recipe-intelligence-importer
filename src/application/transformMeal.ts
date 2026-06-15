import type { NormalizedRecipe, RecipeIngredient } from "../domain/recipe.js";
import type { MealDbRawMeal } from "../infrastructure/mealDbClient.js";

export function transformMeal(rawMeal: MealDbRawMeal): NormalizedRecipe {
  const externalId = getRequiredTextValue(rawMeal, "idMeal");
  const name = getTextValue(rawMeal, "strMeal") ?? "Unknown recipe";
  const category = getTextValue(rawMeal, "strCategory");
  const area = getTextValue(rawMeal, "strArea");
  const ingredients = extractIngredients(rawMeal);

  const recipeData = {
    externalId,
    name,
    category,
    area,
    instructions: getTextValue(rawMeal, "strInstructions"),
    thumbnailUrl: getTextValue(rawMeal, "strMealThumb"),
    youtubeUrl: getTextValue(rawMeal, "strYoutube"),
    sourceUrl: getTextValue(rawMeal, "strSource"),
    tags: parseTags(getTextValue(rawMeal, "strTags")),
    rawPayload: rawMeal,
    ingredients,
  };

  return {
    ...recipeData,
    llmSummary: buildLlmSummary(recipeData),
  };
}

function extractIngredients(rawMeal: MealDbRawMeal): RecipeIngredient[] {
  const ingredients: RecipeIngredient[] = [];

  for (let position = 1; position <= 20; position += 1) {
    const name = getTextValue(rawMeal, `strIngredient${position}`);

    if (name === null) {
      continue;
    }

    ingredients.push({
      name,
      normalizedName: normalizeIngredientName(name),
      measure: getTextValue(rawMeal, `strMeasure${position}`),
      position,
    });
  }

  return ingredients;
}

function normalizeIngredientName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

function parseTags(tags: string | null): string[] {
  if (tags === null) {
    return [];
  }

  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
}

function buildLlmSummary(recipe: Omit<NormalizedRecipe, "llmSummary">): string {
  const category = recipe.category ?? "unknown category";
  const area = recipe.area ?? "unknown area";
  const ingredientNames = recipe.ingredients
    .map((ingredient) => ingredient.normalizedName)
    .join(", ");
  const ingredients =
    ingredientNames.length > 0 ? ingredientNames : "no ingredients";

  return `${recipe.name} is a ${category} recipe from ${area} with ${recipe.ingredients.length} ingredient(s): ${ingredients}.`;
}

function getTextValue(rawMeal: MealDbRawMeal, key: string): string | null {
  const value = rawMeal[key];

  if (typeof value !== "string") {
    return null;
  }

  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : null;
}

function getRequiredTextValue(rawMeal: MealDbRawMeal, key: string): string {
  const value = getTextValue(rawMeal, key);

  if (value === null) {
    throw new Error(`TheMealDB meal is missing required field "${key}"`);
  }

  return value;
}
