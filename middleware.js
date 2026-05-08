import { NextResponse } from 'next/server'

export function middleware(request) {

  const path = request.nextUrl.pathname

  const protectedRoutes = [
    '/dashboard',
    '/wallet',
    '/profile',
    '/results',
    '/admin'
  ]

  const token =
    request.cookies.get('dbba-auth')

  if (
    protectedRoutes.includes(path)
    &&
    !token
  ) {

    return NextResponse.redirect(
      new URL('/', request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/wallet/:path*',
    '/profile/:path*',
    '/results/:path*',
    '/admin/:path*'
  ]
}
