import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      author: z.string().default('Aero Blue'),
      authorImage: image().optional(),
      datePublished: z.coerce.date(),
      dateUpdated: z.coerce.date().optional(),
      readingTime: z.string().optional(),
      heroImage: image().optional(),
      heroImageCredit: z
        .object({
          name: z.string(),
          url: z.string().url(),
        })
        .optional(),
      tags: z.array(z.string()).default([]),
      category: z.string().optional(),
      draft: z.boolean().default(true),
      pinned: z.boolean().default(false),
      tableOfContents: z.boolean().default(false),
    }),
})

export const collections = { blog }
