# Architecture

The project is a small TypeScript CLI organized around input reading, API access, transformation, and persistence.

## Structure

```text
src/
  index.ts
  application/
    importRecipes.ts
    transformMeal.ts
  domain/
    recipe.ts
  infrastructure/
    mealDbClient.ts
    prismaClient.ts
    recipeRepository.ts
  utils/
    readRecipeSearchTerms.ts
```

## Files

## `src/index.ts`

CLI entry point. It reads the input file path, loads recipe search terms, calls the importer, prints the final summary, and disconnects Prisma.

## `src/application/importRecipes.ts`

Coordinates the import flow for each search term. It calls TheMealDB, handles no-result and failed searches, transforms meals, persists recipes, writes import logs, and returns summary counts.

## `src/application/transformMeal.ts`

Converts a raw TheMealDB meal record into the internal normalized recipe object. It extracts ingredients, normalizes ingredient names, parses tags, preserves the raw payload, and builds a deterministic `llmSummary`.

## `src/domain/recipe.ts`

Defines the internal recipe and ingredient types used between transformation and persistence.

## `src/infrastructure/mealDbClient.ts`

Calls TheMealDB with native `fetch`, encodes search terms, handles non-OK HTTP responses, and returns raw meal records.

## `src/infrastructure/recipeRepository.ts`

Persists normalized recipes, ingredients, and import logs through Prisma. Recipe writes are idempotent by `externalId`, and ingredients are replaced when a recipe is re-imported.

## `src/infrastructure/prismaClient.ts`

Creates the shared Prisma Client instance used by the repository and disconnected by the CLI.

## `src/utils/readRecipeSearchTerms.ts`

Reads recipe search terms from a text file, trims whitespace, and ignores empty lines.

## Current Scope

The implemented project is a CLI importer with minimal unit tests for input parsing, meal transformation, and TheMealDB client behavior with mocked `fetch`.

It does not include a frontend, recommendation API, product catalog matching, real LLM calls, or embeddings.
