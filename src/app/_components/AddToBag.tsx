'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { useShoppingCart } from 'use-shopping-cart'

export interface ProductCart {
  name: string
  description: string
  price: number
  currency: string
  image: string
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
    image,
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
