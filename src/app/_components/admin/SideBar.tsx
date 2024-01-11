'use client'

import { MenuItem } from '@/app/(admin)/admin/layout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useTitleActions } from '@/store/headerStore'
import { UserIcon } from 'lucide-react'
import Link from 'next/link'
import { HTMLAttributes } from 'react'

interface SidebarProps {
  className?: HTMLAttributes<HTMLDivElement>
  menuItems: { title: string; list: MenuItem[] }[]
  user: any
}

export function Sidebar({ className, user, menuItems }: SidebarProps) {
  const { setCurrentTitle } = useTitleActions()

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
        <Separator />
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
                  onClick={() => setCurrentTitle(item.title)}
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
