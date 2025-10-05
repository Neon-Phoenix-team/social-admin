'use client'

import { GET_USERS_QUERY } from '@/shared/api/queries/queries'
import { useQuery } from '@apollo/client/react'
import {
    GetUsersQuery,
    GetUsersQueryVariables,
} from '@/shared/api/queries/queries.generated'
import s from './UsersList.module.scss'
import {Dropdown} from '@/shared/ui/DropDown/DropDown'
import {Pagination} from '@/shared/ui/Pagination/Pagination'
import {useState} from 'react'
import {useTranslations} from 'next-intl'
import Block from '@/shared/assets/icons/components/dropDown/Block'
import Filter from '@/shared/assets/icons/common/Filter'
import { Button } from '@/shared/ui/Button/Button'
import {SortDirection } from '@/shared/api/types'
import SortAsc from '@/shared/assets/icons/common/SortAsc'
import SortDesc from '@/shared/assets/icons/common/SortDesc'
import { LinearProgress } from '@/shared/ui/LinearProgress/LinearProgress'

export type SortConfigType = {
  sortBy: string | null;
  sortDirection: SortDirection | null;
}
import {UserSearchInput} from "@/features/Search/UserSearchInput";
import {SelectBox} from "@/shared/ui/Select/SelectBox";
import {UserBlockStatus} from "@/shared/api/types";
import {usePaginationAndSort} from '@/shared/hooks/UsePaginationAndSort'

export const UsersList = () => {
    const t = useTranslations('userList')

    const {
        page,
        itemsCountForPage,
        onChangePagination,
        getSortIcon,
        handleSort,
        sortConfig
    } = usePaginationAndSort()


    const [search, setSearch] = useState('')
    const [status, setStatus] = useState<'ALL' | 'BLOCKED'>('ALL')


  const {data, loading} = useQuery<GetUsersQuery, GetUsersQueryVariables>(
        GET_USERS_QUERY,
        {
            variables: {
                pageNumber: page,
                pageSize: itemsCountForPage,
                searchTerm: search || undefined,
                statusFilter: status === 'BLOCKED' ? UserBlockStatus.Blocked : undefined,
                sortBy: sortConfig.sortBy,
                sortDirection: sortConfig.sortDirection,
            },
        }
    )


    const onSearchChange = (value: string) => {
        onChangePagination({page: 1, count: itemsCountForPage});
        setSearch(value);
    }


    const onStatusChange = (val: string) => {
        onChangePagination({page: 1, count: itemsCountForPage});
        setStatus(val as 'ALL' | 'BLOCKED');
    }

    const filterOptions = [
        {id: 'ALL', value: t('filterUsers.allUsers')},
        {id: 'BLOCKED', value: t('filterUsers.blockedUsers')},
    ]


    return (
        <div>
            {/* Группа поиска и фильтрации (Остается на месте) */}
            <div className={s.searchGroup}>
                <UserSearchInput
                    onSearch={onSearchChange}
                    placeholder={t('userSearch')}

                />
                <SelectBox
                    value={status}
                    onValueChange={onStatusChange}
                    options={filterOptions}
                    placeholder={t('filterPlaceholder')}
                    idValue={true}
                    className={s.SelectBox}
                />
            </div>


            {loading && <LinearProgress/>}

            {/* Таблица */}
            <table className={s.usersTable}>
                <thead>
                <tr>
                    <th>{t('userId')}</th>
                    <th>{t('profileLink')}</th>
                    <th>
                        <div className={s.thWrapper}>
                            {t('userName')}
                            <Button variant={'text'} onClick={() => handleSort('userName')} style={{padding: '6px'}}>
                                {getSortIcon('userName')}
                            </Button>
                        </div>
                    </th>
                    <th>
                        <div className={s.thWrapper}>
                            {t('dateAdded')}
                            <Button variant={'text'} onClick={() => handleSort('createdAt')} style={{padding: '6px'}}>
                                {getSortIcon('createdAt')}
                            </Button>
                        </div>
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {data?.getUsers.users && data.getUsers.users.length > 0 ? (
                    data.getUsers.users.map((user) => (
                        user && <tr key={user.id}>
                            <td className={s.ban}>
                                <div className={s.cell}>
                                    {user.userBan ? <Block className={s.icon}/> : <span className={s.empty}/>}
                                    <span>{user.id}</span>
                                </div>
                            </td>
                            <td>{user.email}</td>
                            <td>{user.userName}</td>
                            <td>{user.createdAt ? new Date(user.createdAt).toLocaleString() : '-'}</td>
                            <td>
                                <Dropdown item={user}/>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5}>{loading ? t('loading') : t('noUsers')}</td>
                    </tr>
                )}
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