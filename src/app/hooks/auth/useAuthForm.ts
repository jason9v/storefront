'use client'

import { useState, useEffect, FormEvent, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ZodSchema } from 'zod'

import { useForm } from '@/hooks'
import { registerUser, loginUser } from '@/api/services'
import { setAuthState, RootState } from '@/store'
import { setTokens } from '@/utils'
import {
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASSWORD,
  DEFAULT_USER_EMAIL,
  DEFAULT_USER_PASSWORD
} from '@/components/auth/constants'

type UseAuthFormProps = {
  isRegister: boolean
  schema: ZodSchema<any>
  initialData: any
}

export const useAuthForm = ({
  isRegister,
  schema,
  initialData
}: UseAuthFormProps) => {
  const translations = useTranslations(isRegister ? 'Register' : 'Login')
  const dispatch = useDispatch()
  const router = useRouter()
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  const { formData, errors, handleChange, validate, setFormData } = useForm(
    schema,
    initialData
  )

  const [snackbar, setSnackbar] = useState<{
    message: string
    open: boolean
  }>({
    message: '',
    open: false
  })

  useEffect(() => {
    if (isAuthenticated) router.replace('/')
  }, [isAuthenticated, router])

  useEffect(() => {
    if (!isRegister && !isAuthenticated)
      setFormData({
        email: DEFAULT_ADMIN_EMAIL,
        password: DEFAULT_ADMIN_PASSWORD
      })
  }, [isRegister, isAuthenticated, setFormData])

  const mutation = useMutation({
    mutationFn: (data: any) =>
      isRegister ? registerUser(data) : loginUser(data),
    onSuccess: ({ accessToken, refreshToken }) => {
      if (!accessToken || !refreshToken) return

      setTokens(String(accessToken), String(refreshToken))
      dispatch(setAuthState(true))

      window.location.href = '/'
    },
    onError: (error: Error) =>
      setSnackbar({
        message: translations(error.message),
        open: true
      })
  })

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()

      if (!validate()) {
        setSnackbar(prev => ({ ...prev, open: false }))
        return
      }

      mutation.mutate(formData)
    },
    [validate, mutation, formData]
  )

  const fillAdminCredentials = useCallback(
    () =>
      setFormData({
        email: DEFAULT_ADMIN_EMAIL,
        password: DEFAULT_ADMIN_PASSWORD
      }),
    [setFormData]
  )

  const fillUserCredentials = useCallback(
    () =>
      setFormData({
        email: DEFAULT_USER_EMAIL,
        password: DEFAULT_USER_PASSWORD
      }),
    [setFormData]
  )

  const closeSnackbar = useCallback(
    () => setSnackbar(prev => ({ ...prev, open: false })),
    []
  )

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    snackbar,
    closeSnackbar,
    isPending: mutation.isPending,
    fillAdminCredentials,
    fillUserCredentials,
    isAuthenticated
  }
}
