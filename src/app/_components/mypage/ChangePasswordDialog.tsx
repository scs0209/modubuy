'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Separator } from '@/components/ui/separator'
import { TChangePasswordSchema, changePasswordSchema } from '@/lib/types'
import { updatePassword } from '@/app/_utils/apis/user'
import FormFieldComponent from '../FormFieldComponent'

export default function ChangePasswordDialog() {
  const form = useForm<TChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
  })

  const onSubmit = form.handleSubmit(async (values: TChangePasswordSchema) => {
    try {
      await updatePassword(values.currentPassword, values.newPassword)
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" type="button" className="ml-2">
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            To ensure your account&apos;s security, please enter your current
            password and your new password.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4">
            <Form {...form}>
              <form onSubmit={onSubmit}>
                <FormFieldComponent
                  form={form}
                  name="currentPassword"
                  label="Current password"
                  placeholder="********"
                  component={Input}
                  type="password"
                />
                <FormFieldComponent
                  form={form}
                  name="newPassword"
                  label="New Password"
                  placeholder="********"
                  component={Input}
                  type="password"
                />
                <DialogFooter>
                  <Button type="submit">Submit</Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
