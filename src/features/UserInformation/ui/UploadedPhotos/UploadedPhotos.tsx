'use client'

import s from './UploadedPhotos.module.scss'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { LinearProgress } from '@/shared/ui/LinearProgress/LinearProgress'
import { useTranslations } from 'next-intl'
import { useInfScroll } from '@/shared/hooks/useInfScroll'
import { useEffect } from 'react' // Нужно для логики подгрузки
import { useInView } from 'react-intersection-observer' // Импорт хука для скролла

export const UploadedPhotos = () => {
  const params = useParams()
  const t = useTranslations('userList')
  const userId = params.userId ? Number(params.userId) : null

  const { posts, loading, loadNextPage, hasMore } = useInfScroll(userId!)

  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadNextPage()
    }
  }, [inView, hasMore, loading, loadNextPage])


  if (loading && posts.length === 0) return <div><LinearProgress /></div>

  if (posts.length === 0 && !loading) return <div>{t('noPhotosUploaded')}</div>

  return (
    <div className={s.container}>
      <div className={s.head}>
        <div className={s.postsGrid}>
          {posts.map(post => (
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
      </div>

      {hasMore && (
        <div ref={ref} className={s.loadingMarker}>
          {loading && <LinearProgress />}
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <p className={s.endOfList}>{t('allPostsLoaded')}</p>
      )}
    </div>
  )
}