import UserUpdateForm from '@/app/components/admin/updateUser/UserUpdateForm'
import { fetchUser } from '@/app/utils/apis/user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

export default async function UserUpdatePage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const data = await fetchUser(id)

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1 flex justify-center">
        <Avatar className="h-52 w-52 rounded-md">
          <AvatarImage
            src="/avatars/01.png"
            alt="Avatar"
            className="rounded-md"
          />
          <AvatarFallback className="rounded-md">OM</AvatarFallback>
        </Avatar>
      </div>
      <div className="col-span-2">
        <UserUpdateForm data={data} />
      </div>
    </div>
  )
}
