'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import { Image } from '../interface'
import { urlFor } from '../_lib/sanity'

export interface ProductCart {
  name: string
  description: string
  price: number
  currency: string
  image: Image
  price_id: string
}

export default function AddToBag({
  name,
  description,
  price,
  currency,
  image,
  price_id,
}: ProductCart) {
  const { addItem, handleCartClick } = useShoppingCart()
  const product = {
    name,
    description,
    price,
    currency,
    image: urlFor(image).url(),
    id: price_id,
  }

  return (
    <Button
      onClick={() => {
        addItem(product)
        handleCartClick()
      }}
    >
      Add To Cart
    </Button>
  )
}
