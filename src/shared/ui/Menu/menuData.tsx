import { useTranslations } from 'next-intl'
import { MenuItemPropsType } from './MenuItem/MenuItem'

export type Translate = ReturnType<typeof useTranslations>

type Props = {
  // userId: number | undefined
  t: Translate
}

export function getMenuItems({ t }: Props) {
  const menu: MenuItemPropsType[] = [
    {
      name: t('userList'),
      path: '/userList',
      // icon: <HomeOutline />,
      // iconActive: <Home />,
    },
    {
      name: t('statistics'),
      path: '/statistics',
      // icon: <PlusSquareOutline />,
      // iconActive: <PlusSquare />,
    },
    {
      name: t('paymentsList'),
      path: `/paymentsList`,
      // icon: <PersonOutline />,
      // iconActive: <Person />,
    },
    {
      name: t('postsList'),
      path: '/postsList',
      // icon: <MessageCircleOutline />,
      // iconActive: <MessageCircle />,
    },

  ]

  return menu
}
