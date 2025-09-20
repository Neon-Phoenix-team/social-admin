import { useTranslations } from 'next-intl'
import { MenuItemPropsType } from './MenuItem/MenuItem'
import Account from '@/shared/assets/icons/components/menu/Account'
import TrendingUp from '@/shared/assets/icons/components/menu/TrendingUp'
import PaymentsIcon from '@/shared/assets/icons/components/menu/PaymentsIcon'
import ImageOutline from '@/shared/assets/icons/components/menu/ImageOutline'

export type Translate = ReturnType<typeof useTranslations>

type Props = {
  t: Translate
}

export function getMenuItems({ t }: Props) {
  const menu: MenuItemPropsType[] = [
    {
      name: t('userList'),
      path: '/userList',
      icon: <Account />,
    },
    {
      name: t('statistics'),
      path: '/statistics',
      icon: <TrendingUp />,
    },
    {
      name: t('paymentsList'),
      path: `/paymentsList`,
      icon: <PaymentsIcon />,
    },
    {
      name: t('postsList'),
      path: '/postsList',
      icon: <ImageOutline />,
    },

  ]

  return menu
}
