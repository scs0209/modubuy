import ProductDataTable from '@/app/components/admin/product/ProductDataTable'
import { simplifiedProduct } from '@/app/interface'
import { client } from '@/app/lib/sanity'
import React from 'react'

async function getData() {
  const query = `*[_type == 'product'] {
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
  const products: simplifiedProduct[] = await getData()

  return (
    <div className="col-span-3 lg:col-span-4 lg:border-l p-4">
      AdminProductsPage
      <ProductDataTable data={products} />
    </div>
  )
}
