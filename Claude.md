# CLAUDE.md — GitHub Portfolio Showcase

## Mission
Build a front-end portfolio site that pulls my GitHub data live and presents it as a polished, professional showcase. The repo itself must also be a model of professional repo hygiene.

## Startup protocol (gated — do not skip)
1. Confirm the stack with me before scaffolding. Do NOT assume.
2. Ask for: my GitHub username, deploy target (GitHub Pages vs Vercel), and whether to use a static build or a serverless function for the GitHub API call.
3. Restate the Definition of Done back to me before writing code.
4. Only then scaffold.

## Definition of Done
- Site fetches and renders: profile (avatar, bio, followers), pinned/top repos (name, description, stars, language, link), language breakdown, and recent activity.
- Responsive, accessible (WCAG AA: alt text, focus states, semantic HTML, contrast).
- GitHub API calls handle rate limits and errors gracefully (loading + error + empty states).
- No API token hard-coded. If auth is needed, use an env var / serverless proxy.
- Deployed and reachable at a live URL.
- CI passes (lint + build) on push to main.

## Repo hygiene requirements (part of DoD)
- README: what it is, screenshot/GIF, live link, setup, usage, tech stack.
- LICENSE (MIT unless I say otherwise), .gitignore, repo description + topics.
- GitHub Actions workflow: lint + build on push and PR.
- Status badge for the CI workflow at top of README.
- Conventional commit messages.
- Tag a v1.0.0 release when DoD is met.

## Default stack (propose, then confirm with me)
- Vite + React + TypeScript
- Plain CSS or Tailwind (ask me)
- GitHub REST API (`/users/{username}`, `/users/{username}/repos`, `/users/{username}/events/public`)
- Deploy: Vercel or GitHub Pages

## Constraints / preferences
- Terse output. No padding.
- Single unambiguous paste blocks for implementation steps, not scattered snippets.
- Strict self-review: after each milestone, list what's NOT yet done against the DoD.
- Flag any spec item you're dropping — do not silently omit.

## Build phases
1. Scaffold + lint/CI config + skeleton README.
2. GitHub API service layer with typed responses + error/loading states.
3. UI components: Profile, RepoCard grid, LanguageChart, ActivityFeed.
4. Responsive + accessibility pass.
5. Deploy + finalize README with live link + screenshot + badge.
6. Tag v1.0.0.

## Stretch (only after DoD)
- Caching layer to avoid rate limits.
- Dark/light theme toggle.
- Filter/sort repos by stars or language.
