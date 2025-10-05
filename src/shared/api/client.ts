import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs'
import {HttpLink, makeVar} from '@apollo/client'

export const isAdminVar = makeVar<boolean>(false);
export function  client() {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPH_API,
      headers: {
        Authorization: 'Basic ' + btoa('admin@gmail.com:admin'),
      },
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getPosts: {
              keyArgs: ['searchTerm'], // treat each search separately
              merge(existing = { items: [] }, incoming) {
                return {
                  ...incoming,
                  items: [...(existing.items || []), ...incoming.items],
                }
              },
            },
          },
        },
      },
    }),
  })
}


