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
import { useState } from 'react'
import s from './Posts.module.scss'

export default function Posts() {
  const [search, setSearch] = useState('')
  // const locale = useLocale()
  const locale = 'en'
  const { data: posts, error } = useQuery<
    GetPostsQuery,
    GetPostsQueryVariables
  >(GET_POSTS_QUERY, {
    variables: { searchTerm: search },
  })

  return (
    <>
      <Input type="searchType" placeholder="Search" onChangeText={setSearch} />
      <div className={s.post}>
        {posts?.getPosts.items.map(post => (
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
