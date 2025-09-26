'use client'
import { GET_POSTS_QUERY } from '@/shared/api/queries/queries'
import {
  GetPostsQuery,
  GetPostsQueryVariables,
} from '@/shared/api/queries/queries.generated'
import { Input } from '@/shared/ui/Input/Input'
import { User } from '@/shared/ui/User/User'
import { formatDateLocale } from '@/utils/formatDate'
import { useQuery } from '@apollo/client/react'
import { useEffect, useState } from 'react'
import s from './Posts.module.scss'

export default function Posts() {
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
          endCursorPostId: endCursor,
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
      }).then(result => {
        // debugger
        const items = result.data?.getPosts.items

        setFetching(false)
        items?.length
          ? setEndCursor(items[items?.length - 1].id)
          : setEndCursor(prev => result.data?.getPosts.totalCount ?? prev)
      })
    }
  }, [fetching, search])
  console.log(data)
  console.log(allPosts)
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
            // pageSize: 10,
            endCursorPostId: endCursor,
          }).then(res => {
            const items = res.data?.getPosts.items
            setEndCursor(res.data?.getPosts.totalCount! - 1)
          })
        }}
      />
      <div className={s.post}>
        {allPosts.map(post => (
          <div key={post.id}>
            Post ID: {post.id}, Created At:{' '}
            <img src={post.images[0].url} alt="#" className={s.img} />
            <User
              url={post.postOwner.avatars.url}
              userName={post.postOwner.userName}
              userId={post.ownerId}
              locale={locale}
            />
            <p className={s.time}>
              {formatDateLocale(post.createdAt, locale as 'en' | 'ru')}
            </p>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}
