'use client'

import MoreHorizontal from '@/shared/assets/icons/components/MoreHorizontal'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import s from './Dropdown.module.scss'
import { User } from '@/shared/api/types'

type Props = {
  item: User
  onEditModeToggle?: () => void
  labels: string[]
}
export function Dropdown({ item,labels, onEditModeToggle }: Props) {
  return (
    <>
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger asChild>
          <button className={s.menuTrigger}>
            <MoreHorizontal />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          className={s.menuContent}
          side="bottom"
          sideOffset={8}
          align="end"
        >
          {labels.map((label,i) => (
            <DropdownMenu.Item className={s.menuItem} key={i}>
              <div className={s.item} >
                {label}
              </div>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  )
}
