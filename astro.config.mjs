// @ts-check

import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

import icon from 'astro-icon'
import { remarkReadingTime } from './utils/remark-reading-time'

// https://astro.build/config
export default defineConfig({
  site: 'https://aeroblue.dev',
  integrations: [mdx(), sitemap(), icon()],
  markdown: {
    shikiConfig: {
      theme: 'rose-pine-moon',
    },
    remarkPlugins: [remarkReadingTime],
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
