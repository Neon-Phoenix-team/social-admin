import '@/shared/styles/globals.css'
import { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { LayoutContent } from '@/shared/ui/LayoutContent/LayoutContent'
import { ApolloWrapper } from '@/shared/api/ApolloWrapper'


export default async function RootLayout({
                                           children,
                                           params,
                                         }: Readonly<{
  children: ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  return (
    <html lang={locale}>
    <body>
    <ApolloWrapper>
    <NextIntlClientProvider>
      <LayoutContent >{children}</LayoutContent>
    </NextIntlClientProvider>
      </ApolloWrapper >
    </body>

    </html>
  )
}
