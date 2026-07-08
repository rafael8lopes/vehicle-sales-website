# AutoAuction — Vehicle Sales Website

A public vehicle sales browsing experience built to demonstrate senior frontend engineering quality. The app behaves like a real API client while using static JSON behind service abstractions, making it straightforward to swap in a real backend.

---

## Quick Start

```bash
yarn install
yarn dev
```

| Command | Purpose |
|---|---|
| `yarn dev` | Start dev server |
| `yarn build` | TypeScript check + Vite production build |
| `yarn preview` | Preview production build locally |
| `yarn lint` | Run ESLint |
| `yarn typecheck` | TypeScript check without emitting |
| `yarn test` | Run unit tests (Vitest) |
| `yarn test:ui` | Vitest with browser UI |
| `yarn test:coverage` | Run tests with coverage report |
| `yarn test:e2e` | Run Playwright end-to-end tests |
| `yarn test:e2e:ui` | Playwright with interactive UI |
| `yarn storybook` | Start Storybook on port 6006 |

---

## Tech Stack

| Category | Technology |
|---|---|
| UI Framework | React 19 |
| Build Tool | Vite 8 |
| Language | TypeScript 6 (strict) |
| Routing | React Router v7 |
| Server State | TanStack Query v5 |
| Styling | SCSS + BEM |
| Icons | Lucide React |
| Conditional Classes | clsx |
| Date Formatting | date-fns |
| Internationalisation | i18next + react-i18next |
| Unit Tests | Vitest + React Testing Library |
| E2E Tests | Playwright |
| Component Explorer | Storybook 10 |
| Linting | ESLint 10 + typescript-eslint |
| Formatting | Prettier |
| Git Hooks | Husky + lint-staged |

---

## Architecture

The project uses a **feature-based structure** under `src/`. Each feature owns its own pages, components, hooks, and types. Shared utilities, services, and components live at the top level.

```
src/
├── app/                    # App-wide config (router, providers, i18n, SEO)
├── components/             # Shared UI components
├── features/
│   ├── sales/              # Sales calendar + catalogue feature
│   │   ├── components/     # SalesFilters, SalesGroup, VehicleLotGrid
│   │   ├── hooks/          # usePublicSales, usePublicSale, useSaleFilters, useSaleVehicleLots
│   │   ├── pages/          # SalesCalendarPage, SaleCataloguePage, NotFoundPage
│   │   └── types/          # PublicSale, SaleFilters, SaleState, SaleType, SaleLocationType
│   └── vehicles/           # Vehicle detail feature
│       ├── components/     # ImageGallery, VehiclePricing, VehicleSpecTable, VehicleEquipment, VehicleSaleContext
│       ├── hooks/          # useVehicleLot, useVehicleSale
│       ├── pages/          # VehicleDetailPage
│       └── types/          # VehicleLot, VehicleGrade, VehicleMileageUnit
├── hooks/                  # Shared hooks (usePagination)
├── i18n/                   # Locale mappings + type augmentation
├── layouts/                # MainLayout (app shell + header)
├── mocks/                  # Static JSON fixtures
├── services/               # API abstraction layer
├── styles/                 # Global SCSS (variables, mixins, reset)
└── utils/                  # Pure utility functions
```

---

## Routing

All routes are public. Private or exclusive sales are filtered out at the service layer and are never accessible.

| Route | Page | Description |
|---|---|---|
| `/` | `SalesCalendarPage` | Sales grid with filters and live/upcoming grouping |
| `/sales/:saleId` | `SaleCataloguePage` | Vehicle lot grid for a specific sale |
| `/vehicles/:vehicleId` | `VehicleDetailPage` | Full vehicle detail with images, pricing, and specs |
| `*` | `NotFoundPage` | Catch-all 404 |

---

## Service Layer

Pages never import JSON fixtures directly. All data access goes through service modules, which in turn call the `mockApi`. This keeps the API boundary clean and makes replacing the mock with a real backend a one-file change.

```
Page / Hook
    └─▶ publicSalesService / publicVehiclesService
            └─▶ mockApi (simulates network latency, supports e2e override)
                    └─▶ sales.json / vehicles.json
```

**Services:**

| Service | Methods |
|---|---|
| `publicSalesService` | `getPublicSales()`, `getPublicSaleById(id)` |
| `publicVehiclesService` | `getPublicVehicleLots()`, `getPublicVehicleLotsBySaleId(saleId)`, `getPublicVehicleLotById(id)` |
| `mockApi` | Internal — wraps JSON reads, adds simulated latency, supports `window.__E2E_MOCK_DATA__` injection |

---

## State Management

State is divided into three clear categories with no duplication between them.

**Server state — TanStack Query**

| Query key | Hook | Data |
|---|---|---|
| `['publicSales']` | `usePublicSales` | All public sales |
| `['publicSale', saleId]` | `usePublicSale(saleId)` | Single sale |
| `['saleVehicleLots', saleId]` | `useSaleVehicleLots(saleId)` | Vehicles in a sale |
| `['vehicleLot', vehicleId]` | `useVehicleLot(vehicleId)` | Single vehicle |

Default config: 5-minute stale time, 1 retry on failure.

**URL state**

Sale filters are serialised into search params (`?state=live&format=online&country=GB`) via `useSaleFilters()` using `useSearchParams()`. This makes filtered views bookmarkable and shareable.

**UI state**

Pagination, image gallery index, and dropdown open/close are kept in local component state. Nothing is lifted unnecessarily.

---

## Utilities

