'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import s from '../Table.module.scss'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { useQuery } from '@apollo/client/react'
import { GetPaymentsByUserQuery, GetPaymentsByUserQueryVariables } from '@/shared/api/queries/queries.generated'
import { GET_PAYMENTS_BY_USER_QUERY } from '@/shared/api/queries/queries'
import { LinearProgress } from '@/shared/ui/LinearProgress/LinearProgress'
import { useParams } from 'next/navigation'

export const Payments = () => {

  const params = useParams()
  const t = useTranslations('paymentTable')

  const [page, setPage] = useState(1)
  const [itemsCountForPage, setItemsCountForPage] = useState(8)

  const userId = params.userId ? Number(params.userId) : null

  const { data, loading } = useQuery<GetPaymentsByUserQuery, GetPaymentsByUserQueryVariables>(GET_PAYMENTS_BY_USER_QUERY, {
    variables: {
      pageNumber: page,
      pageSize: itemsCountForPage,
      userId: userId!,
    },
  })


  const onChangePagination = (args: { page: number; count: number }) => {
    setPage(args.page)
    setItemsCountForPage(args.count)
  }


  if (loading) return <div><LinearProgress /></div>
  if(data?.getPaymentsByUser.items.length === 0 ) return <div>{t('noPayments')}</div>


  return (
    <div>
      <table className={s.usersTable}>
        <thead>
        <tr>
          <th>{t('dateOfPayment')}</th>
          <th>{t('endDateOfSubscription')}</th>
          <th>{t('amount')}</th>
          <th>{t('subscriptionType')}</th>
          <th>{t('paymentType')}</th>
        </tr>
        </thead>
        <tbody>
        {data?.getPaymentsByUser.items.map(user => (
          <tr key={user.id}>
            <td>{new Date(user.dateOfPayment).toLocaleDateString()}</td>
            <td>{new Date(user.endDate).toLocaleDateString()}</td>
            <td>{user.price}</td>
            <td>{user.type === 'WEEKLY' ? t('days') : user.type === 'MONTHLY' ? t('month') : t('day')}</td>
            <td>{user.paymentType}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <Pagination
        page={page}
        itemsCountForPage={itemsCountForPage}
        totalCount={data?.getPaymentsByUser.totalCount || 0}
        pagesCount={data?.getPaymentsByUser.pagesCount}
        onChange={onChangePagination}
      />
    </div>
  )
}