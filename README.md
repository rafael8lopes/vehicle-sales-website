# Vehicle Sales WebSite

## How to setup the project

```
yarn install
yarn run dev
```

## Full Tech Stack

- React 19
- Vite
- TypeScript
- React Router v7
- TanStack Query
- SCSS
- BEM
- date-fns
- Lucide React
- clsx
- i18next
- react-i18next
- Vitest
- React Testing Library
- MSW
- Playwright
- ESLint
- Prettier
- Husky
- lint-staged

### Dependencies

- react-router-dom → Routing
- @tanstack/react-query → Server state
- date-fns → Date formatting
- lucide-react → Icons
- clsx → Conditional classes
- i18next / react-i18next → Internationalization (EN + PT)

## Design Decisions

### Styling

Styling follows the BEM methodology with SCSS to provide maintainable, predictable component styles while avoiding runtime styling libraries.

### Mock Data

Static JSON behind a service abstraction

### Internationalization

The app ships in English (`en`) and Portuguese (`pt`) using `i18next` + `react-i18next`.

- Configuration lives in [`src/app/i18n.ts`](src/app/i18n.ts) and is initialized once at app entry (`src/main.tsx`).
- Translations are stored per language in [`src/i18n/locales/en.json`](src/i18n/locales/en.json) and [`src/i18n/locales/pt.json`](src/i18n/locales/pt.json), organized by feature/domain namespaces.
- The active language is auto-detected from `localStorage` then the browser, with `en` as the fallback, and can be changed via the language switcher in the header.
- Locale-aware formatting is centralized in [`src/i18n/locale.ts`](src/i18n/locale.ts): date-fns locales for dates and BCP 47 locales for `Intl` currency/number formatting. Formatting utilities stay pure and receive the active locale from components.
- Domain labels (countries, location types, vehicle grades) resolve through the translation function so no user-facing string is hardcoded in JSX.
- `src/i18n/i18next.d.ts` augments i18next with the resource shape for type-safe keys.

### Testing

Testing is split by layer:

- Vitest and React Testing Library cover utilities, hooks, and components.
- Playwright covers key user journeys end-to-end. External boundaries stay mocked with static fixtures and MSW-style service isolation so tests remain fast and deterministic.
