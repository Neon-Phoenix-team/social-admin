// 'use client'
//
// import { HttpLink, split } from '@apollo/client'
// import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs'
// import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
// import { getMainDefinition } from '@apollo/client/utilities'
// import { createClient } from 'graphql-ws'
// import { basicAuthVar } from '@/shared/api/client'
//
// export function makeClient() {
//   const credentials = basicAuthVar();
//   const httpLink = new HttpLink({
//     uri: process.env.NEXT_PUBLIC_GRAPH_API,
//     headers: {
//       Authorization: credentials ? `Basic ${credentials}` : '',
//     },
//   })
//
//   // WebSocket только в браузере
//   const wsLink =
//     typeof window !== 'undefined'
//       ? new GraphQLWsLink(
//           createClient({
//             url: process.env.NEXT_PUBLIC_GRAPH_WS!,
//             connectionParams: {
//               Authorization: credentials ? `Basic ${credentials}` : '',
//             },
//           })
//         )
//       : null
//
//   const splitLink =
//     typeof window !== 'undefined' && wsLink
//       ? split(
//           ({ query }) => {
//             const def = getMainDefinition(query)
//             return (
//               def.kind === 'OperationDefinition' &&
//               def.operation === 'subscription'
//             )
//           },
//           wsLink,
//           httpLink
//         )
//       : httpLink
//
//   return new ApolloClient({
//     link: splitLink,
//     cache: new InMemoryCache(),
//   })
// }
