import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../utils/auth'

export default async function LoginPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="p-10">
      <h1>Login</h1>
      {session ? <h1>you are logged in</h1> : <h1>Please log in</h1>}
    </div>
  )
}
