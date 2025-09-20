'use client'

import MoreHorizontal from '@/shared/assets/icons/components/dropDown/MoreHorizontal'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import s from './Dropdown.module.scss'
import { User } from '@/shared/api/types'
import { useState } from 'react'
import { ActionModal } from '@/shared/ui/Button/ActionModal'
import { useTranslations } from 'next-intl'
import Block from '@/shared/assets/icons/components/dropDown/Block'
import Block1 from '@/shared/assets/icons/components/dropDown/Block1'
import PersonRemoveOutline from '@/shared/assets/icons/components/dropDown/PersonRemoveOutline'


export type modalType = null | 'delete' | 'ban' | 'unban'

type Props = {
  item: User
  onEditModeToggle?: () => void
}

export function Dropdown({ item}: Props) {
  const [modalType, setModalType] = useState<modalType>(null)
  const handleOpenModal = (type: 'delete' | 'ban' | 'unban') => {
    setModalType(type)
  }

  const t = useTranslations("userList.dropDown")

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
          <DropdownMenu.Item className={s.menuItem} onClick={() => handleOpenModal('delete')}>
            <div className={s.item}>
              <PersonRemoveOutline/>{t('delete')}
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={s.menuItem} onClick={() => handleOpenModal(item.userBan ? 'unban' : 'ban')}>
            <div className={s.item}>
              {item.userBan ? <><Block1/>{t('unban')}</> :  <><Block/>{t('ban')}</>}
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={s.menuItem}>
            <div className={s.item}>
              <MoreHorizontal/>{t('info')}
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <ActionModal modalType={modalType} userId={item.id} isBan={!!item.userBan} userName={item.userName}
                   onClose={setModalType} />
    </>
  )
}
