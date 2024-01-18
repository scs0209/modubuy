'use client'

import { Form } from '@/components/ui/form'
import { TSignupSchema, signupSchema } from '@/lib/types'
import { useAuthorActions, useIsSignUpActive } from '@/store/authorStore'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signUp } from '@/app/_utils/apis/auth'
import FormFieldComponent from '../FormFieldComponent'

export default function SignUpForm() {
  const isSignUpActive = useIsSignUpActive()
  const form = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  })
  const { handleLoginClick } = useAuthorActions()

  const onSubmit = form.handleSubmit(async (formData) => {
    try {
      await signUp({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <div
      className={`absolute w-1/2 opacity-0 left-0 top-0 h-full transition-all duration-600 ease-in-out ${
        isSignUpActive ? 'translate-x-full opacity-100 z-50 animate-move' : ''
      }`}
    >
      <Form {...form}>
        <form
          className="bg-white flex items-center justify-center flex-col p-10 h-full"
          onSubmit={onSubmit}
        >
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
            회원가입
          </h1>
          <div className="w-full">
            <FormFieldComponent<TSignupSchema>
              form={form}
              name="name"
              label="Name"
              placeholder="Name"
              component={Input}
            />
            <FormFieldComponent<TSignupSchema>
              form={form}
              name="email"
              label="Email"
              placeholder="Email"
              component={Input}
              type="email"
            />
            <FormFieldComponent<TSignupSchema>
              form={form}
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
              component={Input}
            />
          </div>

          <Button type="submit" className="w-full mt-2 mb-2">
            Create an account
          </Button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <span
              onClick={handleLoginClick}
              className="font-medium text-green-400 hover:underline dark:text-green-800"
            >
              Login
            </span>
          </p>
        </form>
      </Form>
    </div>
  )
}
