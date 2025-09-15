'use client'

import { GET_USERS_QUERY } from '@/shared/api/queries/queries'
import { useQuery } from '@apollo/client/react'
import {
  GetUsersQuery,
  GetUsersQueryVariables,
} from '@/shared/api/queries/queries.generated'
import s from './UsersList.module.scss'
import { Dropdown } from '@/features/UsersList/DropDownMenu'

export const UsersList = () => {
const { data: usersData,loading, error  } = useQuery<GetUsersQuery,GetUsersQueryVariables>(GET_USERS_QUERY, {
  variables: { pageNumber: 1, pageSize: 10 }})

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
        {usersData?.getUsers.users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td>{user.userName}</td>
            <td>{new Date(user.createdAt).toLocaleString()}</td>
            <td><Dropdown user={user} /></td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}