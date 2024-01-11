'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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
import { updateUser } from '@/app/utils/apis/user'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { TUserUpdateSchema, userUpdateSchema } from '@/lib/types'
import { PostcodeModal } from '../../../../_components/mypage/PostcodeModal'
import FormFieldComponent from '../../../../_components/FormFieldComponent'

interface Props {
  data: User
}

const roles = ['admin', 'user']

export default function UserUpdateForm({ data }: Props) {
  const form = useForm<TUserUpdateSchema>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      email: data.email,
      name: data.name,
      role: data.role,
      address: data.address,
      detail_address: data.detail_address,
    },
  })

  async function onSubmit(values: TUserUpdateSchema) {
    try {
      await updateUser(data.id, values)
      toast({
        title: 'Update completed',
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormFieldComponent<TUserUpdateSchema>
            form={form}
            name="email"
            label="Email"
            placeholder="example@xxxx.com"
            component={Input}
          />
          <FormFieldComponent<TUserUpdateSchema>
            form={form}
            name="name"
            label="Username"
            placeholder="Write your name"
            component={Input}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
          <Button type="submit">Update</Button>
        </form>
      </Form>
    </>
  )
}
