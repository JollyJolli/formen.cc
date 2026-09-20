# Formen.cc Portfolio

A complete rebuild of the Formen personal portfolio as a Next.js application.

## What is here

- Next.js App Router
- TypeScript
- Custom CSS with no UI component library
- Local typed content in `content/site.ts`
- A selected-work showcase plus a full project archive
- Preserved contact details, GitHub link, skills, and all existing project URLs

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run typecheck
npm run lint
npm run build
```

## Editing content

Project and profile content lives in `content/site.ts`. Add or edit projects there; the homepage renders from that data automatically.
