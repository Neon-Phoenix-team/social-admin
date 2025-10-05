'use client'

import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs'
import { makeClient } from './apolloClient'

export function ApolloClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
