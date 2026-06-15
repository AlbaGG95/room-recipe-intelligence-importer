# Room Recipe Intelligence Importer

TypeScript CLI project for a Room 714 junior developer technical challenge.

The importer is intended to read recipe search terms from a text file, fetch matching recipe data from TheMealDB, normalize the response into an AI-ready structure, and store the result in SQLite with Prisma.

## Challenge Context

This repository focuses on the backend data preparation step for a future recipe-to-cart recommendation experience. The goal is to show clear product thinking, maintainable TypeScript, data normalization, and traceable imports within a small technical challenge scope.

## Importer Goal

The planned CLI flow is:

1. Read recipe names from `recipes.txt`.
2. Query TheMealDB for each search term.
3. Transform raw API data into a normalized internal model.
4. Store recipes, ingredients, and import logs in SQLite.
5. Keep the stored data ready for future AI-assisted recommendations.

Importer business logic is not implemented yet. The current CLI only confirms that the project entry point is ready.

## Tech Stack

- Node.js
- TypeScript with strict mode
- tsx for local execution
- Prisma ORM
- SQLite

## Current Status

- Project configuration exists.
- Prisma schema exists and has an initial migration.
- Prisma Client can be generated.
- Source folders are prepared.
- Documentation base is being added.
- Importer logic, API calls, and data persistence workflows are still pending.

## Input File Format

Recipe search terms are expected in `recipes.txt`, one recipe per line.

Example:

```text
Arrabiata
Chicken
Beef Wellington
xyzrecipethatdoesntexist
```

Empty lines should be ignored when the importer is implemented.

## Development Commands

```bash
npm install
npx.cmd prisma validate
npx.cmd prisma generate
npx.cmd prisma migrate dev --name init
npm.cmd run check
npm.cmd run dev
```

On shells where `.cmd` is not required, the equivalent `npm` and `npx` commands can be used.

## Database Notes

SQLite is configured through `DATABASE_URL` in `.env`.

The local database file is ignored by Git. Prisma migrations should be committed so the schema can be recreated in a clean environment.

## Scope Note

This project does not include a frontend. The importer implementation, TheMealDB integration, and recommendation logic will be added only after the setup and documentation base are confirmed.
