import { getCollection } from 'astro:content'

export async function getPublishedPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft)
  return posts.sort((a, b) => b.data.datePublished.getTime() - a.data.datePublished.getTime())
}
