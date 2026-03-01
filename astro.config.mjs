// @ts-check

import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import { remarkReadingTime } from './src/utils/remark-reading-time'
import remarkToc from 'remark-toc'
import remarkDirective from 'remark-directive'
import astroExpressiveCode from 'astro-expressive-code'

// https://astro.build/config
export default defineConfig({
  site: 'https://aeroblue.dev',
  integrations: [
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
    remarkPlugins: [remarkDirective, remarkReadingTime, remarkToc],
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
