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
import { UserSearchInput } from "@/features/Search/UserSearchInput";
import { SelectBox } from "@/shared/ui/Select/SelectBox";
import {UserBlockStatus} from "@/shared/api/types";


export const UsersList = () => {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [itemsCountForPage, setItemsCountForPage] = useState(8)
    const [status, setStatus] = useState<'ALL' | 'BLOCKED'>('BLOCKED')

    const { data, loading } = useQuery<GetUsersQuery, GetUsersQueryVariables>(
        GET_USERS_QUERY,
        {
            variables: {
                pageNumber: page,
                pageSize: itemsCountForPage,
                searchTerm: search || undefined,
                statusFilter: status === 'BLOCKED' ? UserBlockStatus.Blocked : undefined,
            },
        }
    )

    const t = useTranslations('userList')

    const onChangePagination = (args: { page: number; count: number }) => {
        setPage(args.page)
        setItemsCountForPage(args.count)
    }

    const filterOptions = [
        { id: 'ALL', value: t('filterUsers.allUsers') },
        { id: 'BLOCKED', value: t('filterUsers.blockedUsers') },
    ]

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <div className={s.searchGroup}>
                <UserSearchInput
                    onSearch={(value) => {
                        setPage(1)
                        setSearch(value)
                    }}
                    placeholder={t('userSearch')}
                />
                <SelectBox
                    value={status}
                    onValueChange={(val) => {
                        setPage(1)
                        setStatus(val as 'ALL' | 'BLOCKED')
                    }}
                    options={filterOptions}
                    placeholder={t('filterPlaceholder')}
                    idValue={true} // важная правка!
                />
            </div>

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
                {data?.getUsers.users?.map((user) => (
                    <tr key={user?.id}>
                        <td className={s.ban}>
                            <div className={s.cell}>
                                {user?.userBan ? <Block className={s.icon} /> : <span className={s.empty} />}
                                <span>{user?.id}</span>
                            </div>
                        </td>
                        <td>{user?.email}</td>
                        <td>{user?.userName}</td>
                        <td>{user?.createdAt ? new Date(user.createdAt).toLocaleString() : '-'}</td>
                        <td>
                            {user && <Dropdown item={user} />}
                        </td>
                    </tr>
                )) || <tr><td colSpan={5}>{t('noUsers')}</td></tr>}
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
