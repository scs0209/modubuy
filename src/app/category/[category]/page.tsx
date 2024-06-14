import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { simplifiedProduct } from '@/app/interface'
import { getProductWithCategory } from '@/app/_utils/apis/category'
import { getAllProducts } from '@/lib/actions'

export const dynamic = 'force-dynamic'

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const data: simplifiedProduct[] = await getProductWithCategory(
    params.category,
  )

  const product = await getAllProducts()

  console.log('product: ', product)

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Products from {params.category}
          </h2>
        </div>

        {/* product */}
        <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {product?.map((product) => (
            <div key={product.id} className="relative group">
              <div className="w-full overflow-hidden bg-gray-200 rounded-md aspect-square group-hover:opacity-75 lg:h-80">
                <Image
                  src={product.image}
                  alt="Product image"
                  className="object-cover object-center w-full h-full lg:h-full lg:w-full"
                  width={300}
                  height={300}
                />
              </div>

              <div className="flex justify-between mt-4">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/product/${product.id}`}>{product.title}</Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.currentPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
