'use client'

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
import { updateUser } from '@/app/_utils/apis/user'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { TUserUpdateSchema, userUpdateSchema } from '@/lib/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createClient } from '@supabase/supabase-js'
import { Label } from '@/components/ui/label'
import { Upload } from 'lucide-react'
import { PostcodeModal } from '../../../../_components/mypage/PostcodeModal'
import FormFieldComponent from '../../../../_components/FormFieldComponent'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
)

interface Props {
  data: User
}

const roles = ['admin', 'user']

export default function UserUpdateForm({ data: userData }: Props) {
  const form = useForm<TUserUpdateSchema>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      email: userData.email,
      name: userData.name,
      role: userData.role,
      address: userData.address,
      detail_address: userData.detail_address,
    },
  })

  async function onSubmit(values: TUserUpdateSchema) {
    try {
      await updateUser(userData.id, values)
      toast({
        title: 'Update completed',
      })
    } catch (error) {
      console.error(error)
    }
  }

  async function uploadImage(e: any) {
    const file = e.target.files[0]
    const timestamp = Date.now()
    const fileName = `${userData.id}-${timestamp}.png`

    const { data, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file)

    if (uploadError) {
      console.error('Error uploading image: ', uploadError)
    } else {
      try {
        // 서버 사이드 API를 호출하여 이미지 URL을 데이터베이스에 업데이트합니다.
        const response = await updateUser(userData.id, { image: fileName })
        console.log(data)
      } catch (error) {
        console.error('Error updating user: ', error)
      }
    }
  }

  console.log(userData.image, userData)

  return (
    <>
      <div className="col-span-1 flex justify-center">
        <div>
          <Avatar className="h-40 w-40 md:h-60 md:w-60 rounded-md">
            <AvatarImage
              src={userData.image}
              alt="Avatar"
              className="rounded-md"
            />
            <AvatarFallback className="rounded-md">OM</AvatarFallback>
          </Avatar>
          <div className="mt-3">
            <Input
              type="file"
              id="file"
              className="hidden"
              onChange={(e) => uploadImage(e)}
            />
            <Label htmlFor="file" className="cursor-pointer">
              <div className="px-4 py-2 bg-green-600 flex justify-center text-white rounded-md shadow-md hover:bg-green-700">
                <Upload />
              </div>
            </Label>
          </div>
        </div>
      </div>
      <div className="col-span-2">
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
      </div>
    </>
  )
}
