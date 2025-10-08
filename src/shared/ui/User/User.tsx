import { Avatar } from '@/shared/ui/Avatar/Avatar'
import Link from 'next/link'
import s from './User.module.scss'

type PropsType = {
  userId: number
  userName: string
  url?: string
  style?: React.CSSProperties
  locale?: string
}
export function User({ userId, userName, url, style, locale }: PropsType) {
  return (
    <Link className={s.user} href={`/${locale}/user/${userId}`} style={style}>
      <Avatar url={url} />
      <div className={s.userName}>{userName}</div>
    </Link>
  )
}
