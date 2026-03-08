# AeroBlue

Personal website and blog built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com), and [DaisyUI](https://daisyui.com). Deployed to [Cloudflare Pages](https://pages.cloudflare.com).

## Features

- Static site generated with Astro
- Blog with styled Markdown rendering
- Full-text search via [Pagefind](https://pagefind.app)
- RSS feed and auto-generated sitemap
- Light/dark theme toggle
- Syntax highlighting / code blocks using [Expressive Code](https://expressive-code.com)

## Development

```sh
bun install    # Install dependencies
bun dev        # Start dev server at localhost:4321
bun build      # Build production site to ./dist/
bun preview    # Preview production build locally
bun typecheck  # Run Astro type checking
bun fix        # Auto-fix formatting and lint issues
```

## Project Structure

```
src/
├── assets/          # Images (optimized at build time)
├── components/      # Reusable Astro components
├── content/blog/    # Blog posts (Markdown/MDX)
├── layouts/         # Page layout templates
├── pages/           # File-based routing
├── styles/          # Global CSS
└── utils/           # Remark/rehype plugins
```
