import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { UserIcon } from 'lucide-react'

interface Props {
  src?: string
  className?: string
}

export default function AvatarImg({ src, className }: Props) {
  return (
    <Avatar className={cn('rounded-md', className)}>
      <AvatarImage src={src} alt="Avatar" className="rounded-md" />
      <AvatarFallback className="rounded-md">
        <UserIcon />
      </AvatarFallback>
    </Avatar>
  )
}
