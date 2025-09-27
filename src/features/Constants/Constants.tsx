import { Translate } from '@/shared/ui/Menu/menuData'
import { TabItem } from '@/shared/ui/Tabs/Tabs'

export function getSettingsSections(t: Translate): TabItem[] {
  return [
    {
      id: 'generalSettings',
      label: t('generalSettings'),
      content: <UploadedPhotos />,
    },
    {
      id: 'devices',
      label: t('devices'),
      content: <Payments />,
    },
    {
      id: 'accountManagement',
      label: t('accountManagement'),
      content: <Followers />,
    },
    {
      id: 'myPayments',
      label: t('myPayments'),
      content: <Following />,
    },
  ]
}