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
    $endCursorPostId: Int
    $searchTerm: String
    $pageSize: Int = 9
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
export const POST_ADDED_SUBSCRIPTION = gql`
  subscription PostAdded {
    postAdded {
      id
      description
      createdAt
      updatedAt
      ownerId
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
  }
`

export const REMOVE_USER = gql`
    mutation removeUser($userId: Int!) {
        removeUser(userId:$userId)
}`

export const GET_USER_QUERY = gql`
    query GetUser($userId: Int!) {
        getUser(userId: $userId) {
            id
            userName
            email
            createdAt
            profile {
                id
                userName
                firstName
                lastName
                city
                country
                region
                dateOfBirth
                aboutMe
                createdAt
                avatars {
                    url
                    width
                    height
                    fileSize
                }
            }
            userBan {
                reason
                createdAt
            }
        }
    }
`
export const GET_POSTS_BY_USER_QUERY = gql`
    query getPostsByUser ($userId:Int!, $endCursorId:Int){
        getPostsByUser(userId:$userId, endCursorId: $endCursorId){
            pagesCount,
            pageSize,
            totalCount,
            items{
                id,
                createdAt,
                url,
                width,
                height,
                fileSize
            }
        }
    }
`
export const GET_FOLLOWERS_QUERY = gql`
    query getFollowers(
        $pageNumber: Int = 1
        $pageSize: Int = 10
        $sortBy: String = "createdAt"
        $sortDirection: SortDirection = desc
        $userId:Int!
    ){
        getFollowers(
            pageNumber:$pageNumber
            pageSize: $pageSize
            sortBy :$sortBy
            sortDirection: $sortDirection
            userId: $userId
        ){
            page
            pageSize
            totalCount
            pagesCount
            items{
                id
                userId
                userName
                firstName
                lastName
                createdAt
            }

        }
    }
`

export const GET_FOLLOWING_QUERY = gql`
    query getFollowing(
        $pageNumber: Int = 1
        $pageSize: Int = 10
        $sortBy: String = "createdAt"
        $sortDirection: SortDirection = desc
        $userId:Int!
    ){
        getFollowing(
            pageNumber:$pageNumber
            pageSize: $pageSize
            sortBy :$sortBy
            sortDirection: $sortDirection
            userId: $userId
        ){
            page
            pageSize
            totalCount
            pagesCount
            items{
                id
                userId
                userName
                firstName
                lastName
                createdAt
            }

        }
    }
`

export const GET_PAYMENTS_BY_USER_QUERY = gql`
    query GetPaymentsByUser(
        $pageNumber: Int = 1
        $pageSize: Int = 10
        $sortBy: String = "createdAt"
        $sortDirection: SortDirection = desc
        $userId:Int!
    ){
        getPaymentsByUser(
            pageNumber:$pageNumber
            pageSize: $pageSize
            sortBy :$sortBy
            sortDirection: $sortDirection
            userId: $userId
        ){
            page
            pageSize
            totalCount
            pagesCount
            items{
                id
                businessAccountId
                status
                dateOfPayment
                startDate
                endDate
                type
                price
                paymentType
                payments{
                    id
                    userId
                    paymentMethod
                    amount
                    currency
                    createdAt
                    endDate
                    type

                }
            }
        }
    }
`
  mutation removeUser($userId: Int!) {
    removeUser(userId: $userId)
  }
`

export const GET_PAYMENTS = gql`
  query GetPayments(
    $pageNumber: Int = 6
    $pageSize: Int
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
    $searchTerm: String
  ) {
    getPayments(
      pageNumber: $pageNumber
      pageSize: $pageSize
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm: $searchTerm
    ) {
      items {
        id
        userId
        userName
        avatars {
          url
          width
          height
          fileSize
        }
      }
      page
      pageSize
      totalCount
      pagesCount
    }
  }
`

export const GET_PAYMENT_BY_ID = gql`
  query GetPaymentsByIdUser($userId: Int!) {
    getPaymentsByUser(userId: $userId) {
      items {
        id
        paymentType
        dateOfPayment
        type
        payments {
          amount
          currency
        }
      }
    }
  }
`
