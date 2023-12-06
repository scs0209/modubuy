import React from 'react'
import Image from 'next/image'
import { Image as ProductImage } from '../interface'
import { urlFor } from '../lib/sanity'

interface Props {
  images: ProductImage[]
}

export default function ImageGallery({ images }: Props) {
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.map((image, idx) => (
          <div
            key={image._key}
            className="overflow-hidden rounded-lg bg-gray-100"
          >
            <Image
              src={urlFor(image).url()}
              alt="product"
              width={200}
              height={200}
              className="h-full w-full object-cover object-center cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
