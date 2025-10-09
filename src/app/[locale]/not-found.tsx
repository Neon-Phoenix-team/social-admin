import Link from 'next/link'
import ArrowBack from '@/shared/assets/icons/common/ArrowBack'
import { useTranslations } from 'next-intl'
import notFound from '@/shared/assets/img/notFound.png'
import s from './page.module.css'

export default function NotFound() {
  const t = useTranslations()
  return (
    <div className={s.main}>
      <Link href="/" className={s.homeLink}>
        <ArrowBack />
        <span>{t("goToMain")}</span>
      </Link>
      <img alt={'404'} className={s.errorImage} src={notFound.src}/>
    </div>
  );
}