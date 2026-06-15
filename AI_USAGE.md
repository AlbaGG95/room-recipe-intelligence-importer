# AI Usage

AI is used in this project as a development assistant, not as the owner of product or engineering decisions.

## Intended Use

AI may help with:

- planning implementation steps;
- drafting documentation;
- reviewing structure and scope;
- suggesting validation commands;
- identifying risks or missing checks.

## Help Provided So Far

AI has helped prepare the development environment, validate Prisma and TypeScript setup, create the initial folder structure, and draft the documentation base.

## Human-Owned Decisions

The following decisions remain human-owned:

- final data model choices;
- importer behavior;
- API error handling strategy;
- normalization rules;
- whether to introduce AI-generated summaries;
- what should be included in the final challenge submission.

## Validation Of AI Suggestions

Generated suggestions should be validated with project commands before they are accepted:

```bash
npx.cmd prisma validate
npm.cmd run check
npm.cmd run dev
```

Implementation changes should also be reviewed manually for scope, readability, and maintainability.

## Importer Implementation Review

Importer implementation decisions must be reviewed manually before they are considered final. This is especially important for API mapping, ingredient normalization, persistence behavior, and import logs.
