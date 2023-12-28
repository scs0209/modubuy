'use client'

import { User, fullProduct } from '@/app/interface'
import { toggleLike } from '@/app/utils/apis/likes'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import React from 'react'

interface Props {
  data: fullProduct
  user: any
}

export default function LikesButton({ data, user }: Props) {
  console.log(user.id)
  return (
    <Button
      className="rounded-full"
      onClick={() => toggleLike(user.id, data._id)}
    >
      <Heart className="h-5 w-5" />
    </Button>
  )
}
