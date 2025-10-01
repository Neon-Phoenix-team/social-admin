import * as Types from '../types';

export type LoginAdminMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
}>;


export type LoginAdminMutation = { __typename?: 'Mutation', loginAdmin: { __typename?: 'LoginAdmin', logged: boolean } };

export type GetUsersQueryVariables = Types.Exact<{
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
  searchTerm?: Types.InputMaybe<Types.Scalars['String']['input']>;
  statusFilter?: Types.InputMaybe<Types.UserBlockStatus>;
}>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: { __typename?: 'UsersPaginationModel', users: Array<{ __typename?: 'User', id: number, userName: string, email: string, createdAt: any, userBan?: { __typename?: 'UserBan', reason: string, createdAt: any } | null, profile: { __typename?: 'Profile', createdAt: any, firstName?: string | null, lastName?: string | null, id: number } }>, pagination: { __typename?: 'PaginationModel', page: number, pageSize: number, totalCount: number, pagesCount: number } } };

export type BanUserMutationVariables = Types.Exact<{
  banReason: Types.Scalars['String']['input'];
  userId: Types.Scalars['Int']['input'];
}>;


export type BanUserMutation = { __typename?: 'Mutation', banUser: boolean };

export type UnbanUserMutationVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
}>;


export type UnbanUserMutation = { __typename?: 'Mutation', unbanUser: boolean };

export type RemoveUserMutationVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: boolean };

export type GetUserQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: number, userName: string, email: string, createdAt: any, profile: { __typename?: 'Profile', id: number, userName?: string | null, firstName?: string | null, lastName?: string | null, city?: string | null, country?: string | null, region?: string | null, dateOfBirth?: any | null, aboutMe?: string | null, createdAt: any, avatars?: Array<{ __typename?: 'Avatar', url?: string | null, width?: number | null, height?: number | null, fileSize?: number | null }> | null }, userBan?: { __typename?: 'UserBan', reason: string, createdAt: any } | null } };

export type GetPostsByUserQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  endCursorId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetPostsByUserQuery = { __typename?: 'Query', getPostsByUser: { __typename?: 'PostsByUserModel', pagesCount: number, pageSize: number, totalCount: number, items?: Array<{ __typename?: 'ImagePost', id?: number | null, createdAt?: any | null, url?: string | null, width?: number | null, height?: number | null, fileSize?: number | null }> | null } };

export type GetFollowersQueryVariables = Types.Exact<{
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
  userId: Types.Scalars['Int']['input'];
}>;


export type GetFollowersQuery = { __typename?: 'Query', getFollowers: { __typename?: 'FollowPaginationModel', page: number, pageSize: number, totalCount: number, pagesCount: number, items: Array<{ __typename?: 'Follow', id: number, userId: number, userName?: string | null, firstName?: string | null, lastName?: string | null, createdAt: any }> } };

export type GetFollowingQueryVariables = Types.Exact<{
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
  userId: Types.Scalars['Int']['input'];
}>;


export type GetFollowingQuery = { __typename?: 'Query', getFollowing: { __typename?: 'FollowPaginationModel', page: number, pageSize: number, totalCount: number, pagesCount: number, items: Array<{ __typename?: 'Follow', id: number, userId: number, userName?: string | null, firstName?: string | null, lastName?: string | null, createdAt: any }> } };

export type GetPaymentsByUserQueryVariables = Types.Exact<{
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
  userId: Types.Scalars['Int']['input'];
}>;


export type GetPaymentsByUserQuery = { __typename?: 'Query', getPaymentsByUser: { __typename?: 'PaymentPaginationModel', page: number, pageSize: number, totalCount: number, pagesCount: number, items: Array<{ __typename?: 'SubscriptionByPaymentModel', id: string, businessAccountId: number, status: Types.StatusSubscriptionType, dateOfPayment?: any | null, startDate?: any | null, endDate?: any | null, type: Types.SubscriptionType, price: number, paymentType?: Types.PaymentMethod | null, payments: Array<{ __typename?: 'Payment', id?: number | null, userId?: number | null, paymentMethod?: Types.PaymentMethod | null, amount?: number | null, currency?: Types.CurrencyType | null, createdAt?: any | null, endDate?: any | null, type?: Types.SubscriptionType | null }> }> } };
