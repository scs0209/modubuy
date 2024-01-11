import ProductDataTable from '@/app/_components/admin/product/ProductDataTable'
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
      product_id,
  }`

  const data = client.fetch(query)

  return data
}

async function getCategory() {
  const query = `*[_type == "category"]{
    _id,
    name,
    _type,
    _rev
  }`

  const data = client.fetch(query)

  return data
}

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  const products: simplifiedProduct[] = await getData()
  const categories = await getCategory()

  return (
    <>
      <ProductDataTable data={products} categories={categories} />
    </>
  )
}
