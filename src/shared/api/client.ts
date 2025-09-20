import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs'
import { HttpLink } from '@apollo/client'


export function  client() {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPH_API,
      headers: {
        Authorization: 'Basic ' + btoa('admin@gmail.com:admin'),
      },
    }),
    cache: new InMemoryCache(),
  })
}


