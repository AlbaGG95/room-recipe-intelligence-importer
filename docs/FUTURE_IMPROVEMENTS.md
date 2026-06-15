# Future Improvements

## Ingredient Matching Against A Real Product Catalog

Connect normalized ingredients to a product catalog so recipe ingredients can become cart suggestions.

## Semantic Ingredient Normalization

Improve normalization beyond basic text cleanup by handling synonyms, plural forms, preparation notes, and regional naming differences.

## Embeddings For Recipe Search

Use embeddings to support semantic recipe search, similar recipe discovery, and better ingredient-based recommendations.

## Recommendation API

Expose an API that receives recipe or ingredient input and returns ranked cart recommendations.

## Scheduled Imports

Add scheduled import jobs to refresh recipe data and keep the local database up to date.

## Tests

Add unit tests for parsing and normalization, plus integration tests for Prisma persistence and importer workflows.

## Docker

Provide a Docker setup so the CLI can run consistently across machines.

## CI Validation

Add continuous integration checks for TypeScript, Prisma validation, formatting, and tests once tests exist.
