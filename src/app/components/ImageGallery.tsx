'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Image as ProductImage } from '../interface'
import { urlFor } from '../lib/sanity'

interface Props {
  images: ProductImage[]
}

export default function ImageGallery({ images }: Props) {
  const [mainImage, setMainImage] = useState(images[0])

  const handleChangeImageClick = (image: ProductImage) => {
    setMainImage(image)
  }

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.map((image, idx) => (
          <div
            key={image._key}
            className="overflow-hidden rounded-lg bg-gray-100"
            onClick={() => handleChangeImageClick(image)}
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

      {/* main-image */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
        <Image
          src={urlFor(mainImage).url()}
          alt="main-product"
          width={500}
          height={500}
          className="h-full w-full object-cover object-center"
        />

        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          Sale
        </span>
      </div>
    </div>
  )
}
