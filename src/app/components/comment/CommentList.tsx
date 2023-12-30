'use client'

import { fetchReview } from '@/app/utils/apis/review'
import React, { useEffect, useState } from 'react'

interface Props {
  productId: string
  userId: any
}

export default function CommentList({ productId, userId }: Props) {
  const [comments, setComments] = useState([])

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

  console.log(comments)

  return (
    <div>
      {comments.map((comment: any) => (
        <div key={comment.id}>
          <h4>{comment.userId}</h4>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  )
}
