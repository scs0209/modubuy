import React from 'react'
import { formatDate } from '@/app/_utils/func'
import { Review } from '@/app/interface'
import ReviewDropDown from './ReviewDropDown'

interface Props {
  review: Review
}

export default function ReviewHeader({ review }: Props) {
  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center">
        <p className="inline-flex items-center mr-3 text-sm font-semibold text-gray-900 dark:text-white">
          {review?.user?.name}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {formatDate(review.createdAt)}
        </p>
      </div>

      <ReviewDropDown reviewId={review.id} />
    </div>
  )
}
