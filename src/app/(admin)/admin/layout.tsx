import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import '../../globals.css'
import { ThemeProvider } from '@/app/components/ThemeProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/utils/auth'
import {
  BadgeDollarSign,
  CircleUserRound,
  DoorClosed,
  FileSearch,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingCart,
  Users,
} from 'lucide-react'
import AdminHeader from '@/app/components/AdminHeader'
import { Sidebar } from '../../components/admin/SideBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ModuBuy',
  description: 'E-commerce site',
}

export type MenuItem = {
  title: string
  path?: string
  icon: JSX.Element
}

const menuItems: { title: string; list: MenuItem[] }[] = [
  {
    title: 'Pages',
    list: [
      {
        title: 'Dashboard',
        path: '/admin',
        icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
      },
      {
        title: 'Users',
        path: '/admin/users',
        icon: <CircleUserRound className="mr-2 h-4 w-4" />,
      },
      {
        title: 'Products',
        path: '/admin/products',
        icon: <ShoppingCart className="mr-2 h-4 w-4" />,
      },
    ],
  },
  {
    title: 'Analytics',
    list: [
      {
        title: 'Revenue',
        path: '/admin/revenue',
        icon: <BadgeDollarSign className="mr-2 h-4 w-4" />,
      },
      {
        title: 'Report',
        icon: <FileSearch className="mr-2 h-4 w-4" />,
      },
      {
        title: 'Teams',
        icon: <Users className="mr-2 h-4 w-4" />,
      },
    ],
  },
  {
    title: 'Users',
    list: [
      {
        title: 'Settings',
        icon: <Settings className="mr-2 h-4 w-4" />,
      },
      {
        title: 'Exit',
        path: '/',
        icon: <DoorClosed className="mr-2 h-4 w-4" />,
      },
      {
        title: 'Logout',
        icon: <LogOut className="mr-2 h-4 w-4" />,
      },
    ],
  },
]

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const userData = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="grid lg:grid-cols-5 h-screen">
            <Sidebar user={userData} menuItems={menuItems} />
            <div className="col-span-3 lg:col-span-4 lg:border-l p-4">
              <AdminHeader menuItems={menuItems} />
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default Layout
