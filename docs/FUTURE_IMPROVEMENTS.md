# Future Improvements

## Tests

Add unit tests for file parsing, transformation, ingredient normalization, and import summary behavior. Add integration tests for Prisma persistence.

## Better Ingredient Canonicalization

Improve normalization with synonym handling, plural handling, preparation note cleanup, and unit-aware parsing.

## Product Catalog Matching

Match normalized recipe ingredients against real catalog products to support cart suggestions.

## Recommendation API

Expose an API that can receive cart contents or recipe input and return compatible recipes or missing products.

## Embeddings Or Vector Search

Explore embeddings for semantic recipe search and ingredient similarity. This is not currently implemented.

## Docker

Add a Docker setup to make local execution more consistent across environments.

## CI

Add CI checks for Prisma validation, TypeScript validation, formatting, and tests once tests exist.

## TheMealDB Resilience

Add retry behavior, timeout handling, and rate-limit awareness around TheMealDB requests.

## Import Reporting

Add more detailed reporting for imported recipe IDs, failed search terms, skipped records, and timing information.
