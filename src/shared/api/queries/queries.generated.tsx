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