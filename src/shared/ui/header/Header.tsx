'use client'

import styles from './Header.module.scss'
import { SelectBox } from '@/shared/ui/Select/SelectBox'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/shared/i18n/navigation'
import { SelectOption } from '@/shared/ui/Select/SelectType'
import FlagRussia from '@/shared/assets/icons/common/FlagRussia'
import FlagUnitedKingdom from '@/shared/assets/icons/common/FlagUnitedKingdom'


export const Header = () => {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  // const t = useTranslations('header')
  // const isLoggedIn = !!data

  const onClickLogo = () => {
    router.push('/')
  }

  const language: SelectOption[] = [
    {
      id: 'ru',
      value: 'ru',
      description: 'Русский',
      img: <FlagRussia />,
    },
    {
      id: 'en',
      value: 'en',
      description: 'English',
      img: <FlagUnitedKingdom />,
    },
  ]

  const changeLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <h2 onClick={onClickLogo}>Inctagram</h2>
        <div className={styles.menu}>
          <div className={styles.langButton}>
            <SelectBox
              className={styles.customTriggerSelect}
              options={language}
              value={locale}
              onValueChange={changeLanguage}
              idValue={true}
            />
          </div>

          {/*{shouldShowAuthButtons && (*/}
          {/*  <AdaptiveHeaderMenu*/}
          {/*    desktopContent={*/}
          {/*      <div className={styles.authButtons}>*/}
          {/*        <Button onClick={onClickLogin} variant="text">*/}
          {/*          {t('loginButtons.loginText')}*/}
          {/*        </Button>*/}
          {/*        <Button onClick={onClickSignup}>*/}
          {/*          {t('loginButtons.registerText')}*/}
          {/*        </Button>*/}
          {/*      </div>*/}
          {/*    }*/}
          {/*    mobileContent={*/}
          {/*      <div className={styles.authMobileButtons}>*/}
          {/*        <Button onClick={onClickLogin} variant="text">*/}
          {/*          {t('loginButtons.loginText')}*/}
          {/*        </Button>*/}
          {/*        <Button onClick={onClickSignup}>*/}
          {/*          {t('loginButtons.registerText')}*/}
          {/*        </Button>*/}
          {/*      </div>*/}
          {/*    }*/}
          {/*    burgerIcon={<DotsHorizontalIcon />}*/}
          {/*  />*/}
          {/*)}*/}
        </div>
      </div>
      {/*<GlobalLinearProgress />*/}
    </header>
  )
}
