'use client'


import {PaymentsList} from '@/features/PaymentsList/PaymentsList'
import {withAdminGuard} from "@/shared/lib/withAdminGuard";

function PaymentsListPage() {
    return (
        <PaymentsList/>
    )
}

export default withAdminGuard(PaymentsListPage)