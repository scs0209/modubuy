'use client'

import { fetchReviewProduct } from '@/app/utils/apis/review'
import React, { useEffect, useState } from 'react'
import { Review } from '@/app/interface'
import { useEditingState } from '@/store/reviewStore'
import ReviewHeader from './ReviewHeader'
import ReviewEditForm from './ReviewEditForm'

interface Props {
  productId: string
}

export default function ReviewList({ productId }: Props) {
  const [reviews, setReviews] = useState<Review[]>([])
  const editing = useEditingState()

  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviewData = await fetchReviewProduct(productId)
        setReviews(reviewData)
      } catch (error) {
        console.error('Failed to fetch reviews:', error)
      }
    }

    getReviews()
  }, [productId])

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id}>
          <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
            <ReviewHeader review={review} />
            {editing[review.id] ? (
              <ReviewEditForm review={review} />
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                {review.content}
              </p>
            )}
          </article>
        </div>
      ))}
    </div>
  )
}
