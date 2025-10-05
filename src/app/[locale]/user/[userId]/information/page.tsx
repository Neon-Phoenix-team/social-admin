'use client'

import { redirect, useParams } from 'next/navigation'

export default function SettingsIndexPage() {
  const { locale, userId } = useParams()
  redirect(`/${locale}/user/${userId}/information/uploadedPhotos` )
}