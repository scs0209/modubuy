'use client'

import React from 'react'
import { useAuthorActions, useIsSignUpActive } from '@/store/authorStore'
import SignUpForm from '../_components/auth/SignUpForm'
import LoginForm from '../_components/auth/LoginForm'
import Image from 'next/image'

export default function LoginPage() {
  const isSignUpActive = useIsSignUpActive()
  const { handleSignupClick, handleLoginClick } = useAuthorActions()

  return (
    <>
      <div className="container relative h-[800px] flex-col items-center justify-center sm:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <SignUpForm />
        <LoginForm />
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out
            z-100 bg-gradient-to-r from-green-400 to-green-600 text-white text-center p-10 ${
              isSignUpActive
                ? '-translate-x-full rounded-r-3xl'
                : 'rounded-l-3xl'
            }`}
        >
          <div
            className={`h-full relative -left-full w-200 transform transition-all duration-600 ease-in-out translate-x-0 ${
              isSignUpActive ? 'translate-x-1/2' : ''
            }`}
          >
            <div
              onClick={handleLoginClick}
              className={`absolute flex top-0 flex-col items-center justify-center text-center px-[30px] cursor-pointer w-1/2 h-full transform transition-all duration-600 ease-in-out ${
                isSignUpActive ? 'translate-x-0' : 'translate-x-[-200%]'
              }`}
            >
              <h1 className="side-title">Welcome Back!</h1>
              <p className="text-sm mt-2">
                Enter your personal details to use all of site features
              </p>
              <button className="side-btn">Sign In</button>
            </div>
            <div
              onClick={handleSignupClick}
              className={`absolute right-0 top-0 flex flex-col justify-center items-center text-center px-[30px] cursor-pointer w-1/2 h-full transform transition-all duration-600 ease-in-out ${
                isSignUpActive ? 'translate-x-[200%]' : 'translate-x-0'
              }`}
            >
              <h1 className="side-title">Hello, Friend!</h1>
              <p className="text-sm mt-2">
                Register with your personal details to use all of site features
              </p>
              <button className="side-btn">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
