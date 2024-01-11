import GenericDataTable from '@/app/_components/Table/GenericDataTable'
import ProductCreateForm from '@/app/(admin)/admin/products/ProductCreateForm'
import { productColumns } from '@/app/(admin)/admin/products/column'
import { simplifiedProduct } from '@/app/interface'
import { client } from '@/app/_lib/sanity'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
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
      <GenericDataTable data={products} columns={productColumns}>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <ProductCreateForm data={categories} />
          </DialogContent>
        </Dialog>
      </GenericDataTable>
    </>
  )
}
