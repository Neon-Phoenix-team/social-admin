import { Avatar } from '@/shared/ui/Avatar/Avatar'
import s from './User.module.scss'

type PropsType = {
  userName: string
  url?: string
}
export function User({ userName, url }: PropsType) {
  // const locale = await getLocale()
  return (
    <div className={s.user}>
      <Avatar url={url} />
      <div className={s.userName}>{userName}</div>
    </div>
  )
}
