import { test } from "node:test";
import assert from "node:assert/strict";
import { transformMeal } from "../src/application/transformMeal.js";
import type { MealDbRawMeal } from "../src/infrastructure/mealDbClient.js";

test("transformMeal converts a raw meal into a normalized recipe", () => {
  const rawMeal: MealDbRawMeal = {
    idMeal: "52772",
    strMeal: " Chicken Pasta ",
    strCategory: " Chicken ",
    strArea: " Italian ",
    strInstructions: "Cook everything together.",
    strMealThumb: "https://example.com/image.jpg",
    strYoutube: "https://example.com/video",
    strSource: "https://example.com/source",
    strTags: " Dinner, Easy , Pasta ",
    strIngredient1: " Chicken Breast ",
    strMeasure1: " 2 pieces ",
    strIngredient2: "Olive   Oil",
    strMeasure2: "1 tbsp",
    strIngredient3: "",
    strMeasure3: " ",
    strIngredient4: null,
    strMeasure4: null,
  };

  const recipe = transformMeal(rawMeal);

  assert.equal(recipe.externalId, "52772");
  assert.equal(recipe.name, "Chicken Pasta");
  assert.equal(recipe.category, "Chicken");
  assert.equal(recipe.area, "Italian");
  assert.deepEqual(recipe.tags, ["Dinner", "Easy", "Pasta"]);
  assert.equal(recipe.ingredients.length, 2);
  assert.deepEqual(recipe.ingredients[0], {
    name: "Chicken Breast",
    normalizedName: "chicken breast",
    measure: "2 pieces",
    position: 1,
  });
  assert.deepEqual(recipe.ingredients[1], {
    name: "Olive   Oil",
    normalizedName: "olive oil",
    measure: "1 tbsp",
    position: 2,
  });
  assert.strictEqual(recipe.rawPayload, rawMeal);
  assert.equal(
    recipe.llmSummary,
    "Chicken Pasta is a Chicken recipe from Italian with 2 ingredient(s): chicken breast, olive oil.",
  );
});
