'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Form, FormField, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useSession } from 'next-auth/react'
import { updateUser } from '@/app/utils/apis/user'
import { TProfileFormSchema, profileFormSchema } from '@/lib/types'
import { PostcodeModal } from './PostcodeModal'
import FormFieldComponent from '../FormFieldComponent'

export default function ProfileForm() {
  const { data: session } = useSession()
  const form = useForm<TProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: session?.user.name || '',
      email: session?.user.email || '',
      address: session?.user.address || '',
      detail_address: session?.user.detail_address,
    },
  })

  async function onSubmit(values: TProfileFormSchema) {
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
        <FormFieldComponent<TProfileFormSchema>
          form={form}
          name="name"
          label="Username"
          placeholder="Write your name."
          description="Update your name."
          component={Input}
        />
        <FormFieldComponent<TProfileFormSchema>
          form={form}
          name="email"
          label="Email"
          placeholder="Email"
          component={Input}
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
