'use client'

import { Category } from '@/app/interface'
import { client, urlFor } from '@/app/_lib/sanity'
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
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { slugify } from '@/app/_utils/slugify'
import { toast } from '@/components/ui/use-toast'
import { TProductSchema, productSchema } from '@/lib/types'
import {
  createPriceInStripe,
  createProductInSanity,
  createProductInStripe,
} from '@/app/_utils/apis/product'
import FormFieldComponent from '../../../_components/FormFieldComponent'

interface Props {
  data: Category[]
}

type ImageAsset = {
  _id: string
}

export default function ProductCreateForm({ data }: Props) {
  const form = useForm<TProductSchema>({
    resolver: zodResolver(productSchema),
  })
  const [selectedImages, setSelectedImages] = useState<string[]>([])

  const name = form.watch('name')

  const uploadImages = async (imageFiles: File[]): Promise<string[]> => {
    const imageAssetIds: ImageAsset[] = await Promise.all(
      imageFiles.map((file: File) => client.assets.upload('image', file)),
    )
    return imageAssetIds.map((asset: ImageAsset) => asset._id)
  }

  const getImageUrls = async (imageAssetIds: string[]): Promise<string[]> => {
    return imageAssetIds.map((id: string) => urlFor(id).url())
  }

  const onSubmit = async (values: TProductSchema) => {
    try {
      const imageAssetIds: string[] = await uploadImages(values.images)
      const imageUrls: string[] = await getImageUrls(imageAssetIds)

      const stripeProduct = await createProductInStripe(values, imageUrls)
      const stripePrice = await createPriceInStripe(
        stripeProduct.id,
        Number(values.price),
      )

      await createProductInSanity(
        values,
        stripePrice.id,
        stripeProduct.id,
        imageAssetIds,
      )

      toast({
        title: 'Product successfully created!',
        description: 'Product has been successfully created and ready for use',
      })
    } catch (error) {
      console.error('Error creating product', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormFieldComponent<TProductSchema>
          form={form}
          name="name"
          label="Product"
          placeholder="product"
          component={Input}
        />
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
                  <img
                    key={index}
                    src={img}
                    alt="selected"
                    className="w-10 h-10"
                  />
                ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormFieldComponent<TProductSchema>
          form={form}
          name="description"
          label="Product description"
          placeholder="product description"
          component={Input}
          className="min-h-[100px]"
        />
        <FormField
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product slug</FormLabel>
              <div className="flex">
                <FormControl>
                  <Input placeholder="product slug" {...field} />
                </FormControl>
                <Button
                  type="button"
                  onClick={() => {
                    const slug = slugify(name)
                    form.setValue('slug', slug)
                  }}
                >
                  Generate
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormFieldComponent<TProductSchema>
          form={form}
          name="price"
          label="Product price"
          placeholder="product price"
          component={Input}
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
        <Button type="submit" className="mt-10 w-full">
          Submit
        </Button>
      </form>
    </Form>
  )
}
