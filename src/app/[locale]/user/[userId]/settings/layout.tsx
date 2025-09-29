'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import s from './Settings.module.scss'
import { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import { TabsComponent } from '@/shared/ui/Tabs/Tabs'
import { getSettingsSections } from '@/features/UserInformation/lib/Constants/Constants'
import avatar from '@/shared/assets/img/avatar.png'
import Image from 'next/image'
import { GET_USER_QUERY } from '@/shared/api/queries/queries'
import { useQuery } from '@apollo/client/react'
import { GetUserQuery, GetUserQueryVariables } from '@/shared/api/queries/queries.generated'
import { Button } from '@/shared/ui/Button/Button'
import ArrowBack from '@/shared/assets/icons/common/ArrowBack'
import { LinearProgress } from '@/shared/ui/LinearProgress/LinearProgress'

export default function SettingsLayout({ children }: { children: ReactNode }) {
  const params = useParams()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('settings')


  const userId = params.userId ? Number(params.userId) : null


  const { data, loading } = useQuery<GetUserQuery, GetUserQueryVariables>(GET_USER_QUERY, {
    variables: { userId: userId! },
    skip: !userId,
  })

  if (loading || !userId) return <div><LinearProgress/></div>

  const user = data?.getUser
  if (!user) return <div>{t("userNotFound")}</div>


  const onValueChange = (id: string) => {
    router.push(`/${params.locale}/user/${userId}/settings/${id}`)
  }
  const pathSegments = pathname.split('/')
  const value = pathSegments[pathSegments.length - 1]

  const avatarSrc = user.profile.avatars?.[0] ? user.profile.avatars?.[0].url : avatar

  const handleClick =()=>{
    router.push(`/${params.locale}/userList`)
  }


  return (
    <>
      <Button variant={'text'} onClick={handleClick}>
        <div className={s.ButtonWrapper}>
          <ArrowBack />
          {t("backToUsersList")}
        </div>
      </Button>
      <div>
        <div className={s.infoWrapper}>
          <div className={s.head}>
            <Image
              className={s.photo}
              src={avatarSrc!}
              alt="avatar"
              width={60}
              height={60}
            />
            <div className={s.nameWrapper}>
              <div className={s.lastName}>{`${user.profile.firstName} ${user.profile.lastName}`}</div>
              <div className={s.userName}>{user.profile.userName}</div>
            </div>
          </div>
          <div className={s.detailsWrapper}>
            <div className={s.details}>
              <div className={s.label}>{t("userId")}</div>
              <div>{user.profile.id}</div>
            </div>
            <div className={s.details}>
              <div className={s.label}>{t("profileCreationDate")}</div>
              <div>{new Date(user.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </div>
      <TabsComponent
        className={s.nav}
        tabs={getSettingsSections(t)}
        defaultValue={value}
        onValueChange={onValueChange}
      />

      <div className={s.content}>{children}</div>
    </>
  )
}