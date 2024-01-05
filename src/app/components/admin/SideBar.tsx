import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  BadgeDollarSign,
  CircleUserRound,
  FileSearch,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingCart,
  Users,
} from 'lucide-react'
import Link from 'next/link'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

type MenuItem = {
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
        title: 'Help',
        icon: <HelpCircle className="mr-2 h-4 w-4" />,
      },
      {
        title: 'Logout',
        icon: <LogOut className="mr-2 h-4 w-4" />,
      },
    ],
  },
]

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        {menuItems.map((menu, idx1) => (
          <div className="px-3 py-2" key={idx1}>
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              {menu.title}
            </h2>
            <div className="space-y-1">
              {menu.list.map((item, idx2) => (
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  key={idx2}
                >
                  {item.icon}
                  {item.path ? (
                    <Link href={item.path}>{item.title}</Link>
                  ) : (
                    item.title
                  )}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
