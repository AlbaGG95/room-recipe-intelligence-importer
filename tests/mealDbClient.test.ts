import { test } from "node:test";
import assert from "node:assert/strict";
import { searchMealsByName } from "../src/infrastructure/mealDbClient.js";

test("searchMealsByName encodes the search term and returns an empty array for null meals", async () => {
  const originalFetch = globalThis.fetch;
  let requestedUrl = "";

  globalThis.fetch = async (input) => {
    requestedUrl = String(input);

    return new Response(JSON.stringify({ meals: null }), {
      status: 200,
      statusText: "OK",
      headers: {
        "content-type": "application/json",
      },
    });
  };

  try {
    const meals = await searchMealsByName("beef wellington");

    assert.equal(
      requestedUrl,
      "https://www.themealdb.com/api/json/v1/1/search.php?s=beef%20wellington",
    );
    assert.deepEqual(meals, []);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
