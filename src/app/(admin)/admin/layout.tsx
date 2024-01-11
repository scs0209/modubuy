import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import '../../globals.css'
import { ThemeProvider } from '@/app/_components/ThemeProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/utils/auth'
import {
  BadgeDollarSign,
  CircleUserRound,
  DoorClosed,
  Heart,
  LayoutDashboard,
  LogOut,
  MessageSquarePlus,
  Settings,
  ShoppingCart,
} from 'lucide-react'
import AdminHeader from '@/app/_components/AdminHeader'
import { ADMIN_PATH } from '@/constants/path'
import { Sidebar } from '../../_components/admin/SideBar'

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
        path: `${ADMIN_PATH.HOME}`,
        icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
      },
      {
        title: 'Users',
        path: `${ADMIN_PATH.USERS}`,
        icon: <CircleUserRound className="mr-2 h-4 w-4" />,
      },
      {
        title: 'Products',
        path: `${ADMIN_PATH.PRODUCTS}`,
        icon: <ShoppingCart className="mr-2 h-4 w-4" />,
      },
    ],
  },
  {
    title: 'Analytics',
    list: [
      {
        title: 'Revenue',
        path: `${ADMIN_PATH.REVENUE}`,
        icon: <BadgeDollarSign className="mr-2 h-4 w-4" />,
      },
      {
        title: 'Reviews',
        icon: <MessageSquarePlus className="mr-2 h-4 w-4" />,
      },
      {
        title: 'Likes',
        icon: <Heart className="mr-2 h-4 w-4" />,
      },
    ],
  },
  {
    title: 'Others',
    list: [
      {
        title: 'Settings',
        icon: <Settings className="mr-2 h-4 w-4" />,
      },
      {
        title: 'Exit',
        path: `${ADMIN_PATH.EXIT}`,
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
