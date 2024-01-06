import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  BadgeDollarSign,
  CircleUserRound,
  DoorClosed,
  FileSearch,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingCart,
  UserIcon,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { HTMLAttributes } from 'react'

interface SidebarProps {
  className?: HTMLAttributes<HTMLDivElement>
  user: any
}

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

export function Sidebar({ className, user }: SidebarProps) {
  console.log(user)
  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        <div className="flex px-7 items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src="/avatars/01.png"
              alt="Avatar"
              className="rounded-md"
            />
            <AvatarFallback className="rounded-md">
              <UserIcon />
            </AvatarFallback>
          </Avatar>
          <span className="text-sm ml-2">{user.user.email}</span>
        </div>
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
