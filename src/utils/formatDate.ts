import { formatDistanceToNowStrict } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'
export const formatDateLocale = (
  date: Date | string,
  locale: 'en' | 'ru' = 'en'
) => {
  const locales = { en: enUS, ru }

  return formatDistanceToNowStrict(new Date(date), {
    addSuffix: true,
    locale: locales[locale],
  })
}
