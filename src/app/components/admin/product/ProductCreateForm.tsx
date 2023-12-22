'use client'

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
import React from 'react'
import { useForm } from 'react-hook-form'

export default function ProductCreateForm() {
  const methods = useForm()
  return (
    <Form {...methods}>
      <form>
        <FormField
          name="product"
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
          name="product images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product images</FormLabel>
              <FormControl>
                <Input placeholder="product images" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="product description"
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
          name="product slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product slug</FormLabel>
              <FormControl>
                <Input placeholder="product slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="product price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product price</FormLabel>
              <FormControl>
                <Input placeholder="product price" {...field} />
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
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
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
