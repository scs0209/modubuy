import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { getAllProducts } from '@/lib/actions'
import { simplifiedProduct } from '../interface'
import { client } from '../_lib/sanity'
import { backUrl } from '../_config/url'

async function getData() {
  const query = `*[_type == 'product'][0...4] | order(_createdAt desc) {
    _id,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name,
    "imageUrl": images[0].asset->url
  }`

  const data = await client.fetch(query)

  return data
}

async function fetchPayment() {
  try {
    const response = await fetch(`${backUrl}/api/products`, {
      method: 'GET',
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()

    return data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
    throw error
  }
}

export const dynamic = 'force-dynamic'

export default async function Newest() {
  const data: simplifiedProduct[] = await getData()
  await fetchPayment()
  const allProduct = await getAllProducts()
  const newProduct = await allProduct?.slice(0, 4)

  return (
    <div>
      <div className="py-16 mx-auto sm:py-24">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Newest products
          </h2>

          <Link
            className="flex items-center text-primary gap-x-1"
            href="/category/all"
          >
            See All{' '}
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>

        {/* product */}
        <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {newProduct?.map((product) => (
            <div key={product.id} className="relative group">
              <div className="w-full overflow-hidden bg-gray-200 rounded-md aspect-square group-hover:opacity-75 lg:h-80">
                <Image
                  src={product.image[0]}
                  alt="Product image"
                  className="object-cover object-center w-full h-full lg:h-full lg:w-full"
                  width={300}
                  height={300}
                />
              </div>

              <div className="flex justify-between mt-4">
                <div>
                  <h3 className="text-sm text-gray-700 line-clamp-2">
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
