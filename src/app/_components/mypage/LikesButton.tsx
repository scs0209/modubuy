'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heart } from 'lucide-react'
import { Like, fullProduct } from '@/app/interface'
import { fetchLikes, toggleLike } from '@/app/_utils/apis/likes'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

interface Props {
  data: fullProduct
  likeData: Like[]
  user: any
}

export default function LikesButton({ data, user, likeData }: Props) {
  const [liked, setLiked] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchLikes(user?.id)
      .then((likes) => {
        const isLiked = likes.some((like: Like) => like.productId === data.id)
        setLiked(isLiked)
      })
      .catch((error) => {
        console.error('Error fetching likes: ', error)
      })
  }, [liked])

  const handleLikeClick = () => {
    if (!user) {
      toast({
        variant: 'destructive',
        description: 'Login Please',
      })
    }

    toggleLike(user?.id, data.id)
      .then((result) => {
        /* @ts-ignore */
        console.log('result', result)
        setLiked(result?.status === 'liked')
        router.refresh()
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
      <Heart className={`h-5 w-5 mr-2 ${liked ? 'text-red-500' : ''}`} />
      <span>{likeData.length}</span>
    </Button>
  )
}
