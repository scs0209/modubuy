import { LockKeyholeIcon, LogIn, LogOut, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { COMMON_PATH } from '@/constants/path'

interface Props {
  session: any
}

export default function UserDropdownMenu({ session }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none"
        >
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            {session ? (
              <Link
                href={`/my-page/${session.user.email}/profile`}
                className="flex items-center justify-center"
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            ) : (
              <Link
                href={COMMON_PATH.LOGIN}
                className="flex items-center justify-center"
              >
                <LogIn className="mr-2 h-4 w-4" />
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
                <LockKeyholeIcon className="mr-2 h-4 w-4" />
                <span>Admin</span>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
