'use client'

import { fetchLikes } from '@/app/utils/apis/likes'
import { getProduct } from '@/app/utils/apis/product'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import LikesTable from './LikesTable'

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

  console.log(likes)
  console.log(products)

  return <>{products && <LikesTable data={products!} />}</>
}
