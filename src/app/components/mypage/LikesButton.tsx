'use client'

import { fullProduct } from '@/app/interface'
import { fetchLikes, toggleLike } from '@/app/utils/apis/likes'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface Props {
  data: fullProduct
  user: any
}

export default function LikesButton({ data, user }: Props) {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    fetchLikes(user?.id)
      .then((likes) => {
        const isLiked = likes.some((like: any) => like.productId === data._id)
        setLiked(isLiked)
      })
      .catch((error) => {
        console.error('Error fetching likes: ', error)
      })
  }, [liked])

  const handleLikeClick = () => {
    toggleLike(user.id, data._id)
      .then((result) => {
        /* @ts-ignore */
        setLiked(result.status === 'liked')
      })
      .catch((error) => {
        console.error('Error toggling like: ', error)
      })
  }

  return (
    <Button
      variant="outline"
      className="rounded-full"
      onClick={handleLikeClick}
    >
      <Heart className={`h-5 w-5 ${liked ? 'text-red-500' : ''}`} />
    </Button>
  )
}
