import React from 'react'
import { formatDate } from '@/app/utils/func'
import CommentDropDown from './CommentDropDown'

interface Props {
  review: any
}

export default function CommentHeader({ review }: Props) {
  return (
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center">
        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
          {review.userId}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {formatDate(review.createdAt)}
        </p>
      </div>

      <CommentDropDown />
    </div>
  )
}
