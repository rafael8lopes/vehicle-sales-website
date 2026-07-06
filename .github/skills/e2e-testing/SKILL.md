---
name: e2e-testing
description: Write and review Playwright end-to-end tests for this project using user-journey flows only, with mocked external boundaries.
---

# E2E User Journeys Skill

Use this skill when the user asks to add, improve, or review end-to-end tests.

## Scope

This skill is strictly for user journeys with Playwright.

Do:

1. Validate realistic navigation and user intent across pages.
2. Assert user-visible outcomes only.
3. Mock external boundaries (API/service calls or fixture-backed route handlers).

Do not:

1. Write unit/component tests in this skill.
2. Assert internal implementation details.
3. Depend on live external systems.

## Project-Specific Journeys

Target the actual public route flow in this project:

1. `/` (sales calendar)
2. apply basic filter
3. open `/sales/:saleId` (catalogue)
4. open `/vehicles/:vehicleId` (reduced VDP/vehicle detail)
5. return to catalogue

Also consider adjacent path checks when relevant:

1. not found states for invalid sale or vehicle
2. empty states after restrictive filters
3. loading and error recovery UX

## Framework and Execution

- Framework: Playwright
- Preferred command: `npx playwright test`
- Keep E2E specs isolated from unit tests.

Recommended folder structure:

```text
e2e/
  journeys/
    sales-calendar-to-vdp.spec.ts
  fixtures/
    sales.json
    vehicles.json
  helpers/
    routes.ts
    selectors.ts
```

## Boundary Mocking Rules

Mock boundaries, not rendering internals.

Accepted strategies:

1. Route-level API mocking with Playwright (`page.route`) for backend-like calls.
2. Fixture-backed handlers (for example MSW handlers) when running a mocked API boundary.
3. Service-boundary stubbing only when the app boundary is service-driven.

In this codebase, the public data boundary is represented by:

1. `publicSalesService`
2. `publicVehiclesService`
3. `mockApi` as fixture-backed data source

E2E tests must keep these boundaries deterministic and avoid real network dependencies.

## Authoring Guidelines

1. Use role/label/text selectors first; avoid brittle class-based selectors.
2. Keep each test focused on one journey outcome.
3. Use stable fixtures with explicit sale and vehicle IDs.
4. Assert navigation with URL and key page content.
5. Cover the return path (breadcrumb/back-to-catalogue behavior).
6. Keep waits explicit and minimal; avoid arbitrary sleeps.

## Example Journey Contract

For the calendar -> filter -> catalogue -> reduced VDP -> back journey, verify:

1. Calendar loads and shows public sales.
2. Applying a basic filter changes visible results.
3. Opening a sale lands on catalogue with lot summary/grid.
4. Opening a lot lands on vehicle detail with expected lot identity.
5. Back action returns to the same sale catalogue context.

## Review Checklist

A task is complete when:

1. Journey covers real user intent end-to-end.
2. External boundaries are mocked deterministically.
3. Assertions are user-visible and accessibility-aware.
4. Test names describe behavior, not implementation.
5. Tests run reliably with Playwright without live backend dependencies.