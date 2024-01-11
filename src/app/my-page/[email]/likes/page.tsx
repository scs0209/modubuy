'use client'

import { fetchLikes } from '@/app/_utils/apis/likes'
import { getProduct } from '@/app/_utils/apis/product'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Loader2 } from 'lucide-react'
import GenericDataTable from '@/app/_components/Table/GenericDataTable'
import { LikesProduct } from '@/app/interface'
import { likeColumns } from './column'

export default function LikesPage() {
  const { data: session } = useSession()
  const [likes, setLikes] = useState(null)
  const [products, setProducts] = useState(null)

  useEffect(() => {
    if (session) {
      fetchLikes(session.user.id)
        .then((data) => {
          setLikes(data)

          // 여기서 각각의 productId에 대해 getData 함수를 호출합니다.
          const productPromises = data.map((like: any) =>
            getProduct(like.productId),
          )
          return Promise.all(productPromises)
        })
        .then((productsData: any) => setProducts(productsData.flat()))
        .catch((err) => console.error(err))
    }
  }, [session])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Likes</h3>
        <p className="text-sm text-muted-foreground">
          These are the products you&apos;ve expressed interest in by clicking
          the &apos;Like&apos; button. Others will see these in your profile.
        </p>
      </div>
      <Separator />
      {products ? (
        <GenericDataTable<LikesProduct>
          data={products!}
          columns={likeColumns}
        />
      ) : (
        <Loader2 className="h-10 w-10 animate-spin" />
      )}
    </div>
  )
}
