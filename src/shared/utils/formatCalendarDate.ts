import { format } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'

export const formatCalendarDate = (
  date: Date | string | null | undefined,
  locale: 'en' | 'ru' = 'en',
) => {
  if (!date) return '—'

  const locales = { en: enUS, ru }

  return format(new Date(date), 'dd.MM.yyyy', {
    locale: locales[locale],
  })
}