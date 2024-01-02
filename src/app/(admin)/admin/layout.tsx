import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import '../../globals.css'
import { ThemeProvider } from '@/app/components/ThemeProvider'
import { Sidebar } from '../../components/admin/SideBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ModuBuy',
  description: 'E-commerce site',
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="grid lg:grid-cols-5">
            <Sidebar />
            <div className="col-span-3 lg:col-span-4 lg:border-l p-4">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default Layout
