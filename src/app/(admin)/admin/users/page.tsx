import { fetchUsers } from '@/app/_utils/apis/user'
import GenericDataTable from '@/app/_components/Table/GenericDataTable'
import { User } from '@/app/interface'
import { userColumns } from '@/app/(admin)/admin/users/column'

export default async function UserDashboardPage() {
  const userData = await fetchUsers()

  return (
    <div>
      <GenericDataTable<User> data={userData} columns={userColumns} />
    </div>
  )
}
