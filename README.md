# Sahar Ali

Personal site for Sahar Ali, tech consultant covering AI, automation, product, delivery, and data.

## Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start local server at `localhost:4321`      |
| `npm run build`   | Build production site to `./dist/`          |
| `npm run preview` | Preview the production build locally        |

Built with [Astro](https://astro.build).

## Chess app

`apps/chess` is the source for https://chess.saharali.com. It has its own package, Vercel project (`sahar-chess`), and build. It uses the existing **Sahar Ali** Supabase project for shared Wordshift accounts; chess progress has separate storage and row-level access rules. See `apps/chess/README.md`. Portfolio source and routes are unchanged.
