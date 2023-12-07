'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import { urlFor } from '../lib/sanity'
import { ProductCart } from './AddToBag'

export default function CheckoutNow({
  name,
  description,
  price,
  currency,
  image,
  price_id,
}: ProductCart) {
  const { checkoutSingleItem } = useShoppingCart()

  const buyNow = (priceId: string) => {
    checkoutSingleItem(priceId)
  }

  const product = {
    name,
    description,
    price,
    currency,
    image: urlFor(image).url(),
    price_id,
  }

  return (
    <Button
      onClick={() => {
        buyNow(product.price_id)
      }}
    >
      Add To Cart
    </Button>
  )
}
