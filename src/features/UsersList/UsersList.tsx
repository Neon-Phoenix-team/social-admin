'use client'

import { GET_USERS_QUERY } from '@/shared/api/queries/queries'
import { useQuery } from '@apollo/client/react'
import {
  GetUsersQuery,
  GetUsersQueryVariables,
} from '@/shared/api/queries/queries.generated'
import s from './UsersList.module.scss'
import { Dropdown } from '@/shared/ui/DropDown/DropDown'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Block from '@/shared/assets/icons/components/dropDown/Block'
import {UserSearchInput} from "@/features/Search/UserSearchInput";

export const UsersList = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [itemsCountForPage, setItemsCountForPage] = useState(8)
  const { data, loading } = useQuery<GetUsersQuery, GetUsersQueryVariables>(GET_USERS_QUERY, {
    variables: { pageNumber: page, pageSize: itemsCountForPage, searchTerm: search || undefined,},
  })

  const t = useTranslations('userList')

  const onChangePagination = (args: { page: number; count: number }) => {
    setPage(args.page)
    setItemsCountForPage(args.count)
  }

  if (loading) return <div>Loading...</div>


  return (
    <div>
      <UserSearchInput
          onSearch={(value) => {
            setPage(1) // сброс на первую страницу
            setSearch(value)
          }}
          placeholder={t('searchPlaceholder')}
      />
      <table className={s.usersTable}>
        <thead>
        <tr>
          <th>{t('userId')}</th>
          <th>{t('profileLink')}</th>
          <th>{t('userName')}</th>
          <th>{t('dateAdded')}</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {data?.getUsers.users.map(user => (
          <tr key={user.id}>
            <td className={s.ban}>
              <div className={s.cell}>
                {user.userBan ? <Block className={s.icon} /> : <span className={s.empty} />}
                <span>{user.id}</span>
              </div>
            </td>
            <td>{user.email}
            </td>
            <td>{user.userName}</td>
            <td>{new Date(user.createdAt).toLocaleString()}</td>
            <td><Dropdown item={user} /></td>
          </tr>
        ))}
        </tbody>
      </table>
      <Pagination
        page={page}
        itemsCountForPage={itemsCountForPage}
        totalCount={data?.getUsers.pagination.totalCount || 0}
        pagesCount={data?.getUsers.pagination.pagesCount}
        onChange={onChangePagination}
      />
    </div>
  )
}