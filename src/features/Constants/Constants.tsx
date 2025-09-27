import { Translate } from '@/shared/ui/Menu/menuData'
import { TabItem } from '@/shared/ui/Tabs/Tabs'

export function getSettingsSections(t: Translate): TabItem[] {
  return [
    {
      id: 'uploadedPhotos',
      label: t('uploadedPhotos'),
      content: <UploadedPhotos />,
    },
    {
      id: 'payments',
      label: t('payments'),
      content: <Payments />,
    },
    {
      id: 'followers',
      label: t('followers'),
      content: <Followers />,
    },
    {
      id: 'following',
      label: t('following'),
      content: <Following />,
    },
  ]
}