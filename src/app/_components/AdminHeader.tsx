'use client'

import { Card, CardHeader } from '@/components/ui/card'
import { useCurrentTitle } from '@/store/headerStore'
import { MenuItem } from '../(admin)/admin/layout'

interface Props {
  menuItems: { title: string; list: MenuItem[] }[]
}

export default function AdminHeader({ menuItems }: Props) {
  const currentTitle = useCurrentTitle()

  return (
    <div className="p-8 pb-4">
      <Card>
        <CardHeader>{currentTitle}</CardHeader>
      </Card>
    </div>
  )
}
