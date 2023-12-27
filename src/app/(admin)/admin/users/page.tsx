import UserDataTable from '@/app/components/admin/UsersDataTable'
import { fetchUsers } from '@/app/utils/apis/user'
import React from 'react'

export const dynamic = 'force-dynamic'

export default async function UserDashboardPage() {
  const data = await fetchUsers()

  return (
    <>
      <UserDataTable data={data} />
    </>
  )
}
