import GenericDataTable from '@/app/_components/Table/GenericDataTable'
import ProductCreateForm from '@/app/(admin)/admin/products/ProductCreateForm'
import { productColumns } from '@/app/(admin)/admin/products/column'
import { simplifiedProduct } from '@/app/interface'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import { getCategory } from '@/app/_utils/apis/category'
import { getAllProduct } from '@/app/_utils/apis/product'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  const products: simplifiedProduct[] = await getAllProduct()
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
