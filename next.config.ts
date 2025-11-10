import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./src/app/i18n/request.ts')

const isGithubPages = process.env.GITHUB_PAGES === 'true'

const nextConfig: NextConfig = {
  ...(isGithubPages && {
    output: 'export',
    basePath: '/store-hub',
    images: {
      unoptimized: true
    },
    trailingSlash: true
  })
}

export default withNextIntl(nextConfig)
