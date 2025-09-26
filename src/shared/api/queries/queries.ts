import { gql } from '@apollo/client'

export const LOGIN_ADMIN = gql`
  mutation LoginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      logged
    }
  }
`

export const GET_USERS_QUERY = gql`
  query GetUsers(
    $pageNumber: Int = 1
    $pageSize: Int = 10
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
    $searchTerm: String
    $statusFilter: UserBlockStatus = ALL
  ) {
    getUsers(
      pageNumber: $pageNumber
      pageSize: $pageSize
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm: $searchTerm
      statusFilter: $statusFilter
    ) {
      users {
        id
        userName
        email
        createdAt
        userBan {
          reason
          createdAt
        }
        profile {
          createdAt
          firstName
          lastName
          id
        }
      }
      pagination {
        page
        pageSize
        totalCount
        pagesCount
      }
    }
  }
`

export const BAN_USER = gql`
  mutation banUser($banReason: String!, $userId: Int!) {
    banUser(banReason: $banReason, userId: $userId)
  }
`

export const UNBAN_USER = gql`
  mutation unbanUser($userId: Int!) {
    unbanUser(userId: $userId)
  }
`

export const GET_POSTS_QUERY = gql`
  query GetPosts(
    $endCursorPostId: Int = 1111
    $searchTerm: String
    $pageSize: Int = 10
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
  ) {
    getPosts(
      endCursorPostId: $endCursorPostId
      searchTerm: $searchTerm
      pageSize: $pageSize
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      items {
        id
        createdAt
        ownerId
        description
        updatedAt
        images {
          id
          url
        }
        postOwner {
          id
          userName
          firstName
          lastName
          avatars {
            url
            width
            height            
          }
        }
        userBan {
          reason
          createdAt
        }
      }
      pageSize
      totalCount
    }
  }
`
