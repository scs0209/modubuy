'use client'

import { fetchReview } from '@/app/utils/apis/review'
import React, { useEffect, useState } from 'react'
import { Review } from '@/app/interface'
import CommentHeader from './CommentHeader'

interface Props {
  productId: string
  userId: any
}

export default function CommentList({ productId, userId }: Props) {
  const [comments, setComments] = useState<Review[]>([])

  useEffect(() => {
    const getComments = async () => {
      try {
        const reviews = await fetchReview(productId, userId)
        setComments(reviews)
      } catch (error) {
        console.error('Failed to fetch reviews:', error)
      }
    }

    getComments()
  }, [productId])

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
            <CommentHeader review={comment} />
            <p className="text-gray-500 dark:text-gray-400">
              {comment.content}
            </p>
          </article>
        </div>
      ))}
    </div>
  )
}
