import React from 'react'
import { client } from '../lib/sanity'
import { simplifiedProduct } from '../interface'

async function getData(category: string) {
  const query = `*[_type == 'product' && category->name == '${category}'] {
    _id,
      "imageUrl": images[0].asset->url,
      price,
      name,
      "slug": slug.current,
      "categoryName": cateogory->name
  }`

  const data = await client.fetch(query)

  return data
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const data: simplifiedProduct[] = await getData(params.category)
  return <div>CategoryPage</div>
}
