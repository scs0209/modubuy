'use client'

import { Category } from '@/app/interface'
import { client } from '@/app/lib/sanity'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface Props {
  data: Category[]
}

type ImageAsset = {
  _id: string
}

type ProductValues = {
  name: string
  description: string
  slug: string
  price: number
  price_id: string
  category: string
  images: File[]
}

const schema = z.object({
  name: z.string().nonempty({ message: 'Product name is required' }),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  description: z.string().nonempty({ message: 'Description is required' }),
  images: z
    .array(z.instanceof(File))
    .nonempty({ message: 'Images are required' }),
  slug: z.string().nonempty({ message: 'Product slug is required' }),
  category: z.string().nonempty({ message: 'Category is required' }),
})

export default function ProductCreateForm({ data }: Props) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })
  const [selectedImages, setSelectedImages] = useState<string[]>([])

  const name = form.watch('name')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files: File[] = Array.from(e.target.files)
      const fileUrls = files.map((file) => URL.createObjectURL(file))
      console.log(files, fileUrls)
      setSelectedImages((prevImages) => [...prevImages, ...fileUrls])
    }
  }

  const uploadImages = async (imageFiles: File[]): Promise<string[]> => {
    const imageAssetIds: ImageAsset[] = await Promise.all(
      imageFiles.map((file: File) => client.assets.upload('image', file)),
    )
    return imageAssetIds.map((asset: ImageAsset) => asset._id)
  }

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      // 먼저 이미지들을 업로드합니다.
      const imageAssetIds: string[] = await uploadImages(values.images)

      const res = await client.create({
        _type: 'product',
        name: values.name,
        description: values.description,
        slug: { current: values.slug },
        price: values.price,
        category: {
          _type: 'reference',
          _ref: values.category,
        },
        images: imageAssetIds.map((_id: string) => ({
          // 이미지들을 asset 객체의 배열로 추가합니다.
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: _id,
          },
        })),
      })
      console.log(`Product was created, document ID is ${res._id}`)
    } catch (error) {
      console.error('Error creating product', error)
    }
  }

  function slugify(text: string) {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product</FormLabel>
              <FormControl>
                <Input placeholder="product" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product images</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  placeholder="product images"
                />
              </FormControl>
              {selectedImages &&
                selectedImages.map((img: any, index: number) => (
                  <img key={index} src={img} alt="selected" />
                ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product description</FormLabel>
              <FormControl>
                <Input
                  placeholder="product description"
                  {...field}
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product slug</FormLabel>
              <FormControl>
                <Input placeholder="product slug" {...field} />
              </FormControl>
              <button
                type="button"
                onClick={() => {
                  const slug = slugify(name)
                  form.setValue('slug', slug)
                }}
              >
                Generate Slug
              </button>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="product price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data.map((item) => (
                    <SelectItem key={item._id} value={item._id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-10">
          Submit
        </Button>
      </form>
    </Form>
  )
}
