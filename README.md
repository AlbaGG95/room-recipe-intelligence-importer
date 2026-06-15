# Room Recipe Intelligence Importer

TypeScript CLI project for a Room 714 junior developer technical challenge.

The importer reads recipe search terms from a text file, fetches matching meals from TheMealDB, transforms them into normalized recipe objects, and stores recipes, ingredients, and import logs in SQLite using Prisma.

## Challenge Context

The project focuses on the backend data preparation step for a future recipe-to-cart recommendation experience. It demonstrates file input handling, external API integration, transformation logic, ingredient normalization, idempotent persistence, and traceable imports.

## What The Importer Does

1. Reads recipe search terms from `recipes.txt`.
2. Calls TheMealDB for each search term.
3. Handles searches with no results.
4. Transforms raw meal records into internal recipe objects.
5. Extracts and normalizes ingredients.
6. Stores recipes and ingredients in SQLite.
7. Updates existing recipes by `externalId` and replaces their ingredients.
8. Creates import logs with `IMPORTED`, `NOT_FOUND`, or `FAILED`.

## Tech Stack

- Node.js
- TypeScript with strict mode
- tsx
- Prisma
- SQLite
- TheMealDB public API

## Installation

```bash
npm install
```

## Environment Setup

Copy the example environment file and keep the local SQLite URL:

```bash
cp .env.example .env
```

Expected value:

```text
DATABASE_URL="file:./dev.db"
```

## Prisma Setup

Validate the schema, generate Prisma Client, and apply migrations:

```bash
npx.cmd prisma validate
npx.cmd prisma generate
npx.cmd prisma migrate dev
```

On shells where `.cmd` is not needed, use the equivalent `npx` commands.

The local SQLite database file is ignored by Git and can be recreated from the committed Prisma migrations.

## Running The Importer

Recipe search terms are read from `recipes.txt`, one term per line. Empty lines are ignored.

```bash
npm.cmd run dev
```

Expected output shape:

```text
Loaded 10 recipe search term(s) from recipes.txt.

Importing recipes:
- Arrabiata: 1 recipe(s) imported
- Chicken: 25 recipe(s) imported
- xyzrecipethatdoesntexist: no recipes found

Import completed.
Search terms processed: 10
Recipes imported: 51
Search terms without results: 1
Failed search terms: 0
```

## Data Model Summary

- `Recipe`: main normalized recipe record, keyed by TheMealDB `externalId`.
- `RecipeIngredient`: normalized ingredient rows connected to a recipe.
- `ImportLog`: trace of each processed search term and its result.

## Implementation Highlights

- Idempotent recipe persistence using `externalId`.
- Ingredients are deleted and recreated when a recipe is re-imported.
- Each search term is processed independently.
- Failed search terms are logged and do not stop the full import.
- `llmSummary` is deterministic text generated locally; no real LLM call is made.
- Raw TheMealDB payloads are preserved for traceability.

## Known Limitations

- No automated tests are included yet.
- TheMealDB calls are made sequentially.
- Ingredient normalization is basic text cleanup.
- There is no product catalog matching yet.
- There is no frontend or recommendation API.

## Future Improvements

- Add unit and integration tests.
- Improve ingredient canonicalization.
- Match normalized ingredients against a product catalog.
- Add a recommendation API.
- Explore embeddings or vector search for recipe discovery.
- Add Docker and CI validation.
- Add retry and rate-limit handling for TheMealDB.
