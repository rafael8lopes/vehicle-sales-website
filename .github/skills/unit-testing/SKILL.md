---
name: unit-testing
description: Write and review unit and component tests for this React + TypeScript project using Vitest and React Testing Library.
---

# Unit Testing Skill

Use this skill when the user asks to add, improve, or review tests.

## Stack and Commands

- Test runner: Vitest
- Component testing: React Testing Library
- Optional interaction helper: user-event

Run commands:

```bash
yarn test
yarn test:coverage
```

## Testing Scope Rules

Follow these constraints strictly:

1. Unit test pure business logic only.
2. Pure logic belongs in utilities and parsing/formatting functions.
3. Component tests should focus on key UI behavior only.
4. Do not write broad integration/e2e tests in this skill.

## Priority 1: Pure Business Logic Unit Tests

Prefer unit tests for:

- public-sale filtering (for example `filterPublicSales`)
- calendar filter parsing and serialization (for example `parseFilters`, `serializeFilters`)
- date handling and formatting (`formatDate`)
- price formatting (`formatPrice`)
- mileage or country/location formatting if related logic changes

Guidelines:

- Keep tests deterministic and data-focused.
- Cover edge cases: empty values, missing optional fields, malformed inputs, boundaries.
- Prefer table-driven tests (`it.each`) for formatter/parser inputs.
- Assert exact output values and stable behavior.

## Priority 2: Key UI Component Tests

Write behavior-focused component tests for:

- Sale card
- Vehicle card
- Calendar filters
- Pagination
- Reduced VDP sections (vehicle detail page sections rendered in reduced/compact state)

Guidelines:

- Render with React Testing Library and query by role/label/text, not class names.
- Assert what the user can perceive: visible text, state changes, disabled/enabled states, callbacks.
- Validate accessibility-critical behavior (labels, button roles, alert/status states when applicable).
- Avoid snapshot-heavy tests; only use snapshots if there is a clear value.

## Structure and Location

- Place test files close to the implementation when possible.
- Use `*.test.ts` for utility tests.
- Use `*.test.tsx` for React component tests.
- Keep test names explicit and behavior-oriented.

## Boundaries and Anti-Patterns

Avoid:

- Re-testing third-party library internals.
- Asserting private implementation details.
- Performing heavy data filtering/mapping inside the test render block when it should be in utilities.
- Writing component tests for logic that should instead be extracted and unit tested as a pure function.

## Suggested Workflow

1. Identify whether the request is pure logic or UI behavior.
2. If logic is embedded in JSX, extract it first to a utility/hook and test that utility/hook.
3. Add tests for happy path and critical edge cases.
4. Run `yarn test` and fix failures.
5. Run `yarn test:coverage` when asked for confidence/coverage.

## Quality Bar

A test task is complete when:

- Tests are deterministic and readable.
- Logic tests cover meaningful edge cases.
- Component tests validate user-visible behavior for key components.
- The suite passes with Vitest.
