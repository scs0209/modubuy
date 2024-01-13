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
import { TFindPasswordSchema, findPasswordSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Separator } from '@/components/ui/separator'
import { requestTempPassword } from '@/app/_utils/apis/user'
import FormFieldComponent from '../FormFieldComponent'

export function FindPasswordDialog() {
  const form = useForm<TFindPasswordSchema>({
    resolver: zodResolver(findPasswordSchema),
    mode: 'onChange',
  })

  const onSubmit = form.handleSubmit(async (values: TFindPasswordSchema) => {
    try {
      await requestTempPassword(values.email, values.receiveEmail)
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="text-sm font-medium text-green-400 hover:underline dark:text-green-800">
          Forgot password?
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Find Password</DialogTitle>
          <DialogDescription>Write your email.</DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4">
            <Form {...form}>
              <form onSubmit={onSubmit}>
                <FormFieldComponent
                  form={form}
                  name="receiveEmail"
                  label="Receive email"
                  placeholder="******@example.com"
                  component={Input}
                  type="email"
                />
                <FormFieldComponent
                  form={form}
                  name="email"
                  label="Email"
                  placeholder="******@example.com"
                  component={Input}
                  type="email"
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
