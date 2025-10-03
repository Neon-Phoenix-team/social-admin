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
import { useTranslations } from 'next-intl'
import Block from '@/shared/assets/icons/components/dropDown/Block'
import { Button } from '@/shared/ui/Button/Button'
import { LinearProgress } from '@/shared/ui/LinearProgress/LinearProgress'
import { usePaginationAndSort } from '@/shared/hooks/UsePaginationAndSort'

export const UsersList = () => {

  const {page, itemsCountForPage, onChangePagination, getSortIcon, handleSort, sortConfig} = usePaginationAndSort()

  const { data, loading } = useQuery<GetUsersQuery, GetUsersQueryVariables>(GET_USERS_QUERY, {
    variables: {
      pageNumber: page,
      pageSize: itemsCountForPage,
      sortBy: sortConfig.sortBy,
      sortDirection: sortConfig.sortDirection,
    },
  })

  const t = useTranslations('userList')

  if (loading) return <div><LinearProgress /></div>

  return (
    <div>
      <table className={s.usersTable}>
        <thead>
        <tr>
          <th>{t('userId')}</th>
          <th>{t('profileLink')}</th>
          <th>
            <div className={s.thWrapper}>
              {t('userName')}
              <Button variant={'text'} onClick={() => {
                handleSort('userName')
              }} style={{ padding: '6px' }}>
                {getSortIcon('userName')}
              </Button>
            </div>

          </th>
          <th>
            <div className={s.thWrapper}>
              {t('dateAdded')}
              <Button variant={'text'} onClick={() => {
                handleSort('createdAt')
              }} style={{ padding: '6px' }}>
                {getSortIcon('createdAt')}
              </Button>
            </div>
          </th>
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