import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { UserIcon } from 'lucide-react'

interface Props {
  src?: string
  className?: string
}

export default function AvatarImg({ src, className }: Props) {
  return (
    <Avatar className={cn('rounded-md border-none', className)}>
      <AvatarImage src={src} alt="Avatar" className="rounded-md" />
      <AvatarFallback className="bg-transparent">
        <UserIcon className="w-[22px] h-[22px] cursor-pointer" />
      </AvatarFallback>
    </Avatar>
  )
}
