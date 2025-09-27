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
    banUser(banReason: $banReason,userId:$userId)
}`

export const UNBAN_USER = gql`
    mutation unbanUser( $userId: Int!) {
        unbanUser(userId:$userId),
        
    }`

export const REMOVE_USER = gql`
    mutation removeUser($userId: Int!) {
        removeUser(userId:$userId)
}`

export const GET_PAYMENTS = gql`
      query GetPayments(
          $pageNumber: Int = 6
          $pageSize: Int
          $sortBy: String = "createdAt"
          $sortDirection: SortDirection = desc
          $searchTerm: String
      )
      
      {
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
    query GetPaymentsByIdUser ($userId: Int!) {
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
    }`