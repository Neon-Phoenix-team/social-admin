'use client'

import {UsersList} from '@/features/UsersList/UsersList'
import {withAdminGuard} from "@/shared/lib/withAdminGuard";

function UsersPage() {
    return (
        <UsersList/>
    )
}

export default withAdminGuard(UsersPage)