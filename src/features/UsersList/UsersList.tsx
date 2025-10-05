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
import { UserBlockStatus } from "@/shared/api/types";
import { Button } from '@/shared/ui/Button/Button'
import { LinearProgress } from '@/shared/ui/LinearProgress/LinearProgress'
import { usePaginationAndSort } from '@/shared/hooks/UsePaginationAndSort'

export const UsersList = () => {
    const t = useTranslations('userList')

    // 1. Управление пагинацией и сортировкой через хук
    const {
        page,
        itemsCountForPage,
        onChangePagination, // Используется для изменения страницы ИЛИ количества элементов на странице
        getSortIcon,
        handleSort,
        sortConfig
    } = usePaginationAndSort()

    // 2. Управление поиском и фильтрацией через useState
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState<'ALL' | 'BLOCKED'>('ALL') // Установим 'ALL' как по умолчанию

    // 3. Логика запроса данных (объединяет все параметры)
    const { data, loading } = useQuery<GetUsersQuery, GetUsersQueryVariables>(
        GET_USERS_QUERY,
        {
            variables: {
                pageNumber: page,
                pageSize: itemsCountForPage,
                searchTerm: search || undefined,
                // Если статус 'BLOCKED', передаем ENUM, иначе undefined
                statusFilter: status === 'BLOCKED' ? UserBlockStatus.Blocked : undefined,
                sortBy: sortConfig.sortBy,
                sortDirection: sortConfig.sortDirection,
            },
        }
    )

    // 4. Обработчик изменения поиска
    const onSearchChange = (value: string) => {
        // Сброс страницы на 1 при новом поиске
        onChangePagination({ page: 1, count: itemsCountForPage });
        setSearch(value);
    }

    // 5. Обработчик изменения фильтра
    const onStatusChange = (val: string) => {
        // Сброс страницы на 1 при новой фильтрации
        onChangePagination({ page: 1, count: itemsCountForPage });
        setStatus(val as 'ALL' | 'BLOCKED');
    }

    const filterOptions = [
        { id: 'ALL', value: t('filterUsers.allUsers') },
        { id: 'BLOCKED', value: t('filterUsers.blockedUsers') },
    ]

    // 6. Условие загрузки
    if (loading) return <div><LinearProgress /></div>

    return (
        <div>
            {/* Группа поиска и фильтрации */}
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
                />
            </div>

            {/* Таблица */}
            <table className={s.usersTable}>
                <thead>
                <tr>
                    <th>{t('userId')}</th>
                    <th>{t('profileLink')}</th>
                    {/* Заголовок с кнопкой сортировки для userName */}
                    <th>
                        <div className={s.thWrapper}>
                            {t('userName')}
                            <Button variant={'text'} onClick={() => handleSort('userName')} style={{ padding: '6px' }}>
                                {getSortIcon('userName')}
                            </Button>
                        </div>
                    </th>
                    {/* Заголовок с кнопкой сортировки для dateAdded/createdAt */}
                    <th>
                        <div className={s.thWrapper}>
                            {t('dateAdded')}
                            <Button variant={'text'} onClick={() => handleSort('createdAt')} style={{ padding: '6px' }}>
                                {getSortIcon('createdAt')}
                            </Button>
                        </div>
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {/* Безопасная проверка наличия и длины массива пользователей */}
                {data?.getUsers.users && data.getUsers.users.length > 0 ? (
                    data.getUsers.users.map((user) => (
                        // Проверка на null/undefined в элементах массива для TS-корректности
                        user && <tr key={user.id}>
                            <td className={s.ban}>
                                <div className={s.cell}>
                                    {user.userBan ? <Block className={s.icon} /> : <span className={s.empty} />}
                                    <span>{user.id}</span>
                                </div>
                            </td>
                            <td>{user.email}</td>
                            <td>{user.userName}</td>
                            {/* Безопасное отображение даты */}
                            <td>{user.createdAt ? new Date(user.createdAt).toLocaleString() : '-'}</td>
                            <td>
                                <Dropdown item={user} />
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr><td colSpan={5}>{t('noUsers')}</td></tr>
                )}
                </tbody>
            </table>

            {/* Пагинация */}
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