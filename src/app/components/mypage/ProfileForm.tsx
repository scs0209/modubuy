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
import { Label } from '@/components/ui/label'
import {
  useAddress,
  useAddressActions,
  useDetailAddress,
} from '@/store/addressStore'
import { useSession } from 'next-auth/react'
import { PostcodeModal } from './PostcodeModal'

const profileFormSchema = z.object({
  username: z
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
  address: z.string(),
  detail_address: z.string(),
})

export function ProfileForm() {
  const address = useAddress()
  const detailAddress = useDetailAddress()
  const { handleDetailAddressChange } = useAddressActions()
  const { data: session } = useSession()
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: session?.user.name || '',
      email: session?.user.email || '',
    },
    mode: 'onChange',
  })

  function onSubmit(data: z.infer<typeof profileFormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
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
          <Label>Address</Label>
          <div className="flex">
            <Input type="text" value={address} readOnly />
            <PostcodeModal />
          </div>
          <Label>Detail Address</Label>
          <Input
            type="text"
            value={detailAddress}
            onChange={handleDetailAddressChange}
          />
        </div>
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}
