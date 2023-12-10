import type NextAuth from 'next-auth'
import { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      accessToken?: string
      role: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    role?: Role | null
  }
}
