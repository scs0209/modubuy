import { fetchUser } from '@/app/utils/apis/user'
import React from 'react'

export default async function UserUpdatePage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const data = await fetchUser(id)

  console.log('data: ', data)

  return <div>UserUpdatePage</div>
}
