# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

PetDex is a mobile/desktop web app for registering pets and their information. It is a **vanilla JavaScript** frontend (no React/Vue) built with Vite, using the `pet-dex-utilities` Component system and `vanilla-routing` for routing. Uses pnpm 8 and Node 20.

## Commands

- `pnpm dev` — start Vite dev server (port 5173; app root is `src/layouts/`)
- `pnpm mock-api` — json-server mock API on port 3000 using `db.json` + `routes.json` (services in `src/services/api.js` point at `http://localhost:3000`)
- `pnpm test` — run Vitest in watch mode; `pnpm test run` for a single pass
- `pnpm test <path>` — run a single test file, e.g. `pnpm test src/components/Button/index.spec.js`
- `pnpm build` — production build to `dist/`
- `pnpm lint` / `pnpm stylelint` / `pnpm prettier` — checks; `pnpm code-style` runs all three
- `pnpm lint:fix` / `pnpm prettier:fix` — auto-fix
- `pnpm storybook` — Storybook on port 6006
- `node setup.mjs` — downloads the `.env` file (Firebase config) if missing

Commits follow Conventional Commits, enforced by commitlint; `pnpm commit` runs commitizen. Husky pre-commit runs lint-staged (eslint `--max-warnings=0 --fix` + prettier on `.js`, stylelint + prettier on `.scss`).

## Architecture

### Component pattern (pet-dex-utilities)

Every UI component follows the same shape — a constructor function using `Component.call(this, { html, events })`, not classes or JSX. See `src/components/Button/index.js` for the canonical example:

- An `html` template string with `data-select="name"` attributes; elements are accessed via `this.selected.get('name')`.
- An `events` array declaring the custom events the component can `this.emit(...)`.
- DOM listeners are attached in `this.listen('mount', ...)` and removed in `this.listen('unmount', ...)`.
- Methods live on the prototype: `X.prototype = Object.assign(X.prototype, Component.prototype, { ... })`.
- Components are used via `new X(props)` then `x.mount($container)`.

Each component directory contains `index.js` + `index.scss` (imported by the JS), optionally `index.spec.js` and asset folders. Storybook stories live separately in `src/stories/`.

### Routing and pages

- `src/layouts/index.html` + `index.js` are the app entry: mounts `SideMenu` and `Navigation` (from `src/layouts/components/`), then calls `mainRouter()`.
- `src/router/main-router.js` aggregates route groups from `src/router/routes/` (app main routes, add-pet steps, my-pets, account) and passes them to `BrowserRoute` from `vanilla-routing`.
- Each route file exports `{ pathname, element }` where `element` creates a `div.home__content-page`, instantiates a page from `src/layouts/pages/`, and mounts it. Navigation is done with `Router.go(path)`.
- Pages (`src/layouts/pages/`) use the same Component pattern as `src/components/`; components are the reusable building blocks, pages compose them.

### Data & services (`src/services/`)

- `firebase.js` — auth (email/password + Google), Firestore, and Storage; requires the `.env` from `setup.mjs`.
- `api.js` / `localStorage.js` — pet data is largely persisted in `localStorage` (`pet` during the add-pet flow, `pets` list, `hasUser` auth flag). The home route (`/`) redirects to `/account/login` or `/pets` based on `hasUser`.
- `breeds.js` — fetches breeds from the mock API.

### Path aliases

Defined in both `jsconfig.json` and `vite.config.js`: `~src/*`, `~styles/*`, `~stories/*`, `~layouts/*`. Tests import helpers from `@testing-library/vanilla` (aliased to `src/__tests__/index.js`).

### Testing

Vitest + jsdom with globals enabled; specs are `src/**/*.spec.js` colocated with components. `src/__tests__/index.js` re-exports Testing Library DOM/user-event plus a `render(component)` helper that mounts a component onto `document.body`; `user` is a fresh `userEvent` per test.
