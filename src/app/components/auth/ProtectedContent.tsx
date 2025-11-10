'use client'

import { ReactNode, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

import { RootState } from '@/store'

import { LoginForm } from '@/components/auth'

import { BackButton } from '@/components/buttons'

type ProtectedContentProps = {
  children: ReactNode
}

const ProtectedContent = ({ children }: ProtectedContentProps) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )
  const pathname = usePathname()
  const router = useRouter()

  const authPages = ['/register', '/reset-password']
  const isAuthPage = authPages.includes(pathname)

  useEffect(() => {
    if (isAuthenticated && isAuthPage) router.replace('/')
  }, [isAuthenticated, isAuthPage, router])

  if (!isAuthenticated) {
    if (isAuthPage) return <>{children}</>

    if (pathname === '/') return <LoginForm />

    return <LoginForm />
  }

  if (isAuthenticated && isAuthPage) return null

  return (
    <>
      {pathname !== '/' && <BackButton />}
      {children}
    </>
  )
}

export default ProtectedContent
