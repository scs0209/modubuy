'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Form, FormField, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useSession } from 'next-auth/react'
import { updateUser } from '@/app/_utils/apis/user'
import { TProfileFormSchema, profileFormSchema } from '@/lib/types'
import { updateUserImage, uploadImageToStorage } from '@/app/_utils/apis/image'
import { Label } from '@/components/ui/label'
import { Upload } from 'lucide-react'
import { PostcodeModal } from './PostcodeModal'
import FormFieldComponent from '../FormFieldComponent'
import ChangePasswordDialog from './ChangePasswordDialog'
import AvatarImg from '../AvatarImg'

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

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    const file = e.target.files[0]
    const timestamp = Date.now()
    const fileName = `${session?.user.id}-${timestamp}.png`

    const uploadedImageData = await uploadImageToStorage(file, fileName)

    if (uploadedImageData) {
      const updatedUser = await updateUserImage(session?.user.id, fileName)
    }
  }

  return (
    <>
      <div className="col-span-1 flex justify-center">
        <div>
          <AvatarImg
            src={session?.user.image}
            className="h-40 w-40 md:h-60 md:w-60"
          />
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
        <div className="col-span-1">
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
              <ChangePasswordDialog />
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}
