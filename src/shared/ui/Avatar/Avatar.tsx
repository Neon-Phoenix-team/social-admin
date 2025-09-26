import ava from '@/shared/img/avatar.png'
import Image from 'next/image'

type PropsTypes = {
  url?: string
  size?: number
  style?: React.CSSProperties
}
export const Avatar = ({ url, size, style }: PropsTypes) => {
  return (
    <Image
      src={url || ava}
      alt="avatar"
      width={size || 36}
      height={size || 36}
      style={{ borderRadius: '50%', ...style }}
    />
  )
}
