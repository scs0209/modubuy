'use client'

import { ShoplflowProvider } from '@shoplflow/base'
import { SessionProvider } from 'next-auth/react'
import { AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
export default function NextAuthProvider({
  children,
  session,
}: {
  children: ReactNode
  session: any
}) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ShoplflowProvider domain="SHOPL">
          <AnimatePresence>{children}</AnimatePresence>
        </ShoplflowProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
