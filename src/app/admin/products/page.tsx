import ProductCreateForm from '@/app/components/admin/product/ProductCreateForm'
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

async function getCategory() {
  const query = `*[_type == "category"]{
    name
  }`

  const data = client.fetch(query)

  return data
}

export default async function AdminProductsPage() {
  const products: simplifiedProduct[] = await getData()
  const categories = await getCategory()

  console.log(categories)

  return (
    <div className="col-span-3 lg:col-span-4 lg:border-l p-4">
      AdminProductsPage
      <ProductDataTable data={products} />
      <ProductCreateForm />
    </div>
  )
}
