'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Image as ProductImage } from '../interface'
import { urlFor } from '../_lib/sanity'

interface Props {
  images: string[]
}

export default function ImageGallery({ images }: Props) {
  const [mainImage, setMainImage] = useState(images[0])

  const handleChangeImageClick = (image: string) => {
    setMainImage(image)
  }

  return (
    <div className="h-[500px] grid gap-4 lg:grid-cols-5 lg:sticky top-4">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.slice(1, 5).map((image) => (
          <div
            key={image}
            className="overflow-hidden rounded-lg h-1/4  bg-gray-100"
            onClick={() => handleChangeImageClick(image)}
          >
            <Image
              src={image}
              alt="product"
              width={200}
              height={200}
              quality={100}
              className="object-cover object-center cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* main-image */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4 h-[500px]">
        <Image
          src={mainImage}
          alt="main-product"
          width={500}
          height={500}
          className="h-full object-cover"
        />

        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          Sale
        </span>
      </div>
    </div>
  )
}
