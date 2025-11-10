const COOKIE_NAME = 'NEXT_LOCALE'
const DEFAULT_LOCALE = 'en'

export const getLocaleFromCookie = async () => {
  if (process.env.GITHUB_PAGES === 'true') return DEFAULT_LOCALE

  try {
    const { cookies } = await import('next/headers')
    const cookiesInstance = await cookies()

    return cookiesInstance.get(COOKIE_NAME)?.value ?? DEFAULT_LOCALE
  } catch {
    return DEFAULT_LOCALE
  }
}

export const setLocaleInCookie = async (locale: string) => {
  if (process.env.GITHUB_PAGES === 'true') return

  try {
    const { cookies } = await import('next/headers')
    const { revalidatePath } = await import('next/cache')
    const cookiesInstance = await cookies()

    cookiesInstance.set(COOKIE_NAME, locale)
    revalidatePath('/app')
  } catch {
    // Silently fail for static export.
  }
}
