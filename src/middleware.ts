import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req: NextRequestWithAuth) {
    console.log(req.nextUrl.pathname)
    console.log(req.nextauth.token?.role)

    if (
      req.nextUrl.pathname.startsWith('/admin') &&
      req.nextauth.token?.role !== 'admin'
    ) {
      return NextResponse.rewrite(new URL('/login', req.url))
    }

    if (!req.nextauth.token && req.nextUrl.pathname.startsWith('/my-page')) {
      return NextResponse.rewrite(new URL('/login', req.url))
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

export const config = { matcher: ['/admin', '/my-page'] }
