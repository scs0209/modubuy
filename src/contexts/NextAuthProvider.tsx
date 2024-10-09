'use client'

import { ShoplflowProvider } from '@shoplflow/base'
import { SessionProvider } from 'next-auth/react'
import { AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

export default function NextAuthProvider({
  children,
  session,
}: {
  children: ReactNode
  session: any
}) {
  return (
    <SessionProvider session={session}>
      <ShoplflowProvider domain="SHOPL">
        <AnimatePresence>{children}</AnimatePresence>
      </ShoplflowProvider>
    </SessionProvider>
  )
}
