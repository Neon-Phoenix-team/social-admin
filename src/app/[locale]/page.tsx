'use client'

import {SignInForm} from "@/features/Auth/SignInForm";
import { isAdminVar } from '@/shared/api/client'
import { UsersList } from '@/features/UsersList/UsersList'
import { useReactiveVar } from '@apollo/client/react'

export default function HomeContent() {
  const isAdmin = useReactiveVar(isAdminVar);
  return isAdmin ? <UsersList/> : <SignInForm/>
}
