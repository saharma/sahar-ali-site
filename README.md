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

## content.saharali.com

The creator and partnership portfolio lives at `src/pages/content/index.astro` and
uses the same design system as the main site. It reuses `src/styles/global.css`
untouched and adds `src/styles/content.css` on top, so nothing here changes
saharali.com.

Local preview: `npm run dev`, then open `http://localhost:4321/content/`.

### Going live on the subdomain

1. Add `content.saharali.com` to this project in Vercel and point the DNS record at Vercel.
2. `vercel.json` already rewrites `/` on that host to `/content`, so the page serves
   at the root of the subdomain. Every link on the page is an in-page anchor, so it
   works at both URLs. After the first deploy, confirm the rewrite took effect; if
   Vercel serves the main homepage on the subdomain instead, set the rewrite in the
   project's domain settings rather than in `vercel.json`.
3. The page is canonical at `https://content.saharali.com/` and is excluded from the
   saharali.com sitemap.

### Editing the page

| What | Where |
| :--- | :---- |
| Photos, reels and video slots | `src/data/creatorMedia.ts` |
| Collaboration cards, style words, current opportunity, Instagram link | `src/data/creator.ts` |
| Hide the current opportunity section | set `show: false` in `currentOpportunity` |
| Page styling | `src/styles/content.css` |

Photos go in `public/content/`. Every media slot renders a labelled placeholder
until a real `src` or Instagram shortcode is filled in.

### Contact form

The form posts to `/api/collab` and stores enquiries in the `collab_enquiries`
Supabase table. Run `supabase/collab_enquiries.sql` once to create it. Until then
(or if Supabase is unreachable) the form falls back to opening a prefilled email,
so it never dead-ends.
