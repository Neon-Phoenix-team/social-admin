import { useQuery } from '@apollo/client/react'
import {
  GetPostsByUserQuery,
  GetPostsByUserQueryVariables
} from '@/shared/api/queries/queries.generated'
import { GET_POSTS_BY_USER_QUERY } from '@/shared/api/queries/queries'
import { useEffect, useState } from 'react'

type PostItem = NonNullable<NonNullable<GetPostsByUserQuery['getPostsByUser']>['items']>[number];


export const useInfScroll = (userId: number) => {
  const [allPosts, setAllPosts] = useState<PostItem[]>([])
  const [currentCursor, setCurrentCursor] = useState<number | undefined>(undefined)
  const [hasMore, setHasMore] = useState<boolean>(true)



  const { data, loading, fetchMore } = useQuery<GetPostsByUserQuery, GetPostsByUserQueryVariables>(
    GET_POSTS_BY_USER_QUERY,
    {
      variables: { userId, endCursorId: currentCursor },
      skip: !userId,
      notifyOnNetworkStatusChange: true,
    }
  )

  useEffect(() => {
    const posts = data?.getPostsByUser?.items
    if (!posts) return

    if (posts.length === 0) {
      setHasMore(false)
      return
    }

    if (allPosts.length === 0) {
      setAllPosts(posts)
      const lastPost = posts[posts.length - 1]
      if (lastPost?.id !== undefined && lastPost?.id !== null) {
        setCurrentCursor(lastPost.id)
      }
    }
  }, [data])

  const loadNextPage = () => {
    if (loading || !hasMore || currentCursor === undefined) return

    fetchMore({
      variables: {
        userId,
        endCursorId: currentCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev

        const newPosts = fetchMoreResult.getPostsByUser.items
        if (!newPosts?.length) {
          setHasMore(false)
          return prev
        }

        const lastPost = newPosts[newPosts.length - 1]
        if (lastPost?.id) setCurrentCursor(lastPost.id)

        setAllPosts(prevPosts => [...prevPosts, ...newPosts])

        return {
          ...prev,
          getPostsByUser: {
            ...prev.getPostsByUser,
            items: [...prev.getPostsByUser.items!, ...newPosts],
          },
        }
      },
    })
  }

  return {
    posts: allPosts,
    loading,
    loadNextPage,
    hasMore,
  }
}
