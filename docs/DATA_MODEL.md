# Data Model

The Prisma schema is designed to store recipes in a way that is useful for future ingredient matching and AI-assisted recommendations.

## Recipe

`Recipe` stores the main recipe record returned from TheMealDB.

Key fields include:

* `externalId`: stable source identifier from TheMealDB.
* `name`, `category`, and `area`: searchable recipe metadata.
* `instructions`: preparation text.
* `thumbnailUrl`, `youtubeUrl`, and `sourceUrl`: optional source links.
* `tags`: structured source tags when available.
* `llmSummary`: reserved field for future AI-generated summaries.
* `rawPayload`: the original API payload for traceability.

## RecipeIngredient

`RecipeIngredient` stores each ingredient as a separate record connected to one recipe.

Key fields include:

* `recipeId`: relation to the parent recipe.
* `name`: ingredient name as imported.
* `normalizedName`: simplified name used for matching.
* `measure`: original quantity or measure text.
* `position`: original ingredient order in the recipe.

## ImportLog

`ImportLog` records the result of each import attempt.

Key fields include:

* `searchTerm`: recipe term read from the input file.
* `status`: import result.
* `recipesFound`: number of matching recipes found.
* `errorMessage`: optional failure detail.
* `createdAt`: timestamp for traceability.

## Why Ingredients Are Normalized

Ingredients are stored separately because they are the main bridge between recipes and a future product catalog. This makes it easier to search, deduplicate, compare, and match ingredients across many recipes.

## Why `rawPayload` Exists

`rawPayload` keeps the original TheMealDB response. This helps with debugging, auditing transformation decisions, and improving the importer without losing source context.

## Why `llmSummary` Exists

`llmSummary` is reserved for future AI-generated recipe summaries. It is not populated yet, but it marks where an AI-ready enrichment could be stored once manually reviewed and validated.

## Why Import Logs Exist

Import logs make CLI runs traceable. They help identify which search terms succeeded, which failed, and how many recipes were found for each term.
