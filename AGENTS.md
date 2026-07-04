# AGENTS.md

## Purpose
Build a public vehicle sales browsing website that demonstrates senior frontend engineering quality, not feature volume.

Key goals:
- Clean architecture
- Strong TypeScript and maintainable React
- Clear separation of concerns
- Accessibility and performance awareness
- Solid testing strategy and DX

The app should behave like a real API client, while currently using static JSON behind service abstractions.

## Stack
- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- MUI (Material UI)
- SCSS (BEM)
- date-fns
- Lucide React
- Vitest + React Testing Library

## Architecture
Use feature-based structure under `src/`.

Core areas:
- `app/`
- `components/`
- `features/sales/`
- `features/vehicles/`
- `layouts/`
- `services/`
- `styles/`
- `types/`
- `utils/`
- `mocks/`

Each feature should own:
- `pages`
- `components`
- `hooks`
- `services`
- `types`
- `utils`

Avoid creating shared modules unless they are genuinely shared.

## Engineering Rules
### Components
- Keep components focused on one responsibility.
- Prefer composition over large components.
- If a component grows beyond about 200 lines, consider splitting.

### Design System Usage
- Use MUI as the default design system for UI building blocks.
- Prefer MUI components before creating custom components.
- Create custom components only when MUI does not satisfy the required behavior, accessibility, or product-specific visual constraints.
- When creating wrappers around MUI, keep them thin and reusable.

### Business Logic
- Do not put business logic inside JSX.
- Move logic to `utils/`, `services/`, or `hooks/`.

Example:

Bad:
```tsx
const filteredSales = sales.filter(...)
```

Good:
```ts
filterPublicSales()
```

### Service Layer
- Pages must never import JSON fixtures directly.
- Access fixtures through service modules only.
- Keep an API-like boundary so replacing mocks with backend calls is straightforward.

Example:

Bad:
```ts
import sales from "@/mocks/sales.json";
```

Good:
```ts
publicSalesService.getPublicSales()
```

## State Ownership
- Server state: TanStack Query (sales, vehicles, details).
- URL state: filters via search params (for example `?state=live`).
- UI state: local component state (modal open, selected image, accordion state).
- Derived state: pure functions first; `useMemo` only when justified.

Never duplicate server or derived state.

## Styling
- Use SCSS with BEM.
- Use nested BEM syntax (`&__element`, `&--modifier`) over flat selectors.
- Keep selectors shallow.
- Do not style by HTML tags.

Example naming:
- `sale-card`
- `sale-card__title`
- `sale-card--live`

Use nested syntax:
```scss
.sale-card {
  &__title {}
  &__price {}
  &--live {}
}
```

## Component File Structure
Reusable component folder pattern:

```text
VehicleCard/
  VehicleCard.tsx
  VehicleCard.scss
  VehicleCard.test.tsx
```

Inside component files, prefer this order:
1. imports
2. types
3. component
4. handlers
5. derived values
6. effects
7. return

Avoid deeply nested ternaries; extract sections into child components.

## Naming
- Components: `SaleCard`, `VehicleCard`, `Pagination`
- Hooks: `usePublicSales`, `useVehicle`, `usePagination`
- Utilities: `formatDate`, `formatPrice`, `filterPublicSales`, `parseFilters`
- Services: `publicSalesService`, `publicVehiclesService`

## TypeScript and React
- Never use `any`; prefer `unknown` or explicit types.
- Keep types close to their feature/domain.
- Prefer function components and named exports.
- Avoid premature memoization (`React.memo`, `useMemo`, `useCallback`).

## Imports
- Use path alias imports with `@/` for internal project modules.
- Do not use relative imports (`../` or `./`) for internal modules.
- Keep imports stable and refactor-safe by relying on alias paths.

## Routing and Access
Public routes:
- `/`
- `/sales/:saleId`
- `/vehicles/:vehicleId`
- `/*` (Not Found)

Private or exclusive sales must not be accessible.

## Accessibility
- Use semantic HTML (`header`, `main`, `section`, `nav`, `footer`).
- Inputs require labels.
- Buttons must be keyboard accessible.
- Images need meaningful `alt` text.
- Loading states use `role="status"`.
- Error states use `role="alert"`.

## Performance
- Avoid filtering/sorting in render.
- Avoid unnecessary object recreation.
- Put expensive work in `utils/` or `hooks/`.
- Paginate large datasets.

## Error and Empty States
Each page must explicitly handle:
- loading
- empty
- error
- not found

Gracefully handle missing or malformed optional data (image, price, optional fields, dates).

## Data Formatting
- Dates: `date-fns`
- Prices: `Intl.NumberFormat`
- Mileage: consistent formatter utility
- Do not manually concatenate formatting strings

## Testing Strategy
Prioritize:
1. Utilities (`formatPrice`, `formatDate`, `filterPublicSales`, `parseFilters`)
2. Components (`SaleCard`, `VehicleCard`, `Pagination`, filters)
3. User flow (calendar -> filters -> catalogue -> vehicle -> back)

Prefer behavior-focused tests over snapshot-heavy tests.

## Commits
Use Conventional Commits, for example:
- `feat: add public sales calendar`
- `fix: handle missing vehicle images`
- `refactor: extract sale formatting utility`
- `test: add calendar filter tests`

## README Requirements
Document:
- architecture and folder structure
- state management and service layer
- testing strategy
- performance decisions
- assumptions, trade-offs, and future improvements

## Out of Scope
Do not build:
- authentication
- bidding
- checkout
- reservations
- user accounts
- watchlists
- admin features

This is a public browsing experience only.

## Definition of Done
A feature is done only when:
- TypeScript passes
- ESLint passes
- tests pass
- responsive behavior works
- accessibility is addressed
- loading, empty, error, and not-found states exist
- styles follow BEM
- no business logic lives in JSX
- service layer boundaries are respected
- optional API fields are handled safely

## Philosophy
- Favor readability over cleverness.
- Favor composition over inheritance.
- Favor explicit code over magic.
- Favor maintainability over premature optimization.
