'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

interface FormValue {
  email: string
  password: string
  username: string
}

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({ mode: 'onChange' })

  async function signUp({ username, email, password }: FormValue) {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })

    if (!response.ok) {
      throw new Error('Registration failed')
    }

    const result = await response.json()
    return result
  }

  const onSubmit = handleSubmit(async (formData) => {
    try {
      await signUp({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <div className="w-1/2 h-full transition-all duration-600 ease-in-out">
      <form
        className="bg-black flex items-center justify-center flex-col p-10 h-full"
        onSubmit={onSubmit}
      >
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
          회원가입
        </h1>
        <div className="w-full">
          <div className="relative">
            <input
              type="text"
              className="author-input2 peer"
              placeholder="Name"
              {...register('username', {
                required: '닉네임은 필수입니다.',
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: '닉네임은 알파벳, 숫자, 밑줄만 허용합니다.',
                },
              })}
            />
            <label className="author-label2">Name</label>
          </div>
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}

          <div className="relative">
            <input
              type="email"
              className="author-input2 peer"
              placeholder="Email"
              {...register('email', {
                required: '이메일은 필수입니다.',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: '이메일 형식이 올바르지 않습니다.',
                },
              })}
            />
            <label className="author-label2">Email</label>
          </div>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <div className="relative">
            <input
              type="password"
              className="author-input2 peer"
              placeholder="Password"
              {...register('password', {
                required: '비밀번호는 필수입니다.',
                minLength: {
                  value: 8,
                  message: '비밀번호는 최소 8자리 이상이어야 합니다.',
                },
              })}
            />
            <label className="author-label2">Password</label>
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="author-btn mt-4">
          Create an account
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <span
            // onClick={() => dispatch(handleLoginClick())}
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  )
}
