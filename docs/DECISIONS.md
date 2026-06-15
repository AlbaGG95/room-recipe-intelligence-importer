# Decisions

## Use TypeScript

TypeScript gives clear types for API responses, normalized recipes, and persistence inputs while keeping the project suitable for a junior technical challenge.

## Use SQLite

SQLite keeps the project easy to run locally without requiring an external database service.

## Use Prisma

Prisma provides a readable schema, generated client, migrations, and straightforward SQLite persistence.

## Build A CLI Instead Of A Frontend

The challenge focuses on backend import and data preparation. A frontend would add scope without improving the core importer evaluation.

## Normalize Ingredients

Ingredients are stored in their own table so they can later be searched, compared, deduplicated, and matched against catalog products.

## Upsert Recipes By `externalId`

TheMealDB recipe IDs are used as stable external identifiers. Upserting by `externalId` makes repeated imports idempotent and avoids duplicate recipe records.

## Replace Ingredients On Re-Import

Ingredients are deleted and recreated for an existing recipe during re-import. This keeps the stored ingredient list aligned with the latest transformed recipe data.

## Keep Import Logs

Each search term creates an import log with `IMPORTED`, `NOT_FOUND`, or `FAILED`. This makes CLI runs auditable and easier to debug.

## Use A Deterministic `llmSummary`

The project stores a simple deterministic summary string instead of making real LLM calls. This keeps the data model AI-ready without adding credentials, cost, latency, or review complexity.

## Continue After Per-Search Failures

A failure for one search term is logged as `FAILED` and does not stop the full import. This makes the importer more useful for batch input files.
