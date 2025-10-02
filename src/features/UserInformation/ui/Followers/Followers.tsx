'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import s from '../Table.module.scss'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { SortDirection } from '@/shared/api/types'
import { useQuery } from '@apollo/client/react'
import { GetFollowersQuery, GetFollowersQueryVariables, } from '@/shared/api/queries/queries.generated'
import { GET_FOLLOWERS_QUERY } from '@/shared/api/queries/queries'
import SortAsc from '@/shared/assets/icons/common/SortAsc'
import SortDesc from '@/shared/assets/icons/common/SortDesc'
import Filter from '@/shared/assets/icons/common/Filter'
import { LinearProgress } from '@/shared/ui/LinearProgress/LinearProgress'
import { Button } from '@/shared/ui/Button/Button'
import { SortConfigType } from '@/features/UsersList/UsersList'
import { useParams } from 'next/navigation'

export const Followers = () => {

  const params = useParams()
  const t = useTranslations('userList')

  const [page, setPage] = useState(1)
  const [itemsCountForPage, setItemsCountForPage] = useState(8)
  const [sortConfig, setSortConfig] = useState<SortConfigType>(
    { sortBy: 'createdAt', sortDirection: SortDirection.Desc })

  const userId = params.userId ? Number(params.userId) : null

  const { data, loading } = useQuery<GetFollowersQuery, GetFollowersQueryVariables>(GET_FOLLOWERS_QUERY, {
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

  const getSortIcon = (columnName: string) => {
    if (sortConfig.sortBy === columnName) {
      if (sortConfig.sortDirection === SortDirection.Asc) {
        return <SortAsc />
      } else {
        return <SortDesc />
      }
    }
    return <Filter />
  }


  const handleSort = (columnName: string) => {
    setSortConfig(prevConfig => {
      if (prevConfig.sortBy === columnName) {
        return {
          sortBy: columnName,
          sortDirection: prevConfig.sortDirection === SortDirection.Asc
            ? SortDirection.Desc
            : SortDirection.Asc,
        }
      }
      return { sortBy: columnName, sortDirection: SortDirection.Asc }
    })
  }

  if (loading) return <div><LinearProgress /></div>
  if (data?.getFollowers.items.length === 0) return <div>{t('noSubscribers')}</div>


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
        {data?.getFollowers.items.map(user => (
          <tr key={user.id}>
            <td>{user.userId}</td>
            <td>{user.userName}</td>
            <td>{`${user.firstName} ${user.lastName}`}</td>
            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <Pagination
        page={page}
        itemsCountForPage={itemsCountForPage}
        totalCount={data?.getFollowers.totalCount || 0}
        pagesCount={data?.getFollowers.pagesCount}
        onChange={onChangePagination}
      />
    </div>
  )
}