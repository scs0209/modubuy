'use client'

import React, { useState, useEffect } from 'react'
import DOMPurify from 'isomorphic-dompurify'

interface Props {
  description: string
}

const ProductDescription = ({ description }: Props) => {
  const [showFullDescription, setShowFullDescription] = useState(false)

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription)
  }

  return (
    <div className="relative mt-12 text-base tracking-wide text-gray-500">
      <div
        className={`relative overflow-hidden ${
          showFullDescription ? '' : 'max-h-[7.5em]'
        } ${showFullDescription ? '' : 'line-clamp-5'}`}
        style={{
          whiteSpace: 'pre-line',
        }}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(description),
        }}
      />
      {!showFullDescription && (
        <div className="absolute left-0 right-0 h-12 bottom-8 bg-gradient-to-t from-white to-transparent" />
      )}
      <button
        onClick={toggleDescription}
        className="mt-2 text-blue-500 hover:underline"
      >
        {showFullDescription ? 'Show Less' : 'Show More'}
      </button>
    </div>
  )
}

export default ProductDescription
