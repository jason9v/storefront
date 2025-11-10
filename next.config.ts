import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./src/app/i18n/request.ts')

const isGithubPages = process.env.GITHUB_PAGES === 'true'
// For GitHub Pages, use the repository name as basePath
// Set NEXT_PUBLIC_BASE_PATH environment variable if your repo name is different
// Example: NEXT_PUBLIC_BASE_PATH=/your-repo-name npm run deploy
const basePath = isGithubPages ? process.env.NEXT_PUBLIC_BASE_PATH || '' : ''

const nextConfig: NextConfig = {
  // @ts-expect-error - eslint is a valid Next.js config option but not in TypeScript types
  eslint: {
    dirs: ['src']
  },
  ...(isGithubPages && {
    output: 'export',
    basePath: basePath,
    images: {
      unoptimized: true
    },
    trailingSlash: true
  })
}

export default withNextIntl(nextConfig)
