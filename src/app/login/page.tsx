'use client'

import React from 'react'
import { useAuthorActions, useIsSignUpActive } from '@/store/authorStore'
import SignUpForm from '../components/auth/SignUpForm'
import LoginForm from '../components/auth/LoginForm'

export default function LoginPage() {
  const isSignUpActive = useIsSignUpActive()
  const { handleSignupClick, handleLoginClick } = useAuthorActions()

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
      <div className="mx-auto bg-white rounded-2xl shadow-lg overflow-hidden relative min-h-[550px] w-[768px] max-w-full">
        <SignUpForm />
        <LoginForm />
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out
            z-100 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-center p-10 ${
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
    </div>
  )
}