All formatting and filtering logic lives in pure functions in `src/utils/`, not in components.

| Utility | Exports |
|---|---|
| `formatDate.ts` | `formatSaleDate`, `formatSaleTime`, `formatSaleDateRange`, `formatFullSaleDate`, `formatCalendarDate` |
| `formatPrice.ts` | `formatPrice` — `Intl.NumberFormat` currency formatting |
| `formatMileage.ts` | `formatMileage` — localised number + unit (km / mi) |
| `filterPublicSales.ts` | `filterPublicSales`, `groupSalesByState`, `filterAndGroupSales`, `getUniqueCountries`, `DEFAULT_FILTERS` |
| `parseFilters.ts` | `parseFilters` — validates and parses URL search params into `SaleFilters` |
| `serializeFilters.ts` | `serializeFilters` — `SaleFilters` → `URLSearchParams` |
| `country.ts` | `getCountryFlag`, `getCountryName`, `getCountryLabel` |
| `locationType.ts` | `getLocationTypeLabel` |

---

## Internationalisation

The app ships in **English (`en`)** and **Portuguese (`pt`)**.

- Configuration: [`src/app/i18n.ts`](src/app/i18n.ts) — initialised once at app entry in `main.tsx`
- Translations: [`src/i18n/locales/en.json`](src/i18n/locales/en.json) and [`src/i18n/locales/pt.json`](src/i18n/locales/pt.json), organised by feature/domain
- Detection order: `localStorage` → browser navigator → fallback to `en`
- Language switcher in the header updates `localStorage` and re-renders the app
- Locale mapping: [`src/i18n/locale.ts`](src/i18n/locale.ts) maps the active language to date-fns locales (`en-GB`, `pt-PT`) and BCP 47 codes for `Intl` formatters
- Type safety: [`src/i18n/i18next.d.ts`](src/i18n/i18next.d.ts) augments i18next with the full resource shape for compile-time key checking

---

## Styling

SCSS with **BEM methodology**. Nested syntax (`&__element`, `&--modifier`) keeps selectors shallow and co-located.

```scss
.sale-card {
  &__title { }
  &__price { }
  &--live { }
}
```

Each component owns its own `.scss` file. Global tokens (colours, spacing, breakpoints) live in `src/styles/_variables.scss`. No runtime styling libraries are used.

---

## Testing Strategy

Tests are split into three layers, prioritising behaviour over implementation details.

### Unit & component tests (Vitest + React Testing Library)

Coverage targets utilities first, then components:

| Test file | What it covers |
|---|---|
| `filterPublicSales.test.ts` | Filter, group, and unique-country logic |
| `parseFilters.test.ts` | URL search param parsing and validation |
| `serializeFilters.test.ts` | Filter → URLSearchParams serialisation |
| `formatDate.test.ts` | All date format variants and edge cases |
| `formatPrice.test.ts` | Currency formatting across locales |
| `formatMileage.test.ts` | Mileage formatting with both units |
| `mockApi.test.ts` | Service layer happy paths and missing-ID cases |
| `SaleCard.test.tsx` | Sale card render and badge states |
| `VehicleCard.test.tsx` | Vehicle card render and optional fields |
| `Pagination.test.tsx` | Page navigation behaviour |
| `SalesFilters.test.tsx` | Filter dropdown interaction |

### End-to-end tests (Playwright)

Tests cover complete user journeys with mocked external boundaries. The mock data is injected via `window.__E2E_MOCK_DATA__` so tests are deterministic and fast.

**Journey: Sales calendar → vehicle detail page**
1. Load sales calendar
2. Apply the "Live" filter
3. Navigate to a sale catalogue
4. Open a vehicle detail page
5. Navigate back

Fixture: [`e2e/fixtures/sales-calendar-to-vdp.json`](e2e/fixtures/sales-calendar-to-vdp.json)

Config: Chromium only, base URL `http://127.0.0.1:4173`, 1 retry in CI.

### Storybook

Visual component stories exist for: `SaleCard`, `VehicleCard`, `Pagination`, `ErrorState`, `ImageGallery`, `VehiclePricing`.

---

## Performance Decisions

- **Filtering and grouping** happen in pure utility functions (`filterAndGroupSales`), not during render
- **Pagination** is applied after filtering, keeping the rendered DOM small
- **TanStack Query caching** (5-min stale time) prevents redundant network calls on back-navigation
- **Image lazy loading** on gallery thumbnails (`loading="lazy"`)
- **`useMemo`/`useCallback`** are intentionally avoided unless profiling identifies a real bottleneck — premature memoisation adds noise without measurable benefit at this data scale

---

## Assumptions, Trade-offs & Future Improvements

**Assumptions**
- All data is public; no authentication is required
- Sale and vehicle data volumes are small enough that client-side filtering and pagination are appropriate
- The mock latency (200 ms) is sufficient to validate loading states without slowing down development

**Trade-offs**
- MUI is listed as a dependency and kept available as a design-system fallback, but current components use BEM + SCSS for full visual control and zero runtime overhead. Adopting MUI components would trade customisation flexibility for faster development of complex UI patterns (data tables, modals, date pickers)
- Client-side filtering works well for the current dataset; a real backend would move filter logic to query params on the API

**Future improvements**
- Replace `mockApi` with real HTTP calls — the service layer boundary means only `mockApi.ts` changes
- Add more e2e journeys (filter combinations, error recovery, language switching)
- Introduce MSW (already installed) for more granular network-level test mocking
- Expand Storybook stories to all shared components with interactive controls
