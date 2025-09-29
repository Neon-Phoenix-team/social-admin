'use client'

import { redirect, useParams } from 'next/navigation'
// import { useAuthGuard } from '@/shared/hooks'

export default function SettingsIndexPage() {
  const { locale, userId } = useParams()
  // const {user} = useAuthGuard()
  // const isOwner = user?.userId === userId

  redirect(`/${locale}/user/${userId}/settings/uploadedPhotos` )
  // redirect(isOwner ? `/${locale}/user/${userId}/settings/payments` : `/${locale}`)
}