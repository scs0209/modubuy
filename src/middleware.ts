import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    if (!request.nextauth.token) {
      return NextResponse.rewrite(new URL('/login', request.url))
    }
    return NextResponse.next()
  },
  {
    // authorized가 true를 반환할 때만 middleware가 실행됨
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    },
  },
)

export const config = { matcher: ['/admin', '/'] }
