# Decisions

## Use TypeScript

TypeScript provides type safety and clear contracts for API transformation and database persistence while keeping the project approachable for a junior challenge.

## Use SQLite

SQLite is simple to run locally, requires no external database service, and is enough for a CLI importer challenge.

## Use Prisma

Prisma gives a clear schema, generated client, and repeatable migrations. This keeps database access explicit and easy to validate.

## Normalize Ingredients

Ingredients are stored in their own table because future product matching depends on comparing ingredients across recipes. A single recipe JSON blob would make that harder.

## Keep Import Logs

Import logs provide traceability for each search term and make failed imports easier to inspect.

## Store Raw Payload

The raw API payload is stored so transformation decisions can be audited later. This is useful while the importer logic is still evolving.

## Do Not Add A Frontend

The challenge is focused on the CLI import and persistence workflow. A frontend would increase scope without proving the core data preparation goal.

## Do Not Add Real LLM Calls In This Challenge

The data model is AI-ready, but real LLM calls are intentionally out of scope. This avoids extra credentials, cost, latency, and validation concerns in a small technical challenge.
