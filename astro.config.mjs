// @ts-check

import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import { remarkReadingTime } from './src/utils/remark-reading-time'
import rehypeSlug from 'rehype-slug'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import astroExpressiveCode from 'astro-expressive-code'
import pagefind from 'astro-pagefind'

// https://astro.build/config
export default defineConfig({
  site: 'https://aeroblue.dev',
  integrations: [
    pagefind(),
    astroExpressiveCode({
      themes: ['rose-pine-moon', 'rose-pine-dawn'],
      themeCssSelector: (theme) => {
        return theme.name === 'rose-pine-moon' ? '[data-theme="dark"]' : '[data-theme="light"]'
      },
    }),
    mdx(),
    sitemap(),
    icon(),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      rehypeSlug,
      [rehypeExternalLinks, { target: '_blank', rel: ['nofollow', 'noopener', 'noreferrer'] }],
      [rehypeAutolinkHeadings, { behavior: 'wrap', properties: { className: ['heading-link'] } }],
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
