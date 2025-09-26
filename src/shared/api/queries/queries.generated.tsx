export type GetPostsQueryVariables = Types.Exact<{
  endCursorPostId?: Types.InputMaybe<Types.Scalars['Int']['input']>
  searchTerm?: Types.InputMaybe<Types.Scalars['String']['input']>
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>
  sortDirection?: Types.InputMaybe<Types.SortDirection>
}>

export type GetPostsQuery = {
  __typename?: 'Query'
  getPosts: {
    __typename?: 'PostsPaginationModel'
    items: Array<{
      __typename?: 'Post'
      id: number
      createdAt: any
      ownerId: number
      description: string
      updatedAt: any
      images: Array<{
        __typename?: 'ImagePost'
        id: number
        url: string
      }>
      postOwner: {
        __typename?: 'PostOwnerModel'
        id: number
        userName: string
        firstName?: string | null
        lastName?: string | null
      }
      userBan?: {
        __typename?: 'UserBan'
        reason: string
        createdAt: any
      } | null
    }>
    pageSize: number
    totalCount: number
  }
}
