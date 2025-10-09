'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import s from '../Table.module.scss'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { useQuery } from '@apollo/client/react'
import { GetFollowingQuery, GetFollowingQueryVariables } from '@/shared/api/queries/queries.generated'
import { GET_FOLLOWING_QUERY } from '@/shared/api/queries/queries'
import { LinearProgress } from '@/shared/ui/LinearProgress/LinearProgress'
import { Button } from '@/shared/ui/Button/Button'
import { useParams } from 'next/navigation'
import { useTableSort } from '@/shared/hooks/useTableSort'

export const Following = () => {

  const params = useParams()
  const t = useTranslations('userList')

  const [page, setPage] = useState(1)
  const [itemsCountForPage, setItemsCountForPage] = useState(8)


  const userId = params.userId ? Number(params.userId) : null

  const {sortConfig,handleSort,getSortIcon} = useTableSort()

  const { data, loading } = useQuery<GetFollowingQuery, GetFollowingQueryVariables>(GET_FOLLOWING_QUERY, {
    variables: {
      pageNumber: page,
      pageSize: itemsCountForPage,
      sortBy: sortConfig.sortBy,
      sortDirection: sortConfig.sortDirection,
      userId: userId!,
    },
  })



  const onChangePagination = (args: { page: number; count: number }) => {
    setPage(args.page)
    setItemsCountForPage(args.count)
  }


  if (loading) return <div><LinearProgress /></div>
  if (data?.getFollowing.items.length === 0) return <div>{t('noSubscriptions')}</div>


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
              {t('subscriptionDate')}
              <Button variant={'text'} onClick={() => {
                handleSort('createdAt')
              }} style={{ padding: '6px' }}>
                {getSortIcon('createdAt')}
              </Button>
            </div>
          </th>
        </tr>
        </thead>
        <tbody>
        {data?.getFollowing.items.map(user => (
          <tr key={user.id}>
            <td>{user.userId}</td>
            <td>{user.userName}</td>
            <td>{user.firstName && user.lastName
              ? `${user.firstName} ${user.lastName}`
              : t('userNameMissing')}
              </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <Pagination
        page={page}
        itemsCountForPage={itemsCountForPage}
        totalCount={data?.getFollowing.totalCount || 0}
        pagesCount={data?.getFollowing.pagesCount}
        onChange={onChangePagination}
      />
    </div>
  )
}