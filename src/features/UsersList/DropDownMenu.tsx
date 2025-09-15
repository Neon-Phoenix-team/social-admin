'use client'

import MoreHorizontal from '@/shared/assets/icons/components/MoreHorizontal'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import s from './DropdownMenu.module.scss'
import { User } from '@/shared/api/types'

type Props = {
  user: User
  onEditModeToggle?: () => void
}
export function Dropdown({ user, onEditModeToggle }: Props) {
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
          <DropdownMenu.Item className={s.menuItem}>
              <div className={s.item}>
          Delete User
              </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={s.menuItem}>
            <div className={s.item}>
              Ban in the system
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={s.menuItem}>
            <div className={s.item}>
              More information
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  )
}
