'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useAuthorActions, useIsSignUpActive } from '@/store/authorStore'
import { toast } from '@/components/ui/use-toast'
import { TLoginFormSchema, loginFormSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import FormFieldComponent from '../FormFieldComponent'

export default function LoginForm() {
  const isSignUpActive = useIsSignUpActive()
  const form = useForm<TLoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
  })
  const { handleSignupClick } = useAuthorActions()
  const router = useRouter()

  const onSubmit = form.handleSubmit(async (formData: TLoginFormSchema) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      })
      if (result?.error) {
        toast({ variant: 'destructive', description: `${result?.error}` })
      } else {
        toast({
          description: 'Login success.',
        })
        router.push('/')
      }
    } catch (error) {
      toast({ variant: 'destructive', description: `${error}` })
    }
  })

  return (
    <div
      className={`absolute w-1/2 left-0 z-2 top-0 h-full transition-all duration-600 ease-in-out ${
        isSignUpActive ? 'translate-x-full' : ''
      }`}
    >
      <Form {...form}>
        <form
          className="bg-white flex items-center justify-center flex-col p-10 h-full"
          onSubmit={onSubmit}
        >
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
            로그인
          </h1>
          <div className="w-full">
            <FormFieldComponent<TLoginFormSchema>
              form={form}
              name="email"
              label="Email"
              placeholder="Email"
              component={Input}
              type="email"
            />
            <FormFieldComponent<TLoginFormSchema>
              form={form}
              name="password"
              label="Password"
              placeholder="Password"
              component={Input}
              type="password"
            />
          </div>

          <div className="flex flex-row-reverse items-center justify-between w-full">
            <span
              // onClick={handleForgotPasswordClick}
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Forgot password?
            </span>
          </div>
          <Button type="submit" className="w-full mt-2 mb-2">
            Sign in
          </Button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{' '}
            <span
              onClick={handleSignupClick}
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up
            </span>
          </p>
        </form>
      </Form>
    </div>
  )
}
