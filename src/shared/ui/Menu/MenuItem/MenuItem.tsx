'use client'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import s from './MenuItem.module.scss'

export type MenuItemPropsType = {
  name: string
  path: string
  icon?: React.ReactElement
  iconActive?: React.ReactElement
  isActive?: boolean
  className?: string
}

export const MenuItem = (props: MenuItemPropsType) => {
  const pathname = usePathname()
  const { locale } = useParams()
  const isActive = pathname === '/' + locale + props.path

  return (
    <li className={props.className}>
      <Link
        href={props.path}
        className={isActive ? s.link + ' ' + s.active : s.link}
      >
        <span className={s.outline}>
          {isActive ? props.iconActive : props.icon}
          {props.name}
        </span>
      </Link>
    </li>
  )
}
