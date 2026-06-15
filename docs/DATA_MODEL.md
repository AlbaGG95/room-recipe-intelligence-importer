# Data Model

The Prisma schema stores imported recipe data, normalized ingredients, and import trace logs.

## Recipe

`Recipe` stores the main normalized recipe record from TheMealDB.

Important fields:

- `externalId`: TheMealDB recipe identifier, unique and used for idempotent upserts.
- `name`, `category`, `area`: recipe metadata.
- `instructions`: preparation text.
- `thumbnailUrl`, `youtubeUrl`, `sourceUrl`: optional source links.
- `tags`: parsed TheMealDB tags.
- `llmSummary`: deterministic local summary text; no real LLM call is made.
- `rawPayload`: original TheMealDB meal record for traceability.

## RecipeIngredient

`RecipeIngredient` stores each ingredient as a separate row connected to a recipe.

Important fields:

- `recipeId`: parent recipe relation.
- `name`: imported ingredient name.
- `normalizedName`: trimmed, lowercased, space-normalized ingredient name.
- `measure`: imported measure text.
- `position`: original ingredient position from TheMealDB.

Ingredients are normalized into their own records because future product catalog matching depends on comparing ingredients across recipes.

## ImportLog

`ImportLog` records the result of each processed search term.

Statuses:

- `IMPORTED`: one or more recipes were imported.
- `NOT_FOUND`: TheMealDB returned no meals.
- `FAILED`: the search term failed but the importer continued.

Import logs provide traceability for successful imports, missing results, and per-search failures.
