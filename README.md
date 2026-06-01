# Inon-Automation

[![CI](https://github.com/inonvv/Inon-Automation/actions/workflows/ci.yml/badge.svg)](https://github.com/inonvv/Inon-Automation/actions/workflows/ci.yml)

Live portfolio for [@inonvv](https://github.com/inonvv). All content — profile, repositories, language breakdown, recent activity — is fetched directly from the GitHub REST API at page load, so the site stays current without manual edits.

> **Live:** https://inonvv.github.io/Inon-Automation/ *(pending first deploy)*
>
> _Screenshot: pending phase 5._

## Tech stack

- [Vite](https://vitejs.dev/) + [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/) (zero-config via `@tailwindcss/vite`)
- GitHub REST API (unauthenticated, 60 req/hr/IP)
- Deployed to GitHub Pages via GitHub Actions

## Design

Visual language is inspired by [Brittany Chiang's v4 portfolio](https://v4.brittanychiang.com/) — sticky sidebar, numbered sections, one accent color, generous whitespace. Chosen after surveying community references on Hacker News and dev forums.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:5173/Inon-Automation/.

## Scripts

| script           | what it does                       |
| ---------------- | ---------------------------------- |
| `npm run dev`    | Start the Vite dev server          |
| `npm run build`  | Type-check and build to `dist/`    |
| `npm run preview`| Preview the production build       |
| `npm run lint`   | Lint with ESLint                   |
| `npm run format` | Format with Prettier               |

## Roadmap

- [x] Phase 1 — Scaffold, lint/CI, README skeleton, design shell
- [ ] Phase 2 — GitHub API service layer (typed responses, loading/error/empty states)
- [ ] Phase 3 — Populate Profile, RepoCard grid, LanguageChart, ActivityFeed
- [ ] Phase 4 — Responsive + accessibility pass (WCAG AA)
- [ ] Phase 5 — Deploy + screenshot + live link in README
- [ ] Phase 6 — Tag `v1.0.0`

## License

[MIT](./LICENSE)
