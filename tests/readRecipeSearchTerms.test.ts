import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import assert from "node:assert/strict";
import { readRecipeSearchTerms } from "../src/utils/readRecipeSearchTerms.js";

test("readRecipeSearchTerms returns trimmed non-empty recipe search terms", async () => {
  const temporaryDirectory = await mkdtemp(join(tmpdir(), "recipe-terms-"));
  const filePath = join(temporaryDirectory, "recipes.txt");

  try {
    await writeFile(
      filePath,
      "\n  Arrabiata  \n\nChicken\n   \n  Beef Wellington\t\n",
      "utf8",
    );

    const recipeSearchTerms = await readRecipeSearchTerms(filePath);

    assert.deepEqual(recipeSearchTerms, [
      "Arrabiata",
      "Chicken",
      "Beef Wellington",
    ]);
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
});
