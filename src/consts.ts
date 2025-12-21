// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export interface NavLink {
  name: string
  href: string
}
export interface SocialLink {
  name: string
  href: string
  icon: string
}

export const HERO = {
  title: "Hi, I'm Aero Blue.",
  description:
    'Just another developer who remakes an entire website just to have an excuse to use Astro.',
  image: 'src/assets/logo-light-blue.png',
}

export const SITE_TITLE: string = 'AeroBlue'
export const SITE_DESCRIPTION: string = 'Welcome to my website!'
export const SITE_NAV_LINKS: NavLink[] = [
  { name: 'Blog', href: '/blog' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'About', href: '/about' },
]
export const SITE_SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', href: 'https://github.com/Aero-Blue', icon: 'lucide:github' },
]
