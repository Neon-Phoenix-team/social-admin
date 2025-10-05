import { useQuery } from '@apollo/client/react'
import { GetPostsByUserQuery, GetPostsByUserQueryVariables } from '@/shared/api/queries/queries.generated'
import { GET_POSTS_BY_USER_QUERY } from '@/shared/api/queries/queries'
import { useState } from 'react'

export const useInfScroll = (userId: number) => {

  const [currentCursor, setCurrentCursor] = useState<number | undefined>(undefined)

  const { data, loading } = useQuery<GetPostsByUserQuery, GetPostsByUserQueryVariables>(GET_POSTS_BY_USER_QUERY, {
    variables: { userId: userId as number, endCursorId: currentCursor },
    skip: !userId, // Пропускаем запрос, если userId невалиден
  })

  const setNextPage = () => {
    const posts = data?.getPostsByUser.items

    if (posts && posts.length > 0) {
      const lastPost = posts[posts.length - 1]

      if (lastPost.id !== null && lastPost.id !== undefined) {
        const newCursorId = lastPost.id

        setCurrentCursor(newCursorId)
      }
    }
  }

  return { data, loading, setNextPage }
}