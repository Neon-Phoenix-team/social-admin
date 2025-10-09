import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs'
import { ApolloLink,  HttpLink, makeVar,  } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

export const isAdminVar = makeVar<boolean>(false);
export const basicAuthVar  = makeVar<string | null>(null);

export function getAuthHeaders() {
  const credentials = basicAuthVar();
  return {
    Authorization: credentials ? `Basic ${credentials}` : '',
  };
}

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPH_API,
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      ...getAuthHeaders(),
    },
  });
  return forward(operation);
});

// WebSocket только в браузере
const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
      createClient({
        url: process.env.NEXT_PUBLIC_GRAPH_WS!,
        connectionParams: getAuthHeaders,
      })
    )
    : null;

const link = typeof window !== 'undefined' && wsLink
  ? ApolloLink.split(
    (operation) => {
      const def = getMainDefinition(operation.query);
      return (
        def.kind === 'OperationDefinition' &&
        def.operation === 'subscription'
      );
    },
    wsLink,
    httpLink
  )
  : httpLink;

export function  client() {
  return new ApolloClient({
    link: ApolloLink.from([authLink, link]),
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


