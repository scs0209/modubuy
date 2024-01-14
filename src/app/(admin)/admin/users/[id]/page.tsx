import { fetchUser } from '@/app/_utils/apis/user'
import React from 'react'
import UserUpdateForm from '@/app/(admin)/admin/users/[id]/UserUpdateForm'

export default async function UserUpdatePage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const data = await fetchUser(id)

  console.log('user: ', data)

  return (
    <div className="grid grid-cols-3 p-8">
      <UserUpdateForm data={data} />
    </div>
  )
}
