# AGENTS.md

## Project overview
Peak Surf website is now a static marketing site for the Peak iOS app. It is a Vite + React + Tailwind build with no backend services.

## Key paths
- `client/src/App.tsx`: page layout and marketing copy.
- `client/src/index.css`: typography, animation utilities, and global styling.
- `client/index.html`: SEO metadata and head tags.
- `public/`: static assets (logos, icons, screenshots).

## Dev commands
- `npm install`
- `npm run dev` (Vite dev server on port 5000)
- `npm run build` (static build output to `dist/public`)
- `npm run preview` (local preview of the static build)
- `npm run check` (TypeScript typecheck)

## Environment
No required environment variables.

## Structure and styling
- The site is intentionally minimal and premium: mostly black with white accents.
- Typography uses custom fonts defined in `client/src/index.css` (avoid default stacks).
- Animation utilities live in `client/src/index.css` (`fade-up`, `fade-delay-*`).
- Keep new sections inside `client/src/App.tsx` to maintain a single-page flow.

## Content updates
- Core marketing copy lives in `client/src/App.tsx`.
- Update CTA links to the correct App Store URL when available.

## Tests
No automated tests currently; use `npm run check` for type safety.
