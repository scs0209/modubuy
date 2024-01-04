'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useSession } from 'next-auth/react'
import { updateUser } from '@/app/utils/apis/user'
import { PostcodeModal } from './PostcodeModal'

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  email: z.string().email({
    message: 'Please enter a valid email format.',
  }),
  address: z.string().readonly(),
  detail_address: z.string(),
})

export default function ProfileForm() {
  const { data: session } = useSession()
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: session?.user.name || '',
      email: session?.user.email || '',
    },
  })

  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    try {
      await updateUser(session?.user.id, values)
      toast({
        title: 'You submitted the following values:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(values, null, 2)}
            </code>
          </pre>
        ),
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Update your name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <div>
                <FormLabel>Address</FormLabel>
                <div className="flex">
                  <Input {...field} type="text" readOnly />
                  <PostcodeModal setValue={form.setValue} />
                </div>
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="detail_address"
            render={({ field }) => (
              <div>
                <Input {...field} />
              </div>
            )}
          />
        </div>
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}
