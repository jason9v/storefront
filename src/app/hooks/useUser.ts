'use client'

import { useQuery } from '@tanstack/react-query'

import { getAccessToken } from '@/utils/cookieUtils'
import { decodeToken } from '@/utils/authUtils'

import { Role, User } from '@/types/models/user'

const useUser = () => {
  const token = getAccessToken()

  const { data: user } = useQuery({
    queryKey: ['user', token],
    queryFn: async () => {
      if (!token) return null

      try {
        const decoded = decodeToken(token)
        if (!decoded || !decoded.email) return null

        const roleString = decoded.role || 'User'
        const role = roleString === 'Admin' ? Role.Admin : Role.User

        return {
          id: decoded.id || 0,
          name: decoded.name || '',
          email: decoded.email,
          role,
          roleId: role
        } as User
      } catch (error) {
        console.error('Failed to decode user token:', error)
        return null
      }
    },
    enabled: !!token,
    staleTime: 60000
  })

  return { user: user || null }
}

export default useUser
