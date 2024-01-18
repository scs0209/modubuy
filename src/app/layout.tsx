import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { getServerSession } from 'next-auth'
import Navbar from './_components/Navbar'
import CartProvider from './_components/Providers'
import ShoppingCartModal from './_components/ShoppingCartModal'
import NextAuthProvider from '../contexts/NextAuthProvider'
import { authOptions } from './_utils/auth'
import { ThemeProvider } from './_components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ModuBuy',
  description: 'E-commerce site',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <CartProvider>
              <main>
                <Navbar />
                <ShoppingCartModal />
                <Toaster />
                {children}
              </main>
            </CartProvider>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
