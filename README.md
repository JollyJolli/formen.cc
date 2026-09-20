# Formen

Personal portfolio built with Next.js App Router, TypeScript, and plain CSS.

## Development

- `npm install`
- `npm run dev`
- Open http://localhost:3000

Edit personal details and the project index in `content/site.ts`.
Selected projects and their preview descriptions are in `components/project-showcase.tsx`.

## Checks

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npx playwright test` (requires Google Chrome)

Browser checks cover search, category filters, keyboard navigation, image loading, and widths from 320px to 1920px. Screenshots are written to the ignored `test-results/` directory.

## Project previews

`public/projects/` contains optimized WebP screenshots of the actual linked projects. Run `node scripts/capture-projects.mjs` to refresh them. This requires Chrome and internet access; inspect the new captures before publishing.

Deploy as a Next.js application. The portfolio does not need a database or environment variables.
