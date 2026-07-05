# Vehicle Sales WebSite

## How to setup the project

```
yarn install
npm run dev
```

## Full Stack

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

## Work process

- For brainstorm and sparring partner -> CHATGPT
- For coding -> Copilot
- UI design generation -> Figma

## Design Decisions

### Styling

Styling follows the BEM methodology with SCSS to provide maintainable, predictable component styles while avoiding runtime styling libraries.

### No use of Next.JS

I Didn't used Next.js because this challenge doesn't require: server actions, no route handlers, no middleware, no auth and no server components doing database work.

### Dependencies

- react-router-dom → Routing
- @tanstack/react-query → Server state
- date-fns → Date formatting
- lucide-react → Icons
- clsx → Conditional classes
