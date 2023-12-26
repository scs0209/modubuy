'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

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
import { User } from '@/app/interface'
import { backUrl } from '@/app/config/url'

interface Props {
  data: User
}

const schema = z.object({
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  role: z.enum(['admin', 'user']),
})

export default function UserUpdateForm({ data }: Props) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: data.email,
      name: data.name,
      role: data.role,
    },
  })

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      const response = await fetch(`${backUrl}/api/user?userId=${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      console.log('response', response)

      const updatedData = await response.json()
      console.log(updatedData) // 업데이트된 유저 데이터를 출력
    } catch (error) {
      console.error(error) // 에러 발생 시 콘솔에 에러 출력
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@xxxx.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Write your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input placeholder="Role" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update</Button>
        </form>
      </Form>
    </>
  )
}
