'use client'
import {
  GET_POSTS_QUERY,
  POST_ADDED_SUBSCRIPTION,
} from '@/shared/api/queries/queries'

import {
  GetPostsQuery,
  GetPostsQueryVariables,
} from '@/shared/api/queries/queries.generated'
import Block from '@/shared/assets/icons/components/dropDown/Block'
import Block1 from '@/shared/assets/icons/components/dropDown/Block1'
import { ActionModal } from '@/shared/ui/Button/ActionModal'
import { modalType } from '@/shared/ui/DropDown/DropDown'
import { Input } from '@/shared/ui/Input/Input'
import ReadMore from '@/shared/ui/ReadMore/ReadMore'
import { User } from '@/shared/ui/User/User'
import { formatDateLocale } from '@/utils/formatDate'
import { useQuery, useSubscription } from '@apollo/client/react'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import s from './Posts.module.scss'

export default function Posts() {
  const [modalType, setModalType] = useState<modalType>(null)
  const handleOpenModal = (type: 'ban' | 'unban') => {
    setModalType(type)
  }

  const [search, setSearch] = useState('')
  const [fetching, setFetching] = useState(true)
  const locale = useLocale()
  // const locale = 'en'
  const { data, fetchMore, refetch } = useQuery<
    GetPostsQuery,
    GetPostsQueryVariables
  >(GET_POSTS_QUERY, {
    variables: {
      pageSize: 19,
    },
  })

  const scrollContainer = document.querySelector('.scroll-container')

  const [allPosts, setAllPosts] = useState<any[]>([])
  const onScroll = (e: Event) => {
    const { scrollHeight, scrollTop } = e.target as HTMLElement

    if (scrollHeight - (scrollTop + window.innerHeight) < 100) {
      setFetching(true)
    }
  }

  const searchHandler = (value: string) => {
    setSearch(value)
    setAllPosts([])
    refetch({
      searchTerm: value,
    })
  }

  const { data: subscriptionData } = useSubscription<any>(
    POST_ADDED_SUBSCRIPTION
  )
  //subscription
  useEffect(() => {
    if (subscriptionData?.postAdded) {
      setAllPosts(prev => {
        const exists = prev.some(p => p.id === subscriptionData.postAdded.id)
        if (exists) return prev
        return [subscriptionData.postAdded, ...prev]
      })
    }
  }, [subscriptionData])

  //filter dublicate posts
  useEffect(() => {
    if (data?.getPosts.items) {
      setAllPosts(prev => {
        const newPosts = data.getPosts.items.filter(
          newPost => !prev.some(p => p.id === newPost.id)
        )
        return [...prev, ...newPosts]
      })
    }
  }, [data, locale])

  //scrollEvent
  useEffect(() => {
    if (!scrollContainer) return
    scrollContainer.addEventListener('scroll', onScroll)
    return () => scrollContainer.removeEventListener('scroll', onScroll)
  }, [scrollContainer])

  //fetchMore
  useEffect(() => {
    if (fetching) {
      fetchMore({
        variables: {
          searchTerm: search,
          endCursorPostId: allPosts[allPosts.length - 1]?.id,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev
          return {
            getPosts: {
              ...fetchMoreResult.getPosts,
              items: [
                ...prev.getPosts.items,
                ...fetchMoreResult.getPosts.items.filter(
                  newPost => !prev.getPosts.items.some(p => p.id === newPost.id)
                ),
              ],
            },
          }
        },
      }).then(() => setFetching(false))
    }
  }, [fetching, search])
  useEffect(() => {
    setAllPosts([])
    refetch()
  }, [locale])
  const t = useTranslations('postsList')
  return (
    <>
      <div className={s.inputWrapper}>
        <Input
          type="searchType"
          placeholder={t('search')}
          onChangeText={searchHandler}
        />
      </div>
      <div className={s.post}>
        {allPosts.map(
          (post, ind) =>
            post.images?.[0]?.url && (
              <div key={post.id * ind}>
                <img src={post.images?.[0]?.url} alt="#" className={s.img} />
                <div className={s.postHeader}>
                  <User
                    url={post.postOwner.avatars?.[1]?.url}
                    userName={post.postOwner.userName}
                  />
                  {post.userBan ? (
                    <Block1
                      onClick={() => handleOpenModal('unban')}
                      style={{ cursor: 'pointer' }}
                    />
                  ) : (
                    <Block
                      onClick={() => handleOpenModal('ban')}
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                </div>
                <p className={s.time}>
                  {formatDateLocale(post.createdAt, locale as 'en' | 'ru')}
                </p>
                <ReadMore text={post.description}></ReadMore>
                <ActionModal
                  modalType={modalType}
                  userId={post.postOwner.id}
                  isBan={!!post.userBan}
                  userName={post.postOwner.userName}
                  onClose={setModalType}
                />
              </div>
            )
        )}
      </div>
    </>
  )
}
