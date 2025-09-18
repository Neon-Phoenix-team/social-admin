'use client'

import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs'
import { client } from '@/shared/api/client'
import { PropsWithChildren } from 'react'

export function ApolloWrapper({ children }: PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={client}>
      {children}
    </ApolloNextAppProvider>
  );
}