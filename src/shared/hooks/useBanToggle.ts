import {
  BanUserMutation,
  BanUserMutationVariables,
  UnbanUserMutation,
  UnbanUserMutationVariables,
} from '@/shared/api/queries/queries.generated'
import { useMutation } from '@apollo/client/react'
import { BAN_USER, UNBAN_USER } from '@/shared/api/queries/queries'
import { ApolloCache, gql } from '@apollo/client'


export const useBanToggle = () => {
  const [banUser] = useMutation<BanUserMutation, BanUserMutationVariables>(BAN_USER)
  const [unbanUser] = useMutation<UnbanUserMutation, UnbanUserMutationVariables>(UNBAN_USER)


  const updateUserInCache = (
    cache: ApolloCache,
    userId: number,
    banned: boolean,
    reason?: string
  ) => {
    cache.writeFragment({
      id: `User:${userId}`, // Apollo использует __typename + id
      fragment: gql`
          fragment UserBanFragment on User {
              userBan {
                  __typename
                  createdAt
                  reason
              }
          }
      `,
      data: {
        userBan: banned
          ? {
            __typename: 'UserBan',
            createdAt: new Date().toISOString(),
            reason: reason || 'Violation of rules',
          }
          : null,
      },
    })
  }

  // функция для бан/анбан
  const handleBanToggle = (userId: number, isCurrentlyBanned: boolean,reason: string) => {
    if (isCurrentlyBanned) {
      // unban
      unbanUser({
        variables: { userId },
        optimisticResponse: {
          __typename: 'Mutation',
          unbanUser: true,
        },
        update: (cache) => updateUserInCache(cache, userId, false),
      })
    } else {
      banUser({
        variables: { userId, banReason: reason },
        optimisticResponse: {
          __typename: 'Mutation',
          banUser: true,
        },
        update: (cache) => updateUserInCache(cache, userId, true, reason),
      })
    }
  }

  return { handleBanToggle }
}
