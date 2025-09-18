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