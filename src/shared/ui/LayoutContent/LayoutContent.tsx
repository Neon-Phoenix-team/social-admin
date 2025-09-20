'use client'

import { ReactNode } from 'react'
import '@/shared/styles/globals.css'
import { getMenuItems } from '@/shared/ui/Menu/menuData'
import { useTranslations } from 'next-intl'
import { Header } from '@/shared/ui/header/Header'
import { Menu } from '@/shared/ui/Menu/Menu'
import {useReactiveVar} from "@apollo/client/react";
import {isAdminVar} from "@/shared/api/client";


type Props = {
  children: ReactNode
}

export const LayoutContent = ({ children }: Props) => {



  const t = useTranslations('menu')
  const menuItems = getMenuItems({
    t
  })
    const isAdmin = useReactiveVar(isAdminVar);
  return (
    <>
      <Header />
      <div className="scroll-container">
          {isAdmin && <Menu items={menuItems} />}
        <main className="content">{children}</main>
      </div>
      {/*<ErrorAlert />*/}
    </>
  )
}
