# Architecture

The project is intentionally small and organized around a CLI import workflow.

## Intended Folder Structure

```text
src/
  application/
  domain/
  infrastructure/
  utils/
  index.ts
```

## Responsibilities

## `src/application`

Coordinates use cases such as reading input terms, importing recipes, and recording results. It should depend on interfaces or simple functions rather than concrete infrastructure details where useful.

## `src/domain`

Contains the core recipe and ingredient concepts. This layer should hold normalization rules and domain types when the importer is implemented.

## `src/infrastructure`

Contains external system access, including TheMealDB requests and Prisma persistence. API and database code should stay here so the rest of the project remains easier to reason about.

## `src/utils`

Contains small shared helpers, such as text normalization or input parsing helpers, when those helpers are not domain-specific enough to belong elsewhere.

## `src/index.ts`

CLI entry point. It should stay thin and delegate real work to application-level code once the importer is implemented.

## Current Status

The folder structure exists, but importer logic has not been implemented yet. The current entry point only prints a readiness message.
