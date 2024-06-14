import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { LockKeyholeIcon, LogIn, LogOut, User } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { COMMON_PATH } from '@/constants/path'
import AvatarImg from './AvatarImg'

interface Props {
  session: any
}

export default function UserDropdownMenu({ session }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <AvatarImg src={session?.user.image} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            {session ? (
              <Link
                href={`/my-page/${session?.user.email}/profile`}
                className="flex items-center justify-center"
              >
                <User className="w-4 h-4 mr-2" />
                <span>Profile</span>
              </Link>
            ) : (
              <Link
                href={COMMON_PATH.LOGIN}
                className="flex items-center justify-center"
              >
                <LogIn className="w-4 h-4 mr-2" />
                <span>Log In</span>
              </Link>
            )}
          </DropdownMenuItem>
          {session?.user.role === 'admin' && (
            <DropdownMenuItem>
              <Link
                href={COMMON_PATH.ADMIN}
                className="flex items-center justify-center"
              >
                <LockKeyholeIcon className="w-4 h-4 mr-2" />
                <span>Admin</span>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
          <LogOut className="w-4 h-4 mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
