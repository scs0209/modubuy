import { client } from '@/app/lib/sanity'
import React from 'react'

async function getData() {
  const query = `*[_type == 'product'][0] {
    _id,
      images,
      price,
      name,
      "slug": slug.current,
      "categoryName": category->name,
      price_id,
  }`

  const data = client.fetch(query)

  return data
}

export default async function AdminProductsPage() {
  const products = await getData()
  console.log('products', products)
  return <div>AdminProductsPage</div>
}
