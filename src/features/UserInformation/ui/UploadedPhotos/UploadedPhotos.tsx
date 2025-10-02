'use client'

import s from './UploadedPhotos.module.scss'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { LinearProgress } from '@/shared/ui/LinearProgress/LinearProgress'
import { useTranslations } from 'next-intl'
import { useInfScroll } from '@/shared/hooks/useInfScroll'
import { Button } from '@/shared/ui/Button/Button'


export const UploadedPhotos = () => {

  const params = useParams()
  const t = useTranslations('userList')

  const userId = params.userId ? Number(params.userId) : null

  const {loading, data, setNextPage} = useInfScroll(userId!)


  if (loading) return <div><LinearProgress /></div>

  const postsState = data?.getPostsByUser.items
  if (postsState?.length === 0) return <div>{t('noPhotosUploaded')}</div>

  return (
    <div className={s.container}>
      <div className={s.head}>
        <div className={s.postsGrid}>
          {postsState?.map(post => (
            post.url && (
              <Image
                key={post.id}
                src={post.url}
                width={234}
                height={228}
                alt={'Post image'}
              />
            )
          ))}
        </div>
        <div>
          <Button onClick={setNextPage}>
            Click me
          </Button>
        </div>
      </div>
    </div>
  )
}