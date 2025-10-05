import { useMutation } from "@apollo/client/react"
import { RemoveUserMutation, RemoveUserMutationVariables } from "../api/queries/queries.generated"
import { REMOVE_USER } from "../api/queries/queries"

export const useRemoveUser = (userId: number) => {
  return useMutation<RemoveUserMutation, RemoveUserMutationVariables>(REMOVE_USER, {
    variables: ({ userId }),
    optimisticResponse: {
      removeUser: true
    },
    update(cache, { data }) {
      if (!data?.removeUser) return

      cache.evict({ fieldName: 'getUsers' })
      cache.gc()
    }
  })
}