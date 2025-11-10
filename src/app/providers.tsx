'use client'

import { ReactNode, useEffect, useState } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { AbstractIntlMessages } from 'use-intl'
import { ThemeProvider } from 'next-themes'
import { Provider, useDispatch } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import store, { AppDispatch, setAuthState } from '@/store'
import { getAccessToken } from '@/utils'

const queryClient = new QueryClient()

const AuthSync = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const token = getAccessToken()
    dispatch(setAuthState(!!token))
  }, [dispatch])

  return null
}

const Providers = ({
  children,
  messages,
  locale
}: {
  children: ReactNode
  messages: AbstractIntlMessages
  locale: string
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ThemeProvider attribute="class">
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <AuthSync />
            {children}
          </Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}

export default Providers
