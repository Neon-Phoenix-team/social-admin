'use client'

import { useQuery } from '@apollo/client/react'
import {
  GetPaymentsByIdUserQuery, GetPaymentsByIdUserQueryVariables,
} from '@/shared/api/queries/queries.generated'
import { GET_PAYMENTS_BY_USER_QUERY } from '@/shared/api/queries/queries'

type PropsType = {
  userId: number
}

// enum SubscriptionType {
//   DAY = '1 day',
//   WEEKLY = '7 days',
//   MONTHLY = '30 days'
// }
//
// enum CurrencyType {
//   USD = '$',
//   EUR = '€'
// }

const SUBSCRIPTION_LABELS = {
  DAY: '1 day',
  WEEKLY: '7 days',
  MONTHLY: '30 days',
} as const;

const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
} as const;

export const PaymentById = ({ userId }: PropsType) => {

  const { data } = useQuery<GetPaymentsByIdUserQuery, GetPaymentsByIdUserQueryVariables>(GET_PAYMENTS_BY_USER_QUERY, {
    variables: { userId: userId },
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')      // день с ведущим нулём
    const month = String(date.getMonth() + 1).padStart(2, '0') // месяц (0-11, поэтому +1) с ведущим нулём
    const year = date.getFullYear()

    return `${day}.${month}.${year}`
  }

  const getCurrency = (currency: string | null | undefined) => CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS] ?? ''

  const getLabels = (type: string | null | undefined) => SUBSCRIPTION_LABELS[type as keyof typeof SUBSCRIPTION_LABELS] ?? ''

  return (
    <>
      <td>{formatDate(data?.getPaymentsByUser.items[0]?.dateOfPayment)}</td>
      <td>{data?.getPaymentsByUser.items[0].payments[0].amount} {getCurrency(data?.getPaymentsByUser.items[0].payments[0].currency)}</td>
      <td>{getLabels(data?.getPaymentsByUser.items[0].type)}</td>
      <td>{data?.getPaymentsByUser.items[0].paymentType}</td>
    </>
  )
}