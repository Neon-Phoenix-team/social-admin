'use client'
import Posts from '@/features/Posts/Posts'
import { ApolloClientWrapper } from '@/shared/api/ApolloClientWrapper'

export default function PostsPage() {
  return (
    <ApolloClientWrapper>
      <Posts />
    </ApolloClientWrapper>
  )
}

