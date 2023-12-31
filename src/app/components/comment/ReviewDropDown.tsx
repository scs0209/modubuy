'use client'

import { DeleteIcon, EditIcon, Menu } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useReviewActions } from '@/store/reviewStore'
import { deleteReview } from '@/app/utils/apis/review'

interface Props {
  reviewId: string
}

export default function ReviewDropDown({ reviewId }: Props) {
  const { startEditing } = useReviewActions()

  const handleDeleteClick = async () => {
    try {
      await deleteReview(reviewId)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Menu color="black" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24">
        <DropdownMenuItem onClick={() => startEditing(reviewId)}>
          <EditIcon className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteClick}>
          <DeleteIcon className="mr-2 h-4 w-4" color="red" />
          <span className="text-red-500">Remove</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
