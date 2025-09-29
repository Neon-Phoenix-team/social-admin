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
import { User } from '@/shared/ui/User/User'
import { formatDateLocale } from '@/utils/formatDate'
import { useQuery, useSubscription } from '@apollo/client/react'
import { useEffect, useState } from 'react'
import s from './Posts.module.scss'

export default function Posts() {
  const [modalType, setModalType] = useState<modalType>(null)
  const handleOpenModal = (type: 'ban' | 'unban') => {
    setModalType(type)
  }

  const [search, setSearch] = useState('')
  const [fetching, setFetching] = useState(true)
  const PAGE_SIZE = 8
  // const locale = useLocale()
  const locale = 'en'
  const { data, fetchMore, refetch } = useQuery<
    GetPostsQuery,
    GetPostsQueryVariables
  >(GET_POSTS_QUERY, {
    // variables: {
    //   searchTerm: search,
    //   pageSize: 10,
    //   endCursorPostId: endCursor,
    // },
    notifyOnNetworkStatusChange: true,
  })
  const [endCursor, setEndCursor] = useState(
    data?.getPosts.totalCount! - 1 || 3324
  )

  // const totalCount = data?.getPosts.items[7].id ?? 1111
  const scrollContainer = document.querySelector('.scroll-container')

  const onScroll = (e: Event) => {
    const target = e.target as HTMLElement
    const scrolledToBottom =
      // window.innerHeight + target.scrollTop >= target.scrollHeight - 100
      target.scrollHeight - (target.scrollTop + window.innerHeight) < 100

    if (scrolledToBottom) {
      setFetching(true)
      setEndCursor(prev =>
        prev - PAGE_SIZE > PAGE_SIZE ? prev - PAGE_SIZE : prev
      )
    }
  }
  const [allPosts, setAllPosts] = useState<any[]>([])

  const { data: subscriptionData } = useSubscription<any>(
    POST_ADDED_SUBSCRIPTION
  )

  useEffect(() => {
    if (subscriptionData?.postAdded) {
      setAllPosts(prev => {
        const exists = prev.some(p => p.id === subscriptionData.postAdded.id)
        if (exists) return prev
        return [subscriptionData.postAdded, ...prev] 
      })
    }
  }, [subscriptionData])

  useEffect(() => {
    if (data?.getPosts.items) {
      setAllPosts(prev => {
        const newPosts = data.getPosts.items.filter(
          newPost => !prev.some(p => p.id === newPost.id)
        )
        return [...prev, ...newPosts]
      })
    }
  }, [data])
  useEffect(() => {
    if (!scrollContainer) return
    scrollContainer.addEventListener('scroll', onScroll)
    return () => scrollContainer.removeEventListener('scroll', onScroll)
  }, [scrollContainer])
  useEffect(() => {
    if (fetching) {
      fetchMore({
        variables: {
          searchTerm: search,
          // pageSize: 10,
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

  return (
    <>
      <Input
        type="searchType"
        placeholder="Search"
        onChangeText={value => {
          setSearch(value)
          setAllPosts([])
          refetch({
            searchTerm: value,
          })
        }}
      />
      <div className={s.post}>
        {allPosts.map(post => (
          <div key={post.id}>
            Post ID: {post.id}, Created At:{' '}
            <img src={post.images[0].url} alt="#" className={s.img} />
            <div className={s.postHeader}>
              <User
                url={post.postOwner.avatars.url}
                userName={post.postOwner.userName}
                userId={post.ownerId}
                locale={locale}
                style={{ marginRight: 'auto' }}
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
            <p>{post.description}</p>
            <ActionModal
              modalType={modalType}
              userId={post.postOwner.id}
              isBan={!!post.userBan}
              userName={post.postOwner.userName}
              onClose={setModalType}
            />
          </div>
        ))}
      </div>
    </>
  )
}
