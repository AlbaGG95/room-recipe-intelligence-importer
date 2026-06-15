# Room Recipe Intelligence Importer

TypeScript CLI project for a Room 714 junior developer technical challenge.

The importer reads recipe search terms from a text file, calls TheMealDB, transforms returned meals into normalized recipe objects, and stores recipes, ingredients, and import logs in SQLite using Prisma.

## Challenge Context

The challenge asks for a program that reads recipe names from a text file, calls TheMealDB, prepares the returned data for future AI or recommendation workflows, stores the transformed data in a database, and explains how AI was used during development.

## What The Importer Does

1. Reads recipe search terms from `recipes.txt`, one per line.
2. Calls TheMealDB for each search term.
3. Handles searches with no results.
4. Transforms raw meal records into normalized recipe objects.
5. Extracts and normalizes ingredients.
6. Stores recipes, ingredients, and import logs in SQLite.
7. Updates existing recipes by `externalId` and replaces their ingredients.
8. Creates import logs with `IMPORTED`, `NOT_FOUND`, or `FAILED`.

## Tech Stack

- Node.js
- TypeScript with strict mode
- tsx
- Prisma
- SQLite
- TheMealDB public API

## Requirements

- Node.js 18 or higher, because the project uses native `fetch`.
- npm

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

## External API

The importer uses TheMealDB public API with the free public API key `1`.

Endpoint used:

```text
https://www.themealdb.com/api/json/v1/1/search.php?s=<encodedSearchTerm>
```

This corresponds to the challenge requirement `/search.php?s=${nombre}`. Search terms are encoded with `encodeURIComponent` before the request is made.

## Running The Importer

Recipe search terms are read from `recipes.txt`. Empty lines are ignored.

```bash
npm.cmd run dev
```

On shells where `.cmd` is not needed, use the equivalent `npm` commands.

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

## Running Tests

```bash
npm.cmd test
```

Minimal unit tests cover input parsing, meal transformation, and TheMealDB client response handling with mocked `fetch`.

## AI-Ready Data Preparation

The project prepares recipe data for future AI or recommendation workflows by:

- storing normalized recipe records;
- extracting ingredients into separate rows;
- normalizing ingredient names;
- preserving the original `rawPayload`;
- storing import logs for traceability;
- generating a deterministic `llmSummary`.

No real LLM call is made in this challenge.

## Data Model Summary

- `Recipe`: main normalized recipe record, keyed by TheMealDB `externalId`.
- `RecipeIngredient`: normalized ingredient rows connected to a recipe.
- `ImportLog`: trace of each processed search term and its result.

## Implementation Highlights

- Idempotent recipe persistence using `externalId`.
- Ingredients are deleted and recreated when a recipe is re-imported.
- Each search term is processed independently.
- Failed search terms are logged and do not stop the full import.
- `llmSummary` is deterministic text generated locally.
- Raw TheMealDB payloads are preserved for traceability.

## Known Limitations

- Test coverage is intentionally minimal and focused on core parsing and transformation behavior.
- TheMealDB calls are made sequentially.
- Ingredient normalization is basic text cleanup.
- Product catalog matching is outside the current scope.
- Recommendation logic, embeddings, and real LLM calls are outside the current scope.

## Future Improvements

- Expand unit test coverage and add integration tests for Prisma persistence.
- Improve ingredient canonicalization.
- Match normalized ingredients against a product catalog.
- Add a recommendation API.
- Explore embeddings or vector search for recipe discovery.
- Add Docker and CI validation.
- Add retry and rate-limit handling for TheMealDB.
