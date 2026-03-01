import getReadingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'
import type { Root } from 'mdast'
import type { VFile } from 'vfile'

export function remarkReadingTime() {
  return function (tree: Root, { data }: VFile) {
    const pageText = toString(tree)
    const readingTime = getReadingTime(pageText)
    // @ts-expect-error astro frontmatter types not available
    data.astro.frontmatter.readingTime = readingTime.text
  }
}
