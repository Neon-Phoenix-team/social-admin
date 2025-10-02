import { Translate } from '@/shared/ui/Menu/menuData'
import { TabItem } from '@/shared/ui/Tabs/Tabs'
import { UploadedPhotos } from '@/features/UserInformation/ui/UploadedPhotos/UploadedPhotos'
import { Payments } from '@/features/UserInformation/ui/Payments/Payments'
import { Followers } from '@/features/UserInformation/ui/Followers/Followers'
import { Following } from '@/features/UserInformation/ui/Following/Following'

export function getSettingsSections(t: Translate): TabItem[] {
  return [
    {
      id: 'uploadedPhotos',
      label: t('uploadedPhotos'),
      content: <UploadedPhotos/>,
    },
    {
      id: 'payments',
      label: t('payments'),
      content: <Payments/>,
    },
    {
      id: 'followers',
      label: t('followers'),
      content: <Followers/>,
    },
    {
      id: 'following',
      label: t('following'),
      content: <Following/>,
    },
  ]
}