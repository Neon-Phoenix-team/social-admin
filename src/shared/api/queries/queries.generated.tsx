// types.ts
// Auto-generated types for GraphQL operations

export namespace Types {
  export type Maybe<T> = T | null
  export type InputMaybe<T> = T | null
  export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K]
  }
  export type Scalars = {
    ID: { input: string; output: string }
    String: { input: string; output: string }
    Int: { input: number; output: number }
    Boolean: { input: boolean; output: boolean }
    DateTime: { input: any; output: any }
  }

  export enum SortDirection {
    asc = 'asc',
    desc = 'desc',
  }

  export enum UserBlockStatus {
    ALL = 'ALL',
    BLOCKED = 'BLOCKED',
    UNBLOCKED = 'UNBLOCKED',
  }
}

/* ===========================
   LOGIN ADMIN
=========================== */
export type LoginAdminMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input']
  password: Types.Scalars['String']['input']
}>

export type LoginAdminMutation = {
  __typename?: 'Mutation'
  loginAdmin: { __typename?: 'LoginResponse'; logged: boolean }
}

/* ===========================
   GET USERS
=========================== */
export type GetUsersQueryVariables = Types.Exact<{
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>
  sortDirection?: Types.InputMaybe<Types.SortDirection>
  searchTerm?: Types.InputMaybe<Types.Scalars['String']['input']>
  statusFilter?: Types.InputMaybe<Types.UserBlockStatus>
}>

export type GetUsersQuery = {
  __typename?: 'Query'
  getUsers: {
    __typename?: 'UsersPaginationModel'
    users: Array<{
      __typename?: 'User'
      id: number
      userName: string
      email: string
      createdAt: any
      userBan?: {
        __typename?: 'UserBan'
        reason: string
        createdAt: any
      } | null
      profile?: {
        __typename?: 'UserProfile'
        id: number
        firstName?: string | null
        lastName?: string | null
        createdAt: any
      } | null
    }>
    pagination: {
      __typename?: 'PaginationModel'
      page: number
      pageSize: number
      totalCount: number
      pagesCount: number
    }
  }
}

/* ===========================
   BAN USER
=========================== */
export type BanUserMutationVariables = Types.Exact<{
  banReason: Types.Scalars['String']['input']
  userId: Types.Scalars['Int']['input']
}>

export type BanUserMutation = {
  __typename?: 'Mutation'
  banUser: boolean
}

/* ===========================
   UNBAN USER
=========================== */
export type UnbanUserMutationVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input']
}>

export type UnbanUserMutation = {
  __typename?: 'Mutation'
  unbanUser: boolean
}

/* ===========================
   GET POSTS
=========================== */
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
      images: Array<{ __typename?: 'ImagePost'; id: number; url: string }>
      postOwner: {
        __typename?: 'PostOwnerModel'
        id: number
        userName: string
        firstName?: string | null
        lastName?: string | null
        avatars?: Array<{
          __typename?: 'Avatar'
          url: string
          width: number
          height: number
        }> | null
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

/* ===========================
   POST ADDED SUBSCRIPTION
=========================== */
export type PostAddedSubscription = {
  __typename?: 'Subscription'
  postAdded: {
    __typename?: 'Post'
    id: number
    description: string
    createdAt: any
    updatedAt: any
    ownerId: number
    images: Array<{ __typename?: 'ImagePost'; id: number; url: string }>
    postOwner: {
      __typename?: 'PostOwnerModel'
      id: number
      userName: string
      firstName?: string | null
      lastName?: string | null
      avatars?: Array<{
        __typename?: 'Avatar'
        url: string
        width: number
        height: number
      }> | null
    }
    userBan?: { __typename?: 'UserBan'; reason: string; createdAt: any } | null
  }
}
