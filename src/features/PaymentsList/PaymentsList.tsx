'use client'

import s from './../UsersList/UsersList.module.scss'
import { useQuery } from '@apollo/client/react'
import {
  GetPaymentsQuery,
  GetPaymentsQueryVariables,
} from '@/shared/api/queries/queries.generated'
import { GET_PAYMENTS } from '@/shared/api/queries/queries'
import { PaymentById } from '@/features/PaymentsList/PaymentsById/PaymentById'
import { usePagination } from '@/shared/hooks/UsePagination'
import { LinearProgress } from '@/shared/ui/LinearProgress/LinearProgress'
import { Button } from '@/shared/ui/Button/Button'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { Search } from '@/shared/ui/Search/Search'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useTableSort } from '@/shared/hooks/useTableSort'

export const PaymentsList = () => {

  const { itemsCountForPage, page, onChangePagination } = usePagination()
  const { sortConfig, handleSort, getSortIcon} = useTableSort()

  const [searchTerm, setSearchTerm] = useState('')

  const { data, loading } = useQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(GET_PAYMENTS, {
    variables: {
      pageNumber: page,
      pageSize: itemsCountForPage,
      sortBy: sortConfig.sortBy,
      sortDirection: sortConfig.sortDirection,
      searchTerm
    },
  })

  const t = useTranslations('paymentsList')

  return (
    <>
      {loading && <LinearProgress />}
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}  />
    <div>
      <table className={s.usersTable}>
        <thead>
        <tr>
          <th>
            <div className={s.thWrapper}>
              {t('fullName')}
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
                handleSort('dateAdded')
              }} style={{ padding: '6px' }}>
                {getSortIcon('dateAdded')}
              </Button>
            </div>
          </th>
          <th>
            <div className={s.thWrapper}>
              {t('amount')}
              <Button variant={'text'} onClick={() => {
                handleSort('amount')
              }} style={{ padding: '6px' }}>
                {getSortIcon('amount')}
              </Button>
            </div>
          </th>
          <th>{t('subscription')}</th>
          <th>
            <div className={s.thWrapper}>
              {t('paymentMethod')}
              <Button variant={'text'} onClick={() => {
                handleSort('paymentMethod')
              }} style={{ padding: '6px' }}>
                {getSortIcon('paymentMethod')}
              </Button>
            </div>
          </th>
        </tr>
        </thead>
        <tbody>
        {data?.getPayments.items.map(payment => (
          <tr key={payment.id}>
            <td className={s.ban}>
              <div className={s.cell}>
                {payment.avatars && payment.avatars[1]?.url ? (
                  <img
                    style={{borderRadius: '50%',}}
                    src={payment.avatars[1].url}
                    alt={payment.avatars[1]?.__typename || 'avatar'}
                  />
                ) : (
                  <div>{t('noAvatar')}</div>
                )}
                <span>{payment.userName}</span>
              </div>
            </td>
            {typeof payment?.userId === 'number' &&
              <PaymentById userId={payment?.userId} />
            }
          </tr>
        ))}
        </tbody>
      </table>
      <Pagination
        page={page}
        itemsCountForPage={itemsCountForPage}
        totalCount={data?.getPayments.totalCount || 0}
        pagesCount={data?.getPayments.pagesCount}
        onChange={onChangePagination}
      />
    </div>
    </>
  )
}