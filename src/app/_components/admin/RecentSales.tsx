import { User } from '@/app/interface'
import AvatarImg from '../AvatarImg'

interface Props {
  users: User[]
}

export default function RecentSales({ users }: Props) {
  return (
    <div className="space-y-8">
      {users
        .filter((user) => user.payments.length > 0)
        .map((user) => (
          <div className="flex items-center" key={user.id}>
            <AvatarImg src={user.image} className="h-9 w-9" />
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div className="ml-auto font-medium">
              {user.payments
                .reduce((total, payment) => total + payment.amount, 0)
                .toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
            </div>
          </div>
        ))}
    </div>
  )
}
