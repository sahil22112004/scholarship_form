import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const protectedRoutes = [
  '/scholarship-intro',
  // '/scholarship-form-application'
]
const publicRoutes = ['/']

export default async function proxy(req: NextRequest) {

  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  console.log()

  const cookie = (await cookies()).get('access_token')?.value
  const isAuthenticated = !!cookie


  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  if (
    isPublicRoute &&
    isAuthenticated &&
    !req.nextUrl.pathname.startsWith('/scholarship-intro')
  ) {
    return NextResponse.redirect(new URL('/scholarship-intro', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}