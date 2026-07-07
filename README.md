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

## Design Decisions

### Styling

Styling follows the BEM methodology with SCSS to provide maintainable, predictable component styles while avoiding runtime styling libraries.

### Mock Data

Static JSON behind a service abstraction

### Testing

Testing is split by layer:

- Vitest and React Testing Library cover utilities, hooks, and components.
- Playwright covers key user journeys end-to-end. External boundaries stay mocked with static fixtures and MSW-style service isolation so tests remain fast and deterministic.
