import { authOptions } from '@/app/utils/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function MyPage({
  params,
}: {
  params: { email: string }
}) {
  const session = await getServerSession(authOptions)

  return <div>{session?.user.name}</div>
}
