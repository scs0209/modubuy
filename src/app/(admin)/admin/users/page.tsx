import { fetchUsers } from '@/app/utils/apis/user'
import React from 'react'
import GenericDataTable from '@/app/_components/Table/GenericDataTable'
import { User } from '@/app/interface'
import { userColumns } from '@/app/(admin)/admin/users/column'

export const dynamic = 'force-dynamic'

export default async function UserDashboardPage() {
  const userData = await fetchUsers()

  return (
    <>
      <GenericDataTable<User> data={userData} columns={userColumns} />
    </>
  )
}
