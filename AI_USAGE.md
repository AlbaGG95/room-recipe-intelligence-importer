# AI Usage

AI was used as a development assistant during this technical challenge. It helped structure the work, draft documentation, review implementation scope, and suggest validation steps.

## AI-Supported Tasks

AI supported:

- planning the implementation in small increments;
- drafting and refining documentation;
- reviewing TypeScript, Prisma, and CLI scope;
- identifying validation commands;
- checking that the implementation stayed within the challenge constraints.

## Representative Prompts

Representative prompts included requests to:

- analyze the challenge requirements and define a narrow implementation scope;
- prepare documentation and a simple project structure;
- implement reading recipe search terms from a text file;
- implement a TheMealDB client using native `fetch`;
- transform raw meal records into normalized recipe objects;
- add Prisma persistence with idempotent imports by `externalId`;
- review validation output and decide whether the next step was safe to continue.

These prompts were used to support planning, drafting, implementation proposals, and review. Final decisions and validation remained human-owned.

## Human-Owned Decisions

The following decisions remained human-owned:

- final project scope;
- data model acceptance;
- use of SQLite and Prisma;
- importer behavior;
- error handling expectations;
- what to include in the final submission.

## Review And Validation

AI-generated suggestions were reviewed manually before being accepted. Changes were validated with:

```bash
npx.cmd prisma validate
npm.cmd run check
npm.cmd run dev
```

The importer was also run more than once to confirm idempotent persistence and avoid duplicate recipe errors.

## What Was Not Delegated To AI

AI did not make final product decisions, approve schema changes independently, or decide challenge scope. Real LLM calls, embeddings, frontend work, and tests were not added because they were outside the current challenge scope.

## Reflection

AI was useful as a reasoning and review assistant, especially for keeping the work incremental and checking edge cases. The final responsibility for correctness, scope control, and validation remains with the developer.
