# Agent Guidelines

## Project Goal

Build a small TypeScript CLI that imports recipe data from TheMealDB, normalizes it for future AI-assisted cart recommendations, and stores it in SQLite through Prisma.

## Coding Rules

- Use TypeScript strict mode.
- Use English names.
- Use camelCase for variables, functions, and methods.
- Keep the codebase small and readable.
- Prefer direct, explicit code over unnecessary abstractions.
- Do not add comments inside code.
- Keep the project suitable for a 2-3 hour junior technical challenge.

## AI Collaboration Rules

- AI can help with planning, documentation, validation, and implementation drafts.
- AI suggestions must be reviewed before they become project decisions.
- Do not let generated code expand the scope without a human decision.
- Do not call external APIs unless the current task explicitly allows it.
- Do not implement importer business logic before it is requested.

## Validation Rules

Run the relevant checks after changes:

```bash
npx.cmd prisma validate
npm.cmd run check
npm.cmd run dev
```

Use `npm` and `npx` without `.cmd` only when the shell supports them.

## Scope Control Rules

- Do not add frontend code.
- Do not add tests until requested.
- Do not change the Prisma schema unless there is a clear data model issue.
- Do not modify migrations unless the schema is invalid.
- Do not run `npm audit fix` or `npm audit fix --force`.
- Do not create git commits unless explicitly requested.
