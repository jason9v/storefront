'use client'

import { useTranslations } from 'next-intl'
import { useState, useCallback, ChangeEvent } from 'react'

import { useUsersMutation, useUsersQuery } from '@/hooks/users'

import withAdminRedirect from '@/hoc/withAdminRedirect'

import { LoadingSpinner, Snackbar } from '@/components/ui'

import { SearchBar, NoUsersMessage, UserList } from '@/components/users'

import { Role } from '@/types'

const UsersPanel = () => {
  const translations = useTranslations('UsersPanel')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  )

  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    variant: 'error' | 'info' | 'success'
  }>({
    open: false,
    message: '',
    variant: 'info'
  })

  const { data: paginatedUsers, isLoading } = useUsersQuery(
    searchTerm,
    currentPage
  )

  const updateRoleMutation = useUsersMutation(searchTerm, currentPage)

  const handleRoleChange = useCallback(
    (params: { userId: number; roleId: Role }) => {
      updateRoleMutation.mutate(params, {
        onSuccess: () => {
          setSnackbar({
            open: true,
            message: translations('roleUpdatedSuccessfully'),
            variant: 'success'
          })
        }
      })
    },
    [updateRoleMutation, translations]
  )

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value)
      setCurrentPage(1)
    },
    []
  )

  const handleClearSearch = useCallback(() => {
    setSearchTerm('')
    setCurrentPage(1)
  }, [])

  const handlePageChange = useCallback(
    (page: number) => setCurrentPage(page),
    []
  )

  const handleToggleDropdown = useCallback(
    (index: number) =>
      setOpenDropdownIndex(previousState =>
        previousState === index ? null : index
      ),
    []
  )

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="m-10">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <p className="text-xl font-semibold">{translations('title')}</p>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onClearSearch={handleClearSearch}
        />
      </div>

      <hr className="my-10 border-gray-300 dark:border-gray-600" />

      {paginatedUsers?.users.length ? (
        <UserList
          users={paginatedUsers.users}
          openDropdownIndex={openDropdownIndex}
          onToggleDropdown={handleToggleDropdown}
          onRoleChange={handleRoleChange}
          totalPages={paginatedUsers.totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      ) : (
        <NoUsersMessage />
      )}

      <Snackbar
        {...snackbar}
        onClose={() =>
          setSnackbar(previousState => ({ ...previousState, open: false }))
        }
      />
    </div>
  )
}

export default withAdminRedirect(UsersPanel)
