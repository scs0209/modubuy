'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

export default function ImageUploadFormField() {
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  return (
    <FormField
      name="images"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Product images</FormLabel>
          <FormControl>
            <Input
              accept=".jpg, .jpeg, .png, .svg, .gif, .mp4, .webp"
              type="file"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  const files: File[] = Array.from(e.target.files)
                  const fileUrls = files.map((file) =>
                    URL.createObjectURL(file),
                  )

                  setSelectedImages((prevImages) => [
                    ...prevImages,
                    ...fileUrls,
                  ])
                  field.onChange(Array.from(e.target.files))
                }
              }}
              placeholder="product images"
            />
          </FormControl>
          {selectedImages &&
            selectedImages.map((img: any, index: number) => (
              <img key={index} src={img} alt="selected" className="w-10 h-10" />
            ))}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
