# Konrad Kislo — Portfolio

Personal website of Konrad Kislo: music, recordings and photography.

Built with [Next.js](https://nextjs.org) (App Router), React, TypeScript and CSS Modules.

## Getting started

Requirements: Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command             | Description                           |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Start the development server          |
| `npm run build`     | Create a production build             |
| `npm run start`     | Serve the production build            |
| `npm run lint`      | Lint the project with ESLint          |
| `npm run typecheck` | Type-check the project with TypeScript |

## Environment

Copy `.env.example` to `.env.local` and adjust:

| Variable                     | Purpose                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`       | Production URL — canonical links, Open Graph tags, `sitemap.xml`, `robots.txt`  |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `true` lets search engines index the site. Anything else = `noindex` (default). |

Keep indexing off until the site is launched, so work-in-progress versions don't end up in Google.

## Project structure

```
src/
├── app/                 # Routes, root layout, global styles, SEO files (sitemap, robots, icon)
│   └── photography/     # /photography — full gallery page
├── assets/images/       # Photos and album covers (imported statically → automatic sizes + blur placeholders)
├── components/          # One folder per UI section, each with its own CSS Module
└── content/site.ts      # ALL site content: texts, releases, photos, contact details
```

## Editing content

Everything shown on the page lives in [`src/content/site.ts`](src/content/site.ts):

- **Texts** — bio, recordings and contact details.
- **Releases** — add an object to `bandReleases`; set `listenUrl` to show a “Listen” link.
- **Photos** — put the file in `src/assets/images/`, import it at the top of `site.ts` and add it to
  `photography.rows`. Photos in the same row are automatically sized to share one height.

Images are optimised by `next/image` (AVIF/WebP, responsive sizes), so drop in originals in full quality.

## Deployment

### Preview on GitHub Pages (automatic)

Every push to `main` builds the site and publishes it at `https://<user>.github.io/<repository>/`
via [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

One-time setup: in the repository go to **Settings → Pages → Build and deployment → Source** and select
**GitHub Actions**. Deployments can be followed in the **Actions** tab.

The Pages build is a static export (`GITHUB_PAGES=true` in [`next.config.ts`](next.config.ts)): it is served
from the repository sub-path and without the Next.js image optimizer, because GitHub Pages has no server.
That is fine for previews; for the launched site prefer a host with Next.js support.

### Production

The site can be deployed to [Vercel](https://vercel.com) with zero configuration, or to any Node.js host
with `npm run build && npm run start`. Set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_ALLOW_INDEXING=true` there.
