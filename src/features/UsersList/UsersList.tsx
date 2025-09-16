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


const labelsForDropDown = ['Delete User', 'Ban in the system', 'More information']

export const UsersList = () => {
  const [page, setPage] = useState(1)
  const [itemsCountForPage, setItemsCountForPage] = useState(8)
  const { data, loading, error } = useQuery<GetUsersQuery, GetUsersQueryVariables>(GET_USERS_QUERY, {
    variables: { pageNumber: page, pageSize: itemsCountForPage },
  })

  const onChangePagination=(args: { page: number; count: number })=>{
    setPage(args.page)
    setItemsCountForPage(args.count)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <table className={s.usersTable}>
        <thead>
        <tr>
          <th>User Id</th>
          <th>Profile link</th>
          <th>Username</th>
          <th>Date added</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {data?.getUsers.users.map(user => (
          <tr key={user.id}>
            <td>
              <span>{user.userBan && 'Ban'} </span>
              <span>{!user.userBan && 'no'} </span>
              <span>{user.id}</span>
              </td>
            <td>{user.email}</td>
            <td>{user.userName}</td>
            <td>{new Date(user.createdAt).toLocaleString()}</td>
            <td><Dropdown item={user} labels={labelsForDropDown} /></td>
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