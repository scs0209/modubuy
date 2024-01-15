'use client'

import { MenuItem } from '@/app/(admin)/admin/layout'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useTitleActions } from '@/store/headerStore'
import Link from 'next/link'
import { HTMLAttributes } from 'react'
import AvatarImg from '../AvatarImg'

interface SidebarProps {
  className?: HTMLAttributes<HTMLDivElement>
  menuItems: { title: string; list: MenuItem[] }[]
  user: any
}

export function Sidebar({ className, user, menuItems }: SidebarProps) {
  const { setCurrentTitle } = useTitleActions()

  console.log(user)

  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        <div className="flex px-7 items-center">
          <AvatarImg src={user.image} className="h-9 w-9" />
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
