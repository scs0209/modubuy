import UserDataTable from '@/app/components/admin/UsersDataTable'
import { backUrl } from '@/app/config/url'
import React from 'react'

async function fetchUsers() {
  try {
    const response = await fetch(`${backUrl}/api/user/all`)

    const data = await response.json()

    return data
  } catch (error) {
    console.error('An error occurred while fetching the payment IDs:', error)

    return null
  }
}

export const dynamic = 'force-dynamic'

export default async function UserDashboardPage() {
  const data = await fetchUsers()

  console.log('data: ', data)
  return (
    <div className="col-span-3 lg:col-span-4 lg:border-l p-4">
      UserDashboardPage
      <UserDataTable data={data} />
    </div>
  )
}
