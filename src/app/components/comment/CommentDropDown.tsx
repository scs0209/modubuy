import { DeleteIcon, EditIcon, Menu } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function CommentDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Menu color="black" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24">
        <DropdownMenuItem>
          <EditIcon className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DeleteIcon className="mr-2 h-4 w-4" color="red" />
          <span className="text-red-500">Remove</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
